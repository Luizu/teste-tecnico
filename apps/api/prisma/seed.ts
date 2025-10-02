import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    name: 'Fone de Ouvido Bluetooth Premium',
    description:
      'Fone de ouvido wireless com cancelamento de ruído ativo, bateria de até 30 horas e som Hi-Fi. Conforto superior para uso prolongado.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    price: Prisma.Decimal(299.9),
    promotionalPrice: Prisma.Decimal(229.9),
    stock: 10,
  },
  {
    name: 'Smartwatch Fitness Pro',
    description:
      'Smartwatch com monitor cardíaco, GPS integrado, resistente à água e bateria de 7 dias. Ideal para esportes e acompanhamento de saúde.',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    price: Prisma.Decimal(399.9),
    stock: 8,
  },
  {
    name: 'Teclado Mecânico RGB',
    description:
      'Teclado mecânico gamer com iluminação RGB personalizável, switches azuis e estrutura em alumínio. Perfeito para gamers e programadores.',
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    price: Prisma.Decimal(189.9),
    stock: 12,
  },
  {
    name: 'Mouse Gamer RGB',
    description:
      'Mouse gamer com iluminação RGB personalizável, sensores ópticos de alta precisão e cabo de 1,8m. Perfeito para gamers e programadores.',
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
    price: Prisma.Decimal(89.9),
    promotionalPrice: Prisma.Decimal(69.9),
    stock: 15,
  },
  {
    name: 'Webcam Full HD',
    description:
      'Webcam Full HD com suporte a 30fps, microfone integrado e ajustes de foco. Ideal para videoconferências e gravações de vídeo.',
    image:
      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80',
    price: Prisma.Decimal(129.9),
    stock: 15,
  },
  {
    name: 'MacBook Pro 16"',
    description:
      'Notebook profissional com chip M3 Pro, 16GB RAM, 512GB SSD e tela Retina de 16 polegadas. Ideal para desenvolvedores e designers.',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    price: Prisma.Decimal(2499.9),
    promotionalPrice: Prisma.Decimal(2199.9),
    stock: 3,
  },
  {
    name: 'iPhone 15 Pro',
    description:
      'Smartphone premium com câmera de 48MP, chip A17 Pro e tela Super Retina XDR de 6.1 polegadas. Performance excepcional.',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
    price: Prisma.Decimal(1299.9),
    stock: 5,
  },
  {
    name: 'Monitor 4K 27"',
    description:
      'Monitor 4K de 27 polegadas com taxa de atualização de 60Hz, cores precisas e design elegante. Perfeito para trabalho e entretenimento.',
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    price: Prisma.Decimal(599.9),
    promotionalPrice: Prisma.Decimal(499.9),
    stock: 7,
  },
  {
    name: 'Tablet iPad Air',
    description:
      'Tablet com chip M2, tela Liquid Retina de 10.9 polegadas e suporte ao Apple Pencil. Ideal para produtividade e criatividade.',
    image:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
    price: Prisma.Decimal(799.9),
    stock: 6,
  },
  {
    name: 'Câmera DSLR Canon',
    description:
      'Câmera DSLR profissional com sensor de 24.2MP, gravação 4K e sistema de foco automático avançado. Para fotógrafos profissionais.',
    image:
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
    price: Prisma.Decimal(1899.9),
    promotionalPrice: Prisma.Decimal(1599.9),
    stock: 2,
  },
  {
    name: 'Console PlayStation 5',
    description:
      'Console de videogame de última geração com SSD ultra-rápido, ray tracing e suporte a jogos 4K. A experiência definitiva em gaming.',
    image:
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80',
    price: Prisma.Decimal(499.9),
    stock: 4,
  },
  {
    name: 'Drone DJI Mini 3',
    description:
      'Drone compacto com câmera 4K, estabilização de 3 eixos e bateria de 38 minutos. Perfeito para fotografia aérea e vídeos.',
    image:
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
    price: Prisma.Decimal(699.9),
    promotionalPrice: Prisma.Decimal(599.9),
    stock: 3,
  },
  {
    name: 'Fone de Ouvido Gamer',
    description:
      'Fone de ouvido gamer com som surround 7.1, microfone retrátil e iluminação RGB. Experiência imersiva para jogos.',
    image:
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
    price: Prisma.Decimal(149.9),
    stock: 12,
  },
  {
    name: 'Smartphone Samsung Galaxy',
    description:
      'Smartphone Android premium com câmera de 108MP, tela AMOLED de 6.8 polegadas e bateria de 5000mAh. Performance e qualidade excepcionais.',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    price: Prisma.Decimal(999.9),
    promotionalPrice: Prisma.Decimal(849.9),
    stock: 8,
  },
  {
    name: 'Notebook Gaming',
    description:
      'Notebook gamer com RTX 4060, Intel i7, 16GB RAM e SSD 1TB. Performance excepcional para jogos e trabalho pesado.',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    price: Prisma.Decimal(1599.9),
    stock: 4,
  },
  {
    name: 'Smart TV 55" 4K',
    description:
      'Smart TV 4K de 55 polegadas com HDR, Android TV e som Dolby Atmos. Experiência cinematográfica em casa.',
    image:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
    price: Prisma.Decimal(899.9),
    promotionalPrice: Prisma.Decimal(749.9),
    stock: 6,
  },
  {
    name: 'Cafeteira Elétrica Premium',
    description:
      'Cafeteira elétrica com moedor integrado, múltiplas opções de preparo e sistema de limpeza automática. Café perfeito todos os dias.',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    price: Prisma.Decimal(299.9),
    stock: 9,
  },
  {
    name: 'Aspirador Robô Inteligente',
    description:
      'Aspirador robô com mapeamento inteligente, controle por app e limpeza automática. Mantenha sua casa sempre limpa.',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    price: Prisma.Decimal(399.9),
    promotionalPrice: Prisma.Decimal(329.9),
    stock: 5,
  },
  {
    name: 'Relógio Inteligente Apple Watch',
    description:
      'Smartwatch com monitor de saúde, GPS, resistente à água e bateria de 18 horas. Seu companheiro ideal para o dia a dia.',
    image:
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80',
    price: Prisma.Decimal(449.9),
    stock: 7,
  },
  {
    name: 'Fone de Ouvido Esportivo',
    description:
      'Fone de ouvido esportivo com cancelamento de ruído, resistente à água e bateria de 8 horas. Ideal para atividades físicas.',
    image:
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80',
    price: Prisma.Decimal(179.9),
    promotionalPrice: Prisma.Decimal(139.9),
    stock: 11,
  },
  {
    name: 'Cadeira Gamer Ergonômica',
    description:
      'Cadeira gamer com suporte lombar, braços ajustáveis e material respirável. Conforto durante longas sessões de trabalho ou jogos.',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    price: Prisma.Decimal(399.9),
    stock: 8,
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
