import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const StockKeyValue = () => {
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
        console.log("info", response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [url]);

  if (!stock) {
    return <div>Loading...</div>;
  }
  if (error) return <p>An error occurred: {error.message}</p>;

  

  // convert decimal to percentage format
  const decToPercentage = (decimal) => {
    return `${(decimal * 100).toFixed(2)}%`;
  };
  
  return (
    <div className="grid flex-grow card bg-base-200 rounded-box place-items-center">
        {/* about section */}
        <p><strong>About </strong></p> 
        <div className="grid grid-cols-2 py-4 gap-4">

          {/* sector */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="sector" className="btn btn-sm btn-ghost ">sector</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="sector" className="modal-toggle" />
              <label htmlFor="sector" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2 font-bold">Market Cap = Shares Outstanding * Share Price </p>
                  <p className="py-2">The 'Market Cap' is short for market capitalization,  which is simply the company's current value in dollars. Market Cap can also be referred to as the valuation of a business, so if you ever hear someone  say valuation, they're talking about the company's Market Cap.</p>
                  <p className="py-2">When investors buy a stock, this is one of the main  numbers to pay attention to, as this is the value at which they are buying  shares in the company at. Many investors consider the market cap more  important than the share price of a business, as the Market Cap is what is  used in other common valuation methods and ratios, not the share price.</p>
                </label>
              </label>              
            </div>
            {stock.Sector? (
            <p className="pl-3">{stock.Sector}</p>
            ) : null}
          </div>

          {/* industry */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="industry" className="btn btn-sm btn-ghost ">industry</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="industry" className="modal-toggle" />
              <label htmlFor="industry" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2 font-bold">Market Cap = Shares Outstanding * Share Price </p>
                  <p className="py-2">The 'Market Cap' is short for market capitalization,  which is simply the company's current value in dollars. Market Cap can also be referred to as the valuation of a business, so if you ever hear someone  say valuation, they're talking about the company's Market Cap.</p>
                  <p className="py-2">When investors buy a stock, this is one of the main  numbers to pay attention to, as this is the value at which they are buying  shares in the company at. Many investors consider the market cap more  important than the share price of a business, as the Market Cap is what is  used in other common valuation methods and ratios, not the share price.</p>
                </label>
              </label>              
            </div>
            {stock.Industry? (
            <p className="pl-3">{stock.Industry}</p>
            ) : null}
          </div>

          {/* exchange */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="exchange" className="btn btn-sm btn-ghost ">exchange</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="exchange" className="modal-toggle" />
              <label htmlFor="exchange" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2 font-bold">Market Cap = Shares Outstanding * Share Price </p>
                  <p className="py-2">The 'Market Cap' is short for market capitalization,  which is simply the company's current value in dollars. Market Cap can also be referred to as the valuation of a business, so if you ever hear someone  say valuation, they're talking about the company's Market Cap.</p>
                  <p className="py-2">When investors buy a stock, this is one of the main  numbers to pay attention to, as this is the value at which they are buying  shares in the company at. Many investors consider the market cap more  important than the share price of a business, as the Market Cap is what is  used in other common valuation methods and ratios, not the share price.</p>
                </label>
              </label>              
            </div>
            {stock.Exchange? (
            <p className="pl-3">{stock.Exchange}</p>
            ) : null}
          </div>

          {/* currency */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="currency" className="btn btn-sm btn-ghost ">currency</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="currency" className="modal-toggle" />
              <label htmlFor="currency" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2 font-bold">Market Cap = Shares Outstanding * Share Price </p>
                  <p className="py-2">The 'Market Cap' is short for market capitalization,  which is simply the company's current value in dollars. Market Cap can also be referred to as the valuation of a business, so if you ever hear someone  say valuation, they're talking about the company's Market Cap.</p>
                  <p className="py-2">When investors buy a stock, this is one of the main  numbers to pay attention to, as this is the value at which they are buying  shares in the company at. Many investors consider the market cap more  important than the share price of a business, as the Market Cap is what is  used in other common valuation methods and ratios, not the share price.</p>
                </label>
              </label>              
            </div>
            {stock.Currency? (
            <p className="pl-3">{stock.Currency}</p>
            ) : null}
          </div>

          {/* FiscalYearEnd */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="FiscalYearEnd" className="btn btn-sm btn-ghost ">Fiscal Year End</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="FiscalYearEnd" className="modal-toggle" />
              <label htmlFor="FiscalYearEnd" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2 font-bold">Market Cap = Shares Outstanding * Share Price </p>
                  <p className="py-2">The 'Market Cap' is short for market capitalization,  which is simply the company's current value in dollars. Market Cap can also be referred to as the valuation of a business, so if you ever hear someone  say valuation, they're talking about the company's Market Cap.</p>
                  <p className="py-2">When investors buy a stock, this is one of the main  numbers to pay attention to, as this is the value at which they are buying  shares in the company at. Many investors consider the market cap more  important than the share price of a business, as the Market Cap is what is  used in other common valuation methods and ratios, not the share price.</p>
                </label>
              </label>              
            </div>
            {stock.FiscalYearEnd? (
            <p className="pl-3">{stock.FiscalYearEnd}</p>
            ) : null}
          </div>

           {/* LatestQuarter */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="LatestQuarter" className="btn btn-sm btn-ghost ">Latest Quarter</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="LatestQuarter" className="modal-toggle" />
              <label htmlFor="LatestQuarter" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2 font-bold">Market Cap = Shares Outstanding * Share Price </p>
                  <p className="py-2">The 'Market Cap' is short for market capitalization,  which is simply the company's current value in dollars. Market Cap can also be referred to as the valuation of a business, so if you ever hear someone  say valuation, they're talking about the company's Market Cap.</p>
                  <p className="py-2">When investors buy a stock, this is one of the main  numbers to pay attention to, as this is the value at which they are buying  shares in the company at. Many investors consider the market cap more  important than the share price of a business, as the Market Cap is what is  used in other common valuation methods and ratios, not the share price.</p>
                </label>
              </label>              
            </div>
            {stock.LatestQuarter? (
            <p className="pl-3">{stock.LatestQuarter}</p>
            ) : null}
          </div>

           {/* DividendPerShare */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="DividendPerShare" className="btn btn-sm btn-ghost ">DividendPerShare</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="DividendPerShare" className="modal-toggle" />
              <label htmlFor="DividendPerShare" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2 font-bold">Market Cap = Shares Outstanding * Share Price </p>
                  <p className="py-2">The 'Market Cap' is short for market capitalization,  which is simply the company's current value in dollars. Market Cap can also be referred to as the valuation of a business, so if you ever hear someone  say valuation, they're talking about the company's Market Cap.</p>
                  <p className="py-2">When investors buy a stock, this is one of the main  numbers to pay attention to, as this is the value at which they are buying  shares in the company at. Many investors consider the market cap more  important than the share price of a business, as the Market Cap is what is  used in other common valuation methods and ratios, not the share price.</p>
                </label>
              </label>              
            </div>
            {stock.DividendPerShare !== 0 ? (
            <p className="pl-3">${stock.DividendPerShare}</p>
            ) : "--"}
          </div>

          {/* DividendYield */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="DividendYield" className="btn btn-sm btn-ghost ">Dividend Yield</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="DividendYield" className="modal-toggle" />
              <label htmlFor="DividendYield" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2 font-bold">Market Cap = Shares Outstanding * Share Price </p>
                  <p className="py-2">The 'Market Cap' is short for market capitalization,  which is simply the company's current value in dollars. Market Cap can also be referred to as the valuation of a business, so if you ever hear someone  say valuation, they're talking about the company's Market Cap.</p>
                  <p className="py-2">When investors buy a stock, this is one of the main  numbers to pay attention to, as this is the value at which they are buying  shares in the company at. Many investors consider the market cap more  important than the share price of a business, as the Market Cap is what is  used in other common valuation methods and ratios, not the share price.</p>
                </label>
              </label>              
            </div>
            {stock.DividendYield !== 0 ? (
            <p className="pl-3">{decToPercentage(stock.DividendYield)}</p>
            ) : "--"}
          </div>

        </div>
    </div>
  )
}

export default StockKeyValue