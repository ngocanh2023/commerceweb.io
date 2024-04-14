import {useState} from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import AdminChat from "./livechat/adminChat";
import Cookies from "js-cookie";

import "./chatApp.css";

const ChatApp = () => {
  const [click, setClick] = useState(false);

  const navigate = useNavigate();
  
  const socket = io.connect("http://localhost:5000");

  let username=""; 
  let emailArray = [];
  const getDataUser = () => {
   let getUser = Cookies.get("user") ?? "[]"; //ra string khong phai stringify
    // const array = getUser.split(","); //chuyen ve stringify json
    emailArray = JSON.parse(getUser.split(","));   
    username = emailArray.email;  
  };
  getDataUser();

  const joinRoom = () => {
    if (username !== undefined){
      socket.emit("join_room", username);
      setClick(!click);  
    } else {
      alert("Please Login!")
    }
  };

  return (
    <div>
      <div className="chatUser-header">
        <div className="titleHeader">Customer Service</div>
        <div
          className="homeHeader"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </div>
        <div
          className="loginHeader"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </div>
      </div>
{/* {!emailArray && emailArray?.map((i) => { */}

  <div className="chatUser-body">
        <div className="roomMenu">
        <div className="menuTitle">CUSTOMER ROOM</div>
        <div className="roomList">
          Is Join Room? <button onClick={joinRoom}>{username}</button>
        </div>
        </div>
        <div className="userChat">
        {click && <AdminChat socket={socket} username={username}/>}
        </div>
    
      </div>
      {/* })} */}
    </div>
  );
};
export default ChatApp;
