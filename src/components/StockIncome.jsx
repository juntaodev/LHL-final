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
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="lowercase text-secondary p-4 bg-blue-100 text-sm">* number shown in thousands</th>
              {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className="text-lg text-secondary p-4 bg-blue-100">{element.fiscalDateEnding.slice(0,4)}</th>
              })}
            </tr>
          </thead>

          <tbody>

            {/* totalRevenue */}
            <tr className="hover text-base text-secondary">
            <th className=' p-4 bg-blue-50'>
              Total Revenue
              {/* The button to open modal */}
              <label htmlFor="totalRevenue" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="totalRevenue" className="modal-toggle" />
              <label htmlFor="totalRevenue" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Revenue is the amount of money a company makes, before anything else is subtracted. Revenue is also commonly referred to as sales, or the top line since it's literally the first line of a company's income statement. Revenue growth for a company is very important on the public markets since investors tend to pay more for companies that are growing revenues.</p>
                  <p className="py-2">A lack of revenue growth, or decline of revenue is typically seen as a negative thing in the stock market. However, it's not always a red flag because many companies have more “seasonal” revenue trends, which means certain quarters can be better than others. One example of this is Amazon. Amazon sees a very strong Q4 because that's when the Holidays take place and people are buying presents. This results in Amazon seeing increased revenue in its fourth quarter, and then a revenue decline in Q1 of the next year. If you're looking at the quarter-over-quarter (QoQ) revenue growth from Q4 to Q1, you will most likely see it decline, but this isn't necessarily a bad thing or a red flag.</p>
                  <p className="py-2">What investors typically do is take a look at the trend of the revenue over a longer period of time. They either look at the trailing twelve months (TTM) revenue growth or the yearly revenue growth to see a more zoomed out picture. This can also be a great practice when looking at a company's fundamentals. </p>
                  <p className="py-2">However, don't be blinded by revenue growth, and make sure the company is making profits from that revenue and bringing in positive cash flow, or at least showing promise of that happening in the future. Many companies in the market will spend every dollar they can to grow their revenue, sometimes at the sacrifice of shareholder value. They can be taking on massive amounts of debt just to grow the top line. So again, revenue growth isn't everything. </p>
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4'><NumericFormat value={showInThousands(element.totalRevenue)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* costOfRevenue */}
            <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Cost of Revenue
              {/* The button to open modal */}
              <label htmlFor="costOfRevenue" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="costOfRevenue" className="modal-toggle" />
              <label htmlFor="costOfRevenue" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Also known as cost of sales, the cost of revenue is the total cost of manufacturing and delivering a product or service to consumers. In other words, it's the amount of money it costs to make and transport the company's goods and/or services to its customers. Gross profit can be calculated by subtracting the cost of revenue from the revenue.</p>
                  
                </label>
              </label>

            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4'><NumericFormat value={showInThousands(element.costOfRevenue)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr> 

            {/* grossProfit */}
            <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Gross Profit

              {/* The button to open modal */}
              <label htmlFor="grossProfit" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="grossProfit" className="modal-toggle" />
              <label htmlFor="grossProfit" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Gross profit is the amount of money a company makes after subtracting variable operating costs like materials and shipping. More simply put, it's the profit a company makes after deducting the costs associated with making and selling its products, or the costs associated with providing its services.</p>
                  <p className="py-2">Gross profit helps show investors how efficient the company is at producing goods or services, since it subtracts only the costs involved with making products or delivering services.</p>
                  <p className="py-2">Investors like paying attention to the gross profits of a company because it can give them insights into a company's profit potential. Typically investors will look at the company's gross profits over time to see if they're growing or declining. Gross profits increasing is typically what investors look for, as it means the company's profit potential is most likely going up. </p>
                  <p className="py-2">However, investors need to be careful when looking at gross profit, because gross profits are not earnings or free cash flow for the company. It still has many other expenses it needs to take care of using the gross profit figure. </p>
                  <p className="py-2">More specifically, gross profit does not factor in the company's fixed costs which include expenses like rent, insurance and salaries. A company uses its gross profits to pay all these additional fixed expenses. </p>
                  <p className="py-2">Almost always gross profit should be positive. If the gross profit is negative, that means the company is likely losing a lot of money since gross profits come before it even subtracts more business expenses. Simply put, if gross profit is negative, then there's a very high likelihood that the company is losing money. </p>
                  <p className="py-2">A company may have a positive gross profit figure while it is still losing money. Investors typically use this look at this margin when looking at a company that isn't yet profitable, or is investing heavily into growth, to help gauge its profit potential. </p>
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4'><NumericFormat value={showInThousands(element.grossProfit)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* operatingExpenses */}
            <tr className="hover text-md text-secondary">
            <th className=' p-4 bg-blue-50'>
              Operating Expenses

              {/* The button to open modal */}
              <label htmlFor="operatingExpenses" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="operatingExpenses" className="modal-toggle" />
              <label htmlFor="operatingExpenses" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Total operating expenses is the total amount of spend a company had on regular business activities. One way to think about this is to think these are the necessary expenses to keep the business operating. Operating expenses include rent, equipment, inventory costs, insurance, and research and development expenses.</p>
                  <p className="py-2">One thing investors pay attention to is if the operating expenses are increasing more rapidly than the revenue. If the operating expense is, then it can be a red flag because it means the company is spending more but not seeing that spending result in revenue growth.</p>
                  <p className="py-2">On the contrary, if the operating expenses are staying the same or even declining while revenue is growing, then that is typically seen as a good thing to investors as it means the company is spending less to produce either the same or more revenue. </p>
                  
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4'><NumericFormat value={showInThousands(element.operatingExpenses)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* operatingIncome */}
            <tr className="hover text-md text-secondary">
            <th className=' p-4 bg-blue-50'>
              Operating Income

              {/* The button to open modal */}
              <label htmlFor="operatingIncome" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="operatingIncome" className="modal-toggle" />
              <label htmlFor="operatingIncome" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Operating income (also referred to as income from operations) is the amount of money the company has after paying for operating expenses.</p>
                  <p className="py-2">Operating expenses are costs associated with normal operating activities and include things like wages, cost of goods, depreciation, utilities, and more. (any operating expense).</p>
                  
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4'><NumericFormat value={showInThousands(element.operatingIncome)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* otherNonOperatingIncome */}
            <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Other Non-Operating Income

              {/* The button to open modal */}
              <label htmlFor="otherNonOperatingIncome" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="otherNonOperatingIncome" className="modal-toggle" />
              <label htmlFor="otherNonOperatingIncome" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Other income/expenses that the company has reported. This is a "catch all" metric to account for the many different ways companies can report this value. There are hundreds of types of expenses/income on a company's true SEC filings, and it's common to group them all together under “other” to allow consistent data formats when comparing companies.</p>
                  
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4'><NumericFormat value={showInThousands(element.otherNonOperatingIncome)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* incomeBeforeTax */}
            <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Income Before Tax

              {/* The button to open modal */}
              <label htmlFor="incomeBeforeTax" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="incomeBeforeTax" className="modal-toggle" />
              <label htmlFor="incomeBeforeTax" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">Pre-tax income is the income the company generated before paying its taxes. The tax payments are subtracted from this number to find the net income.</p>
                 
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4'><NumericFormat value={showInThousands(element.incomeBeforeTax)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* incomeTaxExpense */}
            <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              Income Tax Expense

              {/* The button to open modal */}
              <label htmlFor="incomeTaxExpense" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="incomeTaxExpense" className="modal-toggle" />
              <label htmlFor="incomeTaxExpense" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">A tax provision is the estimated amount of income tax that a company is legally expected to pay in the reported period. The company subtracts this value from the pre tax income to get the net income or earnings the business generates.</p>
                  <p className="py-2">What's interesting about tax provisions is they're deducted from the net income, but sometimes companies aren't actually paying the taxes at the time they report. What they do is subtract the estimated amount they will have to pay, and report the deduction ahead of time against net income. The company may also set this money aside for a future tax payment, which they would then report as a liability on the balance sheet.</p>
                  <p className="py-2">It can be a good idea for investors to check the income tax payables under liabilities on the companies quarterly or annual filings. This can show investors if the company is deferring tax payments to increase cash flows. Taxes have to be paid eventually, and if a company is piling on tax liabilities to increase cash flows, then that could be a red flag.</p>
                  
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4'><NumericFormat value={showInThousands(element.incomeTaxExpense)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* netIncome */}
            <tr className="hover text-md text-secondary">
            <th className=' p-4 bg-blue-50'>
              Net Income

              {/* The button to open modal */}
              <label htmlFor="netIncome" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="netIncome" className="modal-toggle" />
              <label htmlFor="netIncome" className="modal cursor-pointer font-normal">
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
              return <th key={element.fiscalDateEnding} className='font-normal p-4'><NumericFormat value={showInThousands(element.netIncome)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>

            {/* EBITDA */}
            <tr className="hover text-md text-secondary">
            <th className='font-normal p-4 bg-blue-50'>
              EBITDA

              {/* The button to open modal */}
              <label htmlFor="EBITDA" className="btn btn-xs btn-ghost btn-circle">?</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="EBITDA" className="modal-toggle" />
              <label htmlFor="EBITDA" className="modal cursor-pointer font-normal">
                <label className="modal-box relative" htmlFor="">
                  
                  <p className="py-2">EBITDA stands for earnings before interest, taxes, depreciation and amortization. In other words, this is what a company makes in earnings before it pays taxes and  interest, and accounts for depreciation/amortization that occurred during the reporting period</p>
                 <p className="py-2">Investors like to pay attention to EBITDA because it shows them how profitable the company is before it services its debts, pays taxes, and writes off its non cash expenses of depreciation and amortization. It can help show the core earnings of a business.</p>
                 <p className="py-2">The metric isn't used as much as the net income, or real earnings metrics and most investors do not prefer EBITDA over the other metrics. However, EBITDA can help give investors insights into a company that is growing but isn't yet profitable. In other words, some investors use this metric on businesses that are currently focused on capturing growth instead of profitability.</p>
                 <p className="py-2">Investors need to be careful using the EBITDA metric though, because some businesses can focus too much on EBITDA, which again, isn't true profitability. A company can have positive EBITDA while still losing money and burning cash.</p>
                 <p className="py-2">Warren Buffett, a legendary investor, does not like the EBITDA metric because he believes it is not a true profitability metric. For example, EBITDA doesn't factor in depreciation and amortization. These are non-cash expenses, but they're still the company's assets losing value. Eventually the company will have to maintain or replace depreciated assets, so investors like Warren believe depreciation and amortization should be factored in.</p>
                </label>
              </label>
            </th>
            {yearList.map((element) => {
              return <th key={element.fiscalDateEnding} className='font-normal p-4'><NumericFormat value={showInThousands(element.ebitda)} thousandSeparator="," displayType="text"/></th>
            })}
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default StockIncome
