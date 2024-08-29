import { StarIcon } from 'lucide-react';
import Image from 'next/image';

import AddToCart from '@/app/(root)/products/_components/add-to-cart';
import { getAllProducts } from '@/app/(root)/products/_services';
import { getProductById } from '@/app/(root)/products/[productId]/_services';
import { ReviewType } from '@/app/(root)/products/types';
import { formatDateTime, formatNumber } from '@/shared/lib/formatters';

type SingleProductPageProps = {
  params: {
    productId: string;
  };
};

export const generateMetadata = async ({ params: { productId } }: SingleProductPageProps) => {
  const products = await getProductById(productId);

  if (!products) {
    return {
      title: 'ProductId not found',
    };
  }

  return {
    title: products.title,
    description: products.description,
  };
};

export const generateStaticParams = async () => {
  const products = await getAllProducts({ limit: 0 });

  if (products) {
    return products.products.map((product) => ({
      products: product.id,
    }));
  }
  return [];
};

const SingleProductPage = async ({ params: { productId } }: SingleProductPageProps) => {
  const product = await getProductById(productId);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative aspect-video h-auto w-full">
          <Image src={product.thumbnail} alt={product.title} fill />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">{product.title}</h2>
          <p>{product.description}</p>

          <div className="flex items-center justify-between gap-2">
            <p className="font-bold">{formatNumber(product.price)} $</p>
            <div className="flex items-center gap-1">
              <p className="line-clamp-4">{product.rating}</p>
              <StarIcon className="size-4" />
            </div>
          </div>

          <div className="space-y-1">
            <p>Brand: {product.brand}</p>
            <p>Warranty: {product.warrantyInformation}</p>
            <p>Shipping: {product.shippingInformation}</p>
            <p>Available: {product.availabilityStatus}</p>
          </div>

          <AddToCart product={product} cartBtnClassName="w-full" />
        </div>
      </div>

      {product.reviews.length > 0 && (
        <div className="space-y-4">
          <p>Reviews for products:</p>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.reviews.map((review: ReviewType) => (
              <li key={review.reviewerEmail} className="space-y-2">
                <h3>{review.reviewerName}</h3>
                <p>{review.comment}</p>

                <div className="flex items-center gap-1">
                  <p className="line-clamp-4">{review.rating}</p>
                  <StarIcon className="size-4" />
                </div>
                <p>{formatDateTime(review.date).dateOnly}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default SingleProductPage;
