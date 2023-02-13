import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { FlagFilled } from '@ant-design/icons';

const CompanyReturn = () => {

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
        // console.log("cash", response.data);
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

  const ROA = stockIncome?.annualReports[0]?.netIncome / stockBalance?.annualReports[0]?.totalAssets;

  const ROE = stockIncome?.annualReports[0]?.netIncome / stockBalance?.annualReports[0]?.totalShareholderEquity;

  const ROIC = (stockIncome?.annualReports[0]?.operatingIncome - stockIncome?.annualReports[0]?.incomeTaxExpense) / (Number(stockBalance?.annualReports[0]?.totalShareholderEquity) + Number(stockBalance?.annualReports[0]?.shortTermDebt) + Number(stockBalance?.annualReports[0]?.longTermDebt) - Number(stockBalance?.annualReports[0]?.cashAndCashEquivalentsAtCarryingValue));

  const ROCE = stockIncome?.annualReports[0]?.ebit / (stockBalance?.annualReports[0]?.totalAssets - stockBalance?.annualReports[0]?.totalCurrentLiabilities);

  return (
    <div className='returns-table'>

      <table className="table-auto text-left">
        <thead>
          <tr>
            <th className="text-lg text-secondary p-4 bg-indigo-100">
              Returns
              {/* The button to open modal */}
              <label htmlFor="Returns" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="Returns" className="modal-toggle" />
              <label htmlFor="Returns" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2">This segment shows investors how efficient the company is at producing returns for its shareholders. Many investors pay attention to how much returns the company is generating on its book value and invested capital, so we group these metrics together here and points out any red flags investors should be aware of.</p>
                  
                </label>
              </label> 
            
            </th>
            <th className="text-lg text-secondary p-4 bg-indigo-100">Fiscal Year {latestFiscalYear}</th>
            
            <th className="text-lg text-secondary p-4 bg-indigo-100">Flag</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Return on Invested Capitcal (ROIC)</td>
            <td className='p-4 text-right'>{decToPercentage(ROIC)}</td>
            
            <td className='p-4 text-right'>{ROIC > 0.07 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>
          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-indigo-50'>Return on Capital Employed (ROCE)</td>
            <td className='p-4 text-right'>{decToPercentage(ROCE)}</td>
            
            <td className='p-4 text-right'>{ROIC > 0.2 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Return on Equity (ROE)</td>
            <td className='p-4 text-right'>{decToPercentage(ROE)}</td>
            
            <td className='p-4 text-right'>{ROE > 0.15 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Return on Assets (ROA)</td>
            <td className='p-4 text-right'>{decToPercentage(ROA)}</td>
            
            <td className='p-4 text-right'>{ROA > 0.05 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>
          
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

export default CompanyReturn
