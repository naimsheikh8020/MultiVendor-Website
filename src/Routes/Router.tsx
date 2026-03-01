import { lazy } from "react";
import type { RouteObject } from "react-router";
import Layout from "./Layout";
import Loadable from "./Loadable";


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
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Loadable><Home /></Loadable> },

      // Auth
      { path: "login", element: <Loadable><Login /></Loadable> },
      { path: "signup", element: <Loadable><SignUp /></Loadable> },

      // Stores
      { path: "stores", element: <Loadable><Store /></Loadable> },
      {
        path: "stores/:storeId",
        element: <Loadable><StoreDetails /></Loadable>,
      },

      // Products
      {
        path: "category/:categoryName",
        element: <Loadable><ProductCategory /></Loadable>,
      },
      {
        path: "product/:productId",
        element: <Loadable><ProductDetails /></Loadable>,
      },

      // Cart
      { path: "cart", element: <Loadable><CartPage /></Loadable> },
      { path: "checkout", element: <Loadable><Checkout /></Loadable> },

      // Profile
      { path: "my-profile", element: <Loadable><MyProfile /></Loadable> },

      // 404
      { path: "*", element: <Loadable><NotFound /></Loadable> },
    ],
  },
];


























// import { Route, Routes } from "react-router";
// import Layout from "./Layout";
// import Home from "../Pages/Home";
// import CartPage from "../Pages/CartPage";
// import Login from "../Pages/Login";
// import SignUp from "../Pages/SignUp";
// import Store from "../Pages/Store";
// import StoreDetails from "../Pages/StoreDetails";
// import MyProfile from "../Pages/MyProfile";
// import ProductCategory from "../Pages/ProductCategory";
// import ProductDetails from "../Pages/ProductDetails";
// import NotFound from "../Pages/NotFound";
// import Checkout from "../Pages/Checkout";

// const Router = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>

//         {/* Home */}
//         <Route index element={<Home />} />

//         {/* Auth */}
//         <Route path="login" element={<Login />} />
//         <Route path="signup" element={<SignUp />} />

//         {/* Cart */}
//         <Route path="cart" element={<CartPage />} />
//         <Route path = "checkout" element={<Checkout />} />

//         {/* Stores */}
//         <Route path="stores" element={<Store />} />
//         <Route path="stores/:storeId" element={<StoreDetails />} />

//         {/* Products */}
//         <Route path="category/:categoryName" element={<ProductCategory />} />
//         <Route path="product/:productId" element={<ProductDetails />} />

//         {/* Profile */}
//         <Route path="my-profile" element={<MyProfile />} />

//         {/* 404 */}
//         <Route path="*" element={<NotFound />} />

//       </Route>
//     </Routes>
//   );
// };

// export default Router;