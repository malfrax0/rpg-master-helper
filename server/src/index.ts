import { ApolloServer } from "apollo-server";

import resolvers from "./resolvers";
import { typeDefs } from "./typeDefs";

import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken"

const getUserFromToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWTSECRET);
  }
  catch {
    return null;
  }
}

const runServer = () => {
  const prisma = new PrismaClient();
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({req}) => {
      if (req.body.query.match("login") || req.body.query.match("register")) {
        return {prisma, req}
      }

      let user = null;
      if (req.headers && req.headers.authorization) {
        const auth = req.headers.authorization.split(" ");
        const bearer = auth[0];
        const token = auth[1];
        if (bearer === "Bearer") {
          user = getUserFromToken(token);
          if (!user) {
            throw new GraphQLError("Token is invalid.");
          }
        }
        else {
          throw new GraphQLError("Authentification need to use Bearer.");
        }
      }
      else {
        throw new GraphQLError("User need to be identified");
      }

      return {
        prisma,
        req,
        user
      };
    },
  });

  const port = 4000;
  server.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

runServer();