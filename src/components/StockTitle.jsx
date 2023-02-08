import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


function StockTitle() {
  const [stockProfile, setStockProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  useEffect(() => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/profile',
      params: {symbol: `${param.stockSymbol}`},
      headers: {
        'X-RapidAPI-Key': '3739bf6e15msh3f361324e7ae496p1291a4jsneeac436b4fc4',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };
    axios
      .request(options)
      .then(response => {
        setStockProfile(response.data);
        setLoading(false);
        console.log("profile", response.data)
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [param.stockSymbol]);

  if (!stockProfile) {
    return <div>Loading...</div>;
  }
  if (error) return <p>An error occurred: {error.message}</p>;
  
  return (
    <div className="py-2">

        <div className='text-center'>
      
          <span className='py-2 text-2xl font-bold  text-gray-700'>{stockProfile['name']}</span> 
        </div>

        {/* The button to open modal */}
        <label htmlFor="symbol" className="btn btn-block btn-ghost text-lg text-gray-600">{stockProfile['symbol']} </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="symbol" className="modal-toggle" />
        <label htmlFor="symbol" className="modal cursor-pointer">
          <label className="modal-box relative text-gray-600" htmlFor="">
            
            <p className="py-4">This is the ticker symbol of {stockProfile['name']}. Ticker symbols are used on stock exchanges because they are easy abbreviations that are useful to investors and analysts to help them identify stocks and obtain all relevant information such as stock split, dividend data, earnings reports, etc. There are some companies that trade with two different symbols on the same stock market because they offer two classes of shares, one with voting rights and another without voting rights.</p>
            <p className="py-4">An example is Alphabet, formerly known as Google, which trades under the symbols GOOGL and GOOG, representing the company's class A shares and class C shares, respectively. The symbols also help in identifying the type of shares traded on different stock exchanges. They are presented in different patterns in different indices, which makes them easy to find on trading sites and stock exchange websites.</p>
          </label>
        </label>        
        
        
      
    </div>
  )
}

export default StockTitle