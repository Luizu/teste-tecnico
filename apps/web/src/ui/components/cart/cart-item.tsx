'use client';

import { Button } from '@/ui/components/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CartItemProps {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  promotionalPrice?: number;
  quantity: number;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
}

export function CartItem({
  productId,
  name,
  image,
  price,
  promotionalPrice,
  quantity,
  onUpdateQuantity,
}: CartItemProps) {
  const displayPrice = promotionalPrice || price;
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex gap-3">
        {/* Imagem do produto */}
        <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>

        {/* Informações do produto */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 line-clamp-2 text-sm mb-1">
            {name}
          </h3>
          <div className="mb-2">
            {promotionalPrice ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 line-through">
                  R$ {price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-sm font-semibold text-green-600">
                  R$ {promotionalPrice.toFixed(2).replace('.', ',')}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-800">
                  {Math.round(((price - promotionalPrice) / price) * 100)}% OFF
                </span>
              </div>
            ) : (
              <p className="text-sm font-semibold text-gray-700">
                R$ {price.toFixed(2).replace('.', ',')}
              </p>
            )}
          </div>

          {/* Controles de quantidade */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(productId, quantity - 1)}
            >
              {quantity === 1 ? (
                <Trash2 className="h-3 w-3 text-red-600" />
              ) : (
                <Minus className="h-3 w-3" />
              )}
            </Button>
            <span className="text-sm font-medium w-6 text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(productId, quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
