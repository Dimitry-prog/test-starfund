'use client';

import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';

import ProductItem from '@/app/(root)/products/_components/product-item';
import { cartSliceSelectors } from '@/app/(root)/products/_slices/cart-slice';
import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { useAppSelector } from '@/shared/hooks/redux-hooks';
import { formatNumber } from '@/shared/lib/formatters';
import { cn } from '@/shared/lib/utils';

const Cart = () => {
  const cartItems = useAppSelector(cartSliceSelectors.getCartItems);
  const totalPrice = cartItems.reduce((acc, item) => item.product.price + acc, 0);

  return (
    <Sheet>
      <SheetTrigger>
        <Button asChild variant="ghost">
          <div className="relative cursor-pointer">
            <ShoppingCartIcon
              className={cn('size-4', cartItems.length > 0 && 'fill-red-500 stroke-red-500')}
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-0.5 right-2.5 z-50">{cartItems.length}</span>
            )}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-4 overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Yours Products</SheetTitle>
          <SheetDescription className="space-y-2">
            {cartItems.length > 0 ? (
              <>
                <p className="text-2xl font-bold">Total Price: {formatNumber(totalPrice)} $</p>
                <Button asChild className="w-full">
                  <Link href="/products/cart">Checkout</Link>
                </Button>
              </>
            ) : (
              'You do not have products'
            )}
          </SheetDescription>
        </SheetHeader>

        <ul className="grid grid-cols-1 gap-4">
          {cartItems.map((item) => (
            <ProductItem product={item.product} key={item.product.id} />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
