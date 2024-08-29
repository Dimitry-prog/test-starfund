import { SortingContentType } from '@/shared/types';

export const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 0,
});

export const NUMBER_FORMATTER = new Intl.NumberFormat('en-US');

export const LIMIT_PER_PAGE = 10;

export const SORTING_PRODUCTS: SortingContentType[] = [
  {
    value: 'title_asc',
    label: 'Title asc',
  },
  {
    value: 'title_desc',
    label: 'Title desc',
  },
  {
    value: 'rating_asc',
    label: 'Rating asc',
  },
  {
    value: 'rating_desc',
    label: 'Rating desc',
  },
  {
    value: 'price_asc',
    label: 'Price asc',
  },
  {
    value: 'price_desc',
    label: 'Price desc',
  },
];
