import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Routers from "../routes/Routers";

const Layout = () => {
  return (
    <>
      <Header />
      <Routers />
      <Footer />
    </>
  );
};

export default Layout;
