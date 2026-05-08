import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchProductById } from "../../../thunk/fetchProductById";

import type { RootState } from "../../../../store/type";
import type { AppDispatch } from "../../../../store/store";
import { capitalize } from "../../../utils/stringUtils";

export default function ProductDetail() {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const product = useSelector(
    (state: RootState) => state.products.selectedProduct
  );
  const isLoading =  useSelector(
    (state: RootState) => state.products.isLoading
  );

  useEffect(() => {
    if (!id) return;

    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Image */}
        <div className="space-y-4">
          <div className="h-80 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center p-6">
            <img
              src={product.image}
              alt={product.title}
              className="h-full object-contain"
            />
          </div>

          {/* Thumbnail */}
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border cursor-pointer hover:opacity-80 transition"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between space-y-6">

          {/* Title */}
          <div className="space-y-3">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm">
              {capitalize(product.category)}
            </div>

            <h1 className="text-3xl font-bold text-gray-800 leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-yellow-500">
                ⭐ {product.rating.rate}
              </span>

              <span className="text-gray-400">
                ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="text-4xl font-bold text-blue-600">
            ${product.price}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description}
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
          <div className="text-sm text-gray-500 space-y-2 border-t pt-4">
            <p>🚚 Free shipping worldwide</p>
            <p>🔄 7 days return policy</p>
            <p>🔒 Secure payment</p>
          </div>

        </div>
      </div>
    </div>
  );
}