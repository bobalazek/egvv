import { Prisma, PrismaClient } from '@prisma/client';
import slugify from 'slugify';

import users from './data/users';
import circuits from './data/circuits';
import series from './data/series';
import seasons from './data/seasons';
import teams from './data/teams';
import drivers from './data/drivers';
import events from './data/events';
import seasonTeams from './data/season-teams';
import seasonDrivers from './data/season-drivers';

const prisma = new PrismaClient();

async function main() {
  console.log('========== Users ==========');
  for (const data of users) {
    console.log(`Upserting "${data.username}" ...`);

    await prisma.user.upsert({
      where: {
        username: data.username,
      },
      update: data,
      create: data,
    });
  }

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
      throw new Error(`Series "${data.seriesSlug}" not found`);
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

  console.log('========== Season teams ==========');
  for (const data of seasonTeams) {
    console.log(`Upserting "${data.name}" ...`);

    const season = await prisma.season.findFirst({
      where: {
        slug: data.seasonSlug,
      },
    });
    if (!season) {
      throw new Error(`Season "${data.seasonSlug}" not found`);
    }

    const team = await prisma.team.findFirst({
      where: {
        slug: data.teamSlug,
      },
    });
    if (!team) {
      throw new Error(`Team "${data.teamSlug}" not found`);
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

  console.log('========== Season drivers ==========');
  for (const data of seasonDrivers) {
    console.log(`Upserting "${data.code}" ...`);

    const season = await prisma.season.findFirst({
      where: {
        slug: data.seasonSlug,
      },
    });
    if (!season) {
      throw new Error(`Season "${data.seasonSlug}" not found`);
    }

    const team = await prisma.team.findFirst({
      where: {
        slug: data.teamSlug,
      },
    });
    if (!team) {
      throw new Error(`Team "${data.teamSlug}" not found`);
    }

    const seasonTeam = await prisma.seasonTeam.findFirst({
      where: {
        seasonId: season.id,
        teamId: team.id,
      },
    });
    if (!seasonTeam) {
      throw new Error(`Season team "${data.teamSlug}" not found`);
    }

    const driver = await prisma.driver.findFirst({
      where: {
        slug: data.driverSlug,
      },
    });
    if (!driver) {
      throw new Error(`Driver "${data.driverSlug}" not found`);
    }

    const finalData = {
      number: data.number,
      code: data.code,
      seasonTeamId: seasonTeam.id,
      driverId: driver.id,
      isTemporary: (<any>data).isTemporary ?? false,
    };

    await prisma.seasonDriver.upsert({
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

  console.log('========== Events ==========');
  for (const data of events) {
    console.log(`Upserting "${data.slug}" ...`);

    const season = await prisma.season.findFirst({
      where: {
        slug: data.seasonSlug,
      },
    });
    if (!season) {
      throw new Error(`Season "${data.seasonSlug}" not found`);
    }

    const circuit = await prisma.circuit.findFirst({
      where: {
        slug: data.circuitSlug,
      },
    });
    if (!circuit) {
      throw new Error(`Circuit "${data.circuitSlug}" not found`);
    }

    const finalData: Prisma.EventUncheckedCreateInput = {
      name: data.name,
      fullName: data.fullName,
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
          slug: slugify(eventSessionData.name.replace(' - ', '-'), {
            lower: true,
          }),
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
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
