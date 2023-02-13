import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";

const StockTrade = () => {
  const [stockQuote, setStockQuote] = useState(null);
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
        // console.log("quote", response.data)
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [param.stockSymbol]);


  if (!stockQuote) {
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

  // convert decimal to percentage format
  const decimalCut = (decimal) => {
    return `${Number(decimal).toFixed(2)}`;
  };
  
  return (
    <div className="grid flex-grow card bg-base-200 rounded-box place-items-center ">
      <Link to={`/stock/${param.stockSymbol}`} className="pt-2">
      <div className='btn btn-ghost normal-case text-lg text-secondary' >Trading Stats</div>
      </Link>   
      <div className="grid grid-cols-3 p-4 gap-4">

          {/* Previous Close */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="PreviousClose" className="btn btn-sm btn-ghost text-left">Previous Close</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="PreviousClose" className="modal-toggle" />
              <label htmlFor="PreviousClose" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2">In financial information the previous closing price of any security is an important daily measure for reporting purposes. It marks the daily measuring point against which updated returns can be calculated and for which new information is gathered to inform new investing decisions and strategies. It can be an important indicator for a variety of different technical patterns and fundamental measures. It is one of two essential components in a candlestick day chart. It also may be used by investors and technical analysts to chart gap patterns which can show substantial changes from a previous close to new open.</p>
                  <p className="py-2">While most references to previous close assume a day-long time frame for trading, the reference to the previous close among algorithmic traders, quantitative analysts and trading system researchers can refer to the previous close of any given time period from seconds to hours or days, weeks, months and even years.</p>
                </label>
              </label> 
            </div>
            {stockQuote?.previous_close? (
            <p className="pl-3 text-secondary">${decimalCut(stockQuote?.previous_close)}</p>
            ) : null}
          </div>

          {/* Open */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="Open" className="btn btn-sm btn-ghost text-left">Open</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="Open" className="modal-toggle" />
              <label htmlFor="Open" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2">The opening price is the price at which a security first trades upon the opening of an exchange on a trading day; for example, the New York Stock Exchange (NYSE) opens at precisely 9:30 a.m. Eastern time.The price of the first trade for any listed stock is its daily opening price. The opening price is an important marker for that day's trading activity, particularly for those interested in measuring short-term results such as day traders.</p>
                  
                </label>
              </label> 
            </div>
            {stockQuote?.open? (
            <p className="pl-3 text-secondary">${decimalCut(stockQuote?.open)}</p>
            ) : null}
          </div>

          {/* Close */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="Close" className="btn btn-sm btn-ghost text-left">Close</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="Close" className="modal-toggle" />
              <label htmlFor="Close" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2">The closing price is the raw price or cash value of the last transacted price in a security before the market officially closes for normal trading. It is often the reference point used by investors to compare a stock's performance since the previous day—and closing prices are frequently used to construct line graphs depicting historical price changes over time.</p>
                  <p className="py-2">Closing prices are useful markers for investors to use to assess changes in stock prices over time. Even in the era of 24-hour trading, there is a closing price for any stock or other security, and it is the final price at which it trades during regular market hours on any given day. The closing price is considered the most accurate valuation of a stock or other security until trading resumes on the next trading day.</p>
                  <p className="py-2">The closing price on one day can be compared to the closing price on the previous day, 30 days earlier or a year earlier, to measure the changes in market sentiment toward that stock. Most stock news sites allow investors to chart closing prices for a period of years, and typically since the day the company went public.</p>

                </label>
              </label> 
            </div>
            {stockQuote?.close? (
            <p className="pl-3 text-secondary">${decimalCut(stockQuote?.close)}</p>
            ) : null}
          </div>

          {/* High */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="High" className="btn btn-sm btn-ghost text-left">High</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="High" className="modal-toggle" />
              <label htmlFor="High" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2">Today's high is the highest price at which a stock traded during the course of the trading day and is typically higher than the closing or equal to the opening price. It may be used when calculating a moving average.</p>
                  <p className="py-2">One way that day traders and technical analysts use today's high, along with today's low, is to help them identify gaps or sudden jumps up or down in a stock's price with no trading in between those two prices.</p>
                  <p className="py-2">For example, if today's low is $25 and the previous day's high is $20, there would be a gap. The identification of a gap, along with other market signals such as changes in trading volume and overall bullish or bearish sentiment, helps market analysts generate buy and sell signals for particular stocks.</p>
                </label>
              </label> 
            </div>
            {stockQuote?.high? (
            <p className="pl-3 text-secondary">${decimalCut(stockQuote?.high)}</p>
            ) : null}
          </div>

          {/* Low */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="Low" className="btn btn-sm btn-ghost text-left">Low</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="Low" className="modal-toggle" />
              <label htmlFor="Low" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2">Today's low is typically lower than the opening or closing price, as it is unusual that the lowest price of the day would happen to occur at those particular moments.</p>
                  <p className="py-2">Today's low and today's high are important to day traders and technical analysts, who seek to earn profits from a security's short-term price movements and identify and track trends. Studying these benchmarks can help investors and analysts spot emerging trends, which can also allow them to react quickly to evolving shifts. </p>
                  <p className="py-2">One way that day traders use today's low along with today's high is to identify gaps, or sudden jumps up or down in a stock's price with no trading in between. Gaps are used in technical analysis to identify directional movement, average true range/price volatility, candlestick patterns and more. Traders then analyze these patterns to determine profitable entry and exit points. Traders can also use benchmarks such as today's low to assess a stock's value or try to predict trends.</p>
                </label>
              </label> 
            </div>
            {stockQuote?.low? (
            <p className="pl-3 text-secondary">${decimalCut(stockQuote?.low)}</p>
            ) : null}
          </div>

          {/* volume */}
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
            {stockQuote?.volume? (
            <p className="pl-3 text-secondary">{stockQuote?.volume}</p>
            ) : null}
          </div>

          {/* 52 WEEK HIGH */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="52WEEKHIGH" className="btn btn-sm btn-ghost text-left">52 WEEK HIGH</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="52WEEKHIGH" className="modal-toggle" />
              <label htmlFor="52WEEKHIGH" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2">A 52-week high/low is a technical indicator used by some traders and investors who view these figures as an important factor in the analysis of a stock's current value and as a predictor of its future price movement. An investor may show increased interest in a particular stock as its price nears either the high or the low end of its 52-week price range (the range that exists between the 52-week low and the 52-week high).</p>
                  <p className="py-2">The 52-week high/low is based on the daily closing price for the security. Often, a stock may actually breach a 52-week high intraday, but end up closing below the previous 52-week high, thereby going unrecognized. The same applies when a stock makes a new 52-week low during a trading session but fails to close at a new 52-week low. In these cases, the failure to register as having made a new closing 52-week high/low can be very significant.</p>
                  <p className='py-2'>One way that the 52-week high/low figure is used is to help determine an entry or exit point for a given stock. For example, stock traders may buy a stock when the price exceeds its 52-week high, or sell when the price falls below its 52-week low. The rationale behind this strategy is that if a price breaks out from its 52-week range (either above or below that range), there must be some factor that generated enough momentum to continue the price movement in the same direction. When using this strategy, an investor may utilize stop-orders to initiate new positions or add on to existing positions.</p>
                  
                </label>
              </label> 
            </div>
            {stockQuote?.fifty_two_week?.high? (
            <p className="pl-3 text-secondary">${decimalCut(stockQuote?.fifty_two_week?.high)}</p>
            ) : null}
          </div>

          {/* 52 WEEK LOW */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="52WEEKLOW" className="btn btn-sm btn-ghost text-left">52 WEEK LOW</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="52WEEKLOW" className="modal-toggle" />
              <label htmlFor="52WEEKLOW" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2">A 52-week high/low is a technical indicator used by some traders and investors who view these figures as an important factor in the analysis of a stock's current value and as a predictor of its future price movement. An investor may show increased interest in a particular stock as its price nears either the high or the low end of its 52-week price range (the range that exists between the 52-week low and the 52-week high).</p>
                  <p className="py-2">The 52-week high/low is based on the daily closing price for the security. Often, a stock may actually breach a 52-week high intraday, but end up closing below the previous 52-week high, thereby going unrecognized. The same applies when a stock makes a new 52-week low during a trading session but fails to close at a new 52-week low. In these cases, the failure to register as having made a new closing 52-week high/low can be very significant.</p>
                  <p className='py-2'>One way that the 52-week high/low figure is used is to help determine an entry or exit point for a given stock. For example, stock traders may buy a stock when the price exceeds its 52-week high, or sell when the price falls below its 52-week low. The rationale behind this strategy is that if a price breaks out from its 52-week range (either above or below that range), there must be some factor that generated enough momentum to continue the price movement in the same direction. When using this strategy, an investor may utilize stop-orders to initiate new positions or add on to existing positions.</p>
                </label>
              </label> 
            </div>
            {stockQuote?.fifty_two_week?.low? (
            <p className="pl-3 text-secondary">${decimalCut(stockQuote?.fifty_two_week?.low)}</p>

            ) : null}
          </div>

          {/* average volume */}
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
            {stockQuote?.average_volume? (
            <p className="pl-3 text-secondary">{stockQuote?.average_volume}</p>
            ) : null}
          </div>

          


      </div>
    </div>
  )
}

export default StockTrade;