export type SearchParamsType = {
  searchParams: {
    [k: string]: string | undefined;
  };
};

export type ParamsToSetType = {
  key: string;
  value: string;
}[];

export type ParamsToDeleteType = string[];

export type SortingContentType = {
  value: string;
  label: string;
};
