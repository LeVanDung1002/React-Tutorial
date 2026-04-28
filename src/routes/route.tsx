import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import App from "../App";
import AuthLayout from "../layout/AuthLayout";
import Login from "../components/auth/Login";
import Logout from "../components/auth/Logout";
import Dashboard from "../components/Dashboard";
import ProductDetail from "../components/dashboard/product/detail/ProductDetail";
import AuthLoader from "../loader/authLoader";

export const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/dashboard"/>}/>
      <Route path="dashboard" element={<Dashboard />} loader={AuthLoader}/>
      <Route path="products/:id" element={<ProductDetail />} loader={AuthLoader}/>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </Route>,
  ),
);
