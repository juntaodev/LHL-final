import React from 'react';

import StockTitle from './StockTitle';
import StockPrice from './StockPrice';

function StockHeader() {
  

  return (
    <div className=''>
      <div className='grid flex-grow card  place-items-center'>
      
        <StockTitle/>
        <StockPrice/>
      </div> 
    </div>
  )
}

export default StockHeader
