import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const CompanyHealth = () => {

  const [stockIncome, setStockIncome] = useState(null);
  const [stockBalance, setStockBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  const API_KEY = 'KJEJ4ZQQOGDC75P4';
  const incomeUrl = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=AAPL&apikey=${API_KEY}`;
  const balanceUrl = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=AAPL&apikey=${API_KEY}`;

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
    return <div>Loading...</div>;
  }
  if (!balanceUrl) {
    return <div>Loading...</div>;
  }
  if (error) return <p>An error occurred: {error.message}</p>;

  // key variables
  const latestFiscalYear = stockBalance?.annualReports[0].fiscalDateEnding.slice(0,4);

  const currentRatio = Number(stockBalance?.annualReports[0].totalCurrentAssets) / Number(stockBalance?.annualReports[0].totalCurrentLiabilities);

  const debtRatio = (Number(stockBalance?.annualReports[0].shortTermDebt) + Number(stockBalance?.annualReports[0].longTermDebt)) / Number(stockBalance?.annualReports[0].totalAssets);

  const sharesOutstandingChange = (Number(stockBalance?.annualReports[0].commonStockSharesOutstanding) - Number(stockBalance?.annualReports[1].commonStockSharesOutstanding)) / Number(stockBalance?.annualReports[1].commonStockSharesOutstanding);

  const debtToEbitda = ((Number(stockBalance?.annualReports[0].shortTermDebt) + Number(stockBalance?.annualReports[0].longTermDebt)) / Number(stockIncome?.annualReports[0].ebitda));

  const intangiblesToAssets = (Number(stockBalance?.annualReports[0].intangibleAssets) / Number(stockBalance?.annualReports[0].totalAssets));

  
  
  return (
    <div className='health-table'>

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
            <td className='p-4 bg-amber-50'>Current Ratio</td>
            <td className='p-4 text-right'>{currentRatio.toFixed(2)}</td>
            
            <td className='p-4'>{currentRatio > 1 ? "green" : "red"}</td>
          </tr>

          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-amber-50'>Debt Ratio</td>
            <td className='p-4 text-right'>{debtRatio.toFixed(2)}</td>
            
            <td className='p-4'>{currentRatio < 1 ? "green" : "red"}</td>
          </tr>

          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-amber-50'>Debt to EBITDA Ratio</td>
            <td className='p-4 text-right'>{debtToEbitda.toFixed(2)}</td>
            
            <td className='p-4'>{debtToEbitda < 1 ? "green" : "red"}</td>
          </tr>
          
          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-amber-50'>Shares Outstanding Change</td>
            <td className='p-4 text-right'>{decToPercentage(sharesOutstandingChange)}</td>
            
            <td className='p-4'>{sharesOutstandingChange < 0 ? "green" : "red"} </td>
          </tr>
          
          
          
    
        </tbody>
      </table>
    </div>
  )
}

export default CompanyHealth
