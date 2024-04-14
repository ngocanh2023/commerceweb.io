import React from "react";

const Modal = (props) => {
  console.log({ props });
  return (
    <>
      <div>
        <div>
          <img src={props.img1} alt="" />
        </div>
        <div>{props.short_desc}</div>
        <div>{props.name}</div>
        <div>{props.price}</div>
        <div>{props.id}</div>
      </div>
    </>
  );
};

export default Modal;
