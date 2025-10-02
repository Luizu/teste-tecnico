import { Button } from '@/ui/components/button';
import { PackageX } from 'lucide-react';
import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <PackageX className="h-24 w-24 text-gray-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Produto não encontrado
          </h1>
          <p className="text-gray-600">
            O produto que você está procurando não existe ou foi removido.
          </p>
        </div>

        <Link href="/">
          <Button className="bg-green-600 hover:bg-green-700">
            Voltar para a loja
          </Button>
        </Link>
      </div>
    </div>
  );
}
