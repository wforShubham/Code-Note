import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import codelogo from "./cnlg.png"
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged Out Successfully");
  };
  let location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={codelogo} width={200} height={50} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/codes" ? "active" : ""
                }`}
                aria-current="page"
                to="/codes"
              >
                Codes
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/mynotes" ? "active" : ""
                }`}
                aria-current="page"
                to="/mynotes"
              >
                Code Notes
              </Link>
            </li> */}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className="btn btn-outline-success mx-1 rounded-4" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-outline-success mx-1 rounded-4" to="/Signup" role="button">
                Signup
              </Link>
            </form>
          ) : (
            <button onClick={handleLogout} className="btn btn-outline-success rounded-4">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
