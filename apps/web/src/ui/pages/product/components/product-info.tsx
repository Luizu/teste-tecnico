import { Product } from '@/types/product';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const formatPrice = (price: number) => {
    return price.toFixed(2).replace('.', ',');
  };

  const calculateDiscount = () => {
    if (!product.promotionalPrice) return 0;
    return Math.round(
      ((product.price - product.promotionalPrice) / product.price) * 100,
    );
  };

  const getStockMessage = (stock: number) => {
    if (stock === 0) {
      return { text: 'Produto esgotado', color: 'text-red-600' };
    }
    if (stock === 1) {
      return {
        text: 'Última unidade disponível',
        color: 'text-orange-600',
      };
    }
    if (stock <= 5) {
      return {
        text: `Últimas ${stock} unidades disponíveis`,
        color: 'text-orange-600',
      };
    }
    return {
      text: `${stock} unidades disponíveis`,
      color: 'text-green-600',
    };
  };

  const stockInfo = getStockMessage(product.stock);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {product.name}
        </h1>

        <div className="flex items-center gap-3 flex-wrap">
          {product.promotionalPrice ? (
            <>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl text-gray-500 line-through">
                  R$ {formatPrice(product.price)}
                </span>
                <span className="text-4xl font-bold text-green-600">
                  R$ {formatPrice(product.promotionalPrice)}
                </span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                {calculateDiscount()}% OFF
              </span>
            </>
          ) : (
            <span className="text-4xl font-bold text-gray-900">
              R$ {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-b border-gray-200 py-4">
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      <div>
        <p className={`text-sm font-semibold ${stockInfo.color}`}>
          {stockInfo.text}
        </p>
      </div>
    </div>
  );
};
