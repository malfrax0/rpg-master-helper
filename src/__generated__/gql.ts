/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Auth {\n    auth\n  }\n": types.AuthDocument,
    "\n    query GetGame($id: String!) {\n        game(gameId: $id) {\n            id,\n            adminId,\n            admin {\n                name\n            },\n            characters {\n                user {\n                    id,\n                    name\n                },\n                id\n            },\n            description,\n            name,\n            rpgInfo {\n                name,\n                description,\n                template\n            }\n        }\n    }\n": types.GetGameDocument,
    "\n    query GetEvents($page: Pagination!, $gameId: String!) {\n        events(page: $page, gameId: $gameId) {\n            id,\n            title,\n            content,\n            startAt,\n            duration,\n            participations {\n                response,\n                user {\n                    id,\n                    name\n                }\n            }\n        }\n    }\n": types.GetEventsDocument,
    "\n    mutation RemovePlayerFromGame($gameId: String!, $userId: String!) {\n        removeUserFromGame(gameId: $gameId, userId: $userId)\n    }\n": types.RemovePlayerFromGameDocument,
    "\n    query FindPlayerNotInGame($page: Pagination!, $filter: UserFilter) {\n        users(page: $page, filter: $filter) {\n            id,\n            name\n        }\n    }\n": types.FindPlayerNotInGameDocument,
    "\n    mutation InvitePlayer($playerId: String!, $gameId: String!) {\n        inviteUserToGame(gameId: $gameId, userId: $playerId) {\n            id\n        }\n    }\n": types.InvitePlayerDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      user {\n        id\n      }\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($email: String!, $password: String!, $name: String!) {\n    register(email: $email, password: $password, name: $name) {\n      user {\n        id\n      }\n      token\n    }\n  }  \n": types.RegisterDocument,
    "\n    query GetMyGames {\n        myGames {\n            id,\n            name,\n            description,\n            adminId\n        }\n    }\n": types.GetMyGamesDocument,
    "\n    query GetAllCharacterSheetTemplate {\n        characterSheetTemplates {\n            id,\n            name\n        }\n    }\n": types.GetAllCharacterSheetTemplateDocument,
    "\n    mutation CreateGame($game: GameInput!) {\n        createGame(game: $game) {\n            id,\n            name\n        }\n    }\n": types.CreateGameDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Auth {\n    auth\n  }\n"): (typeof documents)["\n  query Auth {\n    auth\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetGame($id: String!) {\n        game(gameId: $id) {\n            id,\n            adminId,\n            admin {\n                name\n            },\n            characters {\n                user {\n                    id,\n                    name\n                },\n                id\n            },\n            description,\n            name,\n            rpgInfo {\n                name,\n                description,\n                template\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetGame($id: String!) {\n        game(gameId: $id) {\n            id,\n            adminId,\n            admin {\n                name\n            },\n            characters {\n                user {\n                    id,\n                    name\n                },\n                id\n            },\n            description,\n            name,\n            rpgInfo {\n                name,\n                description,\n                template\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetEvents($page: Pagination!, $gameId: String!) {\n        events(page: $page, gameId: $gameId) {\n            id,\n            title,\n            content,\n            startAt,\n            duration,\n            participations {\n                response,\n                user {\n                    id,\n                    name\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetEvents($page: Pagination!, $gameId: String!) {\n        events(page: $page, gameId: $gameId) {\n            id,\n            title,\n            content,\n            startAt,\n            duration,\n            participations {\n                response,\n                user {\n                    id,\n                    name\n                }\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RemovePlayerFromGame($gameId: String!, $userId: String!) {\n        removeUserFromGame(gameId: $gameId, userId: $userId)\n    }\n"): (typeof documents)["\n    mutation RemovePlayerFromGame($gameId: String!, $userId: String!) {\n        removeUserFromGame(gameId: $gameId, userId: $userId)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query FindPlayerNotInGame($page: Pagination!, $filter: UserFilter) {\n        users(page: $page, filter: $filter) {\n            id,\n            name\n        }\n    }\n"): (typeof documents)["\n    query FindPlayerNotInGame($page: Pagination!, $filter: UserFilter) {\n        users(page: $page, filter: $filter) {\n            id,\n            name\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation InvitePlayer($playerId: String!, $gameId: String!) {\n        inviteUserToGame(gameId: $gameId, userId: $playerId) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation InvitePlayer($playerId: String!, $gameId: String!) {\n        inviteUserToGame(gameId: $gameId, userId: $playerId) {\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      user {\n        id\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      user {\n        id\n      }\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register($email: String!, $password: String!, $name: String!) {\n    register(email: $email, password: $password, name: $name) {\n      user {\n        id\n      }\n      token\n    }\n  }  \n"): (typeof documents)["\n  mutation Register($email: String!, $password: String!, $name: String!) {\n    register(email: $email, password: $password, name: $name) {\n      user {\n        id\n      }\n      token\n    }\n  }  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetMyGames {\n        myGames {\n            id,\n            name,\n            description,\n            adminId\n        }\n    }\n"): (typeof documents)["\n    query GetMyGames {\n        myGames {\n            id,\n            name,\n            description,\n            adminId\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAllCharacterSheetTemplate {\n        characterSheetTemplates {\n            id,\n            name\n        }\n    }\n"): (typeof documents)["\n    query GetAllCharacterSheetTemplate {\n        characterSheetTemplates {\n            id,\n            name\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateGame($game: GameInput!) {\n        createGame(game: $game) {\n            id,\n            name\n        }\n    }\n"): (typeof documents)["\n    mutation CreateGame($game: GameInput!) {\n        createGame(game: $game) {\n            id,\n            name\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;