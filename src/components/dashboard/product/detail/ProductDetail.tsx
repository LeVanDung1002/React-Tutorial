import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams(); // chỉ để đúng yêu cầu

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Image */}
        <div className="space-y-4">
          <div className="h-80 bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
            <span className="text-gray-400">Product Image</span>
          </div>

          {/* Thumbnail */}
          <div className="flex gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg cursor-pointer hover:opacity-80"></div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between space-y-6">

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Product Title Here
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2 text-yellow-500 text-sm">
              ⭐⭐⭐⭐⭐
              <span className="text-gray-400">(120 reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="text-3xl font-semibold text-blue-600">
            $99
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-sm">
            This is a sample product description. It gives users more detail about the product, features, and benefits. Clean and readable for better UX.
          </p>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 active:scale-95 transition">
              Add to Cart
            </button>

            <button className="px-6 py-3 border rounded-xl hover:bg-gray-100 transition">
              ❤️
            </button>
          </div>

          {/* Extra Info */}
          <div className="text-sm text-gray-400 space-y-1">
            <p>🚚 Free shipping</p>
            <p>🔄 7 days return</p>
          </div>

        </div>

      </div>

    </div>
  );
}