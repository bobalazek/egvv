import slugify from 'slugify';
import { Prisma, PrismaClient } from '@prisma/client';

import { EventRaceInterface, EventRaceResultInterface, EventWithSessionsInterface } from './Interfaces';

let prismaClient: PrismaClient = null;
export const getPrismaClient = () => {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }

  return prismaClient;
};

export const saveEvent = async (eventRawData: EventWithSessionsInterface, seasonSlug: string) => {
  console.log(`Saving ${eventRawData.slug} event ...`);

  const prisma = getPrismaClient();

  let raceAt: Date;
  for (const eventSessionData of eventRawData.sessions) {
    if (eventSessionData.type === 'race') {
      raceAt = eventSessionData.startAt;
      break;
    }
  }

  if (!raceAt) {
    console.error(`Could not find raceAt for "${eventRawData.name}"`);

    process.exit(1);
  }

  const season = await prisma.season.findFirst({
    where: {
      slug: seasonSlug,
    },
  });
  if (!season) {
    console.error(`Season "${seasonSlug}" not found`);

    process.exit(1);
  }

  const circuit = await prisma.circuit.findFirst({
    where: {
      name: eventRawData.circuitName,
    },
  });
  if (!circuit) {
    console.error(`Circuit "${eventRawData.circuitName}" not found`);

    process.exit(1);
  }

  const finalData: Prisma.EventUncheckedCreateInput = {
    name: eventRawData.name,
    slug: eventRawData.slug,
    laps: eventRawData.laps,
    lapDistance: eventRawData.lapDistance,
    round: eventRawData.round,
    raceAt,
    url: eventRawData.url,
    circuitLayout: eventRawData.circuitLayout,
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

  console.log(`===== Event sessions for ${event.slug} =====`);

  for (const eventSessionData of eventRawData.sessions) {
    console.log(`Upserting ${eventSessionData.type} ...`);

    const eventSessionFinalData: Prisma.EventSessionUncheckedCreateInput = {
      slug: slugify(eventSessionData.name.replace(' - ', '-'), {
        lower: true,
      }),
      name: eventSessionData.name,
      type: eventSessionData.type,
      startAt: eventSessionData.startAt,
      endAt: eventSessionData.endAt,
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

  return event;
};

export const saveEventRaceResults = async (
  eventRace: EventRaceInterface,
  eventRaceResults: EventRaceResultInterface[],
  year: number
) => {
  console.log(`Saving ${eventRace.name} event race results ...`);

  const prisma = getPrismaClient();

  const eventRaceSession = await prisma.eventSession.findFirst({
    where: {
      type: 'race',
      name: {
        contains: eventRace.name,
        mode: 'insensitive',
      },
      event: {
        laps: eventRace.laps,
        season: {
          year,
        },
      },
    },
  });
  if (!eventRaceSession) {
    throw new Error(`Event race session for ${eventRace.name} not found.`);
  }

  for (const eventRaceResult of eventRaceResults) {
    const eventSessionDriver = await prisma.eventSessionDriver.findFirst({
      where: {
        eventSessionId: eventRaceSession.id,
        seasonDriver: {
          code: eventRaceResult.driverCode,
          number: eventRaceResult.driverNumber,
        },
      },
    });
    if (!eventSessionDriver) {
      throw new Error(`Event session driver ${eventRaceResult.driverCode} for ${eventRace.name} not found.`);
    }

    console.log(`Removing existing race result for ${eventRaceResult.driverCode} ...`);
    await prisma.eventSessionDriverClassification.deleteMany({
      where: {
        eventSessionDriverId: eventSessionDriver.id,
      },
    });

    console.log(`Creating race result for ${eventRaceResult.driverCode} ...`);

    const finalData = {
      status: eventRaceResult.status,
      position: eventRaceResult.position,
      timeMilliseconds: eventRaceResult.timeMilliseconds,
      laps: eventRaceResult.laps,
      lapsBehind: eventRaceResult.lapsBehind,
      points: eventRaceResult.points,
      eventSessionDriverId: eventSessionDriver.id,
    };

    await prisma.eventSessionDriverClassification.create({
      data: finalData,
    });
  }
};

export const exportData = async (seasonSlug: string) => {
  const prisma = getPrismaClient();
  const eventsData = (
    await prisma.event.findMany({
      where: {
        season: {
          slug: seasonSlug,
        },
      },
      include: {
        circuit: true,
        eventSessions: true,
      },
      orderBy: {
        round: 'asc',
      },
    })
  ).map((event) => {
    return {
      name: event.name,
      slug: event.slug,
      laps: event.laps,
      lapDistance: event.lapDistance,
      round: event.round,
      raceAt: event.raceAt.toISOString(),
      url: event.url,
      circuitLayout: event.circuitLayout,
      circuitSlug: event.circuit.slug,
      sessions: event.eventSessions.map((eventSession) => {
        return {
          name: eventSession.name,
          type: eventSession.type,
          startAt: eventSession.startAt.toISOString(),
          endAt: eventSession.endAt.toISOString(),
        };
      }),
    };
  });

  console.log(JSON.stringify(eventsData));
};

export const convertTimeToMilliseconds = (time: string): number => {
  if (!time) {
    return 0;
  }

  const timeDotSplit = time.split('.');
  const timeCommaSplit = time.split(':');

  return (
    parseInt(timeDotSplit[1]) +
    parseInt(timeCommaSplit[2]) * 1000 +
    parseInt(timeCommaSplit[1]) * 60 * 1000 +
    parseInt(timeCommaSplit[0]) * 60 * 60 * 1000
  );
};
