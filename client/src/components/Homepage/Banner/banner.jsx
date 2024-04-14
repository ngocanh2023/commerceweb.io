import React from "react";

import "./banner.css";

import banner1 from "../image/banner1.jpg";

const Banner = () => {
  return (
    <>
      <div className="banner">
        <div className="banner1">
          <img src={banner1} alt="" />
        </div>
        <div className="banner1content">
          <div className="banner11">NEW INSPIRATION 2020</div>
          <div className="banner12">20% OFF ON NEW SEASON</div>
          <button type="button">Browse Collections</button>
        </div>
      </div>
    </>
  );
};

export default Banner;
