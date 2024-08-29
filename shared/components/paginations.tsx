'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/shared/components/ui/button';
import { Pagination, PaginationContent, PaginationItem } from '@/shared/components/ui/pagination';
import { LIMIT_PER_PAGE } from '@/shared/lib/constants';

type PaginationsProps = {
  totalPages: number;
};

const Paginations = ({ totalPages }: PaginationsProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const page = Number(params.get('page')) || 1;

  const handleChangePage = (page: number) => {
    params.set('page', page.toString());
    router.replace(`${pathname}?${params}`, { scroll: false });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button disabled={page <= 1} onClick={() => handleChangePage(page - 1)} variant="outline">
            <ChevronLeftIcon className="size-4" />
          </Button>
        </PaginationItem>
        {Array.from({ length: Math.ceil(totalPages / LIMIT_PER_PAGE) }).map((_, index) => (
          <PaginationItem key={index} className="hidden lg:block">
            <Button
              onClick={() => handleChangePage(index + 1)}
              variant={page === index + 1 ? 'outline' : 'ghost'}
            >
              {index + 1}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= totalPages / LIMIT_PER_PAGE}
            variant="outline"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;
