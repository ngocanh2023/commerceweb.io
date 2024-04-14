import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./checkout.css";

const Checkout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  
  const date = new Date();
  console.log("date", date);

  let getCustomerArray = [];
  let productArray = [];
  let checkArray = [];
  let sum = 0;
  let getData = localStorage.getItem("products") || [];
  productArray = JSON.parse(getData);

  getCustomerArray.push({ name, email, phone, address });
  localStorage.setItem("checkOutData", JSON.stringify(getCustomerArray));

  let customerArray = JSON.parse(localStorage.getItem("checkOutData"));
  console.log("CustomerArray", customerArray);

  const setOrder = () => {
    checkArray.push({ productArray, customerArray });
    console.log("checkArray", checkArray);
  };

  const validateOrder = () => {
    if (name.length === 0) {
      alert("Please input name!");
    } else if (email.length === 0) {
      alert("Please input email!");
    } else if (phone.length === 0) {
      alert("Please input phone!");
    } else if (address.length === 0) {
      alert("Please input address!");
    } else if (
      name.length !== 0 &&
      email.length !== 0 &&
      phone.length !== 0 &&
      address.length !== 0
    ) {
      setOrder();
      sendMailCus();
      postDataMongose();
      // alert("YOUR ORDER SUCCESS!");
      navigate(`/history`);
    }
  };

  const navigate = useNavigate();

  const formatter = new Intl.NumberFormat("en-US", {
    thousandSeparator: ".",
    currency: "VND",
  });

  function sumCart() {
    for (let i = 0; i < productArray.length; i++) {
      sum += Number(productArray[i].data.price * productArray[i].count);
    }
    return sum;
  }

  const sendMailCus = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      customerArray,
      productArray,
      date,
      sum,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("http://localhost:5000/sendmail", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        // navigate("/");
      })
      .catch((error) => console.error(error));
  };
  const postDataMongose = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      customerArray,
      productArray,
      date,
      sum,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("http://localhost:5000/userProduct", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  console.log("productArray", productArray);

  return (
    <>
      <div className="bannerCheckout">
        <div className="checkout">
          <h1>CHECKOUT</h1>
        </div>
        <div className="toolbar">
          <div className="homeTool">
            <button type="button" onClick={() => navigate("../")}>HOME /</button>
          </div>
          <div className="cartTool">
            <button type="button" onClick={() => navigate("../cart")}>CART /</button>
          </div>
          <div className="checkTool">
            <button type="button" onClick={() => navigate("/checkout")}>CHECKOUT</button>
          </div>
        </div>
      </div>
      <div>
        <div className="checkContent">
          <div className="checkDetails">
            <div className="billDetail">
              <h2>BILLING DETAILS</h2>
            </div>
            <div className="fullName">
              <h3>FULL NAME</h3>
            </div>
            <div className="inputName">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="email">
              <h3>EMAIL</h3>
              <div className="inputEmail">
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="phoneNumber">
              <h3>PHONE NUMBER</h3>
              <div className="inputPhone">
                <input
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="address">
              <h3>ADDRESS</h3>
              <div className="inputAddress">
                <input
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="placeOrder">
              <button type="button"
                onClick={(e) => {
                  validateOrder();
                }}
              >
                Place Order
              </button>
            </div>
          </div>
          <div className="yourOrder">
            <h2>YOUR ORDER</h2>
            {productArray?.map((product,i) => {
              return (
                <div className="typePrice" key={i}>
                  <div key={Math.random()} className="typeOrder">
                    {product.data.name}
                  </div>
                  <div key={Math.random()} className="priceOrder">
                    {formatter.format(product.data.price) + " VND"} x{" "}
                    {product.count}
                  </div>
                </div>
              );
            })}
            <div className="totalPrice">
              <div className="totalOrder">TOTAL</div>
              <div className="priceTotal" key={Math.random()}>
                {formatter.format(sumCart()) + " VND"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Checkout;
