import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

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
    return <div>Loading...</div>;
  }
  if (!balanceUrl) {
    return <div>Loading...</div>;
  }
  if (error) return <p>An error occurred: {error.message}</p>;

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
            <th className="text-lg text-secondary p-4 bg-amber-100">Returns</th>
            <th className="text-lg text-secondary p-4 bg-amber-100">Latest Fiscal Year ({latestFiscalYear})</th>
            
            <th className="text-lg text-secondary p-4 bg-amber-100">Flag</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-amber-50'>Return on Invested Capitcal(ROIC)</td>
            <td className='p-4 text-right'>{decToPercentage(ROIC)}</td>
            
            <td className='p-4'>{ROIC > 0.07 ? "green" : "red"}</td>
          </tr>
          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-amber-50'>Return on Capital Employed (ROCE)</td>
            <td className='p-4 text-right'>{decToPercentage(ROCE)}</td>
            
            <td className='p-4'>{ROIC > 0.2 ? "green" : "red"}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-amber-50'>Return on Equity (ROE)</td>
            <td className='p-4 text-right'>{decToPercentage(ROE)}</td>
            
            <td className='p-4'>{ROE > 0.15 ? "green" : "red"}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-amber-50'>Return on Assets (ROA)</td>
            <td className='p-4 text-right'>{decToPercentage(ROA)}</td>
            
            <td className='p-4'>{ROA > 0.05 ? "green" : "red"}</td>
          </tr>
          
          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-amber-50'></td>
            <td className='p-4 text-right'></td>
            
            <td className='p-4'></td>
          </tr>
          
    
        </tbody>
      </table>
      
    </div>
  )
}

export default CompanyReturn
