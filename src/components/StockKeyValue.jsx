import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const StockKeyValue = () => {
  const [stock, setstock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  const API_KEY = 'KJEJ4ZQQOGDC75P4';
  const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${param.stockSymbol}&apikey=${API_KEY}`;

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setstock(response.data);
        setLoading(false);
        // console.log("keyvalue", response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [url]);

  if (!stock) {
    return <div>Loading...</div>;
  }
  if (error) return <p>An error occurred: {error.message}</p>;

  // convert large number to K,M,B format
  const intToString = (num) => {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "P"},
      {v: 1E18, s: "E"}
      ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
  };

  
  return (
    <div className="grid flex-grow card bg-teal-50 rounded-box place-items-center">
      
      <p className='card pt-4 '><strong>Key Values</strong></p> 
      
      <div className="grid grid-cols-4 p-4 gap-4">
        
        {/* Market Cap */}
        <div>
          <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="MarketCap" className="btn btn-sm btn-ghost text-left">Market Cap</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="MarketCap" className="modal-toggle" />
              <label htmlFor="MarketCap" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2 font-bold">Market Cap = Shares Outstanding * Share Price </p>
                  <p className="py-2">The 'Market Cap' is short for market capitalization,  which is simply the company's current value in dollars. Market Cap can also be referred to as the valuation of a business, so if you ever hear someone  say valuation, they're talking about the company's Market Cap.</p>
                  <p className="py-2">When investors buy a stock, this is one of the main  numbers to pay attention to, as this is the value at which they are buying  shares in the company at. Many investors consider the market cap more  important than the share price of a business, as the Market Cap is what is  used in other common valuation methods and ratios, not the share price.</p>
                </label>
              </label>              
          </div>
          {stock.MarketCapitalization? (
          <p className="pl-3">${intToString(stock.MarketCapitalization)}</p>
          ) : null}
        </div>
        
        {/* Shares Outstanding */}
        <div>
          <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="SharesOutstanding" className="btn btn-sm btn-ghost text-left">Shares Outstanding</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="SharesOutstanding" className="modal-toggle" />
              <label htmlFor="SharesOutstanding" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">Shares Outstanding = Market Cap / Share Price</p>
                 <p className="py-2">Shares outstanding is how many shares of the company there are in existence. Stock Unlock shows the companies share count that they report on their financials, which may not match their US share count if the company is traded on multiple exchanges. Companies can issue/sell more shares to the public which increases its share count, or they can buy back shares off the public markets which decreases the share count. Companies share counts are constantly changing depending on what the company is doing.</p>
                 <p className="py-2">Investors like to pay attention to the trend of the company's outstanding shares over time, because it helps them see if the business is issuing more shares consistently (which lowers the share price), or if the company is buying back shares and rewarding shareholders by removing shares from the public market (which increases the share price for investors).</p>
                </label>
              </label>        
          </div>
          {stock.SharesOutstanding? (
          <p className="pl-3">{intToString(stock.SharesOutstanding)}</p>
          ) : null}
        </div>
        
        {/* EPS */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="EPS" className="btn btn-sm btn-ghost text-left">EPS</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="EPS" className="modal-toggle" />
              <label htmlFor="EPS" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">Earnings Per Share (EPS) = Earnings (Net Income) / Shares Outstanding </p>
                 <p className="py-2">EPS is an abbreviation for Earnings Per Share, so if you ever hear someone say EPS, they actually are saying earnings per share. </p>
                 <p className="py-2">The EPS is the amount of earnings or net income the company produced in the trailing twelve months (TTM) divided by the amount of shares outstanding the company currently has.</p>
                 <p className="py-2">Investors like to pay attention to this figure because it tells them how much net income/earnings the company is producing for every share the company has. Typically investors will track the EPS over time to see if it is growing or shrinking. Investors also typically prefer a company where the EPS is growing, because it means the company is producing more earnings on every share it has.</p>
                 <p className="py-2">If a company is able to continue increasing its EPS, then the market will most likely continue pricing the shares of the business higher. Most investors believe growing EPS is the number one thing that makes a company's stock price rise over the long term, and it's for this reason that EPS is one of the most important metrics in investing.</p>
                 <p className="py-2">Another way to think about this is if a company's stock price is $20, and that company produces $1 in earnings, then investors can look at this like the company is capable of earning them $1 for every share they own. This can help investors think more like they're buying a piece of the business rather than just a number on a screen.</p>
                </label>
              </label>   
            </div>
            {stock.EPS? (
            <p className="pl-3">${Number(stock.EPS).toFixed(2)}</p>
            ) : null}
        </div>
        
        {/* PE */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="P/E" className="btn btn-sm btn-ghost text-left">P/E</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="P/E" className="modal-toggle" />
              <label htmlFor="P/E" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">P/E = Share Price / Earnings Per Share (EPS) </p>
                 <p className="py-2">The P/E is the Price to Earnings ratio. This is one of the most used ratios by investors when they are valuing companies, and one you will probably hear people referring to very often. </p>
                 <p className="py-2">The P/E is simply the market cap of the company divided by its trailing twelve month (TTM) earnings. What the P/E ratio tells you is how much investors are willing to pay for the company's earnings. If a company has a 15 P/E, then it means investors are paying 15X the company's earnings when they buy shares.</p>
                 <p className="py-2">One of the best ways investors use the P/E ratio is to compare a company's current P/E vs. its historical averages. Every company trades at a different P/E, so it can be very useful to see how the market has valued the company relative to its earnings in the past. That way, investors can better understand whether the company is currently cheap relative to its history, or expensive.</p>
                 <p className="py-2">Another way investors use a P/E is to compare the companies P/E vs. its competitors in the same industry. Typically companies in the same industry will trade around the same P/E ratios. Comparing the P/E of the company you're looking at against its competitors can give you additional insight to the company's current value.</p>
                 <p className="py-2">The one downfall of the P/E ratio is that it can include many non-cash items and adjustments that can make a company's earnings swing wildly over time. You will probably notice once in a while on the Free Form Tool that a company's P/E can skyrocket or drop very quickly. This can be due to a one time, non-cash expense the company had to report against their earnings, or it could be appreciation of an asset the company held that is being reported as additional earnings.</p>
                 <p className="py-2">A general rule of thumb is the higher a company's P/E, the more growth the company is seeing, or is projected to see. When companies are seeing strong growth, investors are willing to pay more for its earnings. On the other hand, a low P/E can mean the company is seeing little or no growth.</p>
                </label>
              </label>   
            </div>
            {stock.PERatio? (
            <p className="pl-3">{Number(stock.PERatio).toFixed(2)}</p>
            ) : null}
        </div>
        
        {/* Revenue */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="Revenue" className="btn btn-sm btn-ghost text-left">Revenue (ttm)</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="Revenue" className="modal-toggle" />
              <label htmlFor="Revenue" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 
                 <p className="py-2"><strong>Revenue</strong> is the amount of money a company makes, before anything else is subtracted. Revenue is also commonly referred to as sales, or the top line since it's literally the first line of a company's income statement. Revenue growth for a company is very important on the public markets since investors tend to pay more for companies that are growing revenues. </p>
                 <p className="py-2">A lack of revenue growth, or decline of revenue is typically seen as a negative thing in the stock market. However, it's not always a red flag because many companies have more “seasonal” revenue trends, which means certain quarters can be better than others. One example of this is Amazon. Amazon sees a very strong Q4 because that's when the Holidays take place and people are buying presents. This results in Amazon seeing increased revenue in its fourth quarter, and then a revenue decline in Q1 of the next year. If you're looking at the quarter-over-quarter (QoQ) revenue growth from Q4 to Q1, you will most likely see it decline, but this isn't necessarily a bad thing or a red flag.</p>
                 <p className="py-2">What investors typically do is take a look at the trend of the revenue over a longer period of time. They either look at the trailing twelve months (TTM) revenue growth or the yearly revenue growth to see a more zoomed out picture. This can also be a great practice when looking at a company's fundamentals. </p>
                 <p className="py-2">However, don't be blinded by revenue growth, and make sure the company is making profits from that revenue and bringing in positive cash flow, or at least showing promise of that happening in the future. Many companies in the market will spend every dollar they can to grow their revenue, sometimes at the sacrifice of shareholder value. They can be taking on massive amounts of debt just to grow the top line. So again, revenue growth isn't everything.</p>
                 
                </label>
              </label>  
            </div>
            {stock.RevenueTTM? (
            <p className="pl-3">${intToString(stock.RevenueTTM)}</p>
            ) : null}
        </div>
        
        {/* PS */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="P/S" className="btn btn-sm btn-ghost text-left">P/S (ttm)</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="P/S" className="modal-toggle" />
              <label htmlFor="P/S" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">P/S = Market Cap / TTM Revenue </p>
                 <p className="py-2">The P/S is a ratio that tells investors how the company is being valued relative to its sales, or revenue (sales and revenue are literally the same thing). P/S is another ratio investors use when analyzing an investment and trying to determine if it is cheap or expensive.</p>
                 <p className="py-2">However, the P/S ratio does not tell investors anything about the businesses profitability or margins, it only shows how the business is valued vs. its revenue. This can be misleading because investors typically like to look at the profits and profit potential of a company when they are valuing it.</p>
                 <p className="py-2">For example, if a company is producing $1 million in annual revenue, but losing $10 million annually to produce that revenue with no end in sight, then investors most likely won't be willing to pay too much to own shares in the company. This could result in the company having a very low P/S ratio due to its lack of profit potential.</p>
                 <p className="py-2">There are also stocks in the market that have always traded at low P/S ratios because their margins are so thin. If only a small amount of the revenue makes it to the company's bottom line, or their profits, then investors won't be willing to pay a high P/S ratio to own shares.</p>
                 <p className="py-2">A low P/S ratio usually indicates that the company either has low margins, or is unprofitable. A high P/S ratio usually means the business has high margins, is extremely profitable, or is growing very quickly.</p>
                 <p className="py-2">Investors typically use the P/S ratio to compare a company's value today vs. its history, by taking a look at the company's historical P/S, or they use the P/S ratio to compare companies in the same industry against one another to try and determine which stock is cheapest. However, remember that a low P/S ratio typically means low profitability, so always make sure to do more digging if one company has a lower P/S ratio than its competitors.</p>
                </label>
              </label>  
            </div>
            {stock.PriceToSalesRatioTTM? (
            <p className="pl-3">{Number(stock.PriceToSalesRatioTTM).toFixed(2)}</p>
            ) : null}
        </div>
        
        {/* Book Value */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="BookValue" className="btn btn-sm btn-ghost text-left">Book Value</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="BookValue" className="modal-toggle" />
              <label htmlFor="BookValue" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">Book Value = Total Assets - Total Liabilities</p>
                 <p className="py-2">Book Value is the net asset value of the company. In other words, this is how much assets are left over when we subtract all the liabilities the company carries.</p>
                 <p className="py-2">Book value is typically shown per share, determined by dividing all shareholder equity by the number of common stock shares that are outstanding.</p>
                 <p className="py-2">It's always great to see a company's book value increasing over time, because it means the company is growing its assets more quickly than its liabilities. The faster the rate of growth to the book value, the better.</p>
                 <p className="py-2">If the book value of the company is decreasing over time, then it means the company is taking on more liabilities than assets, or in other words, the debts of the company are growing quicker than the assets. This is a red flag for most investors, and would require more digging to try and figure out why the company's debt is growing so quickly.</p>
                 <p className="py-2">One thing investors also watch out for is rapidly growing Goodwill and Intangible assets on the balance sheet. These 2 assets most of the time are not "real" assets, so if the book value of a business is growing solely because these 2 figures are growing, then that can be a red flag as well.</p>
                 <p className="py-2">In general, a positive value is desired since that means the company has more assets than liabilities. If a company's book value is negative then it means they're carrying more debts than assets, which is a red flag, and could mean the company could face financial stress in the future.</p>
                </label>
              </label>  
            </div>
            {stock.BookValue? (
            <p className="pl-3">${Number(stock.BookValue).toFixed(2)}</p>
            ) : null}
        </div>
        
        {/* P/B */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="P/B" className="btn btn-sm btn-ghost text-left">P/B</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="P/B" className="modal-toggle" />
              <label htmlFor="P/B" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">P/B = Market Cap / Book Value</p>
                 <p className="py-2">P/B is the Price to Book ratio. This is another popular ratio that investors use to analyze the value of a company.</p>
                 <p className="py-2">The P/B is the market cap of the company divided by its book value. The ratio tells you how much investors are willing to pay for the net assets a company has. If a company is selling for 15X book value, then it means investors are currently paying 15X the company's net asset value for the shares.</p>
                 <p className="py-2">One of the best ways investors use the P/B ratio is to compare a company's current P/B vs. its historical averages. Every company trades at a different P/B, so it can be very useful to see how the market has valued the company relative to its free cash flow in the past. That way, investors can better understand whether the company is currently cheap relative to its history, or expensive.</p>
                 <p className="py-2">Another way investors use a P/B is to compare the companies P/B vs. its competitors in the same industry. Typically companies in the same industry will trade around the same P/B ratios. Comparing the P/B of the company you're looking at against its competitors can give you additional insight to the company's current value.</p>
                 <p className="py-2">Investors typically use the P/B ratio when they are researching financial stocks like banks and insurance companies, but it can be a great ratio to look at in any analysis you're doing.</p>
                 <p className="py-2">Investors also like to look at the P/B because if a company is selling below a P/B ratio of 1, then it means the company's market cap is below its reported net asset value. This alone does not mean the company's shares are undervalued or cheap however, but it can be a good indicator to do further research.</p>
                </label>
              </label> 
            </div>
            {stock.PriceToBookRatio? (
            <p className="pl-3">{Number(stock.PriceToBookRatio).toFixed(2)}</p>
            ) : null}
        </div>
        
        {/* EBITDA */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="EBITDA" className="btn btn-sm btn-ghost text-left">EBITDA</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="EBITDA" className="modal-toggle" />
              <label htmlFor="EBITDA" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">EBITDA = Net Income + Taxes + Interest Expense + Depreciation & Amortization</p>
                 <p className="py-2">EBITDA stands for earnings before interest, taxes, depreciation and amortization. In other words, this is what a company makes in earnings before it pays taxes and  interest, and accounts for depreciation/amortization that occurred during the reporting period</p>
                 <p className="py-2">Investors like to pay attention to EBITDA because it shows them how profitable the company is before it services its debts, pays taxes, and writes off its non cash expenses of depreciation and amortization. It can help show the core earnings of a business.</p>
                 <p className="py-2">The metric isn't used as much as the net income, or real earnings metrics and most investors do not prefer EBITDA over the other metrics. However, EBITDA can help give investors insights into a company that is growing but isn't yet profitable. In other words, some investors use this metric on businesses that are currently focused on capturing growth instead of profitability.</p>
                 <p className="py-2">Investors need to be careful using the EBITDA metric though, because some businesses can focus too much on EBITDA, which again, isn't true profitability. A company can have positive EBITDA while still losing money and burning cash.</p>
                 <p className="py-2">Warren Buffett, a legendary investor, does not like the EBITDA metric because he believes it is not a true profitability metric. For example, EBITDA doesn't factor in depreciation and amortization. These are non-cash expenses, but they're still the company's assets losing value. Eventually the company will have to maintain or replace depreciated assets, so investors like Warren believe depreciation and amortization should be factored in.</p>
                 
                </label>
              </label> 
            </div>
            {stock.EBITDA? (
            <p className="pl-3">${intToString(stock.EBITDA)}</p>
            ) : null}
        </div>

        {/* EVToEBITDA */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="EVToEBITDA" className="btn btn-sm btn-ghost text-left">EV/EBITDA</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="EVToEBITDA" className="modal-toggle" />
              <label htmlFor="EVToEBITDA" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">EV = Market Cap + Total Debt - Cash and cash equivalents</p>
                 <p className="py-2">Enterprise value(EV) differs significantly from simple market capitalization in several ways, and many consider it to be a more accurate representation of a firm's value. EV tells investors or interested parties a company's value and how much another company would need if it wanted to purchase that company.</p>
                 <p className="py-2">There is one other consideration: a company's EV can be negative if the total value of its cash and cash equivalents surpasses that of the combined total of its market cap and debts. This is a sign that a company is not using its assets very well—it has too much cash sitting around not being used. Extra cash can be used for many things, such as distributions, buybacks, expansion, research and development, maintenance, employee pay raises, bonuses, or paying off debts.</p>
                 <p className="py-2">Enterprise value is used as the basis for many financial ratios that measure the performance of a company. For example, the enterprise multiple contains enterprise value. It relates the total value of a company from all sources to a measure of operating earnings generated—the earnings before interest, taxes, depreciation, and amortization (EBITDA).</p>
                 <p className="py-2">EBITDA measures a company's ability to generate revenue and is used as an alternative to simple earnings or net income (in some circumstances). EBITDA, however, can be misleading because it strips out the cost of capital investments like property, plant, and equipment. Another figure, EBIT, can be used as a similar financial metric without the drawback of removing depreciation and amortization expenses related to property, plant, and equipment (PP&E).</p>
                 <p className="py-2">The enterprise multiple (EV/EBITDA) metric is used as a valuation tool to compare the value of a company and its debt to the company's cash earnings, less its non-cash expenses. As a result, it's ideal for analysts and investors looking to compare companies within the same industry.</p>
                 
                </label>
              </label> 
            </div>
            {stock.EVToEBITDA? (
            <p className="pl-3">{stock.EVToEBITDA}</p>
            ) : null}
        </div>

        {/* EVToRevenue */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="EVToRevenue" className="btn btn-sm btn-ghost text-left">EV/Revenue</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="EVToRevenue" className="modal-toggle" />
              <label htmlFor="EVToRevenue" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">EV = Market Cap + Total Debt - Cash and cash equivalents</p>
                 
                 <p className="py-2">Enterprise value(EV) differs significantly from simple market capitalization in several ways, and many consider it to be a more accurate representation of a firm's value. EV tells investors or interested parties a company's value and how much another company would need if it wanted to purchase that company.</p>
                 <p className="py-2">There is one other consideration: a company's EV can be negative if the total value of its cash and cash equivalents surpasses that of the combined total of its market cap and debts. This is a sign that a company is not using its assets very well—it has too much cash sitting around not being used. Extra cash can be used for many things, such as distributions, buybacks, expansion, research and development, maintenance, employee pay raises, bonuses, or paying off debts.</p>
                 <p className="py-2"> EV/Revenue is regarded as a more accurate measure than the Price/Sales ratio since it considers the value and amount of debt a company must repay at some point.</p>
                 <p className="py-2">It's believed that the lower the EV/Revenue multiple, the more attractive—or undervalued—the company is. The EV/Revenue ratio can be negative when the cash held by a company is more than the market capitalization and debt value. A negative EV/Revenue implies that a company can pay off all of its debts.</p>
                 
                </label>
              </label> 
            </div>
            {stock.EVToRevenue? (
            <p className="pl-3">{stock.EVToRevenue}</p>
            ) : null}
        </div>

        {/* ForwardPE */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="ForwardPE " className="btn btn-sm btn-ghost text-left">Forward P/E</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="ForwardPE " className="modal-toggle" />
              <label htmlFor="ForwardPE " className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">Forward P/E = Today's Market Cap / Forward Earnings Projections</p>
                 <p className="py-2">The forward P/E is the P/E of the company 12 months out from today, based on the projections analysts are giving the company. Whenever you see the word “Forward” in the market, it means the next 12 months at least, or a future projection.</p>
                 <p className="py-2">A simpler way to word this would be, the Forward P/E is the P/E the company will sell at one year from now if they meet analyst projections.</p>
                 <p className="py-2">The reason investors like the Forward P/E is because the stock market tends to be forward looking, which means investors are looking to the future to make decisions, and not so much the past. Investors do their best to guess where a company will be in the future, and using a Forward P/E helps them understand whether or not today's price is attractive relative to where the company could be in a year from now.</p>
                 <p className="py-2">The problem with the Forward P/E is that it is in fact based on analyst expectations of the future, and no one knows for sure what the future holds. Anything can happen, and businesses can change quickly. Investors should understand this when using Forward multiples and be careful not to over estimate a company's future.</p>
                 
                </label>
              </label> 
            </div>
            {stock.ForwardPE? (
            <p className="pl-3">{stock.ForwardPE}</p>
            ) : null}
        </div>
        
      </div>
    </div>
  )
}

export default StockKeyValue
