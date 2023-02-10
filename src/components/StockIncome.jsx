import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { NumericFormat } from 'react-number-format';

const StockIncome = () => {

  const [stockIncome, setStockIncome] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();
  console.log(param)

  const API_KEY = 'KJEJ4ZQQOGDC75P4';
  const url = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${param.stockSymbol}&apikey=${API_KEY}`;

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setStockIncome(response.data);
        setLoading(false);
        console.log("income", response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [url]);

  const yearList = stockIncome?.annualReports.map((annualReport) => {
    console.log(typeof(annualReport.fiscalDateEnding));
    return annualReport
  })

  const showInThousands = (input) => {
    return Number(input) / 1000
  }
  // console.log(stockIncome.annualReport);
  // console.log(stockIncome);

  if (!stockIncome) {
    return <div>Loading...</div>;
  }
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div>
    {/* need a 6 columns table, first column is key from API, other 5 columns are value from last 5 years*/}
    {/* needed key from top to bottom : totalRevenue, costOfRevenue, grossProfit, operatingExpenses, operatingIncome, otherNonOperatingIncome, incomeBeforeTax, , incomeTaxExpense, netIncome, ebitda*/}
    {/* so total row number should be  11 (1 header row + 10 data rows)*/}
    {/* iterating over the  */}
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>{stockIncome.symbol} (* number shown in thousands)</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className="text-lg text-primary">{element.fiscalDateEnding.slice(0,4)}</th>
            })}
          </tr>
        </thead>
        <tbody>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Total Revenue</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.totalRevenue)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Cost of Revenue</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.costOfRevenue)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr> 
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Gross Profit</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.grossProfit)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Operating Expenses</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.operatingExpenses)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Operating Income</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.operatingIncome)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Other Non-Operating Income</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.otherNonOperatingIncome)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Income Before Tax</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.incomeBeforeTax)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Income Tax Expense</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.incomeTaxExpense)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Net Income</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.netIncome)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>EBITDA</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.ebitda)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
        </tbody>
      </table>
      </div>

  </div>
  )
}

export default StockIncome
