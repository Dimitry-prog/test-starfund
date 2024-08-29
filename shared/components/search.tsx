'use client';

import { SearchIcon, XIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useSearch } from '@/shared/hooks/use-search';
import { cn } from '@/shared/lib/utils';
import { ParamsToDeleteType, ParamsToSetType } from '@/shared/types';

type SearchProps = {
  paramsDelete?: ParamsToDeleteType;
  paramsSet?: ParamsToSetType;
  placeholder?: string;
  className?: string;
};

const Search = ({
  paramsDelete = ['page', 'sortBy', 'q'],
  paramsSet = [],
  placeholder = 'Search something',
  className,
}: SearchProps) => {
  const { search, setSearch, onClearSearch } = useSearch(paramsDelete, paramsSet);

  return (
    <div
      className={cn(
        'flex items-center rounded-xl border border-input bg-background px-4 py-2 hover:border-gray-400',
        className
      )}
    >
      <SearchIcon className="size-4" />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="border-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {search && (
        <Button
          onClick={() => {
            onClearSearch();
          }}
          variant="ghost"
          className="rounded-full px-2 py-1"
          data-testid="clear search"
        >
          <XIcon className="size-3" />
        </Button>
      )}
    </div>
  );
};

export default Search;
