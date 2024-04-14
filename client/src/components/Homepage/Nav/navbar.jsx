import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  let emailLogin;
  let getUser;

  getUser = Cookies.get("user") ?? "[]"; //ra string khong phai stringify
  const array = getUser.split(",")  //chuyen ve stringify json

  const emailArray = JSON.parse(array)
  emailLogin = emailArray.email
  console.log('emailLogin', emailLogin)

  const removeCookie = () => {
    Cookies.remove("user");
    navigate("/login");
  };


  return (
    <>
      <div className="nav">
        <div className="homeshop">
          {!getUser && (
            <button
              type="button"
              className="btnhome"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </button>
          )}
          {getUser && (
            <button
              type="button"
              className="btnhome"
              onClick={() => {
                navigate(`/`);
              }}
            >
              Home
            </button>
          )}
          <button
            type="button"
            className="btnshop"
            onClick={() => {
              navigate(`/shop`);
            }}
          >
            Shop
          </button>
          <button
            type="button"
            className="btnHistory"
            onClick={() => {
              navigate(`/history`);
            }}
          >
            History
          </button>
          <button
            type="button"
            className="btnHistory"
            onClick={() => {
              navigate(`/checkout`);
            }}
          >
            Checkout
          </button>
          {/* <button
            type="button"
            className="btnAdmin"
            onClick={() => {
              console.log("clicked!")
              navigate(`/adminChat`);
            }}
          >
            Admin
          </button> */}
        </div>
        <div>
          <div className="boutique">BOUTIQUE</div>
        </div>
        <div className="cartlogin">
          {emailLogin && <div className="navEmail">Welcome {emailLogin}</div>}
          <div
            className="cart"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <div>
              <FaShoppingCart />
            </div>
            <div className="cartTit">Cart</div>
          </div>

          {!getUser && (
            <div
              className="login"
              onClick={() => {
                navigate("/login");
              }}
            >
              <div>
                <FaUserAlt />
              </div>
              <div
                className="loginTit"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </div>
            </div>
          )}

          {getUser && (
            <div
              className="loginNav"
              onClick={() => {
                removeCookie();
              }}
            >
              <div>
                <FaUserAlt />
              </div>
              <div
                className="loginTit"
                onClick={() => {
                  removeCookie();
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
