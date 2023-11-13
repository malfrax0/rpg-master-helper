-- CreateEnum
CREATE TYPE "GameEventResponse" AS ENUM ('PARTICIPATE', 'MAYBE', 'CANNOT');

-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Game" (
    "_id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rpgInfoId" TEXT NOT NULL,
    "isPlaying" BOOLEAN NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "GameHistory" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "GameHistory_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "GameEvent" (
    "_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "GameEvent_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "GameEventParticipation" (
    "_id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "response" "GameEventResponse" NOT NULL DEFAULT 'MAYBE',

    CONSTRAINT "GameEventParticipation_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "CharacterSheet" (
    "_id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CharacterSheet_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "CharacterStat" (
    "_id" TEXT NOT NULL,
    "characterSheetId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CharacterStat_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "CharacterSheetTemplate" (
    "_id" TEXT NOT NULL,
    "template" JSONB NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "CharacterSheetTemplate_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GameEventParticipation_eventId_userId_key" ON "GameEventParticipation"("eventId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterSheet_gameId_userId_key" ON "CharacterSheet"("gameId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterStat_key_characterSheetId_key" ON "CharacterStat"("key", "characterSheetId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_rpgInfoId_fkey" FOREIGN KEY ("rpgInfoId") REFERENCES "CharacterSheetTemplate"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameHistory" ADD CONSTRAINT "GameHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameHistory" ADD CONSTRAINT "GameHistory_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameEvent" ADD CONSTRAINT "GameEvent_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameEventParticipation" ADD CONSTRAINT "GameEventParticipation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "GameEvent"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameEventParticipation" ADD CONSTRAINT "GameEventParticipation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSheet" ADD CONSTRAINT "CharacterSheet_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSheet" ADD CONSTRAINT "CharacterSheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterStat" ADD CONSTRAINT "CharacterStat_characterSheetId_fkey" FOREIGN KEY ("characterSheetId") REFERENCES "CharacterSheet"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
