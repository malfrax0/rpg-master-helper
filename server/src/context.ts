import { PrismaClient } from "@prisma/client";
import { User } from './generated/graphql';
import { PubSub } from "graphql-subscriptions";

export interface Context {
    prisma: PrismaClient,
    user?: Partial<User>|null
}

export const pubSub = new PubSub();
