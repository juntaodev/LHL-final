import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const StockKeyValue = () => {
  const [stockQuote, setStockQuote] = useState(null);
  const [stockTrade, setStockTrade] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  // fetch from twelve data API
  useEffect(() => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/quote',
      params: {symbol: `${param.stockSymbol}`},
      headers: {
        'X-RapidAPI-Key': '3739bf6e15msh3f361324e7ae496p1291a4jsneeac436b4fc4',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };
    axios
      .request(options)
      .then(response => {
        setStockQuote(response.data);
        setLoading(false);
        console.log("quote", response.data)
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [param.stockSymbol]);


  if (!stockQuote) {
    return <div>Loading...</div>;
  }
  if (error) return <p>An error occurred: {error.message}</p>;

  // convert decimal to percentage format
  const decimalCut = (decimal) => {
    return `${Number(decimal).toFixed(2)}`;
  };
  
  return (
    <div className="grid flex-grow card bg-base-200 rounded-box place-items-center ">
        
      <p className='card pt-4 '><strong>Trading Stats </strong></p> 
        
      <div className="grid grid-cols-3 p-4 gap-4">

          {/*  */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="PreviousClose" className="btn btn-sm btn-ghost text-left">Previous Close</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="PreviousClose" className="modal-toggle" />
              <label htmlFor="PreviousClose" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 
                </label>
              </label> 
            </div>
            {stockQuote.previous_close? (
            <p className="pl-3">${decimalCut(stockQuote.previous_close)}</p>
            ) : null}
          </div>

          {/*  */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="Open" className="btn btn-sm btn-ghost text-left">Open</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="Open" className="modal-toggle" />
              <label htmlFor="Open" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 
                </label>
              </label> 
            </div>
            {stockQuote.open? (
            <p className="pl-3">${decimalCut(stockQuote.open)}</p>
            ) : null}
          </div>

          {/*  */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="Close" className="btn btn-sm btn-ghost text-left">Close</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="Close" className="modal-toggle" />
              <label htmlFor="Close" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 
                </label>
              </label> 
            </div>
            {stockQuote.close? (
            <p className="pl-3">${decimalCut(stockQuote.close)}</p>
            ) : null}
          </div>

          {/*  */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="High" className="btn btn-sm btn-ghost text-left">High</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="High" className="modal-toggle" />
              <label htmlFor="High" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 
                </label>
              </label> 
            </div>
            {stockQuote.high? (
            <p className="pl-3">${decimalCut(stockQuote.high)}</p>
            ) : null}
          </div>

          {/*  */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="Low" className="btn btn-sm btn-ghost text-left">Low</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="Low" className="modal-toggle" />
              <label htmlFor="Low" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 
                </label>
              </label> 
            </div>
            {stockQuote.low? (
            <p className="pl-3">${decimalCut(stockQuote.low)}</p>
            ) : null}
          </div>

          {/*  */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="volume" className="btn btn-sm btn-ghost text-left">volume</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="volume" className="modal-toggle" />
              <label htmlFor="volume" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2">Every transaction that takes place between a buyer and a seller of a security contributes to the total volume count of that security. One transaction occurs whenever a buyer agrees to purchase what a seller is offering for sale at a certain price. If only five transactions occur in a day, the volume for that day is set at five.</p>
                  <p className="py-2">Every transaction that takes place between a buyer and a seller of a security contributes to the total volume count of that security. One transaction occurs whenever a buyer agrees to purchase what a seller is offering for sale at a certain price. If only five transactions occur in a day, the volume for that day is set at five.</p>
                  <p className='py-2'>Volume tells investors about the market's activity and liquidity. Higher trade volumes for a specified security mean higher liquidity, better order execution and a more active market for connecting a buyer and seller. When investors feel hesitant about the direction of the stock market, futures trading volume tends to increase, which often causes options and futures on specified securities to trade more actively. Volume overall tends to be higher near the market's opening and closing times, and on Mondays and Fridays. It tends to be lower at lunchtime and before a holiday.</p>
                </label>
              </label> 
            </div>
            {stockQuote.volume? (
            <p className="pl-3">{stockQuote.volume}</p>
            ) : null}
          </div>

          {/*  */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="52 WEEK HIGH" className="btn btn-sm btn-ghost text-left">52 WEEK HIGH</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="52 WEEK HIGH" className="modal-toggle" />
              <label htmlFor="52 WEEK HIGH" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 
                </label>
              </label> 
            </div>
            {stockQuote.fifty_two_week.high? (
            <p className="pl-3">${decimalCut(stockQuote.fifty_two_week.high)}</p>
            ) : null}
          </div>

          {/*  */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="52 WEEK LOW" className="btn btn-sm btn-ghost text-left">52 WEEK LOW</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="52 WEEK LOW" className="modal-toggle" />
              <label htmlFor="52 WEEK LOW" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 
                </label>
              </label> 
            </div>
            {stockQuote.fifty_two_week.low? (
            <p className="pl-3">${decimalCut(stockQuote.fifty_two_week.low)}</p>
            ) : null}
          </div>

          {/*  */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="average volume" className="btn btn-sm btn-ghost text-left">average volume</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="average volume" className="modal-toggle" />
              <label htmlFor="average volume" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">When average daily trading volume (ADTV) increases or decreases dramatically, it signals that there has been a substantial shift in how people value or view the asset. Usually, higher average daily trading volume means that the security is more competitive, has narrower spreads and is typically less volatile. Stocks tend to be less volatile when they have higher average daily trading volumes because much larger trades would have to be made to affect the price. This does not mean a stock with high volume won't have large daily price moves. On any single day (or over multiple days) any stock could have a very large price move, on higher than average volume.</p>
                  <p className="py-2">The average daily trading volume is an often-cited security trading measurement and a direct indication of a security's overall liquidity. The higher the trading volume is for a security, the more buyers and sellers there are in the market which makes it is easier and faster to execute a trade. Without a reasonable level of market liquidity, transaction costs are likely to become higher (due to larger spreads).</p>
                  <p className='py-2'>Average daily trading volume is a useful tool for analyzing the price action of any liquid asset. If the price of an asset is rangebound and a breakout occurs, increasing volume tends to confirm that breakout. A lack of volume indicates the breakout may fail.</p>
                  <p className='py-2'>Volume also helps confirm price moves either higher or lower. During strong price pushes up or down, volume should also rise. If it isn't, there may not be enough interest to keep pushing the price. If there isn't enough interest then the price may pullback.</p>
                  <p className='py-2'>During trends, pullbacks with low volume tend to favor the price eventually moving in the trending direction again. For example, in an uptrend, volume will often rise when the price is rising strongly. If the stock pulls back and volume is low, it shows that there isn't much selling interest. If the price starts to move up on higher volume again, that can be a favorable entry point as price and volume are both confirming the uptrend.</p>
                  <p className='py-2'>When volume is well above average, it sometimes indicates a climax of the price move. So many shares have changed hands in a certain price area that there may be no one else to step in and keep pushing the price in that direction. Steep price moves coupled with steep volume increases can often be a sign of an imminent price reversal.</p>
                </label>
              </label> 
            </div>
            {stockQuote.average_volume ? (
            <p className="pl-3">{stockQuote.average_volume}</p>
            ) : null}
          </div>

          


      </div>
    </div>
  )
}

export default StockKeyValue