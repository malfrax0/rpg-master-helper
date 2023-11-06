import { PrismaClient } from "@prisma/client";
import { User } from './generated/graphql';
import { PubSub } from "graphql-subscriptions";
import { JwtPayload } from "jsonwebtoken";

export interface Context {
    prisma: PrismaClient,
    user?: Partial<JwtPayload>|null
}

export const pubSub = new PubSub();
