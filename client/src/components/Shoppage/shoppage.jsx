import Navbar from "../Homepage/Nav/navbar";
import Banner from "../Homepage/Banner/banner";
import Categories from "./components/categories";

import Footer from "../Homepage/Footer/Footer";
// import { Provider } from "react-redux";

const Shoppage = () => {
  return (
    <>
        <Navbar />
        <Banner />
        <Categories />
        <Footer />
      
    </>
  );
};

export default Shoppage;
