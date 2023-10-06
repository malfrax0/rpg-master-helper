import { ApolloServer } from "apollo-server";

import resolvers from "./resolvers";
import { typeDefs } from "./typeDefs";

import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken"
import { IncomingHttpHeaders } from "http";

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
  const prisma = new PrismaClient();
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({req}) => {
      const {error, user} = getUserFromRequest(req.headers);

      if (req.body.query.match("login") || req.body.query.match("register") || req.body.query.match("auth")) {
        return {prisma, req, user}
      }
      
      if (error !== null) {
        throw new GraphQLError(error);
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