import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export function Layouts({ children }) {
  return (
    <div className="app-container flex min-h-screen flex-col text-slate-900 transition-colors duration-300 dark:text-slate-100">
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}

export default Layouts;
