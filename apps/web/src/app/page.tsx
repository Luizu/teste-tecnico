import { productService } from '@/services/product.service';
import { ProductCard } from '@/ui/pages/home/components/product-card';

export const revalidate = 60;

export default async function Home() {
  const products = await productService.findAll();

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            Nenhum produto disponível
          </h2>
          <p className="text-gray-500">
            Não há produtos cadastrados no momento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
