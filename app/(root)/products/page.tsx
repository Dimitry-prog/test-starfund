import type { Metadata } from 'next';

import ProductsList from '@/app/(root)/products/_components/products-list';
import { getAllProducts } from '@/app/(root)/products/_services';
import Paginations from '@/shared/components/paginations';
import Search from '@/shared/components/search';
import Sorting from '@/shared/components/sorting';
import { LIMIT_PER_PAGE } from '@/shared/lib/constants';
import { SearchParamsType } from '@/shared/types';

export const metadata: Metadata = {
  title: 'Products',
  description: 'See all products',
};

const ProductsPage = async ({ searchParams }: SearchParamsType) => {
  const productsData = await getAllProducts({
    page: searchParams?.page,
    search: searchParams?.q,
    sortBy: searchParams?.sortBy,
    order: searchParams?.order,
  });

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-5">
        <Search className="flex-1" />
        <Sorting />
      </div>

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
