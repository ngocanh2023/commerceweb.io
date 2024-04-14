import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Navbar from "../../Homepage/Nav/navbar";

import "./ProductDetails.css";

const ProductDetails = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const { dataId } = useParams();

  const fetchDataId = async () => {
    const requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(`http://localhost:5000/product?id=${dataId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setData(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    fetchDataId();
    // eslint-disable-next-line
  }, []);

  // console.log("data", data, typeof data);
  console.log("dataid", dataId);
  console.log("category", data.category);

  const navigate = useNavigate();

  const plus = () => {
    setCount(count + 1);
  };
  const minus = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    thousandSeparator: ".",
    currency: "VND",
  });

  // const dataToLocalStorage = () => {
  //   let getData = localStorage.getItem("products") || [];
  //   let productArray = JSON.parse(getData);

  //   const setProducts = () => {
  //     localStorage.setItem("products", JSON.stringify(productArray));
  //   };
  //   let dataArr = [];
  //   let index;
  //   index = productArray?.find((item) => item.dataArr._id === dataId);
  //   console.log("index", index);
  //   console.log("productArray", productArray);

  //   if (productArray?.length === 0) {
  //     dataArr.push(count);
  //     productArray.push(dataArr);
  //     setProducts();
  //     // navigate("/cart");
  //   } else if (!index) {
  //     dataArr.push(count);
  //     productArray.push(dataArr);
  //     setProducts(data);
  //   } else {
  //     alert("This product unique!");
  //   }
  // };

  const checkUnique = () => {
    let productArray = [];
    let dataArr = [];
    let getData;
    getData = localStorage.getItem("products");
    dataArr = JSON.parse(getData);

    const setProducts = (productArray) => {
      localStorage.setItem("products", JSON.stringify(productArray));
    };

    let checkTrue;

    if (dataArr === null) {
      productArray.push({ data, count });
      setProducts(productArray);
      navigate("/cart");
    } else {
      checkTrue = dataArr?.find((item) => item.data._id === dataId);

      if (!checkTrue) {
        dataArr.push({ data, count });
        setProducts(dataArr);
        navigate("/cart");
      } else {
        alert("This product unique!");
      }
    }
    console.log("data1", data, typeof data);
    console.log("getData", getData, typeof getData);
    console.log("dataArr", dataArr);
    console.log("checkTrue", checkTrue, !checkTrue, !!checkTrue, !!!checkTrue);
  };

  return (
    <>
      <Navbar />
      <div className="productdetail">
        <div className="detail">
          <div></div>
          <div className="imgList">
            <div className="detailImg1">
              <img src={data.img1} alt={data.name} />
            </div>
            <div className="detailImg2">
              <img src={data.img2} alt={data.name} />
            </div>
            <div className="detailImg3">
              <img src={data.img3} alt={data.name} />
            </div>
            <div className="detailImg4">
              <img src={data.img4} alt={data.name} />
            </div>
          </div>

          <div className="img">
            <img src={data.img1} alt={data.name} />
          </div>

          <div className="detailInfo">
            <h1 className="detailName">{data.name}</h1>
            <div className="detailPrice">
              {formatter.format(data.price) + " VND"}
            </div>
            <div className="detailDesc">{data.short_desc}</div>
            <div className="detailCat">CATEGORY : {data.category}</div>
            <div className="cartButton">
              {/* <button onClick={decrementHandler}>-</button> */}
              <button type="button"
                onClick={() => {
                  minus();
                }}
              >
                -
              </button>
              <div className="countAmount">{count === 0 ? 0 : count}</div>
              {/* <button onClick={incrementHandler}>+ </button> */}
              <button type="button"
                onClick={() => {
                  plus();
                }}
              >
                +{" "}
              </button>
              <div className="artCart">
                <button type="button"
                  onClick={() => {
                    checkUnique();
                  }}
                >
                  Art to cart
                </button>
              </div>
            </div>

            <Link to="/shop" className="back">
              Back To Shoppage
            </Link>
          </div>
        </div>
        <div className="longDesc">
          <h2>PRODUCT DESCRIPTION</h2>
          <div className="longDetail">{data.long_desc}</div>
        </div>
        <div className="relatePost">
          <h2>RELATED POSTS</h2>
          <div className="related">
            <div>
              <Link to={`/shop/${data._id}`}>
                <div className="relatedImg">
                  <img src={data.img1} alt="" />
                </div>
                <div className="relatedName">{data.name}</div>
                <div className="relatedPrice">
                  {formatter.format(data.price) + " VND"}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
