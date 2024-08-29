import ProductItem from '@/app/(root)/products/_components/product-item';
import { ProductType } from '@/app/(root)/products/types';

type ProductsListProps = {
  products: ProductType[];
};

const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </ul>
  );
};

export default ProductsList;
