import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { FlagFilled } from '@ant-design/icons';

const CompanyHealth = () => {

  const [stockIncome, setStockIncome] = useState(null);
  const [stockBalance, setStockBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  const API_KEY = 'KJEJ4ZQQOGDC75P4';
  const incomeUrl = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${param.stockSymbol}&apikey=${API_KEY}`;
  const balanceUrl = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${param.stockSymbol}&apikey=${API_KEY}`;

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
        const response = await axios.get(balanceUrl);
        setStockBalance(response.data);
        setLoading(false);
        // console.log("balance", response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [balanceUrl]);

  const decToPercentage = (decimal) => {
    return `${(Number(decimal) * 100).toFixed(2)}%`;
  };

  if (!stockIncome) {
    return <progress className="progress w-56"></progress>;
  }
  if (!stockBalance) {
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
  const latestFiscalYear = stockBalance?.annualReports[0]?.fiscalDateEnding.slice(0,4);

  const currentRatio = Number(stockBalance?.annualReports[0]?.totalCurrentAssets) / Number(stockBalance?.annualReports[0]?.totalCurrentLiabilities);

  const debtRatio = (Number(stockBalance?.annualReports[0]?.shortTermDebt) + Number(stockBalance?.annualReports[0]?.longTermDebt)) / Number(stockBalance?.annualReports[0]?.totalAssets);

  const sharesOutstandingChange = (Number(stockBalance?.annualReports[0]?.commonStockSharesOutstanding) - Number(stockBalance?.annualReports[1]?.commonStockSharesOutstanding)) / Number(stockBalance?.annualReports[1]?.commonStockSharesOutstanding);

  const debtToEbitda = (Number(stockBalance?.annualReports[0]?.shortTermDebt) + Number(stockBalance?.annualReports[0]?.longTermDebt)) / Number(stockIncome?.annualReports[0]?.ebitda);
  
  return (
    <div className='health-table'>

      <table className="table-auto text-left">

        <thead>
          <tr>
            <th className="text-lg text-secondary p-4 bg-indigo-100">
              Financial Health
              {/* The button to open modal */}
              <label htmlFor="Health" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="Health" className="modal-toggle" />
              <label htmlFor="Health" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2">This segment shows metrics that help investors better understand the financial health of the company. we group these metrics here so our users can easily see how the financials of the company are, and if there's any red flags to be aware of.</p>
                  
                </label>
              </label>
            </th>
            <th className="text-lg text-secondary p-4 bg-indigo-100">Fiscal Year {latestFiscalYear}</th>
            
            <th className="text-lg text-secondary p-4 bg-indigo-100">
              {/* The button to open modal */}
              <label htmlFor="healthflag" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="healthflag" className="modal-toggle" />
              <label htmlFor="healthflag" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2"> A <FlagFilled style={{color:"#15803d"}}/> generally means strong performance, and otherwise <FlagFilled style={{color:"#dc2626"}}/> means weak performance.</p>
                  <p className="py-2"> Debt related ratios should always be compared amongst firms in the same sector, but as a general rule of thumb:</p>
                  <p className="py-2 font-bold"> 1.5 or above Current Ratio will receive <FlagFilled style={{color:"#15803d"}}/> ;</p>
                  <p className="py-2 font-bold"> 1 or below Debt Ratio will receive <FlagFilled style={{color:"#15803d"}}/> ;</p>
                  <p className="py-2 font-bold"> 1 or below Debt to EBITDA Ratio will receive <FlagFilled style={{color:"#15803d"}}/> ;</p>
                  
                  <p className="py-2 font-bold"> Decreasing Shares Outstanding will receive <FlagFilled style={{color:"#15803d"}}/> .</p>
                  <p className="py-2"> Again, these guidelines vary widely by industry and company size, and can be impacted by a variety of other factors.</p>
                  
                </label>
              </label>
            Flag
          </th>
          </tr>
        </thead>

        <tbody>

          {/* Current Ratio */}
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Current Ratio
              {/* The button to open modal */}
              <label htmlFor="CurrentRatio" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="CurrentRatio" className="modal-toggle" />
              <label htmlFor="CurrentRatio" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2 font-bold">Current Ratio = Current Assets / Current Liabilities</p>
                  <p className="py-2">The current ratio is a popular metric investors use to compare the current assets and liabilities. A current ratio above 1 means the company has more current assets than current liabilities, which generally means the company should be able to handle its liabilities for the next year.</p>
                  <p className="py-2">Remember, the current assets are the assets the company is expecting to liquidate into cash within the next 12 months. So if the company has more current assets than current liabilities (current ratio above 1), it generally means the company has enough cash to deal with its debts for the next year.</p>
                  <p className="py-2">A current ratio below 1 simply means that the company has more debts due within the next year than the account of assets it plans to turn into cash within the next year. If this is the case, then the company will either need to be producing positive cash flow to handle its liabilities, take on new debts, or dilute its shareholders to raise more money.</p>
                  <p className="py-2">Some investors view a current ratio above 2 as a red flag, because it can mean the company isn't using its cash to continue growing the company. Basically, some investors think that if the company is piling up cash then it means the people in charge don't know how to effectively use it to continue fueling more growth. On the other hand, some investors may view a current ratio above 2 as a very financially sound business.</p>
                  
                </label>
              </label>
            </td>
            <td className='p-4 text-right'>{currentRatio.toFixed(2)}</td>
            
            <td className='p-4 text-right'>{currentRatio > 1.5 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>

          {/* Debt Ratio */}
          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-indigo-50'>Debt Ratio
              {/* The button to open modal */}
              <label htmlFor="DebtRatio" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="DebtRatio" className="modal-toggle" />
              <label htmlFor="DebtRatio" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2 font-bold">Debt Ratio = Total Debt / Total Assets</p>
                  <p className="py-2">The term debt ratio refers to a financial ratio that measures the extent of a company's leverage. The debt ratio is defined as the ratio of total debt to total assets, expressed as a decimal or percentage. It can be interpreted as the proportion of a company's assets that are financed by debt.</p>
                  <p className="py-2">A ratio greater than 1 shows that a considerable amount of a company's assets are funded by debt, which means the company has more liabilities than assets. A high ratio indicates that a company may be at risk of default on its loans if interest rates suddenly rise. A ratio below 1 means that a greater portion of a company's assets is funded by equity.</p>
                  
                </label>
              </label>
            </td>
            <td className='p-4 text-right'>{debtRatio.toFixed(2)}</td>
            
            <td className='p-4 text-right'>{debtRatio < 1 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>

          {/* Debt to EBITDA Ratio */}
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Debt to EBITDA Ratio
              {/* The button to open modal */}
              <label htmlFor="DebttoEBITDARatio" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="DebttoEBITDARatio" className="modal-toggle" />
              <label htmlFor="DebttoEBITDARatio" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2 font-bold">Debt to EBITDA Ratio = Total Debt / EBITDA</p>
                  <p className="py-2">Investors use the debt/EBITDA ratio to help them see how able the company is to pay its debts. A higher debt/EBITDA ratio means the company is in a worse financial position. A low debt/EBIDTA ratio means the company is in a better financial position, and is less likely to default on debts or go into financial stress.</p>
                  <p className="py-2">Typically investors prefer lower debt/EBITDA ratios on their businesses. Some industries, like utilities, also have higher debt/EBITDA ratios by nature. This is simply because companies like utilities take on more debt to fuel growth, so it's common to see some industries have higher debt/EBITDA ratios then others.</p>
                  
                  
                </label>
              </label>
            </td>
            <td className='p-4 text-right'>{debtToEbitda.toFixed(2)}</td>
            
            <td className='p-4 text-right'>{debtToEbitda < 1 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>
          
          {/* Shares Outstanding Change */}
          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-indigo-50'>Shares Outstanding Change

              {/* The button to open modal */}
              <label htmlFor="StockSharesOutstanding" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="StockSharesOutstanding" className="modal-toggle" />
              <label htmlFor="StockSharesOutstanding" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Shares outstanding is how many shares of the company there are in existence. Companies can issue/sell more shares to the public which increases its share count, or they can buy back shares off the public markets which decreases the share count. Companies share counts are constantly changing depending on what the company is doing.</p>
                  <p className="py-2">Investors like to pay attention to the trend of the company's outstanding shares over time, because it helps them see if the business is issuing more shares consistently (which lowers the share price), or if the company is buying back shares and rewarding shareholders by removing shares from the public market (which increases the share price for investors).</p>
                </label>
              </label>
            </td>
            <td className='p-4 text-right'>{decToPercentage(sharesOutstandingChange)}</td>
            
            <td className='p-4 text-right'>{sharesOutstandingChange < 0 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>} </td>
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

export default CompanyHealth
