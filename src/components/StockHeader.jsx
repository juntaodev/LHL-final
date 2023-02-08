import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import StockTitle from './StockTitle';
import StockPrice from './StockPrice';


function StockHeader() {
  

  return (
    <div>

      <StockTitle/>
      <StockPrice/>

    </div>
  )
}

export default StockHeader
