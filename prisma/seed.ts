import { PrismaClient } from '@prisma/client';

import series from './data/series';

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
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
