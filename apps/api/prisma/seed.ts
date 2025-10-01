import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { createClient } from 'pexels';

const prisma = new PrismaClient();

const pexelsApiKey = process.env.PEXELS_API_KEY;
if (!pexelsApiKey) {
  throw new Error('PEXELS_API_KEY is not defined in .env file');
}
const pexelsClient = createClient(pexelsApiKey);

async function main() {
  console.log('🌱 Starting seed...');

  console.log('🗑️  Cleaning existing products...');
  await prisma.product.deleteMany({});
  console.log('✅ Existing products cleaned');

  console.log('📦 Creating fake products...');
  const products = await Promise.all(
    Array.from({ length: 25 }, async () => {
      const product = faker.commerce.product();

      let imageUrl = `https://picsum.photos/640/480`;

      try {
        const response = await pexelsClient.photos.search({
          query: product,
          per_page: 1,
        });

        if ('photos' in response && response.photos.length > 0) {
          imageUrl = response.photos[0].src.medium;
        }
      } catch (error) {
        console.error(error);
        console.warn(
          `⚠️  Failed to fetch image for ${product}, using fallback`,
        );
      }

      return {
        name: product,
        description: faker.commerce.productDescription(),
        image: imageUrl,
        quantity: faker.number.int({ min: 0, max: 100 }),
        price: faker.commerce.price({ min: 10, max: 5000, dec: 2 }),
      };
    }),
  );

  const result = await prisma.product.createMany({
    data: products,
  });

  console.log(`✅ ${result.count} products created successfully!`);

  console.log('\n🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
