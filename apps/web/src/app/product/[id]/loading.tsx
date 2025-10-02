import { Skeleton } from '@/ui/components/skeleton';

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Skeleton da imagem */}
          <div className="w-full">
            <Skeleton className="aspect-square w-full rounded-2xl" />
          </div>

          {/* Skeleton das informações */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Título */}
              <div className="space-y-3">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-10 w-1/2" />
              </div>

              {/* Preço */}
              <Skeleton className="h-12 w-40" />

              {/* Descrição */}
              <div className="space-y-2 border-t border-b border-gray-200 py-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Estoque */}
              <Skeleton className="h-5 w-48" />
            </div>

            {/* Botão */}
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
