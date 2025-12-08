import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export function Layouts({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layouts;
