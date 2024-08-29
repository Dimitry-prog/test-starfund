'use server';

import { ProductsResponseType } from '@/app/(root)/products/types';

export const getAllProducts = async () => {
  const response = await fetch('https://dummyjson.com/products?limit=10', {
    cache: 'force-cache',
  });
  const products: ProductsResponseType = await response.json();

  return products;
};
