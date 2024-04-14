import { useState } from "react";

import Navbar from "../Homepage/Nav/navbar";

import "./cart.css";
import { useNavigate} from "react-router-dom";

const Cart = () => {
  const [amount, setAmount] = useState(0);
  const [remove, setRemove] = useState(0);
  const navigate = useNavigate();

  console.log({ amount });
  console.log({ remove });

  let productArray;
  let sum = 0;
  let totalPrice = [];
  const formatter = new Intl.NumberFormat("en-US", {
    thousandSeparator: ".",
    currency: "VND",
  });

  function getLocal() {
    let getData = localStorage.getItem("products") || [];
    productArray = JSON.parse(getData);
  }
  getLocal();
  console.log({ productArray });
  function setLocal() {
    localStorage.setItem("products", JSON.stringify(productArray));
  }
  setLocal();
  let index;
  function cartCheck(id) {
    for (let i = 0; i < productArray.length; i++) {
      if (productArray[i].data._id === id) {
        index = i;
        break;
      }
    }
  }
  function incrementCount() {
    if (index >= 0) {
      productArray[index].count++;
      localStorage.setItem("products", JSON.stringify(productArray));
      getLocal();
    }
  }

  function decrementCount() {
    if (index >= 0 && productArray[index].count > 0) {
      productArray[index].count--;
      localStorage.setItem("products", JSON.stringify(productArray));
      getLocal();
    }
  }
  function removeCart() {
    productArray.splice(index, 1);
    setLocal();
    getLocal();
  }
 
  const setTotalCount = (totalPrice) => {
    localStorage.setItem("count", JSON.stringify(totalPrice));
  }

  const getTotalCount = () => {
    let getData = localStorage.getItem("count") || [];
    let countArray = JSON.parse(getData);
    countArray.forEach((el) => sum += el);
  }
  getTotalCount();


      return (
        <>
          <Navbar />
          <div className="bannerImg">
            <div className="cartShopping">CART SHOPPING</div>
          </div>
          <div className="shoppingCart">
            <h2>SHOPPING CART</h2>
          </div>
          <div className="cartDetail">
            <div className="tableContent">
              <table>
                <thead>
                  <tr className="headTable">
                    <th>IMAGE</th>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    <th>REMOVE</th>
                  </tr>
                </thead>
                <tbody>
                  {productArray?.map((product) => {
                    totalPrice.push(product.data.price * product.count);
                    setTotalCount(totalPrice);

                  return ( 
                  <>
                    <tr key={Math.random()}>
                      <th className="cartImg" key={Math.random()}>
                        <img
                          key={Math.random()}
                          src={product.data.img1}
                          alt=""
                        />
                      </th>
                      <th key={Math.random()} className="cartName">
                        {product.data.name}
                      </th>
                      <th key={Math.random()} className="cartPrice">
                        {formatter.format(product.data.price) + " VND"}
                      </th>
                      <th className="cartQuantity">
                        <div className="plusMinus">
                          <div className="minusAmount">
                            <button
                            type="button"
                              key={Math.random()}
                              onClick={() => {
                                cartCheck(product.data._id);
                                decrementCount();
                                setAmount(productArray[index].count); //Cap nhat lai trang thai cua product sau khi luu vao local

                                console.log(
                                  "productArray[index][1]",
                                  productArray[index].count
                                );
                                console.log({ index });
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-caret-left-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                              </svg>
                            </button>
                          </div>

                          <div className="countCart">{product.count}</div>

                          <div className="plusAmount">
                            <button
                            type="button"
                              key={Math.random()}
                              onClick={() => {
                                cartCheck(product.data._id);
                                incrementCount();
                                setAmount(productArray[index].count);
                                console.log(
                                  "productArray[index][1]",
                                  productArray[index].count
                                );
                                console.log({ index });
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-caret-right-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </th>
                      <th className="cartAmount">
                     { 
                    

                     <div key={Math.random()}>
                          {formatter.format(
                            product.data.price * product.count
                          ) + " VND"} 
                          
                        </div>}
                      </th>
                      <th className="cartRemove">
                        <div className="removeCart">
                          <button
                          type="button"
                            key={Math.random()}
                            onClick={() => {
                              cartCheck(product.data._id);
                              console.log({ index });
                              removeCart();
                              setRemove(product);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path
                                fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </button>
                        </div>
                      </th>
                    </tr>
                  </>
                  ); 
                   })}
                </tbody>
              </table>
              <div className="continueProcceed">
                <div className="continueShopping">
                  <button type="button" key={Math.random()} onClick={() => navigate("/shop")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                    Continue Shopping
                  </button>
                </div>
                <div className="procceedCheckout">
                  <button type="button"
                    key={Math.random()}
                    onClick={() => navigate("/checkout")}
                  >
                    Procceed to Checkout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="cartTotal">
              <h2>CART TOTAL</h2>
              <div className="subtotal">
                <h3>SUBTOTAL</h3>
                <div className="subtotalContent" key={Math.random()}>
                  {formatter.format(sum) + " VND"}
                </div>
              </div>
              <div className="total">
                <h3>TOTAL</h3>
                <div className="totalContent" key={Math.random()}>
                  {formatter.format(sum) + " VND"}
                </div>
              </div>
              <div className="coupon">
                <div className="couponInput">
                  <input placeholder="Enter your coupon" />
                </div>
                <div className="couponButton">
                  <button type="button">
                    <div className="couponDetail">
                      <div className="buttonImg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-gift"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zM1 4v2h6V4H1zm8 0v2h6V4H9zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5V7zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5H7z" />
                        </svg>
                      </div>
                      <div className="couponApply"  onClick={() => navigate("/checkout")}>Apply coupon</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </>
      );
    // });
  // }
};
export default Cart;
