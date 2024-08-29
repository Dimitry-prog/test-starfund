'use client';

import ProductsList from '@/app/(root)/products/_components/products-list';
import { cartSliceSelectors } from '@/app/(root)/products/_slices/cart-slice';
import { Button } from '@/shared/components/ui/button';
import { useAppSelector } from '@/shared/hooks/redux-hooks';
import { formatNumber } from '@/shared/lib/formatters';

const ProductsCartPage = () => {
  const cartItems = useAppSelector(cartSliceSelectors.getCartItems);
  const totalPrice = cartItems.reduce((acc, item) => item.product.price + acc, 0);

  return (
    <section className="space-y-5">
      <p className="text-2xl font-bold">Total Price: {formatNumber(totalPrice)} $</p>
      <Button className="w-full">Buy</Button>
      <ProductsList products={cartItems.map((products) => products.product)} />
    </section>
  );
};

export default ProductsCartPage;
