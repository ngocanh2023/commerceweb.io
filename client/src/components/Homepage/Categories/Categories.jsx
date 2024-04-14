import React, { Fragment } from "react";

import product_1 from "../image/product_1.png";
import product_2 from "../image/product_2.png";
import product_3 from "../image/product_3.png";
import product_4 from "../image/product_4.png";
import product_5 from "../image/product_5.png";

import { useNavigate } from "react-router-dom";

import "./Categories.css";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="imgall">
        <div className="line1img">
          <div className="img1">
            <img
              key={Math.random()}
              src={product_1}
              alt=""
              onClick={() => navigate("/shop")}
            />
          </div>
          <div className="img2">
            <img
              key={Math.random()}
              src={product_2}
              alt=""
              onClick={() => navigate("/shop")}
            />
          </div>
        </div>
        <div className="line2img">
          <div className="img3">
            <img
              key={Math.random()}
              src={product_3}
              alt=""
              onClick={() => navigate("/shop")}
            />
          </div>
          <div className="img4">
            <img
              key={Math.random()}
              src={product_4}
              alt=""
              onClick={() => navigate("/shop")}
            />
          </div>
          <div className="img5">
            <img
              key={Math.random()}
              src={product_5}
              alt=""
              onClick={() => navigate("/shop")}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Categories;
