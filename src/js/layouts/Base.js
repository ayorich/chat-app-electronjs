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

function getDisplayName(Component) {
  return Component.displayName || Component.name || "Component";
}
export const withBaseLayout = (Component, config) => (props) => {
  const viewName = getDisplayName(Component);
  return (
    <>
      <NavBar {...config} view={viewName} />
      <Component {...props} />
    </>
  );
};
