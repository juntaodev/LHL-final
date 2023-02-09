import React from 'react';
import StockIncome from '../components/StockIncome';
import StockBalance from '../components/StockBalance';
import StockCashflow from '../components/StockCashflow';

const StockDocuments = () => {
  return (
    <div>
      <StockIncome />
      <StockBalance />
      <StockCashflow />
    </div>
  )
}

export default StockDocuments
