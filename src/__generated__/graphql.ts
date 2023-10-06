/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  error?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type CharacterSheet = {
  __typename?: 'CharacterSheet';
  characterStats?: Maybe<Array<CharacterStat>>;
  game?: Maybe<Game>;
  gameId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type CharacterSheetTemplate = {
  __typename?: 'CharacterSheetTemplate';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  template: Scalars['JSON']['output'];
};

export type CharacterStat = {
  __typename?: 'CharacterStat';
  characterSheet?: Maybe<CharacterSheet>;
  characterSheetId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type Game = {
  __typename?: 'Game';
  admin?: Maybe<User>;
  adminId?: Maybe<Scalars['String']['output']>;
  characters?: Maybe<Array<CharacterSheet>>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rpgInfo?: Maybe<CharacterSheetTemplate>;
};

export type GameInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  templateId: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCharacterSheetTemplate: CharacterSheetTemplate;
  createGame: Game;
  inviteUserToGame: CharacterSheet;
  login: AuthResponse;
  register: AuthResponse;
  updateValueOfCharacterSheet: CharacterStat;
};


export type MutationCreateCharacterSheetTemplateArgs = {
  description: Scalars['String']['input'];
  json: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateGameArgs = {
  game: GameInput;
};


export type MutationInviteUserToGameArgs = {
  gameId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateValueOfCharacterSheetArgs = {
  characterSheetId: Scalars['String']['input'];
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  auth: Scalars['Boolean']['output'];
  getAllCharacterSheetTemplate?: Maybe<Array<CharacterSheetTemplate>>;
  getCharacterSheet: CharacterSheet;
  getCharacterSheetTemplate: CharacterSheetTemplate;
  getGame: Game;
  getMyGames?: Maybe<Array<Game>>;
};


export type QueryGetCharacterSheetArgs = {
  characterSheetId: Scalars['String']['input'];
};


export type QueryGetCharacterSheetTemplateArgs = {
  characterSheetTemplateId: Scalars['String']['input'];
};


export type QueryGetGameArgs = {
  gameId: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  administratedGames?: Maybe<Array<Game>>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GetGameTestQueryVariables = Exact<{
  gameId: Scalars['String']['input'];
}>;


export type GetGameTestQuery = { __typename?: 'Query', getGame: { __typename?: 'Game', name: string, description?: string | null, admin?: { __typename?: 'User', id: string, name: string } | null, characters?: Array<{ __typename?: 'CharacterSheet', user?: { __typename?: 'User', id: string, name: string } | null }> | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token?: string | null, user?: { __typename?: 'User', id: string } | null } };

export type AuthQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthQuery = { __typename?: 'Query', auth: boolean };


export const GetGameTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGameTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"characters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetGameTestQuery, GetGameTestQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const AuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"}}]}}]} as unknown as DocumentNode<AuthQuery, AuthQueryVariables>;