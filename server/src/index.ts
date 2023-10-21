import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken"
import { WebSocketServer } from "ws";
import { IncomingHttpHeaders, createServer } from "http";

import { PrismaClient } from "@prisma/client";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLError } from "graphql";
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from "graphql-subscriptions";

import { Context } from "./context";
import resolvers from "./resolvers";
import { typeDefs } from "./typeDefs";

const getUserFromRequest = (headers: IncomingHttpHeaders) => {
    if (!headers || !headers.authorization) return { error: "No authentification sent to the server.", user: null };

    const auth = headers.authorization.split(" ");
    const bearer = auth[0];
    const token = auth[1];

    if (bearer !== "Bearer") return { error: "Authentification need to use Bearer.", user: null };

    try {
        return { error: null, user: jwt.verify(token, process.env.JWTSECRET) };
    }
    catch {
        return { error: "Token is invalid.", user: null };
    }
}

const runServer = async () => {

    const app = express();
    const httpServer = createServer(app);
    const prisma = new PrismaClient();

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/subscriptions'
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

    app.use(
        '/',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const { error, user } = getUserFromRequest(req.headers);

                if (req.body.query.match("login") || req.body.query.match("register") || req.body.query.match("auth")) {
                    return { prisma, req, user }
                }

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