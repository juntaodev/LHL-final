import React from 'react';
import StockLogo from './StockLogo'
import StockDesc from './StockDesc';

function CompanyInfo() {

  return (
    <div className='flex flex-grow '>
      <div className='px-8 py-4'><StockLogo /></div> 
      <div className=''><StockDesc /></div> 
    </div>
  )

}

export default CompanyInfo;