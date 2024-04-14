import React from "react";

import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="customer">
          <div className="customerheader">CUSTOMER SERVICES</div>
          <div className="customer1">Help & Contact Us</div>
          <div className="customer2">Returns & Refunds</div>
          <div className="customer3">Online Stores</div>
          <div className="customer4">Terms & Conditions</div>
        </div>
        <div className="customer">
          <div className="customerheader">COMPANY</div>
          <div className="customer1">What We Do</div>
          <div className="customer2">Avaiable Services</div>
          <div className="customer3">Latest Posts</div>
          <div className="customer4">FAQs</div>
        </div>
        <div>
          <div className="customerheader">SOCIAL MEDIA</div>
          <div className="customer1">Twitter</div>
          <div className="customer2">Instagram</div>
          <div className="customer3">Facebook</div>
          <div className="customer4">Pinterest</div>
        </div>
      </div>
    </>
  );
};
export default Footer;
