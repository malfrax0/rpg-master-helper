import { GraphQLError } from "graphql";
import { Resolvers } from "../generated/graphql"

const CharacterSheetTemplateResolver: Resolvers = {
    Query: {
        async characterSheetTemplate(_, args, context) {
            const characterSheet = await context.prisma.characterSheetTemplate.findUnique({where: {id: args.characterSheetTemplateId}});

            if (characterSheet) return characterSheet;
            throw new GraphQLError(`Unable to find character sheet with id ${args.characterSheetTemplateId}`);
        },
        async characterSheetTemplates(_, args, context) {
            return await context.prisma.characterSheetTemplate.findMany();
        }
    },
    Mutation: {
        async createCharacterSheetTemplate(_, args, context, info) {
            const characterSheet = await context.prisma.characterSheetTemplate.create({
                data: {
                    name: args.name,
                    description: args.description,
                    template: JSON.stringify(args.json)
                }
            });

            return characterSheet;
        }
    }
}

export default CharacterSheetTemplateResolver;