import { PrismaClient } from "@prisma/client";
import { User } from './generated/graphql';

export interface Context {
    prisma: PrismaClient,
    user?: Partial<User>|null
}