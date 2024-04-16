import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"

import "./update.css"

const Update = () => {
  const [datas, setDatas] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    long_desc: '',
    short_desc: '',
    images: []
  });
  const navigate = useNavigate()

  const url = window.location.href;
  const productId = url.slice(29);

  console.log('productId', productId)
  console.log('datas', datas, datas.name)

  const fetchGetData = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    await fetch(`http://localhost:5000/getUpdateProducts?productId=${productId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => { setDatas(JSON.parse(result)) })
      .catch((error) => console.error(error));
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('stock', formData.stock);
    formDataToSend.append('long_desc', formData.long_desc);
    formDataToSend.append('short_desc', formData.short_desc);

    for (let i = 0; i < formData.images.length; i++) {
      formDataToSend.append('images', formData.images[i]);
    }
    const requestOptions = {
      method: "POST",
      body: formDataToSend,
      redirect: "follow"
    };

    await fetch(`http://localhost:5000/update?productId=${productId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {console.log("Updated");
    navigate("/")
    })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchGetData()
    // eslint-disable-next-line 
  }, [])


  return (
    <div className='updateItems'>
      <div className="returnbtn">
      <button onClick={() => navigate(-1)}>Return</button>
      </div>
    <div className='updateForm'>
      <h2>UPDATE PRODUCT</h2>

      {datas && <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input className="nameInp" type="text" name="name" placeholder={datas.name} onChange={handleChange} />
        <label htmlFor="category">Category:</label>
        <input className="categoryInp" type="text" name="category" placeholder={datas.category} onChange={handleChange} />
        <label htmlFor="price">Price:</label>
        <input className="priceInp" type="number" name="price" placeholder={datas.price} onChange={handleChange} />
        <label htmlFor="stock">Stock:</label>
        <input className="stockInp" type="number" name="stock" placeholder={datas.stock} onChange={handleChange} />
        <label htmlFor="long_desc">Long Description:</label>
        <textarea className="longText" name="long_desc" placeholder={datas.long_desc} onChange={handleChange}></textarea>
        <label htmlFor="short_desc">Short Description:</label>
        <textarea className="shortText" name="short_desc" placeholder={datas.short_desc} onChange={handleChange}></textarea>
        <label htmlFor="images">Images:</label>
        <input className="imageInp" type="file" name="images" multiple onChange={handleImageChange} />
        <button className="updateBtn" type="submit">Update</button>
      </form>}
      </div>
    </div>
  );
};

export default Update;