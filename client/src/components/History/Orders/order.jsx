import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./order.css";

const Order = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();
  let emailLogin, getUser;

  const formatter = new Intl.NumberFormat("en-US", {
    thousandSeparator: ".",
    currency: "VND",
  });

  const url = window.location.href;
  const idOrder = url.slice(30);
  // console.log('idOrder', url, idOrder)

  const getDataUser = () => {
    getUser = Cookies.get("user") ?? "[]"; //ra string khong phai stringify
    const array = getUser.split(","); //chuyen ve stringify json

    const emailArray = JSON.parse(array);
    emailLogin = emailArray.email;
  };
  getDataUser();
  // console.log("emailLogin1", emailLogin);

  const handleId = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: emailLogin
    });

    const requestOptions = {
      headers: myHeaders,
      body: raw,
      method: "POST",
      redirect: "follow",
    };

    await fetch("http://localhost:5000/getUserId", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setUserId(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  };

  const fetchDataOrder = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      `http://localhost:5000/getOrders?_id=${idOrder}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setDataOrder(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    fetchDataOrder();
    if(emailLogin){
      handleId()
    }
    // eslint-disable-next-line
  }, []);

  let productOrder = [];
  let cusOrder = [];
  productOrder = dataOrder?.productArray;
  cusOrder = dataOrder?.customerArray;

  // console.log('userId', userId)
  // console.log("dataOrder", dataOrder);
  // console.log("productOrder", productOrder);
  //   console.log('cusOrder', cusOrder)

  return (
    <>
      <nav className="hisNav">
        <div className="navHistory" onClick={() => {navigate("/history")}}>History</div>
        <div
          onClick={() => {
            navigate("/");
          }}
          className="navHome"
        >
          <div className="homeMenu">Home</div>
        </div>
      </nav>

      <div className="bordyOrder">
        <div className="orderInfo">
          <h3>INFORMATION ORDER</h3>
          {cusOrder && cusOrder?.map((order, i) => {
            return (
              <div className="cusInfo" key={i}>
                <div className="idOrder">ID User: {userId}</div>
                <div className="nameOrder">Full Name: {order.name}</div>
                <div className="phoneOrder">Phone: {order.phone}</div>
                <div className="addressOrder">
                  Address: {order.address}
                </div>
              </div>
            );
          })}
        </div>
        <div className="tableOrder">
              <table className="tableTitle">
                <thead>
                <tr>
                  <th>NO</th>
                  <th>ID PRODUCT</th>
                  <th>IMAGE</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>COUNT</th>
                </tr>
                </thead>
          {productOrder && productOrder?.map((item, i) => {
            return (
                <tbody key={i}>
                <tr>
                  <td>{i+1}</td>
                  <td>{dataOrder._id}</td>
                  <td>
                    <div className="imgOrder">
                      <img src={item.data.img1} alt="" />
                    </div>
                  </td>
                  <td>{item.data.name}</td>
                  <td>{formatter.format(item.data.price) + " VND"}</td>
                  <td>{item.count}</td>
                </tr>
                </tbody>
            );
          })}
              </table>
        </div>
      </div>
    </>
  );
};
export default Order;
