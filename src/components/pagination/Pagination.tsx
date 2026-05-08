type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const generatePages = (
  currentPage: number,
  totalPages: number
) => {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, i) => i + 1
    )
  }

  // Near start
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages]
  }

  // Near end
  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  // Middle
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ]
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = generatePages(
    currentPage,
    totalPages
  )

  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="
          h-10 px-4 rounded-xl border
          text-sm transition
          text-gray-700
          hover:bg-gray-100
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        Prev
      </button>

      {/* Pages */}
      <div className="flex items-center gap-2 justify-center">
        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`dots-${index}`}
              className="
                w-10 h-10
                flex items-center justify-center
                text-gray-500
                select-none
              "
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => {
                if (typeof page === "number") {
                  onPageChange(page)
                }
              }}
              className={`
                w-10 h-10 rounded-xl
                text-sm font-medium
                transition-all duration-200
                flex items-center justify-center
                ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-md scale-105"
                    : `
                      border text-gray-700
                      hover:bg-gray-100
                      hover:scale-105
                    `
                }
              `}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="
          h-10 px-4 rounded-xl border
          text-sm transition
          text-gray-700
          hover:bg-gray-100
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        Next
      </button>
    </div>
  )
}