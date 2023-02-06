import React from "react";
import About from "../components/About";
import Accordions from "../components/Accordions";
import StockList from "../components/StockList";

const Home = ({ coins }) => {
  return (
    <div>
      <About />
      <Accordions />
      <StockList />
    </div>
  );
};

export default Home;