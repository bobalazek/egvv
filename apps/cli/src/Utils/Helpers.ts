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

export const saveEvent = async (eventData: EventWithSessionsInterface, seasonSlug: string) => {
  console.log(`Saving ${eventData.slug} event ...`);

  const prisma = getPrismaClient();

  let raceAt: Date;
  for (const eventSessionData of eventData.sessions) {
    if (eventSessionData.type === 'race') {
      raceAt = eventSessionData.startAt;
      break;
    }
  }

  if (!raceAt) {
    console.error(`Could not find raceAt for "${eventData.name}"`);

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
      name: eventData.circuitName,
    },
  });
  if (!circuit) {
    console.error(`Circuit "${eventData.circuitName}" not found`);

    process.exit(1);
  }

  const finalData: Prisma.EventUncheckedCreateInput = {
    name: eventData.name,
    fullName: eventData.fullName,
    slug: eventData.slug,
    laps: eventData.laps,
    lapDistance: eventData.lapDistance,
    round: eventData.round,
    raceAt,
    url: eventData.url,
    circuitLayout: eventData.circuitLayout,
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

  for (const eventSessionData of eventData.sessions) {
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
  seasonSlug: string,
  year: number
) => {
  console.log(`Saving ${eventRace.name} event race results ...`);

  const prisma = getPrismaClient();

  const eventRaceSession = await prisma.eventSession.findFirst({
    where: {
      type: 'race',
      event: {
        round: eventRace.round,
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
    let eventSessionDriver = await prisma.eventSessionDriver.findFirst({
      where: {
        eventSessionId: eventRaceSession.id,
        seasonDriver: {
          code: eventRaceResult.driverCode,
          // number: eventRaceResult.driverNumber, // There are situations where multiple drivers could have the same number, per season?
        },
      },
    });
    if (!eventSessionDriver) {
      const seasonDriver = await prisma.seasonDriver.findFirst({
        where: {
          code: eventRaceResult.driverCode,
          number: eventRaceResult.driverNumber,
          seasonTeam: {
            season: {
              slug: seasonSlug,
            },
          },
        },
      });
      if (!seasonDriver) {
        throw new Error(`Season driver ${eventRaceResult.driverCode} (${eventRaceResult.driverNumber}) not found.`);
      }

      eventSessionDriver = await prisma.eventSessionDriver.create({
        data: {
          eventSessionId: eventRaceSession.id,
          seasonDriverId: seasonDriver.id,
          number: eventRaceResult.driverNumber,
        },
      });
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

export const exportEventData = async (seasonSlug: string) => {
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
        eventSessions: {
          orderBy: [
            {
              startAt: 'asc',
            },
            {
              name: 'asc',
            },
          ],
        },
      },
      orderBy: {
        round: 'asc',
      },
    })
  ).map((event) => {
    return {
      name: event.name,
      fullName: event.fullName,
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
