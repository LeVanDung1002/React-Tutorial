import { useMemo, useState } from "react"

const SIZE_OF_PAGE = 8
const DEFAULT_PAGE = 1

export function usePagination<T>(datas: T[]) {
  const [currentPage, setCurrentPage] =
    useState(DEFAULT_PAGE)

  const [sizeOfPage, setSizeOfPage] =
    useState(SIZE_OF_PAGE)

  const totalPages = Math.ceil(
    datas.length / sizeOfPage
  )

  const paginatedData = useMemo(() => {
    const start =
      (currentPage - 1) * sizeOfPage

    const end = start + sizeOfPage

    return datas.slice(start, end)
  }, [datas, currentPage, sizeOfPage])

  const handlePage = ({
    page,
    size,
  }: {
    page: number
    size: number
  }) => {
    setCurrentPage(page)
    setSizeOfPage(size)
  }

  return {
    value: paginatedData,
    currentPage,
    sizeOfPage,
    totalPages,
    handlePage,
  }
}