import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 px-4 md:px-8 py-6 overflow-x-hidden mt-16 md:mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;