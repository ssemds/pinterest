import React from "react";
import Navbar from "./components/Navbar/Navbar";
import MainRoutes from "./components/Routes/MainRoutes";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div>
      <Navbar />
      <MainRoutes />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
