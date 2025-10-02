'use client';

import { Button } from '@/ui/components/button';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  isOutOfStock: boolean;
}

export const AddToCartButton = ({
  productId,
  productName,
  isOutOfStock,
}: AddToCartButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      console.log('Adding to cart:', { productId, productName });
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isOutOfStock || isLoading}
      className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
    >
      <ShoppingCart className="mr-2 h-6 w-6" />
      {isOutOfStock ? 'Produto Esgotado' : 'Adicionar ao Carrinho'}
    </Button>
  );
};
