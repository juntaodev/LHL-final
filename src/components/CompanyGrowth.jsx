import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { FlagFilled } from '@ant-design/icons';

const CompanyGrowth = () => {

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
    return <progress className="progress w-56"></progress>;
  }
  if (!stockCash) {
    return <progress className="progress w-56"></progress>;
  }
  if (loading) {
    return <progress className="progress w-56"></progress>;
  }
  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
         <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
         <span>Error! Something is Wrong! Try Refresh!</span>
        </div>
      </div>)
  }

  //key variables 
  const latestFiscalYear = stockIncome?.annualReports[0]?.fiscalDateEnding.slice(0,4);
  const revenueGrowthOneYear = (stockIncome.annualReports[0]?.totalRevenue - stockIncome.annualReports[1]?.totalRevenue) / stockIncome.annualReports[1]?.totalRevenue;
  const revenueGrowthFiveYear = (stockIncome.annualReports[0]?.totalRevenue - stockIncome.annualReports[4]?.totalRevenue) / stockIncome.annualReports[4]?.totalRevenue / 4;
  const grossProfitGrowthOneYear = (stockIncome.annualReports[0]?.grossProfit - stockIncome.annualReports[1]?.grossProfit) / stockIncome.annualReports[1]?.grossProfit;
  const grossProfitGrowthFiveYear = (stockIncome.annualReports[0]?.grossProfit - stockIncome.annualReports[4]?.grossProfit) / stockIncome.annualReports[4]?.grossProfit / 4;
  const netIncomeGrowthOneYear = (stockIncome.annualReports[0]?.netIncome - stockIncome.annualReports[1]?.netIncome) / stockIncome.annualReports[1]?.netIncome;
  const netIncomeGrowthFiveYear = (stockIncome.annualReports[0]?.netIncome - stockIncome.annualReports[4]?.netIncome) / stockIncome.annualReports[4]?.netIncome / 4;
  const operatingCashflowGrowthOneYear = (stockCash.annualReports[0]?.operatingCashflow - stockCash.annualReports[1]?.operatingCashflow) / stockCash.annualReports[1]?.operatingCashflow;
  const operatingCashflowGrowthFiveYear = (stockCash.annualReports[0]?.operatingCashflow - stockCash.annualReports[4]?.operatingCashflow) / stockCash.annualReports[4]?.operatingCashflow / 4;
  const freeCashflowGrowthOneYear = ((stockCash.annualReports[0]?.operatingCashflow - stockCash.annualReports[0]?.capitalExpenditures) - (stockCash.annualReports[1]?.operatingCashflow - stockCash.annualReports[1]?.capitalExpenditures)) / (stockCash.annualReports[1]?.operatingCashflow - stockCash.annualReports[1]?.capitalExpenditures);
  const freeCashflowGrowthFiveYear = ((stockCash.annualReports[0]?.operatingCashflow - stockCash.annualReports[0]?.capitalExpenditures) - (stockCash.annualReports[4]?.operatingCashflow - stockCash.annualReports[4]?.capitalExpenditures)) / (stockCash.annualReports[4]?.operatingCashflow - stockCash.annualReports[4]?.capitalExpenditures) / 4;

  return (
    <div className='growth-table'>

      <table className="table-auto text-left">
        <thead>
          <tr>
            <th className="text-lg text-secondary p-4 bg-indigo-100">Growth
              {/* The button to open modal */}
              <label htmlFor="Growth" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="Growth" className="modal-toggle" />
              <label htmlFor="Growth" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2">This segment shows metrics related to the company's growth. These are metrics that investors pay attention to when analyzing a company's growth. Typically investors prefer companies that are growing more rapidly.</p>
                  
                </label>
              </label> 
            </th>
            <th className="text-lg text-secondary p-4 bg-indigo-100">Fiscal Year {latestFiscalYear}</th>
            <th className="text-lg text-secondary p-4 bg-indigo-100">5 Year AVG</th>
            <th className="text-lg text-secondary p-4 bg-indigo-100">
              
              {/* The button to open modal */}
              <label htmlFor="growthflag" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="growthflag" className="modal-toggle" />
              <label htmlFor="growthflag" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2"> A <FlagFilled style={{color:"#15803d"}}/> generally means strong performance, and otherwise <FlagFilled style={{color:"#dc2626"}}/> means weak performance.</p>
                  <p className="py-2 font-bold"> In general, a healthy growth rate should be sustainable for the company. In most cases, an ideal growth rate will be around 15 and 25% annually.</p>
                  <p className="py-2 font-bold"> Latest fiscal year growth equal or above five year average growth will receive <FlagFilled style={{color:"#15803d"}}/> .</p>
                  
                  <p className="py-2"> Again, these guidelines vary widely by industry and company size, and can be impacted by a variety of other factors.</p>
                  
                </label>
              </label>
              Flag
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Revenue Growth</td>
            <td className='p-4 text-right'>{decToPercentage(revenueGrowthOneYear)}</td>
            <td className='p-4 text-right'>{decToPercentage(revenueGrowthFiveYear)}</td>
            <td className='p-4 text-right'>{revenueGrowthOneYear > revenueGrowthFiveYear ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/> }</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Gross Profit Growth</td>
            <td className='p-4 text-right'>{decToPercentage(grossProfitGrowthOneYear)}</td>
            <td className='p-4 text-right'>{decToPercentage(grossProfitGrowthFiveYear)}</td>
            <td className='p-4 text-right'>{grossProfitGrowthOneYear > grossProfitGrowthFiveYear ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Net Income Growth</td>
            <td className='p-4 text-right'>{decToPercentage(netIncomeGrowthOneYear)}</td>
            <td className='p-4 text-right'>{decToPercentage(netIncomeGrowthFiveYear)}</td>
            <td className='p-4 text-right'>{netIncomeGrowthOneYear > netIncomeGrowthFiveYear ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Operating Cashflow Growth</td>
            <td className='p-4 text-right'>{decToPercentage(operatingCashflowGrowthOneYear)}</td>
            <td className='p-4 text-right'>{decToPercentage(operatingCashflowGrowthFiveYear)}</td>
            <td className='p-4 text-right'>{operatingCashflowGrowthOneYear > operatingCashflowGrowthFiveYear ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>
          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-indigo-50'>Free Cashflow Growth</td>
            <td className='p-4 text-right'>{decToPercentage(freeCashflowGrowthOneYear)}</td>
            <td className='p-4 text-right'>{decToPercentage(freeCashflowGrowthFiveYear)}</td>
            <td className='p-4 text-right'>{freeCashflowGrowthOneYear > freeCashflowGrowthFiveYear ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>

          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-indigo-50'></td>
            <td className='p-4 text-right'></td>
            
            <td className='p-4'></td>
          </tr>
    
        </tbody>
      </table>
      
    </div>
  )
}

export default CompanyGrowth
