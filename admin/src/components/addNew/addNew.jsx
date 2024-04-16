import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./addNew.css";

const AddNew = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: 0,
        stock: 0,
        long_desc: '',
        short_desc: "",
        images: []
      });
      const navigate = useNavigate()

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleImageChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
      };
    const handleUpload = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        formDataToSend.append('name', formData.name);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('long_desc', formData.long_desc);
        formDataToSend.append('short_desc', formData.short_desc);
        formDataToSend.append('stock', formData.stock);
        // formData.append('images', images);
    
        for (let i = 0; i < formData.images.length; i++) {
            formDataToSend.append('images', formData.images[i]);
          }

        await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formDataToSend
          })
          .then(response => response.json())
          .then(data => {console.log("data1",data);
            navigate("/")
        })
          .catch(error => console.error('Error:', error));
        };
    
    return (
        <div className="addItems">
        <div className="addnewAll">
        <div className="addReturn">
            <button onClick={() => navigate(-1)}>Return</button>
            </div>
            <form className="addNewBtn" onSubmit={handleUpload}>
                <div className="addNews">
                <div className="addNewTit">ADD NEW</div>
                <div className="proInp">
                    <div className="proName">Product Name</div>
                    <div className="enterName"><input type="text" name="name" placeholder="Enter Product Name" onChange={handleChange} /></div>
                </div>
                <div className="cateInp">
                    <div className="proName">Category</div>
                    <div className="enterCate"><input type="text" name="category" placeholder="Enter Category" onChange={handleChange} /></div>
                </div>
                <div className="descInp">
                    <div className="shortDes">Price</div>
                    <div className="enterDesc"><input type="number" name="price" placeholder="Enter Price" onChange={handleChange} /></div>
                </div>
                <div className="longInp">
                    <div className="longDesc">Long Description</div>
                    <div className="enterLong"><input type="text" name="long_desc" placeholder="Enter Long Description" onChange={handleChange} /></div>
                </div>
                <div className="longInp">
                    <div className="longDesc">Short Description</div>
                    <div className="enterLong"><input type="text" name="short_desc" placeholder="Enter Short Description" onChange={handleChange} /></div>
                </div>
                <div className="stockInp">
                    <div className="stockTit">Stock</div>
                    <div className="enterStock"><input type="number" name="stock" placeholder="Enter Stock" onChange={handleChange} /></div>
                </div>
                <div className="imageUp">
                    <div className="uploadImg">Upload Images</div>
                    
                    <div className="fileInp"><input type="file" multiple onChange={handleImageChange} /></div>
                    
                </div>
                <div className="submitBtn"><button type="submit" >Submit</button> 

                </div>
                </div>
            </form>
            
            </div>
        </div>
    )
}
export default AddNew;