import React from "react";
import About from "../components/About";
import Accordion from "../components/Accordion";
import StockList from "../components/StockList";

const Home = ({ coins }) => {
  return (
    <div>
      <About />
      <Accordion />
      <StockList />
    </div>
  );
};

export default Home;