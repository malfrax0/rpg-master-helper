import { GraphQLError } from "graphql";
import { Resolvers } from "./generated/graphql"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import GameResolver from "./resolvers/GameResolvers";
import CharacterSheetResolver from "./resolvers/CharacterSheetResolver";
import CharacterSheetTemplateResolver from "./resolvers/CharacterSheetTemplateResolvers";

const defaultResolver: Resolvers = {
    Query: {
        async auth(_, args, context) {
            return context.user !== null;
        }
    },
    Mutation: {
        async login(_, args, context, info) {
            const { email, password } = args;

            const user = await context.prisma.user.findUnique({ where: { email }});

            if (!user) {
                throw new GraphQLError("Unable to connect this user");
            }
            else {
                const valid = await bcrypt.compare(password, user.password);

                if (!valid) {
                    throw new GraphQLError("Unable to connect this user");
                }

                return {
                    token: jwt.sign(user, process.env.JWTSECRET),
                    user
                };
            }
        },
        async register(_, args, context, info) {
            const {email, password, name} = args;

            let user = await context.prisma.user.findUnique({where: { email }});

            if (user) {
                throw new GraphQLError("User already exist");
            }
            else {
                user = await context.prisma.user.create({ data: {email, password: await bcrypt.hash(password, 10), name} });

                return {
                    token: jwt.sign(user, process.env.JWTSECRET),
                    user
                }
            }
        }
    },
}

export default {
    Query: {
        ...defaultResolver.Query,
        ...GameResolver.Query,
        ...CharacterSheetTemplateResolver.Query,
        ...CharacterSheetResolver.Query
    },
    Mutation: {
        ...defaultResolver.Mutation,
        ...GameResolver.Mutation,
        ...CharacterSheetTemplateResolver.Mutation,
        ...CharacterSheetResolver.Mutation
    }
}