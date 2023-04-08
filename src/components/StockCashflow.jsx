import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { NumericFormat } from 'react-number-format';

const StockCashflow = () => {

  const [stockCashflow, setStockCashflow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  const API_KEY = process.env.ALPHA_API_KEY;
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

  return (
    <div>
      {/* need a 6 columns table, first column is key from API, other 5 columns are value from last 5 years*/}
      {/* needed key from top to bottom : operatingCashflow,   */}
      {/* */}

      <table className="table-auto w-full">
       <thead>
          <tr>
            <th className="text-secondary p-4 text-lg">
              Cash Flow Statement
              {/* The button to open modal */}
              <label htmlFor="Cash Flow Statement" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="Cash Flow Statement" className="modal-toggle" />
              <label htmlFor="Cash Flow Statement" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  
                  <p className="py-2">The cash flow statement is one of 3 financial documents that company's file on a quarterly basis (once every 3 months) to update the public and investors about how the cash flows of the company are doing.</p>
                  <p className="py-2">The cash flow statement is very important to pay attention to because it shows investors how much cash the company is bringing in, and where its cash is coming from. It's called the cash flow statement because it shows how the cash is flowing in and out of the company.</p>
                  <p className="py-2">The cash flow statement is a lot like the income statement, but its only goal is to show how much cash the company is producing and where cash is flowing. It's for this reason that a lot of non cash expenses are added back onto the cash flow statement because again, this statement's goal is to track the actual cash movements in the company.</p>
                  <p className="py-2">Cash flows are very important to pay attention to and can really show investors a lot about the company and its management. It can show you whether the company is losing money, diluting its shareholders, how much the management is paying themselves, and if the company's operations are producing cash organically.</p>
                  <p className="py-2">It's very important to understand how to read a company's cash flows, and Stock Unlock's education mode will help explain everything in detail to you as well as give you some tips and tricks to watch out for.</p>
                </label>
              </label> 
            </th>
          </tr>
        </thead>      
      </table>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left">
       
          <thead>
          <tr>
            <th className="lowercase text-secondary p-4 bg-blue-100 text-sm">* number shown in thousands</th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className="text-lg text-secondary p-4 bg-blue-100 text-right">{element.fiscalDateEnding.slice(0,4)}</th>
            })}
          </tr>
          </thead>
        <tbody>
          {/* operatingCashflow */}
          <tr className="hover text-md text-secondary">
            <th className=' p-4 bg-blue-50'>
              Cash From Operating Activities
            
              {/* The button to open modal */}
              <label htmlFor="operatingCashflow" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="operatingCashflow" className="modal-toggle" />
              <label htmlFor="operatingCashflow" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Operating cash flow is how much cash the company brought in from its core operations during the reporting period. The company still has expenses to pay using the operating cash flow, so it's not to be confused with free cash flow or true profitability of the company.</p>
                  <p className="py-2">Investors like to pay attention to companies operating cash flows because it tells investors how much money the company is producing or losing from its core operations. If the cash from operations is negative, then it means the company lost money on its operations during the reporting period. Since the company still has expenses to pay using the operating cash flow, this most likely would mean the company has lost quite a bit of money during the reporting period.</p>
                  <p className="py-2">What investors typically like to see is the cash from operations growing over time because it simply means the company's operations are able to produce more cash for the company and ultimately its shareholders.</p>
                </label>
              </label>             
            </th>
            {yearList.map((element) => {
              return <th   key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.operatingCashflow)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>

          {/* netIncome */}
          <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Net Income

              {/* The button to open modal */}
              <label htmlFor="netIncome" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="netIncome" className="modal-toggle" />
              <label htmlFor="netIncome" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">The net income is meant to show investors how much income or earnings the company has generated over the reported period of time.</p>
                  <p className="py-2">The simplest way we can describe net income is it's the net amount of value created for shareholders in the reported period. Contrary to popular opinion, net income is not necessarily the amount of cash the company has brought in. Let us elaborate.</p>
                  <p className="py-2">Net income includes many non cash expenses, like depreciation and/or appreciation on assets. For example, if a company owns a building and over the next year that building goes up in value (appreciates) by $1 million, then the company can report a $1 million increase to its net income. However, the company hasn't sold the building yet, which means no cash or profits actually was generated.</p>
                  <p className="py-2">Companies are allowed to report appreciation on assets as net income because the book value for the company and its shareholders has increased. It basically means the company's value increased, so they get to report it as net income for the company.</p>
                  <p className="py-2">The same could all be said if a company reports that a property they own has lost $1 million in value. It would have to report this as a loss even though the company hasn't really lost any cash or money. It's only lost asset value.</p>
                  <p className="py-2">Now there are a few things to watch out for with net income/earnings: 1) Sometimes if you're looking for the amount of cash a business generates, the net income is not always the best metric. As explained above, net income includes non cash expenses, and sometimes they can be incredibly significant. If that's the case, then the amount of cash the business generates vs. its reported earnings can be quite different. 2) Since net income includes unrealized gains or losses on assets, it can swing wildly with whatever the price/value of a company's assets are doing. For example, if a company owns shares of another business, and those shares go up in value very rapidly, they could report this as earnings for the business and boost their net income quite significantly. However, if their shares in the other business then go back down significantly, they would have to report this as a loss now. This means that the company's net income is swinging around depending on what the value of their investments are doing, and not based on how much cash or profits the business is bringing in. 3) Since a company can report increases in asset value as net income, company's can actually be losing money on their operations while reporting positive earnings. Here at Stock Unlock, we have personally seen this many times in our own analysis. For example, a company could report a $6 million gain due to one of their buildings increasing in value while at the same time the operations of the business have lost $5 million. The result would be a reported net income/earnings of $1 million, but the company has actually burned $5 million in cash.</p>
                  <p className="py-2">The 3 points above explain that investors who only look at net income can be misled by how the company's operations are actually performing, and how much cash the business is actually producing. The best practice is always to look at net income as well as free cash flow, which tells the investor how much cash the company is bringing in. If the 2 numbers are quite different, then there is most likely additional digging that needs to be done by the investor.</p>
                  
                </label>
              </label>  
            </th>
            {yearList.map((element) => {
              return <th   key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.netIncome)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>

          {/* depreciationDepletionAndAmortization */}
          <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Depreciation&Amortization

              {/* The button to open modal */}
              <label htmlFor="depreciationDepletionAndAmortization" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="depreciationDepletionAndAmortization" className="modal-toggle" />
              <label htmlFor="depreciationDepletionAndAmortization" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">To understand this term we need to first understand each individually, since this value is the sum of depreciation and amortization.</p>
                  <p className="py-2">Amortization is the process of gradually writing off the initial cost of an asset. For example, when a company acquires (buys) another company, they write off the initial expense of the purchase over time. Since the acquiring company cannot write off the entire purchase at once, it is amortized over a longer period of time. That amortization is what is reported.</p>
                  <p className="py-2">Amortization is also associated with the company's Intangible Assets on the balance sheet.</p>
                  <p className="py-2">Depreciation is a reduction in the value of an asset with the passage of time, due to wear and tear. A good example of this is when you buy a brand new car and over the next year of driving it, the car loses value. You couldn't sell the car for what you paid for it a year ago, because now it has wear and tear. This loss of value is depreciation, and this is what companies report. Basically just think of depreciation as the amount of value the company's assets have lost.</p>
                  <p className="py-2">Depreciation is also associated with the company's physical assets on the balance sheet.</p>
                  <p className="py-2">Depreciation and amortization are reported as one number because both are non cash expenses/write offs for the company, and both have to do with the value of assets changing on the balance sheet.</p>
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th   key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.depreciationDepletionAndAmortization)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>

          {/* cashflowFromInvestment */}
          <tr className="hover text-md text-secondary">
            <th className=' p-4 bg-blue-50'>
              Cash From Investing Activities

              {/* The button to open modal */}
              <label htmlFor="cashflowFromInvestment" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="cashflowFromInvestment" className="modal-toggle" />
              <label htmlFor="cashflowFromInvestment" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Investing cash flow is the net amount of money the company produced or spent on investing activities.</p>
                  <p className="py-2">Investing activities include things like investing in more property, plant, and equipment, buying and/or selling stocks, acquiring another company, investing in their own growth. Typically the investing cash flow will be negative as most companies invest into growth in some form, which requires spending money. If the investing cash flow is positive, then it most likely means the company sold an investment for a gain and had cash flow into the business from it.</p>
                  <p className="py-2">Investors like to pay attention to investing cash flow for many different reasons. It can help them show how much the business is spending on growth, and where the company is spending its money to make these investments.</p>
                  <p className="py-2">If you want to learn more about exactly where the company's money is going and exactly where they are spending it, then the best practice is always to reference their SEC filings and take a look at their quarterly and/or annual earnings releases. Company's break down where they are spending money, and what their gains and losses are on their investments in their SEC filings.</p>
                </label>
              </label> 
            </th>
            {yearList.map((element) => {
              return <th   key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.cashflowFromInvestment)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          
          {/* cashflowFromFinancing */}
          <tr className="hover text-md text-secondary">
            <th className=' p-4 bg-blue-50'>
              Cash From Financing Activities

              {/* The button to open modal */}
              <label htmlFor="cashflowFromFinancing" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="cashflowFromFinancing" className="modal-toggle" />
              <label htmlFor="cashflowFromFinancing" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Cash from financing activities shows investors how much money the company is spending or bringing in from financing activities. Financing activities include taking on new debt, paying off debt, doing dilution, repurchasing shares, and paying dividends.</p>
                  <p className="py-2">The net cash from financing activities tells investors if the company is paying out more money than it's raising. Typically, investors actually view a negative number better here, because it can mean the company is reducing its debts instead of raising more.</p>
                  
                </label>
              </label> 
            
            </th>
            {yearList.map((element) => {
              return <th   key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.cashflowFromFinancing)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>

          {/* proceedsFromRepaymentsOfShortTermDebt */}
          <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Debt Repayment

              {/* The button to open modal */}
              <label htmlFor="proceedsFromRepaymentsOfShortTermDebt" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="proceedsFromRepaymentsOfShortTermDebt" className="modal-toggle" />
              <label htmlFor="proceedsFromRepaymentsOfShortTermDebt" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">This is the net amount of money the company has increased or lowered its debts by over the reported time frame. If this number is negative, then it means the company is reducing its debt, and if it's positive, it means it is increasing its debts.</p>
                 
                </label>
              </label> 
            </th>
            {yearList.map((element) => {
              return <th   key={element.fiscalDateEnding} className='font-normal p-4 text-right'>{element.proceedsFromRepaymentsOfShortTermDebt === "None"? "--" : <NumericFormat value={showInThousands(element.proceedsFromRepaymentsOfShortTermDebt)} thousandSeparator="," displayType="text"/>}</th>
            })}
          </tr>
          
          {/* paymentsForRepurchaseOfCommonStock */}
          <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Share Repurchase

              {/* The button to open modal */}
              <label htmlFor="paymentsForRepurchaseOfCommonStock" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="paymentsForRepurchaseOfCommonStock" className="modal-toggle" />
              <label htmlFor="paymentsForRepurchaseOfCommonStock" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Investors really pay attention to the trend of a companies share count to see if the company is issuing more shares consistently (diluting) or reducing its share count by buying back shares off the market. Dilution reduces the price per share because there are more shares of the company now, and buying back shares increases the share price because the company is reducing the amount of shares outstanding.</p>
                  <p className="py-2">Investors typically like to see a company where the share count is going down instead of up. However, it's not always a bad thing to see a companies shares outstanding increasing. This is because companies sell new shares to the public to raise money. It can then use this money to fuel a new investment or expand the business, which can actually create a net of more shareholder value.</p>
                  <p className="py-2">Because of this, many investors like to pay attention to per share metrics like the revenue per share, or the earnings per share to help them get a better idea of if the company is increasing shareholder value despite the shares outstanding increasing too.</p>
                  <p className="py-2">For example, if a company dilutes its shareholders and issues more shares, but uses that money to grow its earnings per share, then the dilution can actually be in the investors best interest. But be careful, because dilution and a rapidly increasing outstanding share count can also destroy shareholder value.</p>
                </label>
              </label> 
            </th>
            {yearList.map((element) => {
              return <th   key={element.fiscalDateEnding} className='font-normal p-4 text-right'>{element.paymentsForRepurchaseOfCommonStock === "None"? "--" : <NumericFormat value={showInThousands(element.paymentsForRepurchaseOfCommonStock)} thousandSeparator="," displayType="text"/>}</th>
            })}
          </tr>
          
          {/* proceedsFromIssuanceOfCommonStock */}
          <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Share Issuance

              {/* The button to open modal */}
              <label htmlFor="proceedsFromIssuanceOfCommonStock" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="proceedsFromIssuanceOfCommonStock" className="modal-toggle" />
              <label htmlFor="proceedsFromIssuanceOfCommonStock" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Investors really pay attention to the trend of a companies share count to see if the company is issuing more shares consistently (diluting) or reducing its share count by buying back shares off the market. Dilution reduces the price per share because there are more shares of the company now, and buying back shares increases the share price because the company is reducing the amount of shares outstanding.</p>
                  <p className="py-2">Investors typically like to see a company where the share count is going down instead of up. However, it's not always a bad thing to see a companies shares outstanding increasing. This is because companies sell new shares to the public to raise money. It can then use this money to fuel a new investment or expand the business, which can actually create a net of more shareholder value.</p>
                  <p className="py-2">Because of this, many investors like to pay attention to per share metrics like the revenue per share, or the earnings per share to help them get a better idea of if the company is increasing shareholder value despite the shares outstanding increasing too.</p>
                  <p className="py-2">For example, if a company dilutes its shareholders and issues more shares, but uses that money to grow its earnings per share, then the dilution can actually be in the investors best interest. But be careful, because dilution and a rapidly increasing outstanding share count can also destroy shareholder value.</p>
                </label>
              </label> 
            </th>
            {yearList.map((element) => {
              return <th   key={element.fiscalDateEnding} className='font-normal p-4 text-right'>{element.proceedsFromIssuanceOfCommonStock === "None"? "--" : <NumericFormat value={showInThousands(element.proceedsFromIssuanceOfCommonStock)} thousandSeparator="," displayType="text"/>}</th>
            })}
          </tr>

          {/* dividendPayout */}
          <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Dividend Payout

              {/* The button to open modal */}
              <label htmlFor="dividendPayout" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="dividendPayout" className="modal-toggle" />
              <label htmlFor="dividendPayout" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Dividend payout is the total amount of dividends paid over the report period by a company. Dividends can be paid quarterly, monthly, or at random, so this value is a sum of all dividends paid. When a company pays dividends, investors should always check to make sure that they are generating enough cash to afford these payments. It's not common, but companies have taken loans to pay dividends, or have diluted shareholders to pay dividends. Taking a look at both the cash from operations and the free cash flow the company generates is a good way to make sure the company can afford to continue paying the dividend, and that it isn't a stress on the company.</p>
                </label>
              </label> 
            </th>
            {yearList.map((element) => {
              return <th   key={element.fiscalDateEnding} className='font-normal p-4 text-right'>{element.dividendPayout === "None"? "--" : <NumericFormat value={showInThousands(element.dividendPayout)} thousandSeparator="," displayType="text"/>}</th>
            })}
          </tr>

          {/* changeInCashAndCashEquivalents */}
          <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Change In Cash And Cash Equivalents

              {/* The button to open modal */}
              <label htmlFor="changeInCashAndCashEquivalents" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="changeInCashAndCashEquivalents" className="modal-toggle" />
              <label htmlFor="changeInCashAndCashEquivalents" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Change in cash is the difference in cash a company reported, relative to its last report. So if a company had $1,000,000 cash on hand last quarter, and this quarter it reported $800,000 cash on hand, the company would report -$200,000 change in cash. Cash balances change for a variety of reasons and a move down/up doesn't always mean a good or a bad thing. Cash can be lowered if a company makes an acquisition, or be raised if the company sells some property.</p>
                  <p className="py-2">Investors like to pay attention to this metric because it simply shows how much the business cash position changed. If you see a business's cash position declined substantially then it may be a good idea to try and figure out why.</p>
                  <p className="py-2">Also, if a business is producing negative cash from operations on the cash flow statement, yet their change in cash was positive, then there's a chance the business is raising money through debt or dilution.</p>
                </label>
              </label> 
            </th>
            {yearList.map((element) => {
              return <th   key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.changeInCashAndCashEquivalents)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>

          {/* capitalExpenditures */}
          <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Capital Expenditures

              {/* The button to open modal */}
              <label htmlFor="capitalExpenditures" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="capitalExpenditures" className="modal-toggle" />
              <label htmlFor="capitalExpenditures" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Capital Expenditures (CapEx) can tell you how much a company invests in existing and new fixed assets to maintain or grow its business. Put differently, CapEx is any type of expense that a company capitalizes or shows on its balance sheet as an investment rather than on its income statement as an expenditure. Capitalizing an asset requires the company to spread the cost of the expenditure over the useful life of the asset.</p>
                  <p className="py-2">The amount of capital expenditures a company is likely to have depends on the industry. Some of the most capital-intensive industries have the highest levels of capital expenditures, including oil exploration and production, telecommunications, manufacturing, and utility industries.</p>
                  <p className="py-2">CapEx can be found in the cash flow from investing activities in a company's cash flow statement. Different companies highlight CapEx in a number of ways, and an analyst or investor may see it listed as capital spending, purchases of property, plant, and equipment (PP&E), or acquisition expense.</p>
                  <p className="py-2">You can also calculate capital expenditures by using data from a company's income statement and balance sheet. On the income statement, find the amount of depreciation expense recorded for the current period. On the balance sheet, locate the current period's property, plant, and equipment line-item balance.</p>
                  <p className="py-2">Locate the company's prior-period PP&E balance, and take the difference between the two to find the change in the company's PP&E balance. Add the change in PP&E to the current-period depreciation expense to arrive at the company's current-period CapEx spending.</p>

                </label>
              </label> 
            </th>
            {yearList.map((element) => {
              return <th   key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.capitalExpenditures)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>

          {/* freecashflow */}
          <tr className="hover text-md text-secondary">
            <th className=' p-4 bg-blue-50'>
              Free Cashflow

              {/* The button to open modal */}
              <label htmlFor="freecashflow" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="freecashflow" className="modal-toggle" />
              <label htmlFor="freecashflow" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Free cash flow is one of the most used and important metrics in investing. It is the amount of cash the company is producing. Companies use their free cash flow to either reward shareholders or invest in more growth.</p>
                  <p className="py-2">Free cash flow is one of the most important metrics investors pay attention to, because it tells investors whether or not the company's operations are producing cash or losing it. If the company is not producing free cash flow organically, then it means they will have to rely on outside money to continue operating.</p>
                  <p className="py-2">A company can do one of 3 things with its free cash flow to reward shareholders:</p>
                  <p className="py-2">
                    1) Pay a dividend <br />
                    2) Buy back shares <br /> 
                    3) Invest in more growth
                  </p>
                  <p className="py-2">Free cash flow is also something investors take a look at in conjunction with net income/earnings. However, you will often see that the two numbers can be quite different. Sometimes the net income can actually be positive while at the same time the free cash flow is negative.</p>
                  <p className="py-2">An example of this would be if the company had one of their properties increase in value and reported as earnings for the business. This increase in value is an unrealized gain and didn't actually produce any cash for the business. What this means is that the net income the company is reporting is actually much higher than the free cash flow, and again, in some cases these situations can cause the net income/earnings to be positive while the business is actually losing money (has negative free cash flow).</p>
                  <p className="py-2">What's interesting is positive free cash flow isn't always desired by investors. For example, if a business is expanding rapidly and capturing growth, then investors may want the company to continue investing every dollar the business has into growing more. This sacrifices short term profits and cash flows for accelerated growth. Companies that are growing rapidly typically can experience periods where they produce substantial negative free cash flow. Some of the largest companies today produced negative free cash flow for years, like Tesla and Amazon.</p>
                  <p className="py-2">However, the investor always needs to be careful when a company has negative free cash flow because if the companies simply cannot burn cash forever. If the company doesn't have a good explanation or incentive for having negative free cash flow, then it's a red flag.</p>
                  <p className="py-2">As with most things in investing, it comes down to the investors own best judgement to determine whether or not a business producing negative free cash flow is worth investing in or not. Unfortunately, there is no black and white answer. Having the knowledge to know what these figures mean helps you understand risk and how much you're comfortable taking on.</p>
                  <p className="py-2">Investors like to track a company's historical free cash flow to see if it's growing or declining. A company where the free cash flow has grown simply means that the businesses ability to produce cash for its shareholders is getting better. If the company can continue growing its free cash flow in the future, then it can increase its dividend, buy back more shares, or invest in more growth.</p>
                  <p className="py-2">A Company where the free cash flow is declining over time may be seeing the fundamentals of its company decline, or the company is investing more money into growth.</p>
                  
                </label>
              </label> 
            </th>
            {yearList.map((element) => {
              return <th   key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.operatingCashflow - element.capitalExpenditures)} thousandSeparator="," displayType="text"/></th>
            })}
          </tr>
          </tbody>
      </table>
      </div>

    </div>
  )
}

export default StockCashflow