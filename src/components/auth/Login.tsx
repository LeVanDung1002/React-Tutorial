import { useState } from "react";
import { useForm } from "../../hooks/useFormHook";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/type";
import { setUser } from "../../reducer/UserSlice";
import type { UserInfo } from "../../types/user";

export default function Login() {

  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate();
  const { register, useField } = useForm()
  const usernameField = useField("username")
  const passwordField = useField("password")
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    if (usernameField.error || passwordField.error) return

    if (usernameField.value === "abcdef" && passwordField.value === "Abc123@@") {
      dispatch(setUser({username: usernameField.value, password: passwordField.value} as UserInfo))
      navigate("/dashboard", { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6">

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Login to continue
        </p>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition"
            id="username"
            {...register("username", v => v.length === 0 ? "Username is not empty" : "")}
          />
          {submitted && usernameField.error && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              ⚠️ {usernameField.error}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition"
            id="password"
            {...register("password", (v) => {
              let errorPW = ""

              if (v.length < 6) errorPW += " ít nhất 6 ký tự,"
              if (!/[A-Z]/.test(v)) errorPW += " ít nhất 1 chữ hoa,"
              if (!/[a-z]/.test(v)) errorPW += " ít nhất 1 chữ thường,"
              if (!/[^A-Za-z0-9]/.test(v)) errorPW += " ký tự đặc biệt,"

              return errorPW
                ? "Phải có" + errorPW.slice(0, -1) // bỏ dấu ,
                : ""
            })}
          />
          {submitted && passwordField.error && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              ⚠️ {passwordField.error}
            </p>
          )}
        </div>

        {/* Remember + forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              className="accent-blue-600 w-4 h-4"
              id="rememberMe"
              name="remember"
              value="yes"
            />
            Remember me
          </label>

          <a href="#" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 text-white font-semibold 
                     rounded-lg hover:bg-blue-700 active:scale-[0.98] 
                     transition duration-200 shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}