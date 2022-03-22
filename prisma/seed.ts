import { PrismaClient } from '@prisma/client';

import circuits from './data/circuits';
import series from './data/series';
import seasons from './data/seasons';
import teams from './data/teams';
import drivers from './data/drivers';
import events from './data/events';
import seasonTeams from './data/season-teams';

const prisma = new PrismaClient();

async function main() {
  console.log('========== Circuits ==========');
  for (const data of circuits) {
    console.log(`Upserting ${data.slug} ...`);

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
    console.log(`Upserting ${data.slug} ...`);

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
    console.log(`Upserting ${data.slug} ...`);

    const series = await prisma.series.findFirst({
      where: {
        slug: data.seriesSlug,
      },
    });
    if (!series) {
      console.error(`Series ${data.seriesSlug} not found`);

      process.exit(1);
    }

    const finalData = { slug: data.slug, name: data.name, seriesId: series.id };

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
    console.log(`Upserting ${data.slug} ...`);

    const finalData = { ...data, debutAt: new Date(data.debutAt) };

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
    console.log(`Upserting ${data.slug} ...`);

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
    console.log(`Upserting ${data.slug} ...`);

    const season = await prisma.season.findFirst({
      where: {
        slug: data.seasonSlug,
      },
    });
    if (!season) {
      console.error(`Season ${data.seasonSlug} not found`);

      process.exit(1);
    }

    const circuit = await prisma.circuit.findFirst({
      where: {
        slug: data.circuitSlug,
      },
    });
    if (!circuit) {
      console.error(`Circuit ${data.circuitSlug} not found`);

      process.exit(1);
    }

    const finalData = {
      name: data.name,
      slug: data.slug,
      laps: data.laps,
      lapDistance: data.lapDistance,
      round: data.round,
      date: new Date(data.date),
      url: data.url ?? null,
      seasonId: season.id,
      circuitId: circuit.id,
    };

    await prisma.event.upsert({
      where: {
        slug: data.slug,
      },
      update: finalData,
      create: finalData,
    });
  }

  console.log('========== Season teams ==========');
  for (const data of seasonTeams) {
    console.log(`Upserting ${data.name} ...`);

    const season = await prisma.season.findFirst({
      where: {
        slug: data.seasonSlug,
      },
    });
    if (!season) {
      console.error(`Season ${data.seasonSlug} not found`);

      process.exit(1);
    }

    const team = await prisma.team.findFirst({
      where: {
        slug: data.teamSlug,
      },
    });
    if (!team) {
      console.error(`TeamteamSlug ${data.teamSlug} not found`);

      process.exit(1);
    }

    const finalData = {
      name: data.name,
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
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
