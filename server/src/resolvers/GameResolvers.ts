import { GraphQLError } from "graphql";
import { Resolvers } from "../generated/graphql"

const GameResolver: Resolvers = {
    Query: {
        async game(_, args, context) {
            const game = await context.prisma.game.findUniqueOrThrow({where: {id: args.gameId},
                include: {
                    admin: {
                    },
                    rpgInfo: {

                    },
                    characters: {
                        include: {
                            user: {
                                
                            }
                        }
                    }
                }})
        
            if (game) return game;
            throw new GraphQLError(`Unable to find game with id ${args.gameId}.`);
        },
        async myGames(_, args, context) {
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
                        include: {
                            user: {

                            }
                        }
                    }
                }
            });

            return allGames;
        },
        async event(_, args, context) {
            const eventData = await context.prisma.gameEvent.findUnique({
                where: {
                    id: args.eventId
                },
                include: {
                    participations: {
                        include: {
                            user: {

                            }
                        }
                    }
                }
            });
            return eventData;
        },
        async events(_, args, context) {
            const eventData = await context.prisma.gameEvent.findMany({
                where: {
                    gameId: args.gameId
                },
                include: {
                    participations: {
                        include: {
                            user: {

                            }
                        }
                    }
                },
                skip: args.page.after || 0,
                take: args.page.first || 10
            });
            return eventData;
        },
        async history(_, args, context) {
            const historyData = await context.prisma.gameHistory.findUnique({
                where: {
                    id: args.historyId
                },
                include: {
                    user: {
                        
                    }
                }
            });
            return historyData;
        },
        async histories(_, args, context) {
            const historyData = await context.prisma.gameHistory.findMany({
                where: {
                    gameId: args.gameId
                },
                include: {
                    user: {

                    }
                },
                skip: args.page.after || 0,
                take: args.page.first || 10
            });
            return historyData;
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