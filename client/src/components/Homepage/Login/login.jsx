import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import banner1 from "../image/banner1.jpg";

import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkError, setCheckError] = useState("");

  const navigate = useNavigate();

  const setCookies = (data) => {
    Cookies.set('user', data, { expires: 7, path: '/' })
}

  const handleLogin = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "email": email,
      "password": password 
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    await fetch("http://localhost:5000/userLogin", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const getResult = JSON.parse(result);
          if (getResult.success) {
            setCookies(raw)      
          } else {
            setCheckError(getResult.messages);
          }
    })
      .catch((error) => console.error(error));

      window.location.reload();
  }



  return (
    <>
      <div className="loginRegister">
        <img src={banner1} alt="" />
        <form className="loginForm">
          <h1>SIGN IN</h1>
          <div className="loginEmail">
            <input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="loginPassword">
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="checkError">
            {checkError && (
              <div
                style={{ fontWeight: "bold", color: "red", fontSize: "medium" }}
              >
                {checkError}
              </div>
            )}
          </div>
          <div className="loginButton">
            <button
            type="button"
              onClick={() => {
                handleLogin()
                navigate(`/`)
              }}
            >
              SIGN IN
            </button>
          </div>
          <div className="signUp">
            Create an account?{" "}
            <div className="signupBtn"
              onClick={() => {
                navigate("/login/register");
              }}
            >
              Sign up
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
