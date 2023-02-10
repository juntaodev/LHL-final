import React from 'react';
import StockIncome from '../components/StockIncome';
import StockBalance from '../components/StockBalance';
import StockCashflow from '../components/StockCashflow';

const StockDocuments = () => {
  return (
    <div className='max-w-[1280px] w-full mx-auto pb-8 h-100%'>
      <StockIncome />

      <div className="divider"></div>

      <StockBalance />

      <div className="divider"></div>

      <StockCashflow />
    </div>
  )
}

export default StockDocuments
