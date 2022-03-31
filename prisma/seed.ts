import { Prisma, PrismaClient } from '@prisma/client';

import circuits from './data/circuits';
import series from './data/series';
import seasons from './data/seasons';
import teams from './data/teams';
import drivers from './data/drivers';
import events from './data/events';
import seasonTeams from './data/season-teams';
import seasonTeamDrivers from './data/season-team-drivers';

const prisma = new PrismaClient();

async function main() {
  console.log('========== Circuits ==========');
  for (const data of circuits) {
    console.log(`Upserting "${data.slug}" ...`);

    await prisma.circuit.upsert({
      where: {
        slug: data.slug,
      },
      update: data,
      create: data,
    });
  }

  console.log('========== Series ==========');
  for (const data of series) {
    console.log(`Upserting "${data.slug}" ...`);

    await prisma.series.upsert({
      where: {
        slug: data.slug,
      },
      update: data,
      create: data,
    });
  }

  console.log('========== Seasons ==========');
  for (const data of seasons) {
    console.log(`Upserting "${data.slug}" ...`);

    const series = await prisma.series.findFirst({
      where: {
        slug: data.seriesSlug,
      },
    });
    if (!series) {
      console.error(`Series "${data.seriesSlug}" not found`);

      process.exit(1);
    }

    const finalData: Prisma.SeasonUncheckedCreateInput = {
      slug: data.slug,
      name: data.name,
      year: data.year,
      startAt: new Date(data.startAt),
      seriesId: series.id,
    };

    await prisma.season.upsert({
      where: {
        slug: data.slug,
      },
      update: finalData,
      create: finalData,
    });
  }

  console.log('========== Teams ==========');
  for (const data of teams) {
    console.log(`Upserting "${data.slug}" ...`);

    const finalData: Prisma.TeamUncheckedCreateInput = {
      ...data,
      debutAt: new Date(data.debutAt),
    };

    await prisma.team.upsert({
      where: {
        slug: data.slug,
      },
      update: finalData,
      create: finalData,
    });
  }

  console.log('========== Drivers ==========');
  for (const data of drivers) {
    console.log(`Upserting "${data.slug}" ...`);

    await prisma.driver.upsert({
      where: {
        slug: data.slug,
      },
      update: data,
      create: data,
    });
  }

  console.log('========== Events ==========');
  for (const data of events) {
    console.log(`Upserting "${data.slug}" ...`);

    const season = await prisma.season.findFirst({
      where: {
        slug: data.seasonSlug,
      },
    });
    if (!season) {
      console.error(`Season "${data.seasonSlug}" not found`);

      process.exit(1);
    }

    const circuit = await prisma.circuit.findFirst({
      where: {
        slug: data.circuitSlug,
      },
    });
    if (!circuit) {
      console.error(`Circuit "${data.circuitSlug}" not found`);

      process.exit(1);
    }

    const finalData: Prisma.EventUncheckedCreateInput = {
      name: data.name,
      slug: data.slug,
      laps: data.laps,
      lapDistance: data.lapDistance,
      round: data.round,
      raceAt: new Date(data.raceAt),
      url: data.url ?? null,
      circuitLayout: data.circuitLayout ?? null,
      seasonId: season.id,
      circuitId: circuit.id,
    };

    const event = await prisma.event.upsert({
      where: {
        slug: finalData.slug,
      },
      update: finalData,
      create: finalData,
    });

    if (data.sessions) {
      console.log(`===== Event sessions for "${event.slug}" =====`);

      for (const eventSessionData of data.sessions) {
        console.log(`Upserting ${eventSessionData.type} ...`);

        const eventSessionFinalData: Prisma.EventSessionUncheckedCreateInput = {
          name: eventSessionData.name,
          type: eventSessionData.type,
          startAt: new Date(eventSessionData.startAt),
          endAt: eventSessionData.endAt ? new Date(eventSessionData.endAt) : null,
          eventId: event.id,
        };

        await prisma.eventSession.upsert({
          where: {
            eventId_type: {
              eventId: eventSessionFinalData.eventId,
              type: eventSessionFinalData.type,
            },
          },
          update: eventSessionFinalData,
          create: eventSessionFinalData,
        });
      }
    }
  }

  console.log('========== Season teams ==========');
  for (const data of seasonTeams) {
    console.log(`Upserting "${data.name}" ...`);

    const season = await prisma.season.findFirst({
      where: {
        slug: data.seasonSlug,
      },
    });
    if (!season) {
      console.error(`Season "${data.seasonSlug}" not found`);

      process.exit(1);
    }

    const team = await prisma.team.findFirst({
      where: {
        slug: data.teamSlug,
      },
    });
    if (!team) {
      console.error(`Team "${data.teamSlug}" not found`);

      process.exit(1);
    }

    const finalData: Prisma.SeasonTeamUncheckedCreateInput = {
      name: data.name,
      shortName: data.shortName,
      powerUnit: data.powerUnit,
      chassis: data.chassis,
      seasonId: season.id,
      teamId: team.id,
    };

    await prisma.seasonTeam.upsert({
      where: {
        seasonId_teamId: {
          seasonId: finalData.seasonId,
          teamId: finalData.teamId,
        },
      },
      update: finalData,
      create: finalData,
    });
  }

  console.log('========== Season team drivers ==========');
  for (const data of seasonTeamDrivers) {
    console.log(`Upserting "${data.code}" ...`);

    const season = await prisma.season.findFirst({
      where: {
        slug: data.seasonSlug,
      },
    });
    if (!season) {
      console.error(`Season "${data.seasonSlug}" not found`);

      process.exit(1);
    }

    const team = await prisma.team.findFirst({
      where: {
        slug: data.teamSlug,
      },
    });
    if (!team) {
      console.error(`Team "${data.teamSlug}" not found`);

      process.exit(1);
    }

    const seasonTeam = await prisma.seasonTeam.findFirst({
      where: {
        seasonId: season.id,
        teamId: team.id,
      },
    });
    if (!seasonTeam) {
      console.error(`Season team "${data.teamSlug}" not found`);

      process.exit(1);
    }

    const driver = await prisma.driver.findFirst({
      where: {
        slug: data.driverSlug,
      },
    });
    if (!driver) {
      console.error(`Driver "${data.driverSlug}" not found`);

      process.exit(1);
    }

    const finalData = {
      number: data.number,
      code: data.code,
      seasonTeamId: seasonTeam.id,
      driverId: driver.id,
      isTemporary: (<any>data).isTemporary ?? false,
    };

    await prisma.seasonTeamDriver.upsert({
      where: {
        seasonTeamId_driverId: {
          seasonTeamId: finalData.seasonTeamId,
          driverId: finalData.driverId,
        },
      },
      update: finalData,
      create: finalData,
    });
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
