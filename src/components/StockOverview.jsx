import React from 'react';

import StockValuations from './StockValuations';
import StockInfo from './StockInfo';
import StockFinancials from './StockFinancials';
import StockTrade from './StockTrade';
import CompanyInfo from './CompanyInfo';

function StockOverview() {
  

  return (
    <div className="max-w-[1280px] w-full mx-auto pb-8 h-100%">

      {/* upper layout */}
      <div className="flex flex-col w-full lg:flex-row">
      
        {/* key value */}
        <StockValuations />
      
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
