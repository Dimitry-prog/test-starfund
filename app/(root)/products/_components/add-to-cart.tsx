'use client';

import { LucideShoppingCart, MinusIcon, PlusIcon } from 'lucide-react';

import { cartSliceActions, cartSliceSelectors } from '@/app/(root)/products/_slices/cart-slice';
import { ProductType } from '@/app/(root)/products/types';
import { Button } from '@/shared/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';

type AddToCartProps = {
  product: ProductType;
};
const AddToCart = ({ product }: AddToCartProps) => {
  const cartItems = useAppSelector(cartSliceSelectors.getCartItems);
  const dispatch = useAppDispatch();
  const qty = cartItems.find((item) => item.product.id === product.id)?.qty || 0;

  const handleAddToCart = () => {
    dispatch(cartSliceActions.addProductToCart(product));
  };

  const handleRemove = () => {
    dispatch(cartSliceActions.removeProductFromCart(product.id));
  };

  return (
    <div>
      {qty > 0 ? (
        <div className="flex items-center gap-2">
          <Button size="icon" onClick={handleRemove}>
            <MinusIcon className="size-4" />
          </Button>
          <p className="font-bold">{qty}</p>
          <Button size="icon" onClick={handleAddToCart}>
            <PlusIcon className="size-4" />
          </Button>
        </div>
      ) : (
        <Button size="icon" onClick={handleAddToCart}>
          <LucideShoppingCart className="size-4" />
        </Button>
      )}
    </div>
  );
};

export default AddToCart;
