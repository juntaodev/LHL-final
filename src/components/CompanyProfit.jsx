import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { FlagFilled } from '@ant-design/icons';

const CompanyProfit = () => {

  const [stockIncome, setStockIncome] = useState(null);
  const [stockCash, setStockCash] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  const API_KEY = 'KJEJ4ZQQOGDC75P4';
  const incomeUrl = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${param.stockSymbol}&apikey=${API_KEY}`;
  const cashUrl = `https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${param.stockSymbol}&apikey=${API_KEY}`;

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(incomeUrl);
        setStockIncome(response.data);
        setLoading(false);
        // console.log("income", response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [incomeUrl]);
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(cashUrl);
        setStockCash(response.data);
        setLoading(false);
        // console.log("cash", response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [cashUrl]);

  const decToPercentage = (decimal) => {
    return `${(Number(decimal) * 100).toFixed(2)}%`;
  };

  if (!stockIncome) {
    return <progress className="progress w-56"></progress>;
  }
  if (!stockCash) {
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
  
  // key variables
  const latestFiscalYear = stockIncome?.annualReports[0]?.fiscalDateEnding.slice(0,4);

  const grossMargin = stockIncome?.annualReports[0]?.grossProfit / stockIncome?.annualReports[0]?.totalRevenue;
 
  const operatingMargin = stockIncome?.annualReports[0]?.grossProfit / stockIncome?.annualReports[0]?.totalRevenue;
  
  const netMargin = stockIncome?.annualReports[0]?.netIncome / stockIncome?.annualReports[0]?.totalRevenue;
  
  const freeCashflowMargin = (stockCash?.annualReports[0]?.operatingCashflow - stockCash?.annualReports[0]?.capitalExpenditures) / stockIncome?.annualReports[0]?.totalRevenue;
  
  const cashConversion = (stockCash?.annualReports[0]?.operatingCashflow - stockCash?.annualReports[0]?.capitalExpenditures) / stockIncome?.annualReports[0]?.netIncome;

  return (
    <div className='profit-table'>
      <table className="table-auto text-left">
        
        <thead>
          <tr>
            <th className="text-lg text-secondary p-4 bg-indigo-100">
              Profitability
              {/* The button to open modal */}
              <label htmlFor="Profitability" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="Profitability" className="modal-toggle" />
              <label htmlFor="Profitability" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2">This segment shows metrics related to the company's profitability. These are metrics that investors use to gauge how profitable the company is, and how effective it is at producing returns for its shareholders.</p>
                  
                </label>
              </label> 
            </th>
            <th className="text-lg text-secondary p-4 bg-indigo-100">Fiscal Year {latestFiscalYear}</th>
            
            <th className="text-lg text-secondary p-4 bg-indigo-100">
              
              {/* The button to open modal */}
              <label htmlFor="profitflag" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="profitflag" className="modal-toggle" />
              <label htmlFor="profitflag" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2"> A <FlagFilled style={{color:"#15803d"}}/> generally means strong performance, and otherwise <FlagFilled style={{color:"#dc2626"}}/> means weak performance.</p>
                  <p className="py-2"> A good margin will vary considerably by industry, but as a general rule of thumb:</p>
                  <p className="py-2 font-bold"> 50% or above gross margin will receive <FlagFilled style={{color:"#15803d"}}/> ;</p>
                  <p className="py-2 font-bold"> 20% or above operating margin will receive <FlagFilled style={{color:"#15803d"}}/> ;</p>
                  <p className="py-2 font-bold"> 20% or above net margin will receive <FlagFilled style={{color:"#15803d"}}/> ;</p>
                  <p className="py-2 font-bold"> 10% or above free cash flow margin will receive <FlagFilled style={{color:"#15803d"}}/> ;</p>
                  <p className="py-2 font-bold"> 100% or above cash conversion will receive <FlagFilled style={{color:"#15803d"}}/> .</p>
                  <p className="py-2"> Again, these guidelines vary widely by industry and company size, and can be impacted by a variety of other factors.</p>
                  
                </label>
              </label>
              Flag
            </th>
          </tr>
        </thead>

        <tbody>
          {/* Gross Margin */}
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Gross Margin
              {/* The button to open modal */}
              <label htmlFor="Gross" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="Gross" className="modal-toggle" />
              <label htmlFor="Gross" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2 font-bold">Gross Margin = (Gross Profit / Revenue) * 100%</p>
                  <p className="py-2">Gross margin is the company's gross profit relative to its revenue as a percent. If this value is negative, that means the company is not generating any positive gross profit.</p>
                  <p className="py-2">This value should always be positive! Companies with negative/0 gross margins are extremely unprofitable, whenever making an investment it's very important to understand if the company is becoming more/less profitable over time.</p>
                  
                </label>
              </label>
            </td>
            <td className='p-4 text-right'>{decToPercentage(grossMargin)}</td>
            
            <td className='p-4 text-right'>{grossMargin > 0.5 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>

          {/* Operating Margin */}
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Operating Margin
              {/* The button to open modal */}
              <label htmlFor="OperatingMargin" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="OperatingMargin" className="modal-toggle" />
              <label htmlFor="OperatingMargin" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2 font-bold">Operating Margin = (Operating Income / Revenue) * 100%</p>
                  <p className="py-2">Investors like to pay attention to a company's operating margin because it tells them what percentage of the revenue is being converted into operating income. The higher the operating margin the better, because it means the company's operations are more efficient at turning revenue into cash.</p>
                  <p className="py-2">Typically investors will also like to take note of how the operating and other margins are performing over time to see if the company is increasing its margins or if they're decreasing. Margins increasing means the company is making more cash from its operations for every dollar of revenue, which is a good thing because it means they're becoming more efficient.</p>
                  <p className="py-2">Keep in mind however that operating income is not straight profits for the company. A company may have a positive operating margin while it is still losing money. Investors typically use this look at this margin when looking at a company that isn't yet profitable, or is investing heavily into growth to help gauge its profit potential.</p>
                  <p className="py-2">If the operating cash flow margin is negative, then it means the company's operating are losing money, and the company as a whole is most likely losing money as well.</p>
                  <p className="py-2">Investors are typically willing to pay higher price ratios for companies with higher margins. If margins are expanding, then it is not unusual to see the price ratios increase.</p>
                 
                </label>
              </label> 
            </td>
            <td className='p-4 text-right'>{decToPercentage(operatingMargin)}</td>
            
            <td className='p-4 text-right'>{operatingMargin > 0.2 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>

          {/* Net Margin */}
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>
              Net Margin
              {/* The button to open modal */}
              <label htmlFor="NetMargin" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="NetMargin" className="modal-toggle" />
              <label htmlFor="NetMargin" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">Net Margin = (Net Income / Revenue) * 100%</p>
                 <p className="py-2">Investors like to pay attention to net income margins to see how much the company "earns" on every dollar of revenue. For example, if the net income margin is 15%, then it means that for every $1 of revenue, 15 cents becomes earnings for the company.</p>
                 <p className="py-2">Companies with higher net margins are typically more attractive to investors, and therefore command higher price ratios. In other words, investors are typically willing to pay more for companies with higher margins.</p>
                 <p className="py-2">There are a couple of reasons why this is the case. 1) Companies with higher margins have a larger buffer before they become unprofitable. A company with a 30% net margin has much more room for error or compression before the company starts losing money. On the other hand, a company with only a 3% net margin has much less room for error and margin compression before it becomes unprofitable. This ultimately means that the second company is at more risk of losing money. 2) Companies with higher net margins convert more revenue into earnings for the company. This means that the more revenue grows, the more rapidly net income will grow as well.</p>
                 <p className="py-2">For example, if one company has a 30% net margin and grows its revenues by $1 million, it will convert $300,000 of this revenue growth into earnings for the company. If another company only has a 3% net income margin and also grows its revenues by $1 million, then it will only generate $30,000 in earnings for the company.</p>
                 <p className="py-2">This simply means that companies with higher net margins benefit more from revenue growth as they're able to keep more of it as earnings for the company, which essentially makes it "easier" for the company to grow its profits.</p>
                 <p className="py-2">Investors also like to take note of a company's historical net margins to see if margins have been growing or declining over time. If a company's net margin is growing, then it means the business is becoming more efficient at turning revenue into profits, which investors like. If the net margin is decreasing, it could mean the company is having to spend more money to generate revenue growth, or the efficiency of the business is declining.</p>
                 <p className="py-2">A declining net margin ultimately means the company will have a harder time growing its earnings, as it's not only trying to grow its revenues, but also grow faster than the margins decline. Basically, the earnings for the company are fighting 2 battles at once.</p>
                 
                </label>
              </label> 
            </td>
            <td className='p-4 text-right'>{decToPercentage(netMargin)}</td>
            
            <td className='p-4 text-right'>{netMargin > 0.2 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>
          
          {/* Free Cashflow Margin */}
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Free Cashflow Margin
              {/* The button to open modal */}
              <label htmlFor="freeCashFlow" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="freeCashFlow" className="modal-toggle" />
              <label htmlFor="freeCashFlow" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">Free Cash Flow Margin = (Free Cash Flow / Revenue) * 100%</p>
                 <p className="py-2">Investors like to track companies free cash flow margins over time to see if the businesses margins are increasing or decreasing. If a company's free cash flow margin is increasing, then it means they are able to produce more cash for the shareholders on every dollar of revenue.</p>
                 <p className="py-2">Increasing margins is one way companies make more money, because they don't need to grow existing sales/revenue to produce more profit. They simply need to become more efficient.</p>
                 <p className="py-2">Companies with higher free cash flow margins typically sell for higher price ratios on the stock market. Investors, and the market in general, seem to prefer companies with higher margins, and are willing to pay more for them.</p>
                 <p className="py-2">One reason for this is because companies with higher margins are at less risk of economic downturns or inflationary events. If costs are rising, or if the economy is in the slumps, a high margin gives the company more cushion to absorb these shocks. On the contrary, a company with a very thin profit margin is at higher risk of costs increasing and taking away its profit potential. If a company isn't producing money organically/from the inside, then it will need to look outside the business for it.</p>
                 <p className="py-2">Investors are typically willing to pay higher price ratios for companies with higher margins. If margins are expanding, then it is not unusual to see the price ratios increase.</p>
                 
                 
                </label>
              </label>
            </td>
            <td className='p-4 text-right'>{decToPercentage(freeCashflowMargin)}</td>
            
            <td className='p-4 text-right'>{freeCashflowMargin > 0.1 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>

          {/* Cash Conversion */}
          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-indigo-50'>Cash Conversion
              {/* The button to open modal */}
              <label htmlFor="cashConversion" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="cashConversion" className="modal-toggle" />
              <label htmlFor="cashConversion" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">Cash Conversion = (Free Cash Flow / Net Income) * 100%</p>
                 <p className="py-2">The cash conversion shows investors if the company's earnings are actual cash earnings, or if they're mostly non-cash earnings like unrealized asset gains. This is important for investors to pay attention to because there can be instances where a company reports a large amount of net income, but the company is actually losing money. This metric simply shows if the net income is cash profits and cash coming into the business, or if it's something else.</p>
                 <p className="py-2">Checking the free cash flow vs. the earnings of a company is always a good idea for investors, and typically investors prefer to see the two figures be close together. If the two figures are vastly different, then that can be a red flag and investors should dive into it more to understand what's going on with the company's profits.</p>
                 <p className="py-2">Investors can see in depth explanations on a company's SEC filings, specifically the 10-K and 10-Q filings, which are annual and quarterly filings respectively. The company should break down exactly what the earnings and free cash flow are and where they're coming from in these documents. You can easily access these documents on Stock Unlocks “About” tab, and clicking the SEC filings link.</p>
                 
                </label>
              </label>
            </td>
            <td className='p-4 text-right'>{decToPercentage(cashConversion)}</td>
            
            <td className='p-4 text-right'>{cashConversion > 1 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>

          {/*  */}
          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-indigo-50'></td>
            <td className='p-4 text-right'></td>
            
            <td className='p-4 text-right'></td>
          </tr>
    
        </tbody>
      </table>
    </div>
  )
}

export default CompanyProfit;
