import React, { useState, useEffect } from 'react';
import axios from 'axios';


const StockTable = () => {

  const [stockIncome, setStockIncome] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const API_KEY = 'KJEJ4ZQQOGDC75P4';
  const url = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=AAPL&apikey=${API_KEY}`;

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setStockIncome(response.data);
        setLoading(false);
        console.log("keyvalue", response.data);
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

  return (
    <div>

      {/* need a 6 columns table, first column is key from API, other 5 columns are value from last 5 years*/}

      {/* needed key from top to bottom : totalRevenue, costOfRevenue, grossProfit, operatingExpenses, operatingIncome, otherNonOperatingIncome, incomeBeforeTax, , incomeTaxExpense, netIncome, ebitda*/}

      {/* so total row number should be  11 (1 header row + 10 data rows)*/}

    </div>
  )
}

export default StockTable
