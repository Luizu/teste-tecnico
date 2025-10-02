'use client';

import { useCart } from '@/contexts/cart-context';
import { addToCart, getCartWithProducts } from '@/services/cart.service';
import { Product } from '@/types/product';
import { Button } from '@/ui/components/button';
import { Card } from '@/ui/components/card';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    try {
      await addToCart(product.id);
      toast.success('Produto adicionado ao carrinho!', {
        description: product.name,
      });

      // Atualizar o contexto do carrinho
      const updatedCart = await getCartWithProducts();
      setCart(updatedCart);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      toast.error('Erro ao adicionar produto ao carrinho');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
      <Link href={`/product/${product.id}`} className="block relative">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-6 space-y-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-base hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        <div className="flex flex-col gap-1">
          <span className="text-3xl font-bold text-gray-900">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full h-12 text-base font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          disabled={product.stock === 0 || isLoading}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {isLoading
            ? 'Adicionando...'
            : product.stock > 0
              ? 'Adicionar'
              : 'Esgotado'}
        </Button>
      </div>
    </Card>
  );
};
