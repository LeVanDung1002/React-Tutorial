import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem("token")
      sessionStorage.removeItem("token")
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-[320px] space-y-4">
        
        {/* Spinner */}
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-800">
          Đang đăng xuất...
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-500">
          Vui lòng chờ trong giây lát
        </p>

        {/* Optional progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-pulse w-2/3"></div>
        </div>

      </div>
    </div>
  );
}