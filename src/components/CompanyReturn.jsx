import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { FlagFilled } from '@ant-design/icons';

const CompanyReturn = () => {

  const [stockIncome, setStockIncome] = useState(null);
  const [stockBalance, setStockBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  const API_KEY = 'KJEJ4ZQQOGDC75P4';
  const incomeUrl = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${param.stockSymbol}&apikey=${API_KEY}`;
  const balanceUrl = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${param.stockSymbol}&apikey=${API_KEY}`;

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
        const response = await axios.get(balanceUrl);
        setStockBalance(response.data);
        setLoading(false);
        // console.log("cash", response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [balanceUrl]);

  const decToPercentage = (decimal) => {
    return `${(Number(decimal) * 100).toFixed(2)}%`;
  };

  if (!stockIncome) {
    return <progress className="progress w-56"></progress>;
  }
  if (!stockBalance) {
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

  // key variables
  const latestFiscalYear = stockBalance?.annualReports[0]?.fiscalDateEnding.slice(0,4);

  const ROA = stockIncome?.annualReports[0]?.netIncome / stockBalance?.annualReports[0]?.totalAssets;

  const ROE = stockIncome?.annualReports[0]?.netIncome / stockBalance?.annualReports[0]?.totalShareholderEquity;

  const ROIC = (Number(stockIncome?.annualReports[0]?.operatingIncome) - Number(stockIncome?.annualReports[0]?.incomeTaxExpense)) / (Number(stockBalance?.annualReports[0]?.totalShareholderEquity) + Number(stockBalance?.annualReports[0]?.shortTermDebt) + Number(stockBalance?.annualReports[0]?.longTermDebt) - Number(stockBalance?.annualReports[0]?.cashAndCashEquivalentsAtCarryingValue));

  const ROCE = stockIncome?.annualReports[0]?.ebit / (stockBalance?.annualReports[0]?.totalAssets - stockBalance?.annualReports[0]?.totalCurrentLiabilities);

  return (
    <div className='returns-table'>

      <table className="table-auto text-left">
        
        <thead>
          <tr>
            <th className="text-lg text-secondary p-4 bg-indigo-100">
              Returns
              {/* The button to open modal */}
              <label htmlFor="Returns" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="Returns" className="modal-toggle" />
              <label htmlFor="Returns" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2">This segment shows investors how efficient the company is at producing returns for its shareholders. Many investors pay attention to how much returns the company is generating on its book value and invested capital, so we group these metrics together here and points out any red flags investors should be aware of.</p>
                  
                </label>
              </label> 
            
            </th>
            <th className="text-lg text-secondary p-4 bg-indigo-100">Fiscal Year {latestFiscalYear}</th>
            
            <th className="text-lg text-secondary p-4 bg-indigo-100">
              {/* The button to open modal */}
              <label htmlFor="returnflag" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="returnflag" className="modal-toggle" />
              <label htmlFor="returnflag" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2"> A <FlagFilled style={{color:"#15803d"}}/> generally means strong performance, and otherwise <FlagFilled style={{color:"#dc2626"}}/> means weak performance.</p>
                  <p className="py-2"> Returns should always be compared amongst firms in the same sector, but as a general rule of thumb:</p>
                  <p className="py-2 font-bold"> 10% or above ROIC will receive <FlagFilled style={{color:"#15803d"}}/> ;</p>
                  <p className="py-2 font-bold"> 20% or above ROCE will receive <FlagFilled style={{color:"#15803d"}}/> ;</p>
                  <p className="py-2 font-bold"> 15% or above ROE will receive <FlagFilled style={{color:"#15803d"}}/> ;</p>
                  
                  <p className="py-2 font-bold"> 5% or above ROA will receive <FlagFilled style={{color:"#15803d"}}/> .</p>
                  <p className="py-2"> Again, these guidelines vary widely by industry and company size, and can be impacted by a variety of other factors.</p>
                  
                </label>
              </label>
              Flag
            </th>
          </tr>
        </thead>

        <tbody>
          {/* ROIC */}
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Return on Invested Capitcal (ROIC)
              {/* The button to open modal */}
              <label htmlFor="ReturnonInvestedCapitcal" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="ReturnonInvestedCapitcal" className="modal-toggle" />
              <label htmlFor="ReturnonInvestedCapitcal" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2 font-bold">ROIC = (Operating Income - Tax Provisions) / (Book Value + Total Debt - Cash & Cash Equivalents) * 100%</p>
                  <p className="py-2">Return on invested capital (ROIC) is also known as return on capital. This is one of the most important metrics investors take a look at when they're analyzing a company and its ability to generate returns for shareholders.</p>
                  <p className="py-2">ROIC shows investors how much profits the company's invested capital generates. It essentially shows them if the company is investing money wisely and getting solid returns from it.</p>
                  <p className="py-2">ROIC is used by investors to help show if a company is able to produce a high return on its invested capital for shareholders. The calculation includes the company's book value because including it shows investors how effective the company's net assets are at producing profits.</p>
                  <p className="py-2">ROIC also factors in the company's debt because a company taking on debt is a form of investment. Typically companies will take on debt to fuel more growth or buy a new asset. So factoring in debt to the calculation shows investors if the company is being effective with its debt or not.</p>
                  <p className="py-2">ROIC also removes the total cash position because uninvested cash is producing no returns. It's quite literally uninvested, so subtracting it shows investors a better picture of the returns the company is getting on its investments.</p>
                  <p className="py-2">Typically companies with higher ROIC figures are valued more highly by investors because the company is more efficient at producing returns for every dollar of invested capital. In other words, this means the company is most likely able to continue producing strong returns on invested capital for investors in the future.</p>
                  <p className="py-2">Some investors believe that a low ROIC or even a negative ROIC can signal that the management of the company is not adept at producing returns for shareholders, or investing capital wisely. On the contrary, investors typically view companies with consistently high ROIC figures as having strong management teams.</p>
                  <p className="py-2">The ROIC calculation does not use the tangible book value because investors want it to include the goodwill and intangible assets on the balance sheet. Goodwill is placed on a balance sheet during an acquisition, so factoring in the goodwill to the ROIC calculation can also show investors if the management is acquiring companies effectively or not.</p>
                  
                </label>
              </label>
            </td>
            <td className='p-4 text-right'>{decToPercentage(ROIC)}</td>
            
            <td className='p-4 text-right'>{ROIC > 0.1 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>

          {/* ROCE */}
          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-indigo-50'>Return on Capital Employed (ROCE)
              {/* The button to open modal */}
              <label htmlFor="ReturnonCapitalEmployed" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="ReturnonCapitalEmployed" className="modal-toggle" />
              <label htmlFor="ReturnonCapitalEmployed" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2 font-bold">ROCE = (EBIT / (Total Assets - Current Liabilities)) x 100%</p>
                  <p className="py-2">ROCE shows investors how effective a business is at producing income from not only its book value, but also its long term debts.</p>
                  <p className="py-2">Investors typically use ROCE in conjunction with the ROIC metric on businesses that have a large amount of long term debt. This is because the ROCE calculation factors in long term debt to the equation and shows investors how efficiently the company is leveraging its debts.</p>
                  <p className="py-2">Typically investors prefer companies with higher ROCE values, because it means they're getting a higher return and producing more profits for every $ of capital employed.</p>
                  <p className="py-2">Investors also typically like to see company's where the ROCE is either increasing or staying consistent. If the ROCE is going down, it could suggest that the business is not leveraging debt as well as it has in the past.</p>
                  
                </label>
              </label>
            </td>
            <td className='p-4 text-right'>{decToPercentage(ROCE)}</td>
            
            <td className='p-4 text-right'>{ROCE > 0.2 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>

          {/* ROE */}
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Return on Equity (ROE)
              {/* The button to open modal */}
              <label htmlFor="ReturnOnEquity" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="ReturnOnEquity" className="modal-toggle" />
              <label htmlFor="ReturnOnEquity" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                <p className="py-2 font-bold">Return On Equity = (Net Income / Book Value) * 100%</p>
                 <p className="py-2">Return on equity (ROE) is a measure of how much net income/earnings a company is able to make vs. its book value/shareholder equity as a percent. The calculation for this metric helps investors better understand it.</p>
                 <p className="py-2">Investors often use return on equity to see how profitable the assets of the company are. The ratio essentially tells investors how much net income/earnings the company can produce from its assets and how efficient they are at generating earnings.</p>
                 <p className="py-2">A high ROE means the assets are better at producing earnings, whereas a lower ROE means the assets are not as efficient at producing net income for shareholders.</p>
                 <p className="py-2">ROE is a metric that investors like to use when looking at financial companies, like banks and insurance companies. This is because financial companies typically have a lot of assets, and their business models include leveraging their assets to produce revenue/income.</p>
                 <p className="py-2">A bank is a good example. Banks lend out cash (assets) and generate revenue through interest on the loans. So a bank is literally using its cash (assets) to produce income for shareholders. This means a higher ROE results in a more efficient bank. Or in other words, a high ROE means the bank is making more money on every dollar it lends out.</p>
                  
                </label>
              </label>
            </td>
            <td className='p-4 text-right'>{decToPercentage(ROE)}</td>
            
            <td className='p-4 text-right'>{ROE > 0.15 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>

          {/* ROA */}
          <tr className="hover text-base text-secondary">
            <td className='p-4 bg-indigo-50'>Return on Assets (ROA)
              {/* The button to open modal */}
              <label htmlFor="ReturnOnAssets" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="ReturnOnAssets" className="modal-toggle" />
              <label htmlFor="ReturnOnAssets" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                <p className="py-2 font-bold">Return On Assets = (Net Income / Total Assets) * 100%</p>
                 <p className="py-2">Return on assets (ROA) is a profitability metric that shows investors how profitable the company's assets are. Another way to word this would be the ROA shows investors how efficient the company's assets are at producing profits.</p>
                 <p className="py-2">Investors like to view the ROA figure because it shows them how profitable the company's assets are. For example, if a company is producing $1,000 in earnings and has $100,000 worth of assets, then the company's assets are only producing $1 in earnings for every $100 worth of assets. In other words, this company only has a 1% ROA, which means its assets aren't very efficient at producing earnings for shareholders.</p>
                 <p className="py-2">Typically investors like higher ROA figures for 2 reasons: 1. A high ROA means the company doesn't have to invest as much money into assets to continue growing earnings; 2. A high ROA can indicate the company doesn't have high capital expenditures or depreciation and amortization expenses.</p>
                 <p className="py-2">On the other hand, a company with a low ROA will most likely have to invest much more money into assets to continue growing its earnings for investors. This ultimately means that a company with a higher ROA will have to invest less money to produce more returns than a company with a lower ROA.</p>
                 <p className="py-2">The ROA calculation does not use the tangible book value because investors want it to include the goodwill and intangible assets on the balance sheet. Goodwill is placed on a balance sheet during an acquisition, so factoring in the goodwill to the ROA calculation can also show investors if the management is acquiring companies effectively or not.</p>
                 <p className="py-2">Some investors believe that a low ROA or even a negative ROA can signal that the management of the company is not adept at producing returns for shareholders, or investing capital wisely. On the contrary, investors typically view companies with consistently high ROA figures as having strong management teams.</p>
                 <p className="py-2">Financial stocks like banks and insurance companies typically have very low ROA figures. This is because the companies have an incredible amount of assets on the balance sheet. Instead, investors typically look at the ROE figure, which uses the book value instead of the total assets in the calculation.</p>
                  
                </label>
              </label>
            </td>
            <td className='p-4 text-right'>{decToPercentage(ROA)}</td>
            
            <td className='p-4 text-right'>{ROA > 0.05 ? <FlagFilled style={{color:"#15803d"}}/> : <FlagFilled style={{color:"#dc2626"}}/>}</td>
          </tr>
          
          {/*  */}
          <tr className="hover text-base text-secondary"> 
            <td className='p-4 bg-indigo-50'></td>
            <td className='p-4 text-right'></td>
            
            <td className='p-4 text-right'></td>
          </tr>
          
    
        </tbody>
      </table>
      
    </div>
  )
}

export default CompanyReturn
