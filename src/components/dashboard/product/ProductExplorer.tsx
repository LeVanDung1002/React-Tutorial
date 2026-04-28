type ProductExplorerProps = {
    isOpen: boolean
}

export default function ProductExplorer({ isOpen }: ProductExplorerProps) {
    return (
        <main
            className={`absolute inset-0 p-8 space-y-6 transition-all duration-300
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
                />
            </div>

            {/* Filter / Category */}
            <div className="flex gap-2 flex-wrap">
                {["All", "Shoes", "Electronics", "Clothes", "Watch"].map((item, i) => (
                    <button
                        key={i}
                        className={`px-4 py-1.5 rounded-full text-sm border transition
                ${i === 0
                                ? "bg-blue-600 text-white border-blue-600"
                                : "text-gray-600 hover:bg-gray-100"}
              `}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                {[1, 2, 3, 4, 5, 6].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
                    >
                        {/* Image */}
                        <div className="h-40 bg-gray-200"></div>

                        {/* Info */}
                        <div className="p-4 space-y-2">
                            <p className="font-medium text-gray-800">
                                Product Name
                            </p>

                            <p className="text-sm text-gray-500">
                                Short description here
                            </p>

                            <div className="flex justify-between items-center">
                                <span className="text-blue-600 font-semibold">
                                    $99
                                </span>

                                <button className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

        </main>
    )
}