import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Table from "./table";
import Cookies from "js-cookie";

import "./admin.css";

const Admin = () => {
  const [proData, setProData] = useState([]);
  const [searchInp, setSearchInp] = useState("");
  const [adminData, setAdminData] = useState(null);

  const navigate = useNavigate();

  // console.log('adminData', adminData)
  let emailLogin;
  let getUser;

  getUser = Cookies.get("admin") ?? "[]"; //ra string khong phai stringify
  const array = getUser.split(",")  //chuyen ve stringify json

  const emailArray = JSON.parse(array);
  emailLogin = emailArray.username;
  console.log('emailLogin', getUser, array, !!emailLogin, !emailLogin)

  const removeCookie = () => {
    Cookies.remove("admin");
    navigate("/login");
    // window.location.reload();
  };

  function searchBtn(arr, query) {
    return arr.filter((data) =>
      data.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  // console.log("search", searchBtn(proData, searchInp));

  const fetchProducts = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("http://localhost:5000/product", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setProData(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  };


  const deleteById = async () => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };

    await fetch(`http://localhost:5000/adProduct`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log("resultDelete", result))
      .catch((error) => console.error(error));
  }

  const fetchAdminProducts = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    await fetch("http://localhost:5000/getAdminProduct", requestOptions)
      .then((response) => response.text())
      .then((result) =>  {setAdminData(JSON.parse(result))})
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchProducts();
    fetchAdminProducts();
    // eslint-disable-next-line
  }, []);

  // console.log("adminData", adminData);

  return (
    <>
      <nav className="adminNav">
        <div className="adminTit">@dmin</div>
        
        <div className="adminMenu">
          <div
            className="adminHome"
            onClick={() => {
              window.location.href = "http://localhost:3000/";
            }}
          >
            Home
          </div>
          <div className="dashboard" onClick={() => { navigate("/dashboard") }}>Dashboard</div>
          <div className="chatApp" onClick={() => { navigate("/chatApp") }}>ChatApp</div>
          {!emailLogin && <div className="loginApp" onClick={() => { navigate("/login") }}>Login</div>}
          {!!emailLogin && <div className="loginApp" onClick={() => { navigate("/login"); removeCookie() }}>Logout</div>}
        </div>
      </nav>
      <div className="searchTool">
        <div className="searchInp">
          <input
            type="text"
            placeholder="please search..."
            onChange={(e) => {
              setSearchInp(e.target.value);
            }}
          />
        </div>
        <div className="searchBtn">
          <button
            type="button"
            className="btnSearch"
            onClick={() => {
              searchBtn(proData, searchInp);
            }}
          >
            Search
          </button>
        </div>
        <div className="addNew"><button onClick={() => { navigate("/addnew") }}>Add New</button></div>
      </div>
      {/* MODAL */}
      <div id="id01" className="modal">
        <span
          onClick={() => {
            document.getElementById("id01").style.display = "none";
          }}
          className="close"
          title="Close Modal"
        >
          &times;
        </span>
        <form className="modal-content" action="/action_page.php">
          <div className="container">
            <h1>Delete Product</h1>
            <p>Are you sure you want to delete your product?</p>

            <div className="clearfix">
              <button
                type="button"
                className="cancelbtn"
                onClick={() => {
                  document.getElementById("id01").style.display = "none";
                }}
              >
                Cancel
              </button>
              <button type="button" className="deletebtn" onClick={() => {
                console.log('clicked!');
                deleteById();
                document.getElementById("id01").style.display = "none";
                window.location.reload();
              }}>
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>

      {/*  */}

      <div className="tableAdmin">
        <table className="tableMenu">
          <thead className="headTable">
            <tr className="menuAdmin">
              <th>NO</th>
              <th>ID PRODUCT</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>STOCK</th>
              <th>IMAGE</th>
              <th>CATEGORY</th>
              <th>EDIT</th>
            </tr>
          </thead>
          {!!emailLogin && adminData && <Table datas={searchBtn(adminData, searchInp)} />}
          {!emailLogin && <div>Please Login First!</div>}

        </table>
        
      </div>
    </>
  );
};
export default Admin;
