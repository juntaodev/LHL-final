import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";

const StockInfo = () => {
  const [stockProfile, setStockProfile] = useState(null);
  const [stockInfo, setStockInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  // fetch from twelve data API
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

  //fetch from alpha vantage API 
  const API_KEY = 'KJEJ4ZQQOGDC75P4';
  const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${param.stockSymbol}&apikey=${API_KEY}`;

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setStockInfo(response.data);
        setLoading(false);
        console.log("stockinfo", response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [url]);

  if (!stockProfile) {
    return <progress className="progress w-56"></progress>;
  }
  if (!stockInfo) {
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
  const decToPercentage = (decimal) => {
    return `${(decimal * 100).toFixed(2)}%`;
  };
  
  return (
    <div className="grid flex-grow card bg-base-200 rounded-box place-items-center ">
         
      <Link to={`/stock/${param.stockSymbol}`} className="pt-2">
      <div className='btn btn-ghost normal-case text-lg text-secondary' >About</div>
      </Link>  
        
      <div className="grid grid-cols-3 p-4 gap-4">

          {/* sector */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="sector" className="btn btn-sm btn-ghost text-left">sector</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="sector" className="modal-toggle" />
              <label htmlFor="sector" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">A stock market sector is a group of stocks that have a lot in common with each other, usually because they are in similar industries. There are 11 different stock market sectors, according to the most commonly used classification system: the Global Industry Classification Standard (GICS).</p>
                  <p className="py-2">We categorize stocks into sectors to make it easy to compare companies that have similar business models. Sectors also make it easier to compare which stocks are making the most money.</p>
                  <p className="py-2">Here are the 11 total possible values:</p>
                  <p className="py-2">Energy</p>
                  <p className="py-2">Materials</p>
                  <p className="py-2">Industrials</p>
                  <p className="py-2">Consumer Discretionary</p>
                  <p className="py-2">Consumer Staples</p>
                  <p className="py-2">Health Care</p>
                  <p className="py-2">Financials</p>
                  <p className="py-2">Information Technology</p>
                  <p className="py-2">Communication Services</p>
                  <p className="py-2">Utilities</p>
                  <p className="py-2">Real Estate</p>
                  
                  
                </label>
              </label>              
            </div>
            {stockProfile.sector? (
            <p className="pl-3 text-secondary">{stockProfile.sector}</p>
            ) : null}
          </div>

          {/* industry */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="industry" className="btn btn-sm btn-ghost text-left">industry</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="industry" className="modal-toggle" />
              <label htmlFor="industry" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2">Industry describes the type of company, or the space the company primarily operates in. Examples include Technology, Automobiles, & Energy. Investors often compare companies within the same industry to see how they 'stack up' against one another.  </p>
                  <p className="py-2">There are a few reasons why investors like to compare companies in the same industry:</p>
                  <p className="py-2">1. Companies in the same industry tend to have similar profit margins and price multiples;</p>
                  <p className="py-2">2. Companies in different industries can have totally different business models/margins;</p>
                  <p className="py-2">3. Companies in certain industries use different MVM (Most Valuable Metrics);</p>
                  <p className="py-2">4. Companies in different industries may have higher or lower price ratios depending on the overall growth of the industry.</p>
                  <p className="py-2">Industries with higher margins tend to trade at higher price multiples. On the contrary, industries with low margins tend to trade at lower price multiples.</p>
                </label>
              </label>              
            </div>
            {stockProfile.industry? (
            <p className="pl-3 text-secondary">{stockProfile.industry}</p>
            ) : null}
          </div>

          {/* exchange */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="exchange" className="btn btn-sm btn-ghost text-left">exchange</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="exchange" className="modal-toggle" />
              <label htmlFor="exchange" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2">An exchange is like a marketplace. Stocks are sold on exchanges, one of the most popular is called the New York Stock Exchange. Exchanges make it possible for a buyer and seller to exchange stocks for an agreed upon price in the open market. </p>
                  <p className="py-2">Around the world there are a lot of different exchanges where anyone can buy/sell securities. Securities can take many forms, one of which is stocks! When you sign up for a broker to buy/sell stocks they are gateways to the exchange. </p>
                  <p className="py-2">A single company can trade on multiple exchanges as well. This is typically to allow investors in one country to purchase shares of a foreign business in their own currency, so they can avoid the hassle of converting currency.</p>
                  <p className="py-2">For example, TD bank trades on the TSX in Canadian currency, since the TSX is a Canadian exchange. However, TD bank also trades on the NYSE, which is a U.S exchange. TDs shares on the NYSE trade in U.S Dollars, and allow U.S investors to buy TD shares without having to convert their currency.</p>
                </label>
              </label>              
            </div>
            {stockProfile.exchange ? (
            <p className="pl-3 text-secondary">{stockProfile.exchange}</p>
            ) : null}
          </div>

          {/* employees */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="employees" className="btn btn-sm btn-ghost text-left">employees</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="employees" className="modal-toggle" />
              <label htmlFor="employees" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2">The last known number of employees that are working for a company full time. Part time workers/contractors are typically not reported in this number.</p>
                  <p className="py-2">Typically if a company is growing its employees then it means they're expanding and growing. This is one metric investors like to pay attention to so they can gage the growth of the company..</p>
                </label>
              </label>              
            </div>
            {stockProfile.employees? (
            <p className="pl-3 text-secondary">{stockProfile.employees}</p>
            ) : null}
          </div>

          {/* FiscalYearEnd */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="FiscalYearEnd" className="btn btn-sm btn-ghost text-left">Fiscal Year End</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="FiscalYearEnd" className="modal-toggle" />
              <label htmlFor="FiscalYearEnd" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2">Every year, public companies are required to publish financial statements for review by the Securities and Exchange Commission (SEC). These documents also give investors an update on company performance compared to previous years and provide analysts with a way to understand business operations. Financial statements are published after each company's fiscal year-end, which may vary from company to company.</p>
                  <p className="py-2">If a company has a fiscal year-end that is the same as the calendar year-end, it means that the fiscal year ends on Dec. 31. However, companies have the ability to choose the best fiscal year-end for themselves, designed with the needs of the company in mind. Companies that operate on a non-calendar business cycle or have a supplier base that does so may choose a fiscal year-end date that more appropriately coincides with their business operations.</p>
                  <p className="py-2">For example, many retail companies have a fiscal year that differs from the calendar year due to the heavy sales cycle during the holiday season. Because Dec. 31 coincides with heavy shopping by consumers, a retail firm may have a hard time producing annual financial statements and counting inventories at that same time as manpower and resources are dedicated to the sales floor.</p>
                  <p className="py-2">In this case, the firm may choose an alternate fiscal year-end date, such as Jan. 31 rather than Dec. 31. As another example, the best time for a luxury resort to report earnings is probably after vacation season, so it may choose a fiscal year-end of Sept. 30.</p>
                  <p className="py-2">Whatever fiscal year-end date is determined, companies must make a decision when they file for incorporation, as their fiscal year-end date cannot be changed every year. It is also important to note that the timing of a company's fiscal year does not change the due date on taxes.</p>
                </label>
              </label>              
            </div>
            {stockInfo?.FiscalYearEnd? (
            <p className="pl-3 text-secondary">{stockInfo?.FiscalYearEnd}</p>
            ) : <p className="pl-3 text-secondary">--</p>}
          </div>

          {/* LatestQuarter */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="LatestQuarter" className="btn btn-sm btn-ghost text-left">Latest Quarter</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="LatestQuarter" className="modal-toggle" />
              <label htmlFor="LatestQuarter" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2">A quarter is a three-month period on a company's financial calendar that acts as a basis for periodic financial reports and the paying of dividends. A quarter refers to one-fourth of a year and is typically expressed as Q1 for the first quarter, Q2 for the second quarter, and so forth. For example, a quarter is often shown with its relevant year, as in Q1 2022 or Q1'22, which represents the first quarter of the year 2022. </p>
                  <p className="py-2">Most financial reporting and dividend payments are done quarterly. Not all companies will have fiscal quarters that correspond to calendar quarters and it is common for a company to close its fourth quarter after its busiest time of year. Dividends are also often paid quarterly although many companies outside the U.S. may not pay dividends evenly.</p>
                  <p className="py-2">Companies have two main accounting periods—the fiscal quarter and the fiscal year (FY). The fiscal year for most companies runs from Jan. 1 to Dec. 31 (although it doesn't have to). The standard calendar quarters that make up the year are as follows: January, February, and March (Q1), April, May, and June (Q2), July, August, and September (Q3), October, November, and December (Q4).</p> 
                  <p className="py-2">Some companies have fiscal years that follow different dates. Costco Wholesale Corporation's fiscal year begins in September and ends in the following August. Thus, its fiscal fourth-quarter includes June, July, and August.</p>
                  <p className="py-2">Fiscal quarters for a company will coincide with their fiscal year (FY), and the fourth fiscal quarter will also conclude on the same date as the fiscal year.</p>
                </label>
              </label>              
            </div>
            {stockInfo?.LatestQuarter ? (
            <p className="pl-3 text-secondary">{stockInfo?.LatestQuarter}</p>
            ) : <p className="pl-3 text-secondary">--</p>}
          </div>

          {/* DividendPerShare */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="DividendPerShare" className="btn btn-sm btn-ghost text-left">Dividend </label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="DividendPerShare" className="modal-toggle" />
              <label htmlFor="DividendPerShare" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Annual dividend is how much the company pays its shareholders in cash, every year. If a business pays $1.00 in dividends, then it means every year shareholders will receive $1.00 in cash for every share they own of the business.</p>
                  <p className="py-2">Typically a business will pay out the dividend on a quarterly basis, or every 3 months. If the annual dividend is that $1.00, then most companies will split this up into four $.25 payments. On rare occasions, the business will pay out the dividend monthly. In this case the monthly dividend would be $.083.</p>
                  
                </label>
              </label>              
            </div>
            {stockInfo?.DividendPerShare !== "0" ? (
            <p className="pl-3 text-secondary">${stockInfo?.DividendPerShare}</p>
            ) : <p className="pl-3 text-secondary">--</p>}
          </div>

          {/* DividendYield */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="DividendYield" className="btn btn-sm btn-ghost text-left">Dividend Yield</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="DividendYield" className="modal-toggle" />
              <label htmlFor="DividendYield" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2 font-bold">Dividend Yield = (Annual Dividend / Share Price) * 100% </p>
                  <p className="py-2">The dividend yield tells investors % returns they will receive in dividends relative to the company's current share price. This also means the dividend yield changes based on the share price. If the share price falls, the dividend yield goes up. If the share price rises, the yield goes down.</p>
                  <p className="py-2">Shareholders do not need to do anything other than hold shares of the business in their investing accounts to receive the dividends. Investors like dividends because they are one of the most passive forms of income out there, as the investor doesn't need to do anything other than hold shares.</p>
                </label>
              </label>              
            </div>
            {stockInfo?.DividendYield !== "0" ? (
            <p className="pl-3 text-secondary">{decToPercentage(stockInfo?.DividendYield)}</p>
            ) : <p className="pl-3 text-secondary">--</p>}
          </div>

          {/* ExDividendDate */}
          <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="ExDividendDate" className="btn btn-sm btn-ghost text-left">Ex-Dividend Date</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="ExDividendDate" className="modal-toggle" />
              <label htmlFor="ExDividendDate" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">The ex-dividend date is the date in which new buyers of the company's shares will not receive the upcoming dividend. If you are buying a stock on the ex-dividend date, you will not receive its next dividend payout to its shareholders. Instead, the person who sold you your shares will receive it.</p>
                  <p className="py-2">If you're looking to buy a dividend stock for its dividend, then you need to buy the stock before the ex-dividend date to receive its next dividend payment.</p>
                </label>
              </label>              
            </div>
            {stockInfo?.ExDividendDate ? (
            <p className="pl-3 text-secondary">{stockInfo?.ExDividendDate}</p>
            ) : <p className="pl-3 text-secondary">--</p>}
          </div>


      </div>
    </div>
  )
}

export default StockInfo;