'use client';

import { Button } from '@/ui/components/button';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="h-16 w-16 text-destructive mb-4" />

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Algo deu errado!
        </h2>

        <p className="text-gray-600 mb-6 max-w-md">
          Não foi possível carregar os produtos. Por favor, tente novamente.
        </p>

        {error.message && (
          <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md mb-6 text-sm max-w-md">
            <code>{error.message}</code>
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={reset} variant="default">
            Tentar Novamente
          </Button>

          <Button
            onClick={() => (window.location.href = '/')}
            variant="outline"
          >
            Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  );
}
