import React from "react";
import NavBar from "../components/Navbar";

export default function BaseLayout({ children, ...props }) {
  return (
    <>
      <NavBar {...props} />
      {children}
    </>
  );
}
