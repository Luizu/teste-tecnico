import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    name: 'Fone de Ouvido Bluetooth',
    description:
      'Fone de ouvido wireless com cancelamento de ruído ativo, bateria de até 30 horas e som Hi-Fi. Conforto superior para uso prolongado.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    price: Prisma.Decimal(199.9),
    stock: 10,
  },
  {
    name: 'Smartwatch Fitness Pro',
    description:
      'Smartwatch com monitor cardíaco, GPS integrado, resistente à água e bateria de 7 dias. Ideal para esportes e acompanhamento de saúde.',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    price: Prisma.Decimal(199.9),
    stock: 8,
  },
  {
    name: 'Teclado Mecânico RGB',
    description:
      'Teclado mecânico gamer com iluminação RGB personalizável, switches azuis e estrutura em alumínio. Perfeito para gamers e programadores.',
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    price: Prisma.Decimal(199.9),
    stock: 12,
  },
  {
    name: 'Mouse Gamer RGB',
    description:
      'Mouse gamer com iluminação RGB personalizável, sensores ópticos de alta precisão e cabo de 1,8m. Perfeito para gamers e programadores.',
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
    price: Prisma.Decimal(159.9),
    stock: 15,
  },
  {
    name: 'Webcam Full HD',
    description:
      'Webcam Full HD com suporte a 30fps, microfone integrado e ajustes de foco. Ideal para videoconferências e gravações de vídeo.',
    image:
      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80',
    price: Prisma.Decimal(159.9),
    stock: 15,
  },
];

async function main() {
  console.log('🌱 Starting seed...');

  console.log('🗑️  Cleaning existing products...');
  await prisma.product.deleteMany({});
  console.log('✅ Existing products cleaned');

  console.log('📦 Creating fake products...');

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
