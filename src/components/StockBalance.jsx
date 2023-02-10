import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { NumericFormat } from 'react-number-format';

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

  const yearList = stockBalance?.annualReports.map((annualReport) => {
    console.log(typeof(annualReport.fiscalDateEnding));
    return annualReport
  })

  const showInThousands = (input) => {
    return Number(input) / 1000
  }

  if (!stockBalance) {
    return <div>Loading...</div>;
  }
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div>

      {/* need a 6 columns table, first column is key from API, other 5 columns are value from last 5 years*/}

      {/* needed key from top to bottom : totalAssets, totalCurrentAssets, cashAndCashEquivalentsAtCarryingValue, totalNonCurrentAssets, intangibleAssets, goodwill, totalLiabilities , totalCurrentLiabilities, currentDebt, currentAccountsPayable, totalNonCurrentLiabilities, longTermDebt, totalShareholderEquity, commonStock, commonStockSharesOutstanding  */}

      {/* */}
      <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>{stockBalance.symbol} (* number shown in thousands)</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className="text-lg text-primary">{element.fiscalDateEnding.slice(0,4)}</th>
            })}
          </tr>
        </thead>
        <tbody>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Total Assets</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.totalAssets)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Total Current Assets</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.totalCurrentAssets)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr> 
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Cash And Cash Equivalents</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.cashAndCashEquivalentsAtCarryingValue)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Total Non Current Assets</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.totalNonCurrentAssets)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Intangible Assets</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.intangibleAssets)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Goodwill</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.goodwill)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Total Liabilities</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.totalLiabilities)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Total Current Liabilities</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.totalCurrentLiabilities)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Current Debt</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.currentDebt)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Current Accounts Payable</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.currentAccountsPayable)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Total Non Current Liabilities</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.totalNonCurrentLiabilities)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Long Term Debt</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.longTermDebt)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Total Shareholder Equity</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.totalShareholderEquity)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Common Stock</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.commonStock)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Common Stock Shares Outstanding</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.commonStockSharesOutstanding)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
        </tbody>
      </table>
      </div>

    </div>
  )
}

export default StockBalance