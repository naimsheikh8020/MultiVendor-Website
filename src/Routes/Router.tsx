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
import AdminLayout from "./AdminLayout";
import AdminDashboard from "../features/Admin/AdminDashboard";
import AdminUser from "../features/Admin/AdminUser";
import AdminVendorRequest from "../features/Admin/AdminVendorRequest";
import AdminProduct from "../features/Admin/AdminProduct";
import AdminOrder from "../features/Admin/AdminOrder";
import AdminCommsion from "../features/Admin/AdminCommsion";
import AdminRecommendedStore from "../features/Admin/AdminRecommendedStore";
import AdminAnalytics from "../features/Admin/AdminAnalytics";
import AdminPayout from "../features/Admin/AdminPayout";
import AdminSettings from "../features/Admin/AdminSettings";
import ProtectedRoute from "./ProtectedRoute";
import VendorStepGuard from "./VendorStepGuard";
import VendorMessage from "../features/vendors/VendorMessage";
// import VendorStoreForm from "../Pages/VendorStoreForm";
// import VendorSignup from "../Pages/VendorSignup";

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
const SearchResults = lazy(() => import("../Pages/SearchResults"));
const Checkout = lazy(() => import("../Pages/Checkout"));
const NotFound = lazy(() => import("../Pages/NotFound"));
const VendorLogin = lazy(() => import("../Pages/VendorLogin"));
const VendorSignup = lazy(() => import("../Pages/VendorSignup"));
const VendorStoreForm = lazy(() => import("../Pages/VendorStoreForm"));
const OrderDetails = lazy(() => import("../features/MyProfile/OrderDetails"));

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
      { path: "vendor-login", element: <Loadable><VendorLogin /></Loadable> },


      // { path: "vendor-signup", element: <Loadable><VendorSignup /></Loadable> },
      // { path: "/store-info", element: <Loadable><VendorStoreForm /></Loadable> },


      // Stores
      { path: "stores", element: <Loadable><Store /></Loadable> },
      { path: "stores/:storeId", element: <Loadable><StoreDetails /></Loadable> },

      // Products
      { path: "category/:categoryName", element: <Loadable><ProductCategory /></Loadable> },
      { path: "product/:productId", element: <Loadable><ProductDetails /></Loadable> },
      { path: "search", element: <Loadable><SearchResults /></Loadable> },

      // Cart
      { path: "cart", element: <Loadable><CartPage /></Loadable> },
      { path: "checkout", element: <Loadable><Checkout /></Loadable> },

      // Profile
      { path: "my-profile", element: <Loadable><MyProfile /></Loadable> },
      { path: "order/:orderId", element: <Loadable><OrderDetails /></Loadable> },

      // 404
      { path: "*", element: <Loadable><NotFound /></Loadable> },

      {
        path: "vendor-signup",
        children: [
          {
            index: true,
            element: <Loadable><VendorSignup /></Loadable>,
          },

          {
            element: <VendorStepGuard />,
            children: [
              {
                path: "store-info",
                element: <Loadable><VendorStoreForm /></Loadable>,
              },
            ],
          },
        ],
      }

    ],
  },

  // 🔥 VENDOR LAYOUT (new, separate)
  {
    path: "/vendor",
    element: <ProtectedRoute />,
    children: [
      {
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
          {
            path: "messages",
            element: <Loadable><VendorMessage /></Loadable>,
          },
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
        ]
      }
    ]
  },

  // 🔹 ADMIN LAYOUT 
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Loadable><AdminDashboard /></Loadable>,
          },
          {
            path: "dashboard",
            element: <Loadable><AdminDashboard /></Loadable>,
          },
          {
            path: "users",
            element: <Loadable><AdminUser /></Loadable>,
          },
          {
            path: "vendor-requests",
            element: <Loadable><AdminVendorRequest /></Loadable>,
          },
          {
            path: "product",
            element: <Loadable><AdminProduct /></Loadable>,
          },
          {
            path: "orders",
            element: <Loadable><AdminOrder /></Loadable>,
          },
          {
            path: "commission",
            element: <Loadable><AdminCommsion /></Loadable>,
          },
          {
            path: "recommended",
            element: <Loadable><AdminRecommendedStore /></Loadable>,
          },
          {
            path: "analytics",
            element: <Loadable><AdminAnalytics /></Loadable>,
          },
          {
            path: "payouts",
            element: <Loadable><AdminPayout /></Loadable>,
          },
          {
            path: "settings",
            element: <Loadable><AdminSettings /></Loadable>,
          },
        ]
      }
    ]
  }

];