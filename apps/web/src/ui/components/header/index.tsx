import { CartButton } from '@/ui/components/cart';
import Link from 'next/link';
import { type JSX } from 'react';

export function Header(): JSX.Element {
  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold">Loja Virtual</h1>
        </Link>

        <div className="flex items-center gap-2">
          <CartButton />
        </div>
      </div>
    </header>
  );
}
