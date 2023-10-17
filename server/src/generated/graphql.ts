import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CharacterSheet: ResolverTypeWrapper<CharacterSheet>;
  CharacterSheetTemplate: ResolverTypeWrapper<CharacterSheetTemplate>;
  CharacterStat: ResolverTypeWrapper<CharacterStat>;
  Game: ResolverTypeWrapper<Game>;
  GameEvent: ResolverTypeWrapper<GameEvent>;
  GameEventInput: GameEventInput;
  GameEventParticipation: ResolverTypeWrapper<GameEventParticipation>;
  GameEventResponse: GameEventResponse;
  GameHistory: ResolverTypeWrapper<GameHistory>;
  GameHistoryInput: GameHistoryInput;
  GameInput: GameInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Pagination: Pagination;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserFilter: UserFilter;
  timestamptz: ResolverTypeWrapper<Scalars['timestamptz']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthResponse: AuthResponse;
  Boolean: Scalars['Boolean']['output'];
  CharacterSheet: CharacterSheet;
  CharacterSheetTemplate: CharacterSheetTemplate;
  CharacterStat: CharacterStat;
  Game: Game;
  GameEvent: GameEvent;
  GameEventInput: GameEventInput;
  GameEventParticipation: GameEventParticipation;
  GameHistory: GameHistory;
  GameHistoryInput: GameHistoryInput;
  GameInput: GameInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Pagination: Pagination;
  Query: {};
  String: Scalars['String']['output'];
  User: User;
  UserFilter: UserFilter;
  timestamptz: Scalars['timestamptz']['output'];
}>;

export type AuthResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CharacterSheetResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CharacterSheet'] = ResolversParentTypes['CharacterSheet']> = ResolversObject<{
  characterStats?: Resolver<Maybe<Array<ResolversTypes['CharacterStat']>>, ParentType, ContextType>;
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>;
  gameId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CharacterSheetTemplateResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CharacterSheetTemplate'] = ResolversParentTypes['CharacterSheetTemplate']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  template?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CharacterStatResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CharacterStat'] = ResolversParentTypes['CharacterStat']> = ResolversObject<{
  characterSheet?: Resolver<Maybe<ResolversTypes['CharacterSheet']>, ParentType, ContextType>;
  characterSheetId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = ResolversObject<{
  admin?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  adminId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  characters?: Resolver<Maybe<Array<ResolversTypes['CharacterSheet']>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rpgInfo?: Resolver<Maybe<ResolversTypes['CharacterSheetTemplate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GameEvent'] = ResolversParentTypes['GameEvent']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>;
  gameId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  participations?: Resolver<Maybe<Array<ResolversTypes['GameEventParticipation']>>, ParentType, ContextType>;
  startAt?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameEventParticipationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GameEventParticipation'] = ResolversParentTypes['GameEventParticipation']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  response?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameHistoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GameHistory'] = ResolversParentTypes['GameHistory']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>;
  gameId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createCharacterSheetTemplate?: Resolver<ResolversTypes['CharacterSheetTemplate'], ParentType, ContextType, RequireFields<MutationCreateCharacterSheetTemplateArgs, 'description' | 'json' | 'name'>>;
  createEvent?: Resolver<ResolversTypes['GameEvent'], ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'event'>>;
  createGame?: Resolver<ResolversTypes['Game'], ParentType, ContextType, RequireFields<MutationCreateGameArgs, 'game'>>;
  createHistory?: Resolver<ResolversTypes['GameHistory'], ParentType, ContextType, RequireFields<MutationCreateHistoryArgs, 'history'>>;
  inviteUserToGame?: Resolver<ResolversTypes['CharacterSheet'], ParentType, ContextType, RequireFields<MutationInviteUserToGameArgs, 'gameId' | 'userId'>>;
  login?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  participateToEvent?: Resolver<ResolversTypes['GameEvent'], ParentType, ContextType, RequireFields<MutationParticipateToEventArgs, 'gameEventId' | 'response'>>;
  register?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'name' | 'password'>>;
  removeUserFromGame?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveUserFromGameArgs, 'gameId' | 'userId'>>;
  updateValueOfCharacterSheet?: Resolver<ResolversTypes['CharacterStat'], ParentType, ContextType, RequireFields<MutationUpdateValueOfCharacterSheetArgs, 'characterSheetId' | 'key' | 'value'>>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  auth?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  characterSheet?: Resolver<ResolversTypes['CharacterSheet'], ParentType, ContextType, RequireFields<QueryCharacterSheetArgs, 'characterSheetId'>>;
  characterSheetTemplate?: Resolver<ResolversTypes['CharacterSheetTemplate'], ParentType, ContextType, RequireFields<QueryCharacterSheetTemplateArgs, 'characterSheetTemplateId'>>;
  characterSheetTemplates?: Resolver<Maybe<Array<ResolversTypes['CharacterSheetTemplate']>>, ParentType, ContextType>;
  event?: Resolver<ResolversTypes['GameEvent'], ParentType, ContextType, RequireFields<QueryEventArgs, 'eventId'>>;
  events?: Resolver<Maybe<Array<ResolversTypes['GameEvent']>>, ParentType, ContextType, RequireFields<QueryEventsArgs, 'gameId' | 'page'>>;
  game?: Resolver<ResolversTypes['Game'], ParentType, ContextType, RequireFields<QueryGameArgs, 'gameId'>>;
  histories?: Resolver<Maybe<Array<ResolversTypes['GameHistory']>>, ParentType, ContextType, RequireFields<QueryHistoriesArgs, 'gameId' | 'page'>>;
  history?: Resolver<ResolversTypes['GameHistory'], ParentType, ContextType, RequireFields<QueryHistoryArgs, 'historyId'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  myGames?: Resolver<Maybe<Array<ResolversTypes['Game']>>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<QueryUsersArgs, 'page'>>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  administratedGames?: Resolver<Maybe<Array<ResolversTypes['Game']>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  games?: Resolver<Maybe<Array<ResolversTypes['CharacterSheet']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimestamptzScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['timestamptz'], any> {
  name: 'timestamptz';
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  AuthResponse?: AuthResponseResolvers<ContextType>;
  CharacterSheet?: CharacterSheetResolvers<ContextType>;
  CharacterSheetTemplate?: CharacterSheetTemplateResolvers<ContextType>;
  CharacterStat?: CharacterStatResolvers<ContextType>;
  Game?: GameResolvers<ContextType>;
  GameEvent?: GameEventResolvers<ContextType>;
  GameEventParticipation?: GameEventParticipationResolvers<ContextType>;
  GameHistory?: GameHistoryResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  timestamptz?: GraphQLScalarType;
}>;

