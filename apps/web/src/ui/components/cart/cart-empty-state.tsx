import { ShoppingCart } from 'lucide-react';

export function CartEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-12">
      <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">Carrinho vazio</h3>
      <p className="text-sm text-gray-500">Adicione produtos ao seu carrinho</p>
    </div>
  );
}
