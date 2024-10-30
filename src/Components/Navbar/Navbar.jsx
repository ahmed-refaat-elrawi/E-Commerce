import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { userContext } from "../../Context/UserContext";

function Navbar() {
  const userCtx = useContext(userContext);
  const navigate = useNavigate();

  function logout() {
    if (userCtx) {
      localStorage.removeItem("userToken");
      userCtx.setUserToken(null);
      navigate("/login");
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            <img src={logo} alt="fresh cart logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ">
              {userCtx?.userToken !== null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link mx-2 p-0 active" to="">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2 p-0" to="products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2 p-0" to="categories">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2 p-0" to="brands">
                      Brands
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2 p-0" to="cart">
                      Cart
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto  ">
              <li className="nav-item d-flex align-items-center">
                <i className="fab fa-facebook mx-2 cursor-pointer"></i>
                <i className="fab fa-youtube mx-2 cursor-pointer"></i>
                <i className="fab fa-instagram mx-2 cursor-pointer"></i>
                <i className="fab fa-tiktok mx-2 cursor-pointer"></i>
                <i className="fab fa-twitter mx-2 cursor-pointer"></i>
              </li>

              {userCtx?.userToken !== null ? (
                <li className="nav-item">
                  <span
                    className="nav-link mx-2 p-0 cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link mx-2 p-0" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2 p-0" to="register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
