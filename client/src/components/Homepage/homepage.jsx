import {useState} from "react";
import Cookies from "js-cookie";
import io from "socket.io-client";

import Navbar from "./Nav/navbar";
import Banner from "./Banner/banner";
import Footer from "./Footer/Footer";
import Categories from "./Categories/Categories";
import Toptrending from "./Toptrending/toptrending";
import Livechat from "./Livechat/livechat";
// import AdminChat from "./Admin/adminChat";

import "./Livechat/livechat.css";

import "./homepage.css";

const socket = io.connect("http://localhost:5000");
// const orderSocket = io.connect("http://localhost:5000/orders")

const Homepage = () => {
  const [click, setClick] = useState(false);
  
  // const [username, setUsername] = useState("");
  // const [room, setRoom] = useState("");
  // const [showChat, setShowChat] = useState(false);
  // let room="";
  // room ="a15";
  
  let username=""; 
  const getDataUser = () => {
   let getUser = Cookies.get("user") ?? "[]"; //ra string khong phai stringify
    const array = getUser.split(","); //chuyen ve stringify json

    const emailArray = JSON.parse(array);
    return(
      username = emailArray.email
    )
  };
  getDataUser();
  
  console.log('username', username)

  const joinRoom = () => {
    console.log("socket", username, socket);
    
    if (username !== undefined){
      socket.emit("join_room", username);
      setClick(!click);  
    } else {
      alert("Please Login!")
    }
  }; 

  return (
    <>
      <div className="menu">
        {/* LIVE CHAT */}
        {click && <Livechat socket={socket} username={username} />}
        {/* LIVE CHAT */}

        <div className="chatSupport">
          <button onClick={() => {
            joinRoom();
            // setClick(!click);          
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-messenger"
              viewBox="0 0 16 16"
            >
              <path
                style={{ fill: "brown" }}
                d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"
              />
            </svg>
          </button>
        </div>
        <div className="meanMenu">
          <Navbar />
          <Banner />
          <div className="line">
            <div className="line1">CAREFULLY CREATED COLLECTIONS</div>
            <div className="line2">BROWSE OUR CATEGORIES</div>
          </div>
          <Categories />
          <div className="line">
            <div className="line1">MADE THE HARD WAY</div>
            <div className="line2">TOP TRENDING PRODUCT</div>
          </div>
          <Toptrending />

          <div className="shipping">
            <div className="shippingline1">
              <div className="shippingline1div1">FREE SHIPPING</div>
              <div className="shippingline1div2">Free shipping worldwide</div>
            </div>
            <div className="shippingline1">
              <div className="shippingline1div1">24x7 SERVICE</div>
              <div className="shippingline1div2">Free shipping worldwide</div>
            </div>
            <div className="shippingline1">
              <div className="shippingline1div1">FESTIVAL OFFER</div>
              <div className="shippingline1div2">Free shipping worldwide</div>
            </div>
          </div>
          <div className="subfooter">
            <div className="friends">
              <div className="friends1">LET'S BE FRIENDS!</div>
              <div className="friends2">
                Nisi nisi tempor consequat iaboris nisi
              </div>
            </div>
            <div className="emailSub">
              <input placeholder="Enter your email address" />
              <button>Subscribe</button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Homepage;
