import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./history.css";

const History = () => {
  const navigate = useNavigate();
  const formatter = new Intl.NumberFormat("en-US", {
    thousandSeparator: ".",
    currency: "VND",
  });

  const [proData, setProData] = useState([]);
  const [userId, setUserId] = useState("");

  let cusData = [];
  let emailLogin, getUser;
  const getDataUser = () => {
    getUser = Cookies.get("user") ?? "[]"; //ra string khong phai stringify
    const array = getUser.split(","); //chuyen ve stringify json

    const emailArray = JSON.parse(array);
    emailLogin = emailArray.email;
  };
  getDataUser();
  console.log("emailLogin1", emailLogin);

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

  

  const fetchProducts = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("http://localhost:5000/getProducts", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log("result", result);
        setProData(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchProducts();
    if(emailLogin){
      handleId()
    }
    // eslint-disable-next-line
  }, []);

  console.log("proData", proData);
  console.log("cusData", cusData);
  console.log("cus", cusData[0]?.email);
  console.log('userId', userId)

  return (
    <>
      <nav className="hisNav">
        <div className="navHistory">History</div>
        <div className="navHome">
          <div
            className="homeMenu"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </div>
        </div>
      </nav>
      <div className="tableHistory">
        <table className="tableHis">
          <thead className="headHis">
            <tr className="menuHistory">
              <th>NO</th>
              <th>ID ORDER</th>
              <th>ID CUSTOMER</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>TOTAL</th>
              <th>DELIVERY</th>
              <th>STATUS</th>
              <th>DETAIL</th>
            </tr>
          </thead>
          {proData.map((data, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <td>{i + 1}</td>
                  <td>{data._id}</td>
                  <td>{userId}</td>
                  <td>{data.customerArray[0].name}</td>
                  <td>{data.customerArray[0].phone}</td>
                  <td>{data.customerArray[0].address}</td>
                  <td>{formatter.format(data.sum) + " VND"}</td>
                  <td>Waiting for progressing</td>
                  <td>Waiting for pay</td>
                  <td>
                    <div className="btnHis">
                      <button type="button"
                        onClick={() => {
                          navigate(
                            `/history/${data._id}`
                          );
                        }}
                      >
                        View{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          fill="currentColor"
                          className="bi bi-arrow-right"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};
export default History;
