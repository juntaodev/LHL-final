import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


function StockPrice() {
  const [stockPrice, setStockPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  useEffect(() => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/price',
      params: {symbol: `${param.stockSymbol}`, format: 'json', outputsize: '30'},
      headers: {
        'X-RapidAPI-Key': process.env.TWELVE_API_KEY,
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };
    axios
      .request(options)
      .then(response => {
        setStockPrice(response.data.price);
        setLoading(false);
        // console.log("price", response.data)
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [param.stockSymbol]);

  if (!stockPrice) {
     return <progress className="progress w-56"></progress>;
  }
  if (loading) {
    return <progress className="progress w-56"></progress>;
  }
  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Error! Something is Wrong! Try Refresh!</span>
        </div>
      </div>)
  }
  
  return (

    <div className="indicator">
      <span className="indicator-item indicator-bottom badge badge-sm ">USD</span>
      <div className="py-2 card bg-base-200">
        <p className='text-2xl font-bold text-secondary px-2'>${Number(stockPrice).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default StockPrice