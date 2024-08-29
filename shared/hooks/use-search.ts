import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useDebounce } from '@/shared/hooks/use-debounce';
import { ParamsToDeleteType, ParamsToSetType } from '@/shared/types';

export const useSearch = (
  paramsDelete: ParamsToDeleteType = [],
  paramsSet: ParamsToSetType = []
) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const debouncedSearch = useDebounce(search);

  const handleChangeURLSearch = (
    value: string,
    paramsDelete: ParamsToDeleteType,
    paramsSet: ParamsToSetType
  ) => {
    if (!value) {
      paramsDelete.forEach((param) => params.delete(param));
    } else {
      paramsSet.forEach((param) => params.set(param.key, param.value));
    }

    router.replace(`${pathname}?${params}`, { scroll: false });
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  useEffect(() => {
    handleChangeURLSearch(debouncedSearch, paramsDelete, [
      { key: 'q', value: debouncedSearch },
      ...paramsSet,
    ]);
  }, [debouncedSearch]);

  return {
    search,
    setSearch,
    onClearSearch: handleClearSearch,
  };
};
