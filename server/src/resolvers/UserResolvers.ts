import { Resolvers } from "generated/graphql";
import { GraphQLError } from "graphql";

const UserResolver: Resolvers = {
    Query: {
        async me(_, args, context) {
            const user = await context.prisma.user.findUnique({where: {id: context.user.id}});
        
            if (user === null) {
                throw new GraphQLError("Unable to find user.");
            }

            return user;
        },
        async user(_, args, context) {
            return await context.prisma.user.findUnique({where: {id: args.userId}});
        },
        async users(_, args, context) {
            if (args.page.first && args.page.first >= 50) {
                throw new GraphQLError("Page need to be less or equal to 50.");
            }

            let currentSearch = {

            };
            if (args.filter) {
                if (args.filter.name && args.filter.name.length > 0) {
                    currentSearch['name'] = {
                        mode: "insensitive",
                        contains: args.filter.name
                    };
                }
                let gamesFilter: any = {};
                let administratedGamesFilter: any = {};
                if (args.filter.ignoreInGames) {
                    gamesFilter['none'] = {
                        gameId: {in: args.filter.ignoreInGames}
                    }
                    administratedGamesFilter['none'] = {
                        id: {in: args.filter.ignoreInGames}
                    }
                }
                if (args.filter.onlyInGames) {
                    gamesFilter['some'] = {
                        gameId: {in: args.filter.onlyInGames}
                    }
                    administratedGamesFilter['some'] = {
                        id: {in: args.filter.onlyInGames}
                    };
                }
                if (gamesFilter.none || gamesFilter.some) {
                    currentSearch['games'] = gamesFilter;
                }
                if (administratedGamesFilter.none || administratedGamesFilter.some) {
                    currentSearch['administratedGames'] = administratedGamesFilter;
                }
            }

            return await context.prisma.user.findMany({
                where: {
                    ...currentSearch,
                },
                orderBy: {
                    name: "asc"
                },
                skip: args.page.after || 0,
                take: args.page.first || 10
            });
        }
    },
    Mutation: {

    }
}

export default UserResolver;