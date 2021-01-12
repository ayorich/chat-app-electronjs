import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function Navbar() {
  const { goBack, push } = useHistory();

  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          <button className="btn btn-outline-primary" onClick={() => goBack()}>
            Back
          </button>
          <Link to="/settings" className="btn btn-outline-success ml-2">
            Settings
          </Link>
        </div>
        <div className="chat-navbar-inner-right">
          <span className="logged-in-user">Hi User</span>

          <button
            onClick={() => push("/")}
            className="btn btn-outline-success ml-2"
          >
            Login
          </button>
        </div>
      </nav>
    </div>
  );
}
