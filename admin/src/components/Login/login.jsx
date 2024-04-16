import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let data ="";

  const setCookies = (data) => {
    Cookies.set('admin', data, { expires: 7, path: '/' })
}

  const postData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": email,
      "password": password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    await fetch("http://localhost:5000/adminLogin", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        data = JSON.parse(result)
        console.log("result", result, data.message, typeof data.message, data.message === "Done")
        if(data.message === "Done"){
          setCookies(raw);
          navigate("/admin");
          window.location.reload();
        } else{
          setError(data.message)
        }
      })
      .catch((error) => console.error(error));
  }

  console.log('email', email, password, data, typeof data)

  return (
    <div className="loginItems">
    <div className="loginReturn">
            <button onClick={() => navigate(-1)}>Return</button>
            </div>
      <div className="loginPass">
        
        <div className="inputForm">
          <div className="loginInp">
            <div className="titLog">Login</div>
            <div className="inpLog"><input onChange={(e) => { setEmail(e.target.value) }} /></div>
          </div>
          <div className="passwordInp">
            <div className="titPass">Password</div>
            <div className="inputInp"><input type="password"
              onChange={(e) => setPassword(e.target.value)} /></div>
          </div>
        </div>
        {!!error && <div>{error}</div>}
        <div className="submitBtn"><button onClick={() => {postData()}}>SUBMIT</button></div>
      </div>
    </div>
  );
};
export default Login;
