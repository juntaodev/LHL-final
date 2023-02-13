import React from "react";
import HomeIntro from "../components/HomeIntro";
import Accordions from "../components/Accordions";
import StockList from "../components/StockList";
import AutoCompleteSearch from "../components/AutoCompleteSearch";
import TrendingStocks from "../components/TrendingStocks";

const Home = () => {
  return (
    <div className="max-w-[1280px] w-full mx-auto p-8 min-h-screen">
      <div className="">

        <HomeIntro />
        <AutoCompleteSearch />
      
      </div>
      <div className="">
      
        <TrendingStocks />
      </div>
    </div>
  );
};

export default Home;