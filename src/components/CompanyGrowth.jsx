import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const CompanyGrowth = () => {

  const [stockIncome, setStockIncome] = useState(null);
  const [stockCash, setStockCash] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  const API_KEY = 'KJEJ4ZQQOGDC75P4';
  const incomeUrl = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=AAPL&apikey=${API_KEY}`;
  const cashUrl = `https://www.alphavantage.co/query?function=CASH_FLOW&symbol=AAPL&apikey=${API_KEY}`;

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

  const revenueGrowthOneYear = (stockIncome.annualReports[0].totalRevenue - stockIncome.annualReports[1].totalRevenue) / stockIncome.annualReports[1].totalRevenue;
  const revenueGrowthFiveYear = (stockIncome.annualReports[0].totalRevenue - stockIncome.annualReports[4].totalRevenue) / stockIncome.annualReports[4].totalRevenue / 4;
  const grossProfitGrowthOneYear = (stockIncome.annualReports[0].grossProfit - stockIncome.annualReports[1].grossProfit) / stockIncome.annualReports[1].grossProfit;
  const grossProfitGrowthFiveYear = (stockIncome.annualReports[0].grossProfit - stockIncome.annualReports[4].grossProfit) / stockIncome.annualReports[4].grossProfit / 4;
  const netIncomeGrowthOneYear = (stockIncome.annualReports[0].netIncome - stockIncome.annualReports[1].netIncome) / stockIncome.annualReports[1].netIncome;
  const netIncomeGrowthFiveYear = (stockIncome.annualReports[0].netIncome - stockIncome.annualReports[4].netIncome) / stockIncome.annualReports[4].netIncome / 4;
  const operatingCashflowGrowthOneYear = (stockCash.annualReports[0].operatingCashflow - stockCash.annualReports[1].operatingCashflow) / stockCash.annualReports[1].operatingCashflow;
  const operatingCashflowGrowthFiveYear = (stockCash.annualReports[0].operatingCashflow - stockCash.annualReports[4].operatingCashflow) / stockCash.annualReports[4].operatingCashflow / 4;
  const freeCashflowGrowthOneYear = ((stockCash.annualReports[0].operatingCashflow - stockCash.annualReports[0].capitalExpenditures) - (stockCash.annualReports[1].operatingCashflow - stockCash.annualReports[1].capitalExpenditures)) / (stockCash.annualReports[1].operatingCashflow - stockCash.annualReports[1].capitalExpenditures);
  const freeCashflowGrowthFiveYear = ((stockCash.annualReports[0].operatingCashflow - stockCash.annualReports[0].capitalExpenditures) - (stockCash.annualReports[4].operatingCashflow - stockCash.annualReports[4].capitalExpenditures)) / (stockCash.annualReports[4].operatingCashflow - stockCash.annualReports[4].capitalExpenditures) / 4;

  return (
    <div className='growth-table'>

      <table className="table-auto text-left">
        <thead>
          <tr>
            <th className="text-lg text-secondary p-4 bg-amber-100">Growth</th>
            <th className="text-lg text-secondary p-4 bg-amber-100">1 YEAR</th>
            <th className="text-lg text-secondary p-4 bg-amber-100">5 YEAR AVG</th>
            <th className="text-lg text-secondary p-4 bg-amber-100">Flag</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-amber-50'>Revenue Growth</td>
            <td className='p-4 text-right'>{decToPercentage(revenueGrowthOneYear)}</td>
            <td className='p-4 text-right'>{decToPercentage(revenueGrowthFiveYear)}</td>
            <td className='p-4 text-right'>{revenueGrowthOneYear > revenueGrowthFiveYear ? "green" : "red"}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-amber-50'>Gross Profit Growth</td>
            <td className='p-4 text-right'>{decToPercentage(grossProfitGrowthOneYear)}</td>
            <td className='p-4 text-right'>{decToPercentage(grossProfitGrowthFiveYear)}</td>
            <td className='p-4 text-right'>{grossProfitGrowthOneYear > grossProfitGrowthFiveYear ? "green" : "red"}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-amber-50'>Net Income Growth</td>
            <td className='p-4 text-right'>{decToPercentage(netIncomeGrowthOneYear)}</td>
            <td className='p-4 text-right'>{decToPercentage(netIncomeGrowthFiveYear)}</td>
            <td className='p-4 text-right'>{netIncomeGrowthOneYear > netIncomeGrowthFiveYear ? "green" : "red"}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-amber-50'>Operating Cashflow Growth</td>
            <td className='p-4 text-right'>{decToPercentage(operatingCashflowGrowthOneYear)}</td>
            <td className='p-4 text-right'>{decToPercentage(operatingCashflowGrowthFiveYear)}</td>
            <td className='p-4 text-right'>{operatingCashflowGrowthOneYear > operatingCashflowGrowthFiveYear ? "green" : "red"}</td>
          </tr>
          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-amber-50'>Free Cashflow Growth</td>
            <td className='p-4 text-right'>{decToPercentage(freeCashflowGrowthOneYear)}</td>
            <td className='p-4 text-right'>{decToPercentage(freeCashflowGrowthFiveYear)}</td>
            <td className='p-4 text-right'>{freeCashflowGrowthOneYear > freeCashflowGrowthFiveYear ? "green" : "red"}</td>
          </tr>
    
        </tbody>
      </table>
      
    </div>
  )
}

export default CompanyGrowth
