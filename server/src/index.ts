import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken"
import { WebSocketServer } from "ws";
import { IncomingHttpHeaders, createServer } from "http";

import { PrismaClient } from "@prisma/client";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { auth } from 'express-oauth2-jwt-bearer';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLError } from "graphql";
import { useServer } from 'graphql-ws/lib/use/ws';
import { loadFiles } from '@graphql-tools/load-files';

import { Context } from "./context";
import resolvers from "./resolvers";

import axios from "axios";

require("dotenv").config();

const jwtCheck = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: process.env.TOKEN_SIGNING_ALG
})

const getUserFromRequest = async (headers: IncomingHttpHeaders, prisma: PrismaClient) => {
    if (headers && headers.authorization) {
        const slipt = headers.authorization.split(" ");
        if (slipt[0] === "Bearer") {
            const user = jwt.decode(slipt[1], { json: true}) as jwt.JwtPayload;
            if (user) {
                
                if (user.sub) {
                    console.log(user);
                    const userDb = await prisma.user.findUnique({ where: {id: user.sub as string}})
                    if (!userDb) {
                        const rep = await axios.get(`https://{yourDomain}/userinfo`, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: headers.authorization
                            }
                        });
                        console.log(rep);
                        // prisma.user.create({
                        //     data: {
                        //         id: user.sub,
                        //         email: user.
                        //     }
                        // })
                    }
                    return {error: null, user: user as jwt.JwtPayload};
                }
            }
            return {error: "Unable to decode jwt token.", user: {}}
        }
    }
    return {error: "No authorization sent.", user: {}}
}

const runServer = async () => {

    const app = express();
    const httpServer = createServer(app);
    const prisma = new PrismaClient();

    const typeDefs = await loadFiles('src/document/**/*.graphql');

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/api/subscriptions'
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const serverCleanup = useServer(
        { schema }, wsServer
    )

    const server = new ApolloServer<Context>({
        introspection: true,
        schema,
        plugins: [
            /** @ts-ignore */
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    }
                }
            }
        ]
    });

    await server.start();
    console.log("Server started.")

    app.use(cors())

    app.use(jwtCheck);

    app.use(
        '/api',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const { error, user } = await getUserFromRequest(req.headers, prisma);

                if (error !== null) {
                    throw new GraphQLError(error);
                }

                return {
                    prisma,
                    req,
                    user
                };
            }
        })
    )

    const port = 4000;
    await new Promise<void>((resolve) => httpServer.listen({ port: port }));
    console.log(`🚀 Server ready at http://localhost:4000/`);
};

runServer();