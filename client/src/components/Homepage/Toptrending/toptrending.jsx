import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

// import store from "../../Store/store";
// import { updateState } from "../../Store/initialState";

import "./Page/Modal.css";
import "./toptrending.css";

function Toptrending() {
  const [items, setItems] = useState([]);

  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const toggleModal = (item) => {
    setModal(!modal);
    setData(item);
  };
  // console.log("1", items);

  const formatter = new Intl.NumberFormat("en-US", {
    thousandSeparator: ",",
    currency: "VND",
  });

  const fetchData = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("http://localhost:5000/product", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setItems(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    fetchData();
  }, []);

 
    return (
      <>
        <>
          {modal && (
            <div
              key={Math.random()}
              className="modal"
              onClick={() => toggleModal()}
            >
              <div key={Math.random()} className="modalimg">
                <img src={data.img1} alt="" />
              </div>

              <div key={Math.random()} className="modaldetail">
                <div key={Math.random()} className="modalname">
                  {data.name}
                </div>
                <div key={Math.random()} className="modalprice">
                  {formatter.format(data.price) + " VND"}
                </div>
                <div key={Math.random()} className="modaldesc">
                  {data.short_desc}
                </div>
                <div>
                  <button key={Math.random()} onClick={() => navigate("/shop")}>
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="productCenter">
            <div
              key={Math.random()}
              className="trendingproduct"
              id="trendingPt"
            >
              {items.map((item) => (
                <div key={Math.random()} className="trending">
                  <Button
                  type="button"
                    key={Math.random()}
                    variant="primary"
                    onClick={() => toggleModal(item)}
                  >
                    {<img src={item.img1} alt="" key={item.id} />}
                  </Button>
                  <div key={Math.random()} className="trendingname">
                    {item.name}
                  </div>
                  <div key={Math.random()} className="trendingprice">
                    {formatter.format(item.price) + " VND"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      </>
    );
  
}
export default Toptrending;
