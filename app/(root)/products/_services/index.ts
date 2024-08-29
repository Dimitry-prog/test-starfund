'use server';

import { ProductsQueryType, ProductsResponseType } from '@/app/(root)/products/types';
import { LIMIT_PER_PAGE } from '@/shared/lib/constants';

export const getAllProducts = async (query?: ProductsQueryType) => {
  const params = new URLSearchParams();
  const page = query?.page || '1';
  const limit = query?.limit || LIMIT_PER_PAGE;
  const skip = (Number(page) - 1) * limit;
  params.set('limit', limit.toString());
  params.set('skip', skip.toString());

  const response = await fetch(`${process.env.BASE_API_URL}/products?${params.toString()}`, {
    cache: 'force-cache',
  });
  const products: ProductsResponseType = await response.json();

  return products;
};
