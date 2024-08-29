'use server';

import { ProductsQueryType, ProductsResponseType } from '@/app/(root)/products/types';
import { LIMIT_PER_PAGE } from '@/shared/lib/constants';

export const getAllProducts = async (query: ProductsQueryType) => {
  const { page = '1', limit = LIMIT_PER_PAGE, search = '', sortBy = '', order = '' } = query;

  const skip = (Number(page) - 1) * limit;
  const params = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
    q: search,
    sortBy,
    order,
  });

  const baseUrl = search
    ? 'https://dummyjson.com/products/search'
    : `${process.env.BASE_API_URL}/products`;

  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    cache: 'force-cache',
  });
  const products: ProductsResponseType = await response.json();

  return products;
};
