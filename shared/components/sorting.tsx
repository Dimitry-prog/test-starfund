'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { SORTING_PRODUCTS } from '@/shared/lib/constants';
import { cn } from '@/shared/lib/utils';
import { SortingContentType } from '@/shared/types';

type SortingProps = {
  sortingContent?: SortingContentType[];
  className?: string;
};

const Sorting = ({ className, sortingContent = SORTING_PRODUCTS }: SortingProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleChange = (value: string) => {
    params.set('page', '1');
    if (value === 'reset') {
      params.delete('sortBy');
      params.delete('order');
      params.delete('page');
    } else {
      const [sortBy, order] = value.split('_');
      params.set('sortBy', sortBy);
      params.set('order', order);
    }
    router.replace(`${pathname}?${params}`, { scroll: false });
  };

  return (
    <Select onValueChange={(value) => handleChange(value)}>
      <SelectTrigger
        className={cn('min-h-[58px] w-[180px] rounded-xl', className)}
        data-testid="select-trigger"
      >
        <SelectValue placeholder="SortBy" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="reset">Reset</SelectItem>
        {sortingContent.map((item) => (
          <SelectItem value={item.value} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sorting;
