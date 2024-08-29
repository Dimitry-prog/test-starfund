import type { Metadata } from 'next';

import ProductsList from '@/app/(root)/products/_components/products-list';
import { getAllProducts } from '@/app/(root)/products/_services';
import Paginations from '@/shared/components/paginations';
import { LIMIT_PER_PAGE } from '@/shared/lib/constants';
import { SearchParamsType } from '@/shared/types';

export const metadata: Metadata = {
  title: 'Products',
  description: 'See all products',
};

const ProductsPage = async ({ searchParams }: SearchParamsType) => {
  const page = searchParams?.page;
  const productsData = await getAllProducts({ page });

  return (
    <section className="space-y-5">
      {productsData.products.length > 0 ? (
        <>
          <ProductsList products={productsData.products} />
          {productsData.total > LIMIT_PER_PAGE && <Paginations totalPages={productsData.total} />}
        </>
      ) : (
        <p>No products</p>
      )}
    </section>
  );
};

export default ProductsPage;
