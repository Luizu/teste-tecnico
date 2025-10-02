'use client';

import { addToCart } from '@/services/cart.service';
import { Button } from '@/ui/components/button';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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
      await addToCart(productId);
      toast.success('Produto adicionado ao carrinho!', {
        description: productName,
      });
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      toast.error('Erro ao adicionar produto ao carrinho');
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
      {isLoading
        ? 'Adicionando...'
        : isOutOfStock
          ? 'Produto Esgotado'
          : 'Adicionar ao Carrinho'}
    </Button>
  );
};
