import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

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
    return <div>Loading...</div>;
  }
  if (!stockCash) {
    return <div>Loading...</div>;
  }
  if (error) return <p>An error occurred: {error.message}</p>;
  
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
            <th className="text-lg text-secondary p-4 bg-amber-100">Profitabilities</th>
            <th className="text-lg text-secondary p-4 bg-amber-100">Latest Fiscal Year ({latestFiscalYear})</th>
            
            <th className="text-lg text-secondary p-4 bg-amber-100">Flag</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-amber-50'>Gross Margin</td>
            <td className='p-4 text-right'>{decToPercentage(grossMargin)}</td>
            
            <td className='p-4'>{grossMargin > 0.5 ? "green" : "red"}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-amber-50'>Operating Margin</td>
            <td className='p-4 text-right'>{decToPercentage(operatingMargin)}</td>
            
            <td className='p-4'>{operatingMargin > 0.2 ? "green" : "red"}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-amber-50'>Net Margin</td>
            <td className='p-4 text-right'>{decToPercentage(netMargin)}</td>
            
            <td className='p-4'>{netMargin > 0.2 ? "green" : "red"}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-amber-50'>Free Cashflow Margin</td>
            <td className='p-4 text-right'>{decToPercentage(freeCashflowMargin)}</td>
            
            <td className='p-4'>{freeCashflowMargin > 0.1 ? "green" : "red"}</td>
          </tr>
          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-amber-50'>Cash Conversion</td>
            <td className='p-4 text-right'>{decToPercentage(cashConversion)}</td>
            
            <td className='p-4'>{cashConversion > 1 ? "green" : "red"}</td>
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

export default CompanyProfit;
