import {gql} from "apollo-server";

export const typeDefs = gql`
    scalar JSON

    type User {
        id: String!
        name: String!
        email: String!
        administratedGames: [Game!]
    }

    type Game {
        id: String!
        admin: User
        adminId: String
        name: String!
        description: String
        characters: [CharacterSheet!]
        rpgInfo: CharacterSheetTemplate
    }

    input GameInput {
        name: String!
        description: String,
        templateId: ID!
    }

    type CharacterSheet {
        id: String!
        game: Game
        gameId: String
        user: User
        userId: String
        characterStats: [CharacterStat!]
    }

    type CharacterStat {
        id: String!
        characterSheet: CharacterSheet
        characterSheetId: String!
        key: String!
        value: String
    }

    type CharacterSheetTemplate {
        id: String!
        template: JSON!
        name: String!
        description: String
    }

    type AuthResponse {
        token: String
        error: String
        user: User
    }

    type Query {
        auth: Boolean!

        getGame(gameId: String!): Game!
        getMyGames: [Game!]

        getCharacterSheet(characterSheetId: String!): CharacterSheet!

        getCharacterSheetTemplate(characterSheetTemplateId: String!): CharacterSheetTemplate!
        getAllCharacterSheetTemplate: [CharacterSheetTemplate!]
    }

    type Mutation {
        login(email: String!, password: String!): AuthResponse!
        register(email: String!, password: String!, name: String!): AuthResponse!
        
        createGame(game: GameInput!): Game!

        inviteUserToGame(gameId: String!, userId: String!): CharacterSheet!
        updateValueOfCharacterSheet(characterSheetId: String!, key: String!, value: String!): CharacterStat!

        createCharacterSheetTemplate(name: String!, description: String!, json: JSON!): CharacterSheetTemplate!
    }
`