-- CreateTable
CREATE TABLE "Series" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3),
    "seriesId" TEXT NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Circuit" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locationLatitude" DOUBLE PRECISION,
    "locationLongitude" DOUBLE PRECISION,
    "countryCode" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Circuit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "debutAt" TIMESTAMP(3) NOT NULL,
    "defunctAt" TIMESTAMP(3),
    "predecessorTeamId" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonTeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "powerUnit" TEXT NOT NULL,
    "chassis" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "SeasonTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonDriver" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "isTemporary" BOOLEAN NOT NULL DEFAULT false,
    "seasonTeamId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,

    CONSTRAINT "SeasonDriver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonTeamStandingEntry" (
    "id" TEXT NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "dateAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "seasonTeamId" TEXT NOT NULL,
    "eventSessionId" TEXT,

    CONSTRAINT "SeasonTeamStandingEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonDriverStandingEntry" (
    "id" TEXT NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "dateAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "seasonDriverId" TEXT NOT NULL,
    "eventSessionId" TEXT,

    CONSTRAINT "SeasonDriverStandingEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "round" INTEGER NOT NULL,
    "laps" INTEGER NOT NULL,
    "lapDistance" DOUBLE PRECISION NOT NULL,
    "raceAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "circuitLayout" TEXT,
    "seasonId" TEXT NOT NULL,
    "circuitId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSession" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tyreChoices" JSONB,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3),
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSessionDriver" (
    "id" TEXT NOT NULL,
    "number" INTEGER,
    "eventSessionId" TEXT NOT NULL,
    "seasonDriverId" TEXT NOT NULL,

    CONSTRAINT "EventSessionDriver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSessionDriverLap" (
    "id" TEXT NOT NULL,
    "lap" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "time" TIMESTAMP(3),
    "position" INTEGER,
    "eventSessionDriverId" TEXT NOT NULL,

    CONSTRAINT "EventSessionDriverLap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSessionDriverPitStop" (
    "id" TEXT NOT NULL,
    "lap" INTEGER NOT NULL,
    "timeMilliseconds" INTEGER,
    "eventSessionDriverId" TEXT NOT NULL,

    CONSTRAINT "EventSessionDriverPitStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSessionDriverStartingGrid" (
    "id" TEXT NOT NULL,
    "position" INTEGER,
    "time" TIMESTAMP(3),
    "note" TEXT,
    "eventSessionDriverId" TEXT NOT NULL,

    CONSTRAINT "EventSessionDriverStartingGrid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSessionDriverClassification" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "position" INTEGER,
    "time" TIMESTAMP(3),
    "points" DOUBLE PRECISION,
    "note" TEXT,
    "eventSessionDriverId" TEXT NOT NULL,

    CONSTRAINT "EventSessionDriverClassification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "roles" JSONB NOT NULL DEFAULT '[]',
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Series_slug_key" ON "Series"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Season_slug_key" ON "Season"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Circuit_slug_key" ON "Circuit"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_slug_key" ON "Driver"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Team_slug_key" ON "Team"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Team_predecessorTeamId_key" ON "Team"("predecessorTeamId");

-- CreateIndex
CREATE UNIQUE INDEX "SeasonTeam_seasonId_teamId_key" ON "SeasonTeam"("seasonId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "SeasonDriver_seasonTeamId_driverId_key" ON "SeasonDriver"("seasonTeamId", "driverId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventSession_slug_key" ON "EventSession"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventSession_eventId_type_key" ON "EventSession"("eventId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_predecessorTeamId_fkey" FOREIGN KEY ("predecessorTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTeam" ADD CONSTRAINT "SeasonTeam_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTeam" ADD CONSTRAINT "SeasonTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonDriver" ADD CONSTRAINT "SeasonDriver_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonDriver" ADD CONSTRAINT "SeasonDriver_seasonTeamId_fkey" FOREIGN KEY ("seasonTeamId") REFERENCES "SeasonTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTeamStandingEntry" ADD CONSTRAINT "SeasonTeamStandingEntry_seasonTeamId_fkey" FOREIGN KEY ("seasonTeamId") REFERENCES "SeasonTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTeamStandingEntry" ADD CONSTRAINT "SeasonTeamStandingEntry_eventSessionId_fkey" FOREIGN KEY ("eventSessionId") REFERENCES "EventSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonDriverStandingEntry" ADD CONSTRAINT "SeasonDriverStandingEntry_seasonDriverId_fkey" FOREIGN KEY ("seasonDriverId") REFERENCES "SeasonDriver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonDriverStandingEntry" ADD CONSTRAINT "SeasonDriverStandingEntry_eventSessionId_fkey" FOREIGN KEY ("eventSessionId") REFERENCES "EventSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_circuitId_fkey" FOREIGN KEY ("circuitId") REFERENCES "Circuit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSession" ADD CONSTRAINT "EventSession_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSessionDriver" ADD CONSTRAINT "EventSessionDriver_seasonDriverId_fkey" FOREIGN KEY ("seasonDriverId") REFERENCES "SeasonDriver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSessionDriver" ADD CONSTRAINT "EventSessionDriver_eventSessionId_fkey" FOREIGN KEY ("eventSessionId") REFERENCES "EventSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSessionDriverLap" ADD CONSTRAINT "EventSessionDriverLap_eventSessionDriverId_fkey" FOREIGN KEY ("eventSessionDriverId") REFERENCES "EventSessionDriver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSessionDriverPitStop" ADD CONSTRAINT "EventSessionDriverPitStop_eventSessionDriverId_fkey" FOREIGN KEY ("eventSessionDriverId") REFERENCES "EventSessionDriver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSessionDriverStartingGrid" ADD CONSTRAINT "EventSessionDriverStartingGrid_eventSessionDriverId_fkey" FOREIGN KEY ("eventSessionDriverId") REFERENCES "EventSessionDriver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSessionDriverClassification" ADD CONSTRAINT "EventSessionDriverClassification_eventSessionDriverId_fkey" FOREIGN KEY ("eventSessionDriverId") REFERENCES "EventSessionDriver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
