import { productService } from '@/services/product.service';
import { AddToCartButton } from '@/ui/pages/product/components/add-to-cart-button';
import { ProductImage } from '@/ui/pages/product/components/product-image';
import { ProductInfo } from '@/ui/pages/product/components/product-info';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Gera metadata dinâmica para SEO
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await productService.findOne(id);

  if (!product) {
    return {
      title: 'Produto não encontrado',
    };
  }

  return {
    title: `${product.name} | Loja`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export async function generateStaticParams() {
  try {
    const products = await productService.findAll({ revalidate: false });
    return products.map((product) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

/**
 * Revalidação incremental a cada 60 segundos
 */
export const revalidate = 60;

/**
 * Página de detalhes do produto
 * Usa SSG com ISR (Incremental Static Regeneration)
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await productService.findOne(id, {
    revalidate: 60,
    tags: ['products', `product-${id}`],
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Imagem do produto */}
          <div className="w-full">
            <ProductImage src={product.image} alt={product.name} />
          </div>

          {/* Informações do produto */}
          <div className="flex flex-col justify-between">
            <ProductInfo product={product} />

            {/* Botão de adicionar ao carrinho */}
            <div className="mt-8">
              <AddToCartButton
                productId={product.id}
                productName={product.name}
                isOutOfStock={product.stock === 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
