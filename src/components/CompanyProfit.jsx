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
            
            <th className="text-lg text-secondary p-4 bg-indigo-100">Flag</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Gross Margin</td>
            <td className='p-4 text-right'>{decToPercentage(grossMargin)}</td>
            
            <td className='p-4 text-right'>{grossMargin > 0.4 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Operating Margin</td>
            <td className='p-4 text-right'>{decToPercentage(operatingMargin)}</td>
            
            <td className='p-4 text-right'>{operatingMargin > 0.2 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Net Margin</td>
            <td className='p-4 text-right'>{decToPercentage(netMargin)}</td>
            
            <td className='p-4 text-right'>{netMargin > 0.2 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Free Cashflow Margin</td>
            <td className='p-4 text-right'>{decToPercentage(freeCashflowMargin)}</td>
            
            <td className='p-4 text-right'>{freeCashflowMargin > 0.1 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>
          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-indigo-50'>Cash Conversion</td>
            <td className='p-4 text-right'>{decToPercentage(cashConversion)}</td>
            
            <td className='p-4 text-right'>{cashConversion > 1 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
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

export default CompanyProfit;
