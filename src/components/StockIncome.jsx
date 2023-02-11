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
        // console.log("income", response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [url]);

  const yearList = stockIncome?.annualReports.map((annualReport) => {
    
    return annualReport
  })

  const showInThousands = (input) => {
    return Number(input) / 1000
  }
  

  if (!stockIncome) {
    return <div>Loading...</div>;
  }
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div>
    {/* need a 6 columns table, first column is key from API, other 5 columns are value from last 5 years*/}
    {/* needed key from top to bottom : totalRevenue, costOfRevenue, grossProfit, operatingExpenses, operatingIncome, otherNonOperatingIncome, incomeBeforeTax, , incomeTaxExpense, netIncome, ebitda*/}
    {/* so total row number should be  11 (1 header row + 10 data rows)*/}

      {/* table header */}
      <table class="table-auto w-full">
       <thead>
          <tr>
            <th className="text-primary p-4 text-lg">
              Income Statement
              {/* The button to open modal */}
              <label htmlFor="IncomeStatement" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="IncomeStatement" className="modal-toggle" />
              <label htmlFor="IncomeStatement" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2">The income statement is one of 3 financial documents that company's file on a quarterly basis (once every 3 months) to update the public and investors about how the operations of the company are doing.</p>
                  <p className="py-2">The income statement includes the amount of revenue the company is generating, how much expenses are to produce that revenue, gains on asset values (like stocks and properties), how much tax the company is paying, and how many shares the company has outstanding.</p>
                  <p className="py-2">The goal of the income statement is to show investors how much revenue and value the company is producing for its shareholders. This is also the statement that shows a company's earnings (net income). Many investors in the market look at earnings to make decisions about the stock, and they use earnings in their valuation calculations.</p>
                  <p className="py-2">The income statement has a lot of very important information that investors need to know and understand, and Stock Unlock's education mode will help explain everything on the income statement in detail so you can better know what to look for.</p>
                  
                </label>
              </label> 
            </th>
          </tr>
        </thead>      
      </table>

      {/* table */}
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
