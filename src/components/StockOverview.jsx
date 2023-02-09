import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import StockKeyValue from './StockKeyValue';
import StockInfo from './StockInfo';
import StockFinancials from './StockFinancials';
import StockTrade from './StockTrade';

function StockOverview() {
  

  return (
    <div className="">

      {/* upper layout */}
      <div className="flex flex-col w-full lg:flex-row">
      
        {/* key value */}
        <StockKeyValue />
      
        <div className="divider lg:divider-horizontal"></div> 
        
        {/* trading */}
        <StockTrade />
      
      </div>

      <div className="divider"></div> 
      
      {/* lower layout */}
      <div className="flex flex-col w-full lg:flex-row">
        
        {/* financials */}
        <StockFinancials />
      
        <div className="divider lg:divider-horizontal"></div>
        
        {/* info */}
        <StockInfo />
        
      </div>

    </div>
  );
}

export default StockOverview;
