import { GraphQLError } from "graphql";
import { Resolvers } from "../generated/graphql"

const GameResolver: Resolvers = {
    Query: {
        async getGame(_, args, context) {
            const game = await context.prisma.game.findUniqueOrThrow({where: {id: args.gameId}})
        
            if (game) return game;
            throw new GraphQLError(`Unable to find game with id ${args.gameId}.`);
        },
        async getMyGames(_, args, context) {
            const allGames = await context.prisma.game.findMany({
                where: {
                    OR: [
                        {adminId: context.user.id},
                        {characters: {
                            some: {
                                userId: context.user.id
                            }
                        }}
                    ]
                },
                include: {
                    admin: {
                    },
                    rpgInfo: {

                    },
                    characters: {
                    }
                }
            });

            return allGames;
        }
    },
    Mutation: {
        async createGame(_, args, context) {
            const characterSheetTemplate = await context.prisma.characterSheetTemplate.findUnique({where: {id: args.game.templateId}})

            if (!characterSheetTemplate) {
                throw new GraphQLError(`Unable to find character sheet template with id  ${args.game.templateId}`);
            }

            const game = await context.prisma.game.create({
                data: {
                    name: args.game.name,
                    description: args.game.description,
                    admin: { connect: {id: context.user.id}},
                    rpgInfo: { connect: {id: characterSheetTemplate.id} }
                }
            });

            return game;
        }
    }
}

export default GameResolver;