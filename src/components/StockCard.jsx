import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const StockCard = (props) => {
  const [stockLogo, setStockLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/logo',
      params: {symbol: `${props.ticker}`},
      headers: {
        'X-RapidAPI-Key': process.env.TWELVE_API_KEY,
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };
    axios
      .request(options)
      .then(response => {
        setStockLogo(response.data.url);
        setLoading(false);
        // console.log("Logo", response.data);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [props.ticker]);

  if (!stockLogo) {
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
    
    <Link to={`/stock/${props.ticker}`}>
    <div className='hover:scale-110 duration-300'>
    <div className="avatar">
      <div className="w-24 rounded">
        <img className='object-scale-down ' src={stockLogo} alt="company log"/>
      </div>
    </div>
    <p className='text-secondary pt-2 text-center font-bold'>{props.ticker}</p>
    </div>
    </Link>
  ) 
}

export default StockCard
