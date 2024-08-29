import type { Metadata } from 'next';

import ProductsList from '@/app/(root)/products/_components/products-list';
import { getAllProducts } from '@/app/(root)/products/_services';

export const metadata: Metadata = {
  title: 'Products',
  description: 'See all products',
};

const ProductsPage = async () => {
  const productsData = await getAllProducts();

  return (
    <section>
      {productsData.products.length > 0 ? (
        <ProductsList products={productsData.products} />
      ) : (
        <p>No products</p>
      )}
    </section>
  );
};

export default ProductsPage;
