import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import StockTitle from './StockTitle';
import StockPrice from './StockPrice';
import RealTime from './RealTime';

function StockHeader() {
  

  return (
    <div className=''>
      <div className='grid flex-grow card  place-items-center'>
      <RealTime/>
      <StockTitle/>
      <StockPrice/>
      </div> 
    </div>
  )
}

export default StockHeader
