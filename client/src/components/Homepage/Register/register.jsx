import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import banner1 from "../image/banner1.jpg";

import "./register.css";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhone] = useState(0);
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [checkError, setCheckError] = useState("");
  const [errorValidator, setCheckValidator] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const navigate = useNavigate();

  const validPassword = () => {
   if(password.length < 5){
    setErrorMessage(true)
   } else {
    setErrorMessage(false)
   }
  };

  const handleRegister = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
      password: password,
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("http://localhost:5000/userRegister", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          navigate("/login");
        } else {
          console.log("message", result.message);
          setCheckError(result.message)
        }
      })
      .catch((error) => console.log("error", error));
  };

  const checkValidator = () => {
    if(!email.includes("@")) {
      console.log("true", email.includes("@"))
      setErrorEmail(true)
      setCheckValidator(false);
    } 
    else if(!username || !email || !password ||!fullName || !phoneNumber){
      setCheckValidator(true);
      setErrorEmail(false);
    } else {
      setCheckValidator(false);
      setErrorEmail(false);
      handleRegister();
    }
  }

  return (
    <>
      <div className="register">
        <img src={banner1} alt="" />
        <form className="registerForm">
          <h1>Sign Up</h1>
          <div className="registerName">
            <input
              onChange={(e) => setUserName(e.target.value)}
              placeholder="First Name"
            />
          </div>
          <div className="fullname">
          <input
            placeholder="Full Name"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          </div>
          <div className="registerEmail">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                
              }}
              placeholder="Email"
              type="email"
            />
          </div>
          {errorEmail && (
          <div
            className="errorMessage"
            style={{ fontWeight: "bold", color: "red", fontSize: "small" }}
          >
            Please input corrected email format!
          </div>
        )}
          <div className="registerPassword">
          <input
            type="password"
            placeholder="Password"
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="At least 6 or more characters"
            // "Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
            onChange={(e) => {
              setPassword(e.target.value);
              validPassword();
            }}
          />
          </div>
          {errorMessage && (
          <div
            className="errorMessage"
            style={{ fontWeight: "bold", color: "red", fontSize: "small" }}
          >
            Please input more 6 characters!
          </div>
        )}
          
          <div className="registerPhone">
            <input
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              type="number"
            />
          </div>
          <div className="errorMessage"
            style={{ fontWeight: "bold", color: "red", fontSize: "medium" }}>{checkError}</div>
          {errorValidator && (
            <div
            className="errorMessage"
            style={{ fontWeight: "bold", color: "red", fontSize: "medium" }}
          >
            Please fill in blank!
          </div>
          )}
          <div className="registerButton">
            <button type="button"
              onClick={(e) => {
                checkValidator();
              }}
            >
              SIGN UP
            </button>
          </div>
          <div className="loginUp" onClick={() => {navigate("/login")}}>
            Login? <Link to="/login">Click</Link>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
