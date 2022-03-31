import { Prisma, PrismaClient } from '@prisma/client';

import { EventWithSessionsInterface } from './Interfaces';

export async function saveEvent(prisma: PrismaClient, eventRawData: EventWithSessionsInterface, seasonSlug: string) {
  console.log(`Saving ${eventRawData.slug} event ...`);

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
    url: eventRawData.url,
    circuitLayout: eventRawData.circuitLayout,
    raceAt,
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
}
