import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { NumericFormat } from 'react-number-format';

const StockCashflow = () => {

  const [stockCashflow, setStockCashflow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  const API_KEY = 'KJEJ4ZQQOGDC75P4';
  const url = `https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${param.stockSymbol}&apikey=${API_KEY}`;

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setStockCashflow(response.data);
        setLoading(false);
        // console.log("cashflow", response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [url]);

  const yearList = stockCashflow?.annualReports.map((annualReport) => {
    
    return annualReport
  })

  const showInThousands = (input) => {
    return Number(input) / 1000
  }

  if (!stockCashflow) {
    return <div>Loading...</div>;
  }
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div>
      {/* need a 6 columns table, first column is key from API, other 5 columns are value from last 5 years*/}
      {/* needed key from top to bottom : operatingCashflow,   */}
      {/* */}

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
          <tr>
            <th className="lowercase text-primary">* number shown in thousands</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className="text-lg text-primary">{element.fiscalDateEnding.slice(0,4)}</th>
            })}
          </tr>
          </thead>
          <tbody>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Cash From Operating Activities</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.operatingCashflow)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Net Income</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.netIncome)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr> 
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Depreciation&Amortization</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.depreciationDepletionAndAmortization)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Cash From Investing Activities</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.cashflowFromInvestment)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Cash From Financing Activities</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.cashflowFromFinancing)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Debt Repayment</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.proceedsFromRepaymentsOfShortTermDebt)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Dividend Payout</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'>{element.dividendPayout === "None"? "--" : <NumericFormat value={showInThousands(element.dividendPayout)} thousandSeparator="," displayType="text"/>}</th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Change In Cash And Cash Equivalents</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.changeInCashAndCashEquivalents)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Capital Expenditures</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.capitalExpenditures)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          <tr className="hover text-md text-secondary">
            <th className='font-normal'>Free Cashflow</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal'><NumericFormat value={showInThousands(element.operatingCashflow - element.capitalExpenditures)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default StockCashflow