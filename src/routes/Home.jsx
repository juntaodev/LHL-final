import React from "react";
import About from "../components/About";
import Accordions from "../components/Accordions";
import StockList from "../components/StockList";
import StockSearch from "../components/StockSearch";

const Home = () => {
  return (
    <div>
      <div>
      <About />
      <Accordions />
      </div>
      <div>
      <StockSearch />
      <StockList />
      </div>
    </div>
  );
};

export default Home;