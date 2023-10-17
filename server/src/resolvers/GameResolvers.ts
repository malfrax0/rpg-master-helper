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
        },
        async createEvent(_, args, context) {
            const game = await context.prisma.game.findUnique({ where: {id: args.event.gameId} });
            if (!game || game.adminId !== context.user.id) {
                throw new GraphQLError(`Unable to find game with id ${args.event.gameId}`);
            }

            const gameEvent = await context.prisma.gameEvent.create({
                data: {
                    content: args.event.content,
                    duration: args.event.duration,
                    startAt: args.event.startAt,
                    title: args.event.title,
                    game: { connect: {id: args.event.gameId} }
                }
            });
            return gameEvent;
        },
        async participateToEvent(_, args, context) {
            const event = await context.prisma.gameEvent.findUnique({ where: {id: args.gameEventId}, include: {participations: {}}});
            if (!event) {
                throw new GraphQLError(`Unable to find game event with id ${args.gameEventId}.`);
            }
            // check right to participate

            await context.prisma.gameEventParticipation.upsert({
                create: {
                    event: {connect: {id: event.id}},
                    user: {connect: {id: context.user.id}},
                    response: args.response
                },
                update: {
                    response: args.response
                },
                where: {
                    eventId_userId: {
                        eventId: event.id,
                        userId: context.user.id
                    }
                }
            });

            return event;
        },
        async createHistory(_, args, context) {
            const game = await context.prisma.game.findUnique({ where: {id: args.history.gameId} });
            if (!game || game.adminId !== context.user.id) {
                throw new GraphQLError(`Unable to find game with id ${args.history.gameId}`);
            }

            const gameHistory = await context.prisma.gameHistory.create({
                data: {
                    title: args.history.title,
                    content: args.history.content,
                    game: {connect: {id: args.history.gameId}},
                    user: {connect: {id: context.user.id}}
                }
            });
            return gameHistory;
        }
    }
}

export default GameResolver;