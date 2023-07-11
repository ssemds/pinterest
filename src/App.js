import React from "react";
import Navbar from "./components/Navbar/Navbar";
import MainRoutes from "./components/Routes/MainRoutes";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div>
      <Navbar />

      <MainRoutes />
      <Footer/>

    </div>
  );
};

export default App;
