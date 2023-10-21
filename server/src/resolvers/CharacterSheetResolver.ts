import { GraphQLError } from "graphql";
import { Resolvers } from "../generated/graphql"
import { JsonObject } from "@prisma/client/runtime/library";
import { getStatDefinitionFromKey } from "../services/CharacterStatService";
import { withFilter } from 'graphql-subscriptions';
import { pubSub } from "../context";

const CharacterSheetResolver: Resolvers = {
    Query: {
        async characterSheet(_, args, context) {
            const characterSheet = await context.prisma.characterSheet.findUnique({where: {id: args.characterSheetId}, include: {characterStats: {}, game: { include: { rpgInfo: {}} }, user: {}}})
            if (!characterSheet) throw new GraphQLError(`Unable to find character sheet with id ${args.characterSheetId}`);
            if (context.user.id !== characterSheet.game.adminId && context.user.id !== characterSheet.userId) throw new GraphQLError(`You are not allowed to access this character sheet.`);

            return characterSheet;
        }
    },
    Mutation: {
        async inviteUserToGame(_, args, context) {
            const game = await context.prisma.game.findUnique({ where: {id: args.gameId} });
            if (!game) throw new GraphQLError(`Unable to find game with id ${args.gameId}.`);
            if (context.user.id !== game.adminId) throw new GraphQLError(`You are not allowed to invite user on this game.`);

            const user = await context.prisma.user.findUnique({ where: {id: args.userId} });
            if (!user) throw new GraphQLError(`Unable to find user with id ${args.userId}.`);

            const characterSheet = context.prisma.characterSheet.create({
                data: {
                    game: { connect: {id: args.gameId} },
                    user: { connect: {id: args.userId} }
                }
            });

            return characterSheet;
        },
        async removeUserFromGame(_, args, context) {
            const characterSheet = await context.prisma.characterSheet.findUnique({ where: { gameId_userId: {userId: args.userId, gameId: args.gameId} } });
            await context.prisma.characterSheet.delete({ where: {id: characterSheet.id} });

            return true;
        },
        async updateValueOfCharacterSheet(_, args, context) {
            const characterSheet = await context.prisma.characterSheet.findUnique({ where: {id: args.characterSheetId} });
            if (!characterSheet) throw new GraphQLError(`Unable to find a character sheet with id ${args.characterSheetId}`);

            const game = await context.prisma.game.findUnique({ where: {id: characterSheet.gameId} });
            if (!game) throw new GraphQLError(`Their is a consistency problem with the database. Fatal error.`);

            const template = await context.prisma.characterSheetTemplate.findUnique({ where: {id: game.rpgInfoId} });
            if (!template) throw new GraphQLError(`Their is a consistency problem with the database. Fatal error.`);

            const definition = getStatDefinitionFromKey(args.key, JSON.parse(template.template.toString()));
            if (!definition) throw new GraphQLError(`${args.key} is not a valid key.`);

            const stat = await context.prisma.characterStat.upsert({
                create: {
                    key: args.key,
                    value: args.value,
                    characterSheet: { connect: {id: args.characterSheetId} },
                },
                update: {
                    value: args.value
                },
                where: {
                    key_characterSheetId: {
                        characterSheetId: args.characterSheetId,
                        key: args.key
                    }
                }
            });

            await pubSub.publish("CHARACTER_SHEET_MODIFIED", stat);

            return stat;
        }
    },
    Subscription: {
        statChanged: {
            /** @ts-ignore */
            subscribe: withFilter(
                () => pubSub.asyncIterator("CHARACTER_SHEET_MODIFIED"),
                (payload, variables) => {
                    return payload.characterSheetId === variables.characterSheetId;
                }
            ),
            resolve: (payload) => payload
        }
    }
}

export default CharacterSheetResolver;