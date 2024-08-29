import { StarIcon, ViewIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import AddToCart from '@/app/(root)/products/_components/add-to-cart';
import { ProductType } from '@/app/(root)/products/types';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { formatNumber } from '@/shared/lib/formatters';

type ProductItemProps = {
  product: ProductType;
};

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <li>
      <Card className="flex flex-col overflow-hidden">
        <div className="relative aspect-video h-auto w-full">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
          <CardDescription className="line-clamp-3">{product.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 items-center justify-between gap-4">
          <p className="font-bold">{formatNumber(product.price)} $</p>
          <div className="flex items-center gap-1">
            <p className="line-clamp-4">{product.rating}</p>
            <StarIcon className="size-4" />
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 self-end">
          <Button size="icon" variant="outline">
            <Link href={`/products/${product.id}`}>
              <ViewIcon className="size-4" />
            </Link>
          </Button>
          <AddToCart product={product} />
        </CardFooter>
      </Card>
    </li>
  );
};

export default ProductItem;
