'use server';

import { ProductsResponseType } from '@/app/(root)/products/types';

export const getAllProducts = async () => {
  const response = await fetch(`${process.env.BASE_API_URL}/products?limit=10`, {
    cache: 'force-cache',
  });
  const products: ProductsResponseType = await response.json();

  return products;
};
