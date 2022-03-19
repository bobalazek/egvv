-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "seriesId" INTEGER NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Circuit" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Circuit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationalityCountryCode" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseCountryCode" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "debutAt" TIMESTAMP(3) NOT NULL,
    "defunctAt" TIMESTAMP(3),
    "predecessorTeamId" INTEGER,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "powerUnit" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonTeam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "powerUnit" TEXT NOT NULL,
    "isDefunct" BOOLEAN NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "SeasonTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonTeamPointStandingsEntry" (
    "id" SERIAL NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "seasonTeamId" INTEGER NOT NULL,
    "eventSessionId" INTEGER,

    CONSTRAINT "SeasonTeamPointStandingsEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonTeamDriver" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "isTemporary" BOOLEAN NOT NULL,
    "seasonTeamId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,

    CONSTRAINT "SeasonTeamDriver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonTeamDriverStandingsEntry" (
    "id" SERIAL NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "seasonTeamDriverId" INTEGER NOT NULL,
    "eventSessionId" INTEGER,

    CONSTRAINT "SeasonTeamDriverStandingsEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "round" INTEGER NOT NULL,
    "laps" INTEGER NOT NULL,
    "lapDistance" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "url" TEXT,
    "location" TEXT,
    "locationLatitude" DOUBLE PRECISION,
    "locationLongitude" DOUBLE PRECISION,
    "circuitId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSession" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "EventSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSessionTeamDriver" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "eventSessionId" INTEGER NOT NULL,
    "seasonTeamDriverId" INTEGER NOT NULL,
    "vehicleId" INTEGER,

    CONSTRAINT "EventSessionTeamDriver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSessionTeamDriverLap" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3),
    "position" INTEGER,
    "eventSessionTeamDriverId" INTEGER NOT NULL,

    CONSTRAINT "EventSessionTeamDriverLap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSessionTeamDriverStartingGrid" (
    "id" SERIAL NOT NULL,
    "position" INTEGER,
    "time" TIMESTAMP(3),
    "note" TEXT,
    "eventSessionTeamDriverId" INTEGER NOT NULL,

    CONSTRAINT "EventSessionTeamDriverStartingGrid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSessionTeamDriverClassification" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "position" INTEGER,
    "time" TIMESTAMP(3),
    "points" DOUBLE PRECISION,
    "note" TEXT,
    "eventSessionTeamDriverId" INTEGER NOT NULL,

    CONSTRAINT "EventSessionTeamDriverClassification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_predecessorTeamId_key" ON "Team"("predecessorTeamId");

-- CreateIndex
CREATE UNIQUE INDEX "SeasonTeam_vehicleId_key" ON "SeasonTeam"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "EventSessionTeamDriver_vehicleId_key" ON "EventSessionTeamDriver"("vehicleId");

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_predecessorTeamId_fkey" FOREIGN KEY ("predecessorTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTeam" ADD CONSTRAINT "SeasonTeam_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTeam" ADD CONSTRAINT "SeasonTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTeam" ADD CONSTRAINT "SeasonTeam_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTeamPointStandingsEntry" ADD CONSTRAINT "SeasonTeamPointStandingsEntry_seasonTeamId_fkey" FOREIGN KEY ("seasonTeamId") REFERENCES "SeasonTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTeamPointStandingsEntry" ADD CONSTRAINT "SeasonTeamPointStandingsEntry_eventSessionId_fkey" FOREIGN KEY ("eventSessionId") REFERENCES "EventSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTeamDriver" ADD CONSTRAINT "SeasonTeamDriver_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTeamDriver" ADD CONSTRAINT "SeasonTeamDriver_seasonTeamId_fkey" FOREIGN KEY ("seasonTeamId") REFERENCES "SeasonTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTeamDriverStandingsEntry" ADD CONSTRAINT "SeasonTeamDriverStandingsEntry_seasonTeamDriverId_fkey" FOREIGN KEY ("seasonTeamDriverId") REFERENCES "SeasonTeamDriver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTeamDriverStandingsEntry" ADD CONSTRAINT "SeasonTeamDriverStandingsEntry_eventSessionId_fkey" FOREIGN KEY ("eventSessionId") REFERENCES "EventSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_circuitId_fkey" FOREIGN KEY ("circuitId") REFERENCES "Circuit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSession" ADD CONSTRAINT "EventSession_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSessionTeamDriver" ADD CONSTRAINT "EventSessionTeamDriver_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSessionTeamDriver" ADD CONSTRAINT "EventSessionTeamDriver_seasonTeamDriverId_fkey" FOREIGN KEY ("seasonTeamDriverId") REFERENCES "SeasonTeamDriver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSessionTeamDriver" ADD CONSTRAINT "EventSessionTeamDriver_eventSessionId_fkey" FOREIGN KEY ("eventSessionId") REFERENCES "EventSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSessionTeamDriverLap" ADD CONSTRAINT "EventSessionTeamDriverLap_eventSessionTeamDriverId_fkey" FOREIGN KEY ("eventSessionTeamDriverId") REFERENCES "EventSessionTeamDriver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSessionTeamDriverStartingGrid" ADD CONSTRAINT "EventSessionTeamDriverStartingGrid_eventSessionTeamDriverI_fkey" FOREIGN KEY ("eventSessionTeamDriverId") REFERENCES "EventSessionTeamDriver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSessionTeamDriverClassification" ADD CONSTRAINT "EventSessionTeamDriverClassification_eventSessionTeamDrive_fkey" FOREIGN KEY ("eventSessionTeamDriverId") REFERENCES "EventSessionTeamDriver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
