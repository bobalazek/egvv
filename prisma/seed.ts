import { PrismaClient } from '@prisma/client';

import series from './data/series';
import seasons from './data/seasons';

const prisma = new PrismaClient();

async function main() {
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

    let finalData = { slug: data.slug, name: data.name, seriesId: series.id };

    await prisma.season.upsert({
      where: {
        slug: data.slug,
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
