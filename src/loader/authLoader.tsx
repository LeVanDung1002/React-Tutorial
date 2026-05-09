import { redirect } from "react-router-dom";

export default async function AuthLoader() {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  console.log(token)

  if (!token) {
    return redirect("/login");
  }

  return null;
}
