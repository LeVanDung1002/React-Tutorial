import { useEffect, useMemo, useState } from "react"
import { filterProduct, ProductFilter, type ProductType } from "../../../reducer/ProductSlice"
import { fetchProducts } from "../../thunk/fetchProduct"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store";
import { fetchProductCategories } from "../../thunk/fetchProductCategories";
import { usePagination } from "../../../hooks/usePagination";
import { Pagination } from "../../pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../utils/stringUtils";

type ProductExplorerProps = {
    isOpen: boolean
}

export default function ProductExplorer({ isOpen }: ProductExplorerProps) {

    const products = useSelector((state: RootState) => state.products.products)
    const categories = useSelector((state: RootState) => state.products.categories)
    const isLoading = useSelector((state: RootState) => state.products.isLoading)
    const [search, setSearch] = useState("")
    const filter = useSelector((state: RootState) => state.products.filter)
    const navigate = useNavigate()

    const filteredTasks = useMemo(() => {
        return products.filter(
            (product) =>
                (filter === ProductFilter.ALL ||
                    product.category === filter) &&
                product.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
        )
    }, [filter, products, search])

    const { currentPage, totalPages, value, handlePage } = usePagination<ProductType>(filteredTasks)


    const dispatch = useDispatch<AppDispatch>()

    const handleFilter = (filterTag: string) => {
        handlePage()
        dispatch(filterProduct(filterTag))
    }

    useEffect(() => {
        dispatch(fetchProductCategories())
        dispatch(fetchProducts())
    }, [])


    if (!isOpen) return null

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <main
            className={`absolute box-border inset-0 p-8 space-y-6 transition-all duration-300
            ${isOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"}
            `}
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                    Product Explorer
                </h1>

                <input
                    placeholder="Search products..."
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Filter / Category */}
            <div className="flex gap-2 flex-wrap">
                {[ProductFilter.ALL, ...categories].map((item, i) => (
                    <button
                        key={i}
                        className={`px-4 py-1.5 rounded-full text-sm border transition
                        ${filter === item
                                ? "bg-blue-600 text-white border-blue-600"
                                : "text-gray-600 hover:bg-gray-100"}
                        `}
                        onClick={() => handleFilter(item)}
                    >
                        {capitalize(item)}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                {value.map((product: ProductType) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
                    >
                        {/* Image */}
                        <div className="h-40 bg-gray-100 flex items-center justify-center p-4">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-full object-contain"
                            />
                        </div>

                        {/* Info */}
                        <div className="p-4 space-y-2">
                            <p className="font-medium text-gray-800 line-clamp-1">
                                {product.title}
                            </p>

                            <p className="text-sm text-gray-500 line-clamp-2">
                                {product.description}
                            </p>

                            <div className="flex justify-between items-center">
                                <span className="text-blue-600 font-semibold">
                                    ${product.price}
                                </span>

                                <button className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200" onClick={() => navigate(`/products/${product.id}`)}>
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {value.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <div className="text-6xl mb-4">
                        📦
                    </div>

                    <h2 className="text-xl font-semibold text-gray-700">
                        No products found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Try changing search or category
                    </p>
                </div>
            )}

            {/* Pagination */}
            {value.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) =>
                        handlePage({
                            page,
                            size: 8,
                        })
                    }
                />
            )}

        </main>
    )
}