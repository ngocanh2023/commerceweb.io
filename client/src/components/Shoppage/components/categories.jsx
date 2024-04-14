import { useState } from "react";

import { useGetAllProductsQuery } from "../../Store/apiSlice";

import { Link } from "react-router-dom";

import "./categories.css";

const Categories = () => {
  const formatter = new Intl.NumberFormat("en-US", {
    thousandSeparator: ",",
    currency: "VND",
  });

  const { data: datas } = useGetAllProductsQuery();
  const [items, setData] = useState(datas);

  const [start, setStart] = useState(true);
  const [filter, setFilter] = useState(false);

  console.log({ items });
  console.log({ datas });

  console.log({ start });
  console.log({ filter });

  return (
    <>
      <div className="shopcontent">
        <div className="cate">
          <div className="categories">CATEGORIES</div>
          <div className="catedetail">
            <button type="button" className="apple">APPLE</button>
            <button type="button"
              onClick={() => {
                if (start === false) {
                  setStart(true);
                  setFilter(false);
                }
              }}
              className="all"
            >
              All
            </button>
            <button type="button" className="iphonemac">IPHONE & MAC</button>
            <button type="button"
              onClick={() => {
                if (start === true) {
                  setStart(false);
                }
                setFilter(true);
                setData("iphone");
              }}
              className="iphone"
            >
              Iphone
            </button>
            <button type="button"
              onClick={() => {
                if (start === true) {
                  setStart(false);
                }
                setFilter(true);
                setData("ipod");
              }}
              className="ipod"
            >
              Ipod
            </button>
            <button type="button"
              onClick={() => {
                if (start === true) {
                  setStart(false);
                }
                setFilter(true);
                setData("ipad");
              }}
              className="mac"
            >
              Macbook
            </button>
            <button type="button" className="wireless">WIRELESS</button>
            <button type="button"
              onClick={() => {
                if (start === true) {
                  setStart(false);
                }
                setFilter(true);
                setData("airpod");
              }}
              className="airpod"
            >
              Airpod
            </button>
            <button type="button"
              onClick={() => {
                if (start === true) {
                  setStart(false);
                }
                setFilter(true);
                setData("watch");
              }}
              className="watch"
            >
              Watch
            </button>
            <button type="button" className="other">OTHER</button>
            <button type="button"
              onClick={() => {
                if (start === true) {
                  setStart(false);
                }
                setFilter(true);
                setData("mouse");
              }}
              className="mouse"
            >
              Mouse
            </button>
            <button type="button"
              onClick={() => {
                if (start === true) {
                  setStart(false);
                }
                setFilter(true);
                setData("keyboard");
              }}
              className="keyboard"
            >
              Keyboard
            </button>
            <button type="button" className="other">Other</button>
          </div>
        </div>
        <div>
          <div className="shopdetail">
            <div className="shopsearch">
              <div className="search">
                <input placeholder="Enter Search Here!" />
              </div>
              <div className="select">
                <select>
                  <option>Default Sorting</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <div className="trendingproduct" key={Math.random()}>
              {start &&
                datas?.map((item,i) => {
                  const { img1, name, price, _id } = item;
                  return (
                    <Link to={`/shop/${_id.$oid}`} key={i}>
                      <div key={i} className="trending">
                        {<img src={img1} alt="" />}

                        <div key={item.id} className="trendingname">
                          {name}
                        </div>
                        <div key={item.id} className="trendingprice">
                          {formatter.format(price) + " VND"}
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>

            <div className="trendingproduct" key={Math.random()}>
              {filter &&
                datas
                  ?.filter((item) => item.category === items)
                  ?.map((item) => {
                    const { img1, name, price, _id } = item;
                    return (
                      <Link to={`/shop/${_id.$oid}`}>
                        <div key={item.id} className="trending">
                          {<img src={img1} alt="" />}

                          <div key={item.id} className="trendingname">
                            {name}
                          </div>
                          <div key={item.id} className="trendingprice">
                            {formatter.format(price) + " VND"}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
