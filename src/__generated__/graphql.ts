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
  timestamptz: { input: any; output: any; }
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

export type GameEvent = {
  __typename?: 'GameEvent';
  content: Scalars['String']['output'];
  duration?: Maybe<Scalars['Int']['output']>;
  game?: Maybe<Game>;
  gameId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  participations?: Maybe<Array<GameEventParticipation>>;
  startAt?: Maybe<Scalars['timestamptz']['output']>;
  title: Scalars['String']['output'];
};

export type GameEventInput = {
  content: Scalars['String']['input'];
  duration: Scalars['Int']['input'];
  gameId: Scalars['String']['input'];
  startAt: Scalars['timestamptz']['input'];
  title: Scalars['String']['input'];
};

export type GameEventParticipation = {
  __typename?: 'GameEventParticipation';
  id: Scalars['String']['output'];
  response: Scalars['String']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export enum GameEventResponse {
  Cannot = 'CANNOT',
  Maybe = 'MAYBE',
  Participate = 'PARTICIPATE'
}

export type GameHistory = {
  __typename?: 'GameHistory';
  content: Scalars['String']['output'];
  game?: Maybe<Game>;
  gameId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type GameHistoryInput = {
  content: Scalars['String']['input'];
  gameId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type GameInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  templateId: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCharacterSheetTemplate: CharacterSheetTemplate;
  createEvent: GameEvent;
  createGame: Game;
  createHistory: GameHistory;
  inviteUserToGame: CharacterSheet;
  login: AuthResponse;
  participateToEvent: GameEvent;
  register: AuthResponse;
  removeUserFromGame: Scalars['Boolean']['output'];
  updateValueOfCharacterSheet: CharacterStat;
};


export type MutationCreateCharacterSheetTemplateArgs = {
  description: Scalars['String']['input'];
  json: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateEventArgs = {
  event: GameEventInput;
};


export type MutationCreateGameArgs = {
  game: GameInput;
};


export type MutationCreateHistoryArgs = {
  history: GameHistoryInput;
};


export type MutationInviteUserToGameArgs = {
  gameId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationParticipateToEventArgs = {
  gameEventId: Scalars['String']['input'];
  response: GameEventResponse;
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveUserFromGameArgs = {
  gameId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationUpdateValueOfCharacterSheetArgs = {
  characterSheetId: Scalars['String']['input'];
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Pagination = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  auth: Scalars['Boolean']['output'];
  characterSheet: CharacterSheet;
  characterSheetTemplate: CharacterSheetTemplate;
  characterSheetTemplates?: Maybe<Array<CharacterSheetTemplate>>;
  event: GameEvent;
  events?: Maybe<Array<GameEvent>>;
  game: Game;
  histories?: Maybe<Array<GameHistory>>;
  history: GameHistory;
  me: User;
  myGames?: Maybe<Array<Game>>;
  user: User;
  users?: Maybe<Array<User>>;
};


export type QueryCharacterSheetArgs = {
  characterSheetId: Scalars['String']['input'];
};


export type QueryCharacterSheetTemplateArgs = {
  characterSheetTemplateId: Scalars['String']['input'];
};


export type QueryEventArgs = {
  eventId: Scalars['String']['input'];
};


export type QueryEventsArgs = {
  gameId: Scalars['String']['input'];
  page: Pagination;
};


export type QueryGameArgs = {
  gameId: Scalars['String']['input'];
};


export type QueryHistoriesArgs = {
  gameId: Scalars['String']['input'];
  page: Pagination;
};


export type QueryHistoryArgs = {
  historyId: Scalars['String']['input'];
};


export type QueryUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilter>;
  page: Pagination;
};

export type Subscription = {
  __typename?: 'Subscription';
  statChanged: CharacterStat;
};


export type SubscriptionStatChangedArgs = {
  characterSheetId: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  administratedGames?: Maybe<Array<Game>>;
  email: Scalars['String']['output'];
  games?: Maybe<Array<CharacterSheet>>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type UserFilter = {
  ignoreInGames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  onlyInGames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AuthQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthQuery = { __typename?: 'Query', auth: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name: string } };

export type UpdateValueOfCharacterSheetMutationVariables = Exact<{
  characterSheetId: Scalars['String']['input'];
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
}>;


export type UpdateValueOfCharacterSheetMutation = { __typename?: 'Mutation', updateValueOfCharacterSheet: { __typename?: 'CharacterStat', value?: string | null } };

export type GetCharacterSheetQueryVariables = Exact<{
  characterSheetId: Scalars['String']['input'];
}>;


export type GetCharacterSheetQuery = { __typename?: 'Query', characterSheet: { __typename?: 'CharacterSheet', game?: { __typename?: 'Game', rpgInfo?: { __typename?: 'CharacterSheetTemplate', template: any } | null } | null, characterStats?: Array<{ __typename?: 'CharacterStat', key: string, value?: string | null }> | null, user?: { __typename?: 'User', id: string, name: string } | null } };

export type StatChangedSubscriptionVariables = Exact<{
  characterSheetId: Scalars['String']['input'];
}>;


export type StatChangedSubscription = { __typename?: 'Subscription', statChanged: { __typename?: 'CharacterStat', key: string, value?: string | null } };

export type GetGameQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetGameQuery = { __typename?: 'Query', game: { __typename?: 'Game', id: string, adminId?: string | null, description?: string | null, name: string, admin?: { __typename?: 'User', name: string } | null, characters?: Array<{ __typename?: 'CharacterSheet', id: string, user?: { __typename?: 'User', id: string, name: string } | null }> | null, rpgInfo?: { __typename?: 'CharacterSheetTemplate', name: string, description?: string | null, template: any } | null } };

export type GetEventsQueryVariables = Exact<{
  page: Pagination;
  gameId: Scalars['String']['input'];
}>;


export type GetEventsQuery = { __typename?: 'Query', events?: Array<{ __typename?: 'GameEvent', id: string, title: string, content: string, startAt?: any | null, duration?: number | null, participations?: Array<{ __typename?: 'GameEventParticipation', response: string, user?: { __typename?: 'User', id: string, name: string } | null }> | null }> | null };

export type CreateEventMutationVariables = Exact<{
  event: GameEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'GameEvent', id: string } };

export type ParticipateToEventMutationVariables = Exact<{
  gameEventId: Scalars['String']['input'];
  response: GameEventResponse;
}>;


export type ParticipateToEventMutation = { __typename?: 'Mutation', participateToEvent: { __typename?: 'GameEvent', id: string } };

export type RemovePlayerFromGameMutationVariables = Exact<{
  gameId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type RemovePlayerFromGameMutation = { __typename?: 'Mutation', removeUserFromGame: boolean };

export type FindPlayerNotInGameQueryVariables = Exact<{
  page: Pagination;
  filter?: InputMaybe<UserFilter>;
}>;


export type FindPlayerNotInGameQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, name: string }> | null };

export type InvitePlayerMutationVariables = Exact<{
  playerId: Scalars['String']['input'];
  gameId: Scalars['String']['input'];
}>;


export type InvitePlayerMutation = { __typename?: 'Mutation', inviteUserToGame: { __typename?: 'CharacterSheet', id: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token?: string | null, user?: { __typename?: 'User', id: string } | null } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', token?: string | null, user?: { __typename?: 'User', id: string } | null } };

export type GetMyGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyGamesQuery = { __typename?: 'Query', myGames?: Array<{ __typename?: 'Game', id: string, name: string, description?: string | null, adminId?: string | null }> | null };

export type GetAllCharacterSheetTemplateQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCharacterSheetTemplateQuery = { __typename?: 'Query', characterSheetTemplates?: Array<{ __typename?: 'CharacterSheetTemplate', id: string, name: string }> | null };

export type CreateGameMutationVariables = Exact<{
  game: GameInput;
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'Game', id: string, name: string } };


export const AuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"}}]}}]} as unknown as DocumentNode<AuthQuery, AuthQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UpdateValueOfCharacterSheetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateValueOfCharacterSheet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"characterSheetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateValueOfCharacterSheet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"characterSheetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"characterSheetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<UpdateValueOfCharacterSheetMutation, UpdateValueOfCharacterSheetMutationVariables>;
export const GetCharacterSheetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCharacterSheet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"characterSheetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"characterSheet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"characterSheetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"characterSheetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rpgInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"template"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"characterStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetCharacterSheetQuery, GetCharacterSheetQueryVariables>;
export const StatChangedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"StatChanged"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"characterSheetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statChanged"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"characterSheetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"characterSheetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<StatChangedSubscription, StatChangedSubscriptionVariables>;
export const GetGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"adminId"}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"characters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rpgInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"template"}}]}}]}}]}}]} as unknown as DocumentNode<GetGameQuery, GetGameQueryVariables>;
export const GetEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"participations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetEventsQuery, GetEventsQueryVariables>;
export const CreateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GameEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"event"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;
export const ParticipateToEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ParticipateToEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameEventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"response"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GameEventResponse"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"participateToEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameEventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameEventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"response"},"value":{"kind":"Variable","name":{"kind":"Name","value":"response"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ParticipateToEventMutation, ParticipateToEventMutationVariables>;
export const RemovePlayerFromGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemovePlayerFromGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUserFromGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<RemovePlayerFromGameMutation, RemovePlayerFromGameMutationVariables>;
export const FindPlayerNotInGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindPlayerNotInGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<FindPlayerNotInGameQuery, FindPlayerNotInGameQueryVariables>;
export const InvitePlayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InvitePlayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteUserToGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<InvitePlayerMutation, InvitePlayerMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const GetMyGamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyGames"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myGames"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"adminId"}}]}}]}}]} as unknown as DocumentNode<GetMyGamesQuery, GetMyGamesQueryVariables>;
export const GetAllCharacterSheetTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCharacterSheetTemplate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"characterSheetTemplates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllCharacterSheetTemplateQuery, GetAllCharacterSheetTemplateQueryVariables>;
export const CreateGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"game"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"game"},"value":{"kind":"Variable","name":{"kind":"Name","value":"game"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateGameMutation, CreateGameMutationVariables>;