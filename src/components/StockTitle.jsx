import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";

function StockTitle() {
  const [stock, setstock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  const API_KEY = 'KJEJ4ZQQOGDC75P4';
  const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${param.stockSymbol}&apikey=${API_KEY}`;

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setstock(response.data);
        setLoading(false);
        // console.log("stock", response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [url]);

  if (!stock) {
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
    <div className="py-2">

        <div className='text-center '>
          <Link to={`/stock/${param.stockSymbol}`}>
          <span className='p-2 text-2xl font-bold text-secondary hover:bg-base-200 card'>{stock?.Name}</span>
          </Link >      
           
        </div>

        {/* The button to open modal */}
        <label htmlFor="symbol" className="btn btn-block btn-ghost text-lg text-secondary">{stock?.Symbol} </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="symbol" className="modal-toggle" />
        <label htmlFor="symbol" className="modal cursor-pointer">
          <label className="modal-box relative text-secondary" htmlFor="">
            
            <p className="py-4">This is the ticker symbol of {stock?.Name}. Ticker symbols are used on stock exchanges because they are easy abbreviations that are useful to investors and analysts to help them identify stocks and obtain all relevant information such as stock split, dividend data, earnings reports, etc. There are some companies that trade with two different symbols on the same stock market because they offer two classes of shares, one with voting rights and another without voting rights.</p>
            <p className="py-4">An example is Alphabet, formerly known as Google, which trades under the symbols GOOGL and GOOG, representing the company's class A shares and class C shares, respectively. The symbols also help in identifying the type of shares traded on different stock exchanges. They are presented in different patterns in different indices, which makes them easy to find on trading sites and stock exchange websites.</p>
          </label>
        </label>        
        
        
      
    </div>
  )
}

export default StockTitle