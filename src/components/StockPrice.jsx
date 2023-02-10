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
        'X-RapidAPI-Key': '3739bf6e15msh3f361324e7ae496p1291a4jsneeac436b4fc4',
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
    return <div>Loading...</div>;
  }
  if (error) return <p>An error occurred: {error.message}</p>;
  
  return (

    <div className="indicator">
      <span className="indicator-item indicator-bottom badge badge-sm ">USD</span>
      <div className="py-2 card bg-base-200">
        <p className='text-2xl font-bold text-gray-700 px-2'>${Number(stockPrice).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default StockPrice