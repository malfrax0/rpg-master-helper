import { GraphQLError } from "graphql";
import { Resolvers } from "./generated/graphql"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import GameResolver from "./resolvers/GameResolvers";
import CharacterSheetResolver from "./resolvers/CharacterSheetResolver";
import CharacterSheetTemplateResolver from "./resolvers/CharacterSheetTemplateResolvers";
import UserResolver from "./resolvers/UserResolvers";

const defaultResolver: Resolvers = {
    Query: {
        async auth(_, args, context) {
            return context.user !== null;
        }
    },
    Mutation: {
    },
}

export default {
    Query: {
        ...defaultResolver.Query,
        ...GameResolver.Query,
        ...CharacterSheetTemplateResolver.Query,
        ...CharacterSheetResolver.Query,
        ...UserResolver.Query
    },
    Mutation: {
        ...defaultResolver.Mutation,
        ...GameResolver.Mutation,
        ...CharacterSheetTemplateResolver.Mutation,
        ...CharacterSheetResolver.Mutation,
        ...UserResolver.Mutation
    },
    Subscription: {
        ...CharacterSheetResolver.Subscription
    }
}