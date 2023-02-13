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
        // console.log("balance", response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [url]);

  const yearList = stockBalance?.annualReports.map((annualReport) => {
    
    return annualReport
  })

  const showInThousands = (input) => {
    return Number(input) / 1000
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

  return (
    <div>

      {/* need a 6 columns table, first column is key from API, other 5 columns are value from last 5 years*/}

      {/* needed key from top to bottom : totalAssets, totalCurrentAssets, cashAndCashEquivalentsAtCarryingValue, totalNonCurrentAssets, intangibleAssets, goodwill, totalLiabilities , totalCurrentLiabilities, currentDebt, currentAccountsPayable, totalNonCurrentLiabilities, longTermDebt, totalShareholderEquity, commonStock, commonStockSharesOutstanding  */}

      {/* table header */}
      <table className="table-auto w-full">
       <thead>
          <tr>
            <th className="text-secondary p-4 text-lg">
              Balance Sheet
              {/* The button to open modal */}
              <label htmlFor="BalanceSheet" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="BalanceSheet" className="modal-toggle" />
              <label htmlFor="BalanceSheet" className="modal cursor-pointer font-normal text-left text-secondary text-base">
                <label className="modal-box relative " htmlFor="">
                  <p className="py-2">The balance sheet is one of 3 financial documents that company's file on a quarterly basis (once every 3 months) to update the public and investors about how the financial health of the company is doing.</p>
                  <p className="py-2">The balance sheet shows investors the company's assets and liabilities, or in other words, what the company owns and how much debt it has. There are a lot of things to look out for on the balance sheet, and many investors may be looking for different things depending on their individual goals.</p>
                  <p className="py-2">Understanding how to read a balance sheet can really help investors avoid massive losses in their portfolios, because it allows them to spot company's that are struggling or taking on too much debt.</p>
                  <p className="py-2">On the other hand, the balance sheet also tells investors if the company is financially sound and not at any risk of going bankrupt any time soon. A strong balance sheet ensures that the company isn't in financial stress and puts the company in a position of power.</p>
                  
                </label>
              </label> 
            </th>
          </tr>
        </thead>      
      </table>

      {/* table */}
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

            {/* totalAssets */}
            <tr className="hover text-base text-secondary">
            <th className=' p-4 bg-blue-50'>
              Total Assets
              {/* The button to open modal */}
              <label htmlFor="totalAssets" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="totalAssets" className="modal-toggle" />
              <label htmlFor="totalAssets" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Total assets are everything that a company owns that has value, which can be a lot of things depending on the company and sector. Some common examples of assets are (but aren't limited to) office buildings, tractors, goodwill, and investments. Total assets also includes all the intangible assets a company owns, which includes things like the estimated value of customer relationships and the brand.</p>
                  
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.totalAssets)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* totalCurrentAssets */}
            <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Total Current Assets
              {/* The button to open modal */}
              <label htmlFor="totalCurrentAssets" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="totalCurrentAssets" className="modal-toggle" />
              <label htmlFor="totalCurrentAssets" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Current assets are the assets the company plans to turn into cash within the next year.</p>
                  <p className="py-2">An example of a current asset would be a company's inventory that it is in the process of selling. Since the company is actively trying to sell its inventory, and the company expects it to be sold within the next 12 months, it is reported as a current asset on the balance sheet.</p>
                  <p className="py-2">Current assets aren't just inventory though. Even a property that the business is planning on selling can be a current asset so long as the company is expecting to sell it within the next 12 months/year.</p>
                  
                </label>
              </label>

            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.totalCurrentAssets)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr> 

            {/* cashAndCashEquivalentsAtCarryingValue */}
            <tr className="hover text-md text-secondary">
            <th className=' p-4 bg-blue-50'>
              Cash And Cash Equivalents

              {/* The button to open modal */}
              <label htmlFor="cashAndCashEquivalentsAtCarryingValue" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="cashAndCashEquivalentsAtCarryingValue" className="modal-toggle" />
              <label htmlFor="cashAndCashEquivalentsAtCarryingValue" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Cash & Cash Equivalents is simply the amount of cold hard cash a company has at its disposal to use. </p>
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.cashAndCashEquivalentsAtCarryingValue)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* totalNonCurrentAssets */}
            <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Total Non-Current Assets

              {/* The button to open modal */}
              <label htmlFor="totalNonCurrentAssets" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="totalNonCurrentAssets" className="modal-toggle" />
              <label htmlFor="totalNonCurrentAssets" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Total non current assets is how many assets the company has that are not easily liquidated (turned into) cash within the next year. You can typically get this number by subtracting the current assets from the total assets. The non-current assets typically include things like real estate, equipment, and long term investments the company doesn't plan on selling anytime soon.</p>
                  
                  
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.totalNonCurrentAssets)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* intangibleAssets */}
            <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Intangible Assets

              {/* The button to open modal */}
              <label htmlFor="intangibleAssets" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="intangibleAssets" className="modal-toggle" />
              <label htmlFor="intangibleAssets" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Intangible assets are assets a company claims it owns that are not physical/hard assets.</p>
                  <p className="py-2">One example of this could be Coca Cola reporting the $ amount they believe their brand is worth. Since Cokes brand isn't a solid/hard object, it is reported as an intangible asset on the balance sheet at the estimated worth of the brand.</p>
                  <p className="py-2">One example of this could be Coca Cola reporting the $ amount they believe their brand is worth. Since Cokes brand isn't a solid/hard object, it is reported as an intangible asset on the balance sheet at the estimated worth of the brand.</p>
                  
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'>{element.intangibleAssets === "None"? "--" :<NumericFormat value={showInThousands(element.intangibleAssets)} thousandSeparator="," displayType="text"/>}</th>
            })}
            </tr>

            {/* goodwill */}
            <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Goodwill

              {/* The button to open modal */}
              <label htmlFor="goodwill" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="goodwill" className="modal-toggle" />
              <label htmlFor="goodwill" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Goodwill is a specific type of an intangible asset that is added to a company's balance sheet after it acquires another company. The goodwill is reported as the amount the acquiring company paid over the fair value of the other company.</p>
                  <p className="py-2">When one company buys another it's usually at a 'premium' price, so if company A paid 2 million for company B,, but it was only worth 1.5 million, then company A would add $500,000 to the goodwill on its balance sheet.</p>
                  <p className="py-2">Typically company's pay a premium in an acquisition because they factor in intangible assets like brand names, a solid customer base, good customer relations, and other things like this that don't have a tangible asset value. Again, the amount the acquiring company pays for all of these intangibles is reported as goodwill on their balance sheet after the acquisition is completed.</p>
                  <p className="py-2">Many investors like to subtract intangible assets such as goodwill from the company's total assets since they aren't tangible. This gives investors a better idea of how many total tangible assets the company has, as the goodwill can make up a large portion of a company's total assets.</p>
                  <p className="py-2">For example, if a company has $1 million in goodwill, $200,000 in tangible assets, and $1 million in total debt, then the company's total assets are valued at $1.2 million vs. liabilities of $1 million. At first glance this may make it seem like the company is in decent financial shape. However, if we subtract the $1 million of goodwill from the total assets, we can see that the company only actually has $200,000 in total tangible assets vs. $1 million in debt, which doesn't seem nearly as strong. Therefore by subtracting the goodwill from the total assets, we can get a more accurate look at the financial health of the business.</p>
                  <p className="py-2">If a company's goodwill is growing on the balance sheet, then it means they're acquiring more and more companies. A company acquiring another isn't always a bad thing, as there may be some economies of scale between the 2 businesses that make the whole more efficient. However, investors should investigate a company's acquisitions to see if they make sense and are worth the money.</p>
                  <p className="py-2">Sometimes acquisitions can be overly expensive, or the two companies can be completely unrelated. Investors should investigate acquisitions to see if they believe they're good or bad for shareholders.</p>
                  
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'>{element.goodwill === "None"? "--" :<NumericFormat value={showInThousands(element.goodwill)} thousandSeparator="," displayType="text"/>}</th>
            })}
            </tr>

            {/* totalLiabilities */}
            <tr className="hover text-md text-secondary">
            <th className=' p-4 bg-blue-50'>
              Total Liabilities

              {/* The button to open modal */}
              <label htmlFor="totalLiabilities" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="totalLiabilities" className="modal-toggle" />
              <label htmlFor="totalLiabilities" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Total liabilities are the amount of debts and other obligations the company has to pay in the future. Having liabilities/debts is expected and normal for any business, however they must be managed effectively.</p>
                  <p className="py-2">Tracking total liabilities over time with asset growth can also give insight into how well a company is at managing it's balance sheet and cash. However, almost all companies take on more debt as they grow, and a company's total liabilities increasing isn't always a red flag. They may be taking on more debt to fuel more rapid growth.</p>
                  <p className="py-2">Tracking the total liabilities vs. the total assets over time will tell investors if the company is growing its debts more rapidly than its assets. This is a very important thing to watch for, and investors typically prefer when a company is growing its assets more quickly than its debts.</p>
                  <p className="py-2">If a company has more total liabilities than total assets it can be a red flag because it means the company doesn't currently have enough assets to service all its debts. In this case, the company will either have to use future profits to service debts, or raise money through dilution. In these cases, it's always good for investors to also check if the company is cash flow positive, so that it can use future cash flows to help with the debt.</p>
                  
                 
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.totalLiabilities)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* totalCurrentLiabilities */}
            <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Total Current Liabilities

              {/* The button to open modal */}
              <label htmlFor="totalCurrentLiabilities" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="totalCurrentLiabilities" className="modal-toggle" />
              <label htmlFor="totalCurrentLiabilities" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Current liabilities are the liabilities/debts that are expected to be paid within the next year.</p>
                  <p className="py-2">Investors typically like to take a look at the company's current liabilities vs. its current assets. If the current liabilities are much higher than the current assets, then it means the company may have trouble paying its liabilities that are due within the next year.</p>
                  
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.totalCurrentLiabilities)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* currentDebt */}
            <tr className="hover text-md text-secondary">
            <th className=' p-4 bg-blue-50'>
              Current Debt

              {/* The button to open modal */}
              <label htmlFor="currentDebt" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="currentDebt" className="modal-toggle" />
              <label htmlFor="currentDebt" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">This is the current portion of the long term debt. Whenever you see “current” in investing, it means within the next 12 months/year. So the “current” portion of the long term debt is the portion of the long term debt that is due within the next year. This should appear on the “current liabilities” of the balance sheet.</p>
                  
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.currentDebt)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* currentAccountsPayable */}
            <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Current Accounts Payable

              {/* The button to open modal */}
              <label htmlFor="currentAccountsPayable" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="currentAccountsPayable" className="modal-toggle" />
              <label htmlFor="currentAccountsPayable" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Accounts payable is the amount of money a company owes to another vendor/company (similar to debt). A good way to remember this is that 'payables' is money the company must PAY (this is the opposite of account receivables). One example of this could be an airline company that owes money to the company it purchased the airplane from, if they didn't pay in full.</p>
                  <p className="py-2">Another way to think about this on a more personal level would be a credit card bill. If you owe $500 on your credit card, then this would be like an account payable. It's basically money the company has to pay.</p>
                  <p className="py-2">Since accounts payable is under the current liabilities, it means this debt is due within the next year, or 12 months. In accounting, “current” means within the next 12 months. So Accounts Payable are debts the company needs to deal with within the next year.</p>
                 
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.currentAccountsPayable)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* totalNonCurrentLiabilities */}
            <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Total Non-Current Liabilities

              {/* The button to open modal */}
              <label htmlFor="totalNonCurrentLiabilities" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="totalNonCurrentLiabilities" className="modal-toggle" />
              <label htmlFor="totalNonCurrentLiabilities" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Total non current liabilities shows how much liabilities are on a company's balance sheet that are not due within one year. You can typically get this number by subtracting the current liabilities from the total liabilities. This number typically includes things like long term debt which may not be due to pay back for multiple years.</p>
                 
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.totalNonCurrentLiabilities)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* longTermDebt */}
            <tr className="hover text-md text-secondary">
            <th className=' p-4 bg-blue-50'>
              Long Term Debt

              {/* The button to open modal */}
              <label htmlFor="longTermDebt" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="longTermDebt" className="modal-toggle" />
              <label htmlFor="longTermDebt" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Long term debt is debt that is set to be due in over a year (as opposed to short term debt which is less than a year).</p>
                 <p className="py-2">Whenever you are investing in a company you should be aware of how much debt a company has. Just like with your own personal finances, company's can take on long term debt that they are expected to pay back by a certain date. Company's also have to pay interest on the debt which eats into profit margins. The more debt a company has, the more it eats into a company's profit margins.</p>
                 <p className="py-2">Keep in mind though that debts can have different interest rates, which means the company may have to pay less interest on some of its debt and more on other amounts. The best way to know exactly how much a company pays in interest and when its long term debts are due to be paid back is by going to the company's most recent earnings release in their SEC filings. Company's report each debt item, its specific interest rate, and when it's due on these filings.</p>
                 <p className="py-2">Another thing investors like to pay attention to is if the debt is at a fixed or variable rate. If the debt is at a fixed rate, then it means the interest rate is locked in and the amount of interest the company is paying shouldn't change over the lifetime of the debt. If the interest rate is variable, then the company's interest rate on that debt could change with whatever interest rates are doing, which essentially means the company could have to pay more interest on that debt in the future.</p>
                 <p className="py-2">Keep in mind though that corporate debt is normal and expected. Investors can sometimes want companies to take on debt to accelerate growth rather than solely relying on the company's organic cash flows to grow. However in extreme cases debt can burden a company and put them in danger of bankruptcy. It's good practice to watch a company's debt vs. its revenue growth, and pay attention to how much the interest payments on the debts are. You're goal is to try and figure out if the debt is a problem for the company, or if it can easily cover its debts with its cash flows.</p>
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.longTermDebt)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* totalShareholderEquity */}
            <tr className="hover text-md text-secondary">
            <th className=' p-4 bg-blue-50'>
              Total Shareholder Equity

              {/* The button to open modal */}
              <label htmlFor="totalShareholderEquity" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="totalShareholderEquity" className="modal-toggle" />
              <label htmlFor="totalShareholderEquity" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Shareholder equity, or Book value, is one measurement of how strong a companies balance sheet is. The value represents the net dollar amount of all the companies assets and liabilities.</p>
                 <p className="py-2">Shareholder equity is the net asset value of the company. In other words, this is how much assets are left over when we subtract all the liabilities the company carries.</p>
                 <p className="py-2">It's always great to see a company's book value increasing over time, because it means the company is growing its assets more quickly than its liabilities. The faster the rate of growth to the book value, the better.</p>
                 <p className="py-2">If the book value of the company is decreasing over time, then it means the company is taking on more liabilities than assets, or in other words, the debts of the company are growing quicker than the assets. This is a red flag for most investors, and would require more digging to try and figure out why the company's debt is growing so quickly.</p>
                 <p className="py-2">One thing investors also watch out for is rapidly growing Goodwill and Intangible assets on the balance sheet. These 2 assets most of the time are not "real" assets, so if the book value of a business is growing solely because these 2 figures are growing, then that can be a red flag as well.</p>
                 <p className="py-2">In general, a positive value is desired since that means the company has more assets than liabilities. If a company's book value is negative then it means they're carrying more debts than assets, which is a red flag, and could mean the company could face financial stress in the future.</p>
                 
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.totalShareholderEquity)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* commonStock */}
            <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Common Stock

              {/* The button to open modal */}
              <label htmlFor="commonStock" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="commonStock" className="modal-toggle" />
              <label htmlFor="commonStock" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Common stock is a security that represents ownership in a corporation. Holders of common stock elect the board of directors and vote on corporate policies. This form of equity ownership typically yields higher rates of return long term. However, in the event of liquidation, common shareholders have rights to a company's assets only after bondholders, preferred shareholders, and other debtholders are paid in full.</p>
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.commonStock)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* commonStockSharesOutstanding */}
            <tr className="hover text-md text-secondary">
            <th className=' p-4 bg-blue-50'>
              Common StockShares Outstanding

              {/* The button to open modal */}
              <label htmlFor="commonStockSharesOutstanding" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="commonStockSharesOutstanding" className="modal-toggle" />
              <label htmlFor="commonStockSharesOutstanding" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Shares outstanding is how many shares of the company there are in existence. Companies can issue/sell more shares to the public which increases its share count, or they can buy back shares off the public markets which decreases the share count. Companies share counts are constantly changing depending on what the company is doing.</p>
                  <p className="py-2">Investors like to pay attention to the trend of the company's outstanding shares over time, because it helps them see if the business is issuing more shares consistently (which lowers the share price), or if the company is buying back shares and rewarding shareholders by removing shares from the public market (which increases the share price for investors).</p>
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4 text-right'><NumericFormat value={showInThousands(element.commonStockSharesOutstanding)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default StockBalance