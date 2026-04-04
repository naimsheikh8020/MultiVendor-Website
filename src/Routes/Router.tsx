import { lazy } from "react";
import type { RouteObject } from "react-router";
import Layout from "./Layout";
import VendorLayout from "./VendorLayout";
import Loadable from "./Loadable";
import ForgotPassword from "../Pages/ForgotPassword";
import VendorDashboard from "../features/vendors/VendorDashboard";
import VendorProduct from "../features/vendors/VendorProduct";
// import VendorCategory from "../features/vendors/VendorCategory";
import VendorOrder from "../features/vendors/VendorOrder";
import VendorPayout from "../features/vendors/VendorPayout";
import VendorProfile from "../features/vendors/VendorProfile";
import VendorEarnings from "../features/vendors/VendorEarnings";

// Lazy pages
const Home = lazy(() => import("../Pages/Home"));
const CartPage = lazy(() => import("../Pages/CartPage"));
const Login = lazy(() => import("../Pages/Login"));
const SignUp = lazy(() => import("../Pages/SignUp"));
const Store = lazy(() => import("../Pages/Store"));
const StoreDetails = lazy(() => import("../Pages/StoreDetails"));
const MyProfile = lazy(() => import("../Pages/MyProfile"));
const ProductCategory = lazy(() => import("../Pages/ProductCategory"));
const ProductDetails = lazy(() => import("../Pages/ProductDetails"));
const Checkout = lazy(() => import("../Pages/Checkout"));
const NotFound = lazy(() => import("../Pages/NotFound"));

export const routes: RouteObject[] = [
  // 🔹 USER LAYOUT (your existing system)
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Loadable><Home /></Loadable> },

      // Auth
      { path: "login", element: <Loadable><Login /></Loadable> },
      { path: "signup", element: <Loadable><SignUp /></Loadable> },
      { path: "forgot-password", element: <Loadable><ForgotPassword /></Loadable> },

      // Stores
      { path: "stores", element: <Loadable><Store /></Loadable> },
      { path: "stores/:storeId", element: <Loadable><StoreDetails /></Loadable> },

      // Products
      { path: "category/:categoryName", element: <Loadable><ProductCategory /></Loadable> },
      { path: "product/:productId", element: <Loadable><ProductDetails /></Loadable> },

      // Cart
      { path: "cart", element: <Loadable><CartPage /></Loadable> },
      { path: "checkout", element: <Loadable><Checkout /></Loadable> },

      // Profile
      { path: "my-profile", element: <Loadable><MyProfile /></Loadable> },

      // 404
      { path: "*", element: <Loadable><NotFound /></Loadable> },
    ],
  },

  // 🔥 VENDOR LAYOUT (new, separate)
  {
    path: "/vendor",
    element: <VendorLayout />,
    children: [
      {
        index: true,
        element: <Loadable><VendorDashboard /></Loadable>,
      },
      {
        path: "dashboard",
        element: <Loadable><VendorDashboard /></Loadable>,
      },
      {
        path: "products",
        element: <Loadable><VendorProduct /></Loadable>,
      },
      // {
      //   path: "category",
      //   element: <Loadable><VendorCategory /></Loadable>,
      // },
      {
        path: "orders",
        element: <Loadable><VendorOrder /></Loadable>
      },
      {
        path: "earnings",
        element: <Loadable><VendorEarnings /></Loadable>
      },
      {
        path: "payouts",
        element: <Loadable><VendorPayout /></Loadable>
      },
      {
        path: "profiles",
        element: <Loadable><VendorProfile /></Loadable>
      },
    ],
  },
];