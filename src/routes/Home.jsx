import React from "react";
import HomeIntro from "../components/HomeIntro";

import AutoCompleteSearch from "../components/AutoCompleteSearch";
import TrendingStocks from "../components/TrendingStocks";

const Home = () => {
  return (
    <div className="max-w-[1280px] w-full mx-auto p-8 min-h-screen">
      <div className="py-24">

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