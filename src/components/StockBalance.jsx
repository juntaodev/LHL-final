import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const StockBalance = () => {

  const [stockBalance, setStockBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  const API_KEY = 'KJEJ4ZQQOGDC75P4';
  const url = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${param.stockSymbol}&apikey=${API_KEY}`;

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setStockBalance(response.data);
        setLoading(false);
        console.log("balance", response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [url]);

  if (!stockBalance) {
    return <div>Loading...</div>;
  }
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div>

      {/* need a 6 columns table, first column is key from API, other 5 columns are value from last 5 years*/}

      {/* needed key from top to bottom : totalAssets, totalCurrentAssets, cashAndCashEquivalentsAtCarryingValue, totalNonCurrentAssets, intangibleAssets, goodwill, totalLiabilities , totalCurrentLiabilities, currentDebt, currentAccountsPayable, totalNonCurrentLiabilities, longTermDebt, totalShareholderEquity, commonStock, commonStockSharesOutstanding  */}

      {/* */}

    </div>
  )
}

export default StockBalance