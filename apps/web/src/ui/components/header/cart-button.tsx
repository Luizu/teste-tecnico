'use client';

import { Badge } from '@/ui/components/badge';
import { Button } from '@/ui/components/button';
import { ShoppingCart } from 'lucide-react';
import { useState, type JSX } from 'react';

export function CartButton(): JSX.Element {
  const [cartOpen, setCartOpen] = useState(false);
  const itemCount = 0;

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={() => setCartOpen(true)}
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
          {itemCount}
        </Badge>
      )}
    </Button>
  );
}
