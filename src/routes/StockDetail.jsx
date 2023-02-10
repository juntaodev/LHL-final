import React from 'react';
import StockOverview from '../components/StockOverview';
import StockHeader from '../components/StockHeader';

function StockDetail() {
  
  return (
    <div className="max-w-[1280px] w-full mx-auto pb-8 h-100%">
      
      <StockHeader />

      <div className="divider"></div>
      
      <StockOverview /> 
  
    </div>
  );
}

export default StockDetail;
