import React from 'react'
import CompanyGrowth from '../components/CompanyGrowth';
import CompanyProfit from '../components/CompanyProfit';
import CompanyReturn from '../components/CompanyReturn';
import CompanyHealth from '../components/CompanyHealth';
import StockHeader from '../components/StockHeader';

const StockEvaluation = () => {
  return (
    <div className='max-w-[1280px] w-full mx-auto pb-8 h-100%'>

      <StockHeader />

      <div className="divider"></div>

      <div className="flex flex-col w-full lg:flex-row">

        <CompanyGrowth />

        <div className="divider lg:divider-horizontal"></div> 

        <CompanyProfit/>

      </div>

      <div className="divider"></div>

      <div className="flex flex-col w-full lg:flex-row">

        <CompanyReturn/>
      
        <div className="divider lg:divider-horizontal"></div>

        <CompanyHealth />

      </div>

    </div>
  )
}

export default StockEvaluation
