import React, { useState, useEffect } from 'react';
import axios from 'axios';


const StockTable = () => {

  const [stockIncome, setStockIncome] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const param = useParams();


  const API_KEY = 'KJEJ4ZQQOGDC75P4';
  const url = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=META&apikey=${API_KEY}`;

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setStockIncome(response.data);
        setLoading(false);
        // console.log("keyvalue", response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [url]);

  if (!stockIncome) {
    return <div>Loading...</div>;
  }
  if (error) return <p>An error occurred: {error.message}</p>;

  const yearList = stockIncome.annualReports.map((annualReport) => {
    // console.log(typeof(annualReport.fiscalDateEnding));
    return annualReport
  })
  // console.log(yearList)

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
              <th>{stockIncome.symbol}</th>
              {yearList.map((element) => {
                return <th key={element.fiscalDateEnding}>{element.fiscalDateEnding.slice(0,4)}</th>
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Total Revenue</th>
              {yearList.map((element) => {
                return <th key={element.fiscalDateEnding}>{element.totalRevenue}</th>
              })}
            </tr>
            <tr>
              <th>Cost of Revenue</th>
              {yearList.map((element) => {
                return <th key={element.fiscalDateEnding}>{element.costOfRevenue}</th>
              })}
            </tr> 
            <tr>
              <th>Gross Profit</th>
              {yearList.map((element) => {
                return <th key={element.fiscalDateEnding}>{element.grossProfit}</th>
              })}
            </tr>
            <tr>
              <th>Operating Expenses</th>
              {yearList.map((element) => {
                return <th key={element.fiscalDateEnding}>{element.operatingExpenses}</th>
              })}
            </tr>
            <tr>
              <th>Operating Income</th>
              {yearList.map((element) => {
                return <th key={element.fiscalDateEnding}>{element.operatingIncome}</th>
              })}
            </tr>
            <tr>
              <th>Other Non-Operating Income</th>
              {yearList.map((element) => {
                return <th key={element.fiscalDateEnding}>{element.otherNonOperatingIncome}</th>
              })}
            </tr>
            <tr>
              <th>Income Before Tax</th>
              {yearList.map((element) => {
                return <th key={element.fiscalDateEnding}>{element.incomeBeforeTax}</th>
              })}
            </tr>
            <tr>
              <th>Income Tax Expense</th>
              {yearList.map((element) => {
                return <th key={element.fiscalDateEnding}>{element.incomeTaxExpense}</th>
              })}
            </tr>
            <tr>
              <th>Net Income</th>
              {yearList.map((element) => {
                return <th key={element.fiscalDateEnding}>{element.netIncome}</th>
              })}
            </tr>
            <tr>
              <th>EBITDA</th>
              {yearList.map((element) => {
                return <th key={element.fiscalDateEnding}>{element.ebitda}</th>
              })}
            </tr>
          </tbody>
        </table>
        </div>

    </div>
  )
}

export default StockTable
