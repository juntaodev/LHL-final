import React from 'react';
import StockCard from './StockCard';

const TrendingStocks = () => {
  return (

    <div className='max-w-[640px] mx-auto place-items-center'> 
      <p className='text-primary pb-8 text-center font-bold text-2xl'>TOP COMPANIES</p>
      <div className='grid grid-cols-5 gap-8 '>

      <StockCard ticker='AAPL' />
      <StockCard ticker='MSFT' />
      
      <StockCard ticker='AMZN' />
      
      <StockCard ticker='TSLA' />
      <StockCard ticker='NVDA' />
      <StockCard ticker='XOM' />
      <StockCard ticker='V' />
      <StockCard ticker='UNH' />
      <StockCard ticker='JPM' />
      <StockCard ticker='JNJ' />
      <StockCard ticker='WMT' />
      <StockCard ticker='MA' />
      <StockCard ticker='CVX' />
      <StockCard ticker='LLY' />
      <StockCard ticker='PG' />

      </div>
    </div>
  )
}

export default TrendingStocks
