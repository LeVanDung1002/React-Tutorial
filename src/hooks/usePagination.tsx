import { useMemo } from "react";

const SIZE_OF_PAGE = 8;

export function usePagination<T>(
  datas: T[],
  currentPage: number,
  sizeOfPage: number = SIZE_OF_PAGE
) {

  const totalPages = Math.ceil(
    datas.length / sizeOfPage
  );

  const paginatedData = useMemo(() => {

    const start =
      (currentPage - 1) * sizeOfPage;

    const end = start + sizeOfPage;

    return datas.slice(start, end);

  }, [datas, currentPage, sizeOfPage]);

  return {
    value: paginatedData,
    totalPages,
    currentPage,
    sizeOfPage,
  };
}