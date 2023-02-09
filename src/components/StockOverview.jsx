import React from 'react';

import StockKeyValue from './StockKeyValue';
import StockInfo from './StockInfo';
import StockFinancials from './StockFinancials';
import StockTrade from './StockTrade';
import CompanyInfo from './CompanyInfo';

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

      <div className="divider"></div> 

        {/* bottom layout */}
        <CompanyInfo />

    </div>
  );
}

export default StockOverview;
