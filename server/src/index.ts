import { ApolloServer } from "apollo-server";

import resolvers from "./resolvers";
import { typeDefs } from "./typeDefs";

import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken"
import { IncomingHttpHeaders, createServer } from "http";
import { WebSocketServer } from "ws";
import express from "express";
import {makeExecutableSchema} from '@graphql-tools/schema';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { PubSub } from "graphql-subscriptions";

const getUserFromRequest = (headers: IncomingHttpHeaders) => {
  if (!headers || !headers.authorization) return {error: "No authentification sent to the server.", user: null}; 

  const auth = headers.authorization.split(" ");
  const bearer = auth[0];
  const token = auth[1];
  
  if (bearer !== "Bearer") return {error: "Authentification need to use Bearer.", user: null};
  
  try {
    return {error: null, user: jwt.verify(token, process.env.JWTSECRET)};
  }
  catch {
    return {error: "Token is invalid.", user: null};
  }
}

const runServer = () => {

  const pubSub = new PubSub();
  const app = express();
  const httpServer = createServer(app);
  const prisma = new PrismaClient();
  
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/subscriptions'
  });

  const schema = makeExecutableSchema({typeDefs, resolvers});
  
  const serverCleanup = useServer(
    {schema}, wsServer
  )

  const server = new ApolloServer({
    introspection: true,
    schema,
    context: ({req}) => {
      const {error, user} = getUserFromRequest(req.headers);

      if (req.body.query.match("login") || req.body.query.match("register") || req.body.query.match("auth")) {
        return {prisma, req, user, pubSub}
      }
      
      if (error !== null) {
        throw new GraphQLError(error);
      }

      return {
        prisma,
        req,
        user,
        pubSub
      };
    },
    plugins: [
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

  const port = 4000;
  server.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

runServer();