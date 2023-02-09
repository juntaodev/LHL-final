import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const StockFinancials = () => {
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
        console.log("financials", response.data);
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

  // convert decimal to percentage format
  const decToPercentage = (decimal) => {
    return `${(decimal * 100).toFixed(2)}%`;
  };
  
  return (
    <div className="grid flex-grow card bg-pink-50 rounded-box place-items-center">
      <p className='card pt-4 '><strong>Financials</strong></p> 
      <div className="grid grid-cols-3 p-4 gap-4">

        {/* Gross Profit */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="GrossProfitTTM" className="btn btn-sm btn-ghost text-left">Gross Profit (TTM)</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="GrossProfitTTM" className="modal-toggle" />
              <label htmlFor="GrossProfitTTM" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2 font-bold">Gross Profit = Revenue - Cost of Goods Sold</p>
                  <p className="py-2">Gross profit is the amount of money a company makes after subtracting variable operating costs like materials and shipping. More simply put, it's the profit a company makes after deducting the costs associated with making and selling its products, or the costs associated with providing its services.</p>
                  <p className="py-2">Gross profit helps show investors how efficient the company is at producing goods or services, since it subtracts only the costs involved with making products or delivering services.</p>
                  <p className="py-2">Investors like paying attention to the gross profits of a company because it can give them insights into a company's profit potential. Typically investors will look at the company's gross profits over time to see if they're growing or declining. Gross profits increasing is typically what investors look for, as it means the company's profit potential is most likely going up.</p>
                  <p className="py-2">However, investors need to be careful when looking at gross profit, because gross profits are not earnings or free cash flow for the company. It still has many other expenses it needs to take care of using the gross profit figure.</p>
                  <p className="py-2">More specifically, gross profit does not factor in the company's fixed costs which include expenses like rent, insurance and salaries. A company uses its gross profits to pay all these additional fixed expenses.</p>
                  <p className="py-2">Almost always gross profit should be positive. If the gross profit is negative, that means the company is likely losing a lot of money since gross profits come before it even subtracts more business expenses. Simply put, if gross profit is negative, then there's a very high likelihood that the company is losing money.</p>
                  <p className="py-2">A company may have a positive gross profit figure while it is still losing money. Investors typically use this look at this margin when looking at a company that isn’t yet profitable, or is investing heavily into growth, to help gauge its profit potential.</p>
                </label>
              </label> 
            </div>
            {stock.GrossProfitTTM? (
            <p className="pl-3">${intToString(stock.GrossProfitTTM)}</p>
            ) : null}
        </div>

        {/* Gross Margin */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="GrossMargin" className="btn btn-sm btn-ghost text-left">Gross Margin (TTM)</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="GrossMargin" className="modal-toggle" />
              <label htmlFor="GrossMargin" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2 font-bold">Gross Margin = (Gross Profit / Revenue) * 100</p>
                  <p className="py-2">Gross margin is the company's gross profit relative to its revenue as a percent. If this value is negative, that means the company is not generating any positive gross profit.</p>
                  <p className="py-2">This value should always be positive! Companies with negative/0 gross margins are extremely unprofitable, whenever making an investment it's very important to understand if the company is becoming more/less profitable over time.</p>
                
                </label>
              </label> 
            </div>
            {stock.GrossProfitTTM? (
            <p className="pl-3">{decToPercentage(stock.GrossProfitTTM / stock.RevenueTTM)}</p>
            ) : null}
        </div>
        
        {/* Operating Margin */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="OperatingMargin" className="btn btn-sm btn-ghost text-left">Operating Margin (ttm)</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="OperatingMargin" className="modal-toggle" />
              <label htmlFor="OperatingMargin" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <p className="py-2 font-bold">Operating Margin = (Operating Income / Revenue) * 100</p>
                  <p className="py-2">Investors like to pay attention to a company's operating margin because it tells them what percentage of the revenue is being converted into operating income. The higher the operating margin the better, because it means the company's operations are more efficient at turning revenue into cash.</p>
                  <p className="py-2">Typically investors will also like to take note of how the operating and other margins are performing over time to see if the company is increasing its margins or if they're decreasing. Margins increasing means the company is making more cash from its operations for every dollar of revenue, which is a good thing because it means they're becoming more efficient.</p>
                  <p className="py-2">Keep in mind however that operating income is not straight profits for the company. A company may have a positive operating margin while it is still losing money. Investors typically use this look at this margin when looking at a company that isn't yet profitable, or is investing heavily into growth to help gauge its profit potential.</p>
                  <p className="py-2">If the operating cash flow margin is negative, then it means the company's operating are losing money, and the company as a whole is most likely losing money as well.</p>
                  <p className="py-2">Investors are typically willing to pay higher price ratios for companies with higher margins. If margins are expanding, then it is not unusual to see the price ratios increase.</p>
                 
                </label>
              </label> 
            </div>
            {stock.OperatingMarginTTM? (
            <p className="pl-3">{decToPercentage(stock.OperatingMarginTTM)}</p>
            ) : null}
        </div>
        
        {/* Net Margin */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="NetMargin" className="btn btn-sm btn-ghost text-left">Net Margin (TTM)</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="NetMargin" className="modal-toggle" />
              <label htmlFor="NetMargin" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">Net Margin = (Net Income / Revenue) * 100</p>
                 <p className="py-2">Investors like to pay attention to net income margins to see how much the company "earns" on every dollar of revenue. For example, if the net income margin is 15%, then it means that for every $1 of revenue, 15 cents becomes earnings for the company.</p>
                 <p className="py-2">Companies with higher net margins are typically more attractive to investors, and therefore command higher price ratios. In other words, investors are typically willing to pay more for companies with higher margins.</p>
                 <p className="py-2">There are a couple of reasons why this is the case. 1) Companies with higher margins have a larger buffer before they become unprofitable. A company with a 30% net margin has much more room for error or compression before the company starts losing money. On the other hand, a company with only a 3% net margin has much less room for error and margin compression before it becomes unprofitable. This ultimately means that the second company is at more risk of losing money. 2) Companies with higher net margins convert more revenue into earnings for the company. This means that the more revenue grows, the more rapidly net income will grow as well.</p>
                 <p className="py-2">For example, if one company has a 30% net margin and grows its revenues by $1 million, it will convert $300,000 of this revenue growth into earnings for the company. If another company only has a 3% net income margin and also grows its revenues by $1 million, then it will only generate $30,000 in earnings for the company.</p>
                 <p className="py-2">This simply means that companies with higher net margins benefit more from revenue growth as they're able to keep more of it as earnings for the company, which essentially makes it "easier" for the company to grow its profits.</p>
                 <p className="py-2">Investors also like to take note of a company's historical net margins to see if margins have been growing or declining over time. If a company's net margin is growing, then it means the business is becoming more efficient at turning revenue into profits, which investors like. If the net margin is decreasing, it could mean the company is having to spend more money to generate revenue growth, or the efficiency of the business is declining.</p>
                 <p className="py-2">A declining net margin ultimately means the company will have a harder time growing its earnings, as it's not only trying to grow its revenues, but also grow faster than the margins decline. Basically, the earnings for the company are fighting 2 battles at once.</p>
                 
                </label>
              </label> 
            </div>
            {stock.RevenuePerShareTTM? (
            <p className="pl-3">{decToPercentage(stock.EPS / stock.RevenuePerShareTTM)}</p>
            ) : null}
        </div>

        {/* Return On Assets */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="ReturnOnAssetsTTM" className="btn btn-sm btn-ghost text-left">Return On Assets (TTM)</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="ReturnOnAssetsTTM" className="modal-toggle" />
              <label htmlFor="ReturnOnAssetsTTM" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">Return On Assets = (Net Income / Total Assets) * 100</p>
                 <p className="py-2">Return on assets (ROA) is a profitability metric that shows investors how profitable the company's assets are. Another way to word this would be the ROA shows investors how efficient the company's assets are at producing profits.</p>
                 <p className="py-2">Investors like to view the ROA figure because it shows them how profitable the company's assets are. For example, if a company is producing $1,000 in earnings and has $100,000 worth of assets, then the company's assets are only producing $1 in earnings for every $100 worth of assets. In other words, this company only has a 1% ROA, which means its assets aren't very efficient at producing earnings for shareholders.</p>
                 <p className="py-2">Typically investors like higher ROA figures for 2 reasons: 1. A high ROA means the company doesn't have to invest as much money into assets to continue growing earnings; 2. A high ROA can indicate the company doesn't have high capital expenditures or depreciation and amortization expenses.</p>
                 <p className="py-2">On the other hand, a company with a low ROA will most likely have to invest much more money into assets to continue growing its earnings for investors. This ultimately means that a company with a higher ROA will have to invest less money to produce more returns than a company with a lower ROA.</p>
                 <p className="py-2">The ROA calculation does not use the tangible book value because investors want it to include the goodwill and intangible assets on the balance sheet. Goodwill is placed on a balance sheet during an acquisition, so factoring in the goodwill to the ROA calculation can also show investors if the management is acquiring companies effectively or not.</p>
                 <p className="py-2">Some investors believe that a low ROA or even a negative ROA can signal that the management of the company is not adept at producing returns for shareholders, or investing capital wisely. On the contrary, investors typically view companies with consistently high ROA figures as having strong management teams.</p>
                 <p className="py-2">Financial stocks like banks and insurance companies typically have very low ROA figures. This is because the companies have an incredible amount of assets on the balance sheet. Instead, investors typically look at the ROE figure, which uses the book value instead of the total assets in the calculation.</p>
                 
                </label>
              </label> 
            </div>
            {stock.ReturnOnAssetsTTM? (
            <p className="pl-3">{decToPercentage(stock.ReturnOnAssetsTTM)}</p>
            ) : null}
        </div>

        {/* Return On Equity */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="ReturnOnEquityTTM" className="btn btn-sm btn-ghost text-left">Return On Equity (TTM)</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="ReturnOnEquityTTM" className="modal-toggle" />
              <label htmlFor="ReturnOnEquityTTM" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">Return On Equity = (Net Income / Book Value) * 100</p>
                 <p className="py-2">Return on equity (ROE) is a measure of how much net income/earnings a company is able to make vs. its book value/shareholder equity as a percent. The calculation for this metric helps investors better understand it.</p>
                 <p className="py-2">Investors often use return on equity to see how profitable the assets of the company are. The ratio essentially tells investors how much net income/earnings the company can produce from its assets and how efficient they are at generating earnings.</p>
                 <p className="py-2">A high ROE means the assets are better at producing earnings, whereas a lower ROE means the assets are not as efficient at producing net income for shareholders.</p>
                 <p className="py-2">ROE is a metric that investors like to use when looking at financial companies, like banks and insurance companies. This is because financial companies typically have a lot of assets, and their business models include leveraging their assets to produce revenue/income.</p>
                 <p className="py-2">A bank is a good example. Banks lend out cash (assets) and generate revenue through interest on the loans. So a bank is literally using its cash (assets) to produce income for shareholders. This means a higher ROE results in a more efficient bank. Or in other words, a high ROE means the bank is making more money on every dollar it lends out.</p>
                 
                </label>
              </label> 
            </div>
            {stock.ReturnOnEquityTTM ? (
            <p className="pl-3">{Number(stock.ReturnOnEquityTTM).toFixed(2)}%</p>
            ) : null}
        </div>

        {/* QuarterlyRevenueGrowthYOY */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="QuarterlyRevenueGrowthYOY" className="btn btn-sm btn-ghost text-left">Quarterly Revenue Growth (YOY)</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="QuarterlyRevenueGrowthYOY" className="modal-toggle" />
              <label htmlFor="QuarterlyRevenueGrowthYOY" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2">Quarterly revenue growth is an increase in a company's sales in one quarter compared to sales of a different quarter. </p>
                 <p className="py-2">The current quarter's sales figure can be compared on a year-over-year basis (e.g., 3Q sales of Year 1 compared with 3Q sales of Year 2) or sequentially (3Q sales of Year 1 compared with 4Q sales of Year 1). This gives analysts, investors, and additional stakeholders an idea of how much a company's sales are increasing over time.</p>
                 <p className="py-2">When looking at a company's quarterly or annual financials, it is not enough to just look at the revenue for the current period. When investing in a company, an investor wants to see it grow or improve over time. Comparing a company's financials from one period to another gives a clear picture of its revenue growth rate and can help investors identify the catalyst for such growth. </p>
                 <p className="py-2">As an investor, there are certain limitations with focusing too much on quarterly revenue growth. For example, the time between quarters is short. In any given multi-quarter period, the company's results could change drastically with business cycles, economic shocks, management changes, or other internal disruptions to a company's supply chain or operations.</p>
                 <p className="py-2">While strong quarterly revenue growth is one metric for success, it's important to look at several quarters and the consistency of growth over time. If growth is simply a two- or three-quarter phenomenon, it does not necessarily bode well for a longer-term investment.</p>
                 <p className="py-2">On the flip side, investors should not be greatly concerned when a company sees poor quarterly revenue growth one or two times in a row. For example, companies that are seasonal, such as tourist companies, might have stagnant quarterly revenue growth at certain parts of the year and large spikes at other times. Again, it's important to zoom out and look for a pattern in either direction—growth or loss—to determine the direction in which a company is moving and if it might be a good potential buy, sell, hold, or short.</p>
                 
                </label>
              </label> 
            </div>
            {stock.QuarterlyRevenueGrowthYOY? (
            <p className="pl-3">{ decToPercentage(stock.QuarterlyRevenueGrowthYOY)}</p>
            ) : null}
        </div>

        {/* QuarterlyEarningsGrowthYOY */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="QuarterlyEarningsGrowthYOY" className="btn btn-sm btn-ghost text-left">Quarterly Earnings Growth (YOY)</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="QuarterlyEarningsGrowthYOY" className="modal-toggle" />
              <label htmlFor="QuarterlyEarningsGrowthYOY" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2">Net income is also known as “earnings” for a business. The two terms are totally equivalent in the world of investing. Net income is also one of the most important metrics in investing, and it's one that investors really pay attention to.</p>
                 <p className="py-2">The net income is meant to show investors how much income or earnings the company has generated over the reported period of time.</p>
                 <p className="py-2">Net income includes many non cash expenses, like depreciation and/or appreciation on assets. For example, if a company owns a building and over the next year that building goes up in value (appreciates) by $1 million, then the company can report a $1 million increase to its net income. However, the company hasn't sold the building yet, which means no cash or profits actually was generated.</p>
                 <p className="py-2">Company's are allowed to report appreciation on assets as net income because the book value for the company and its shareholders has increased. It basically means the company's value increased, so they get to report it as net income for the company.</p>
                 <p className="py-2">The same could all be said if a company reports that a property they own has lost $1 million in value. It would have to report this as a loss even though the company hasn't really lost any cash or money. It's only lost asset value.</p>
            
                 
                </label>
              </label> 
            </div>
            {stock.QuarterlyEarningsGrowthYOY? (
            <p className="pl-3">{decToPercentage(stock.QuarterlyEarningsGrowthYOY)}</p>
            ) : null}
        </div>

        {/* PEGRatio */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="PEGRatio" className="btn btn-sm btn-ghost text-left">PEG</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="PEGRatio" className="modal-toggle" />
              <label htmlFor="PEGRatio" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                 <p className="py-2 font-bold">PEG Ratio = PE Ratio / TTM Earnings Growth Rate</p>
                 <p className="py-2">The PEG ratio (Price/Earnings To Growth ratio) illustrates the relationship between stock price, earning per share, and the company's growth rate. The PEG ratio consists of the PE ratio divided by the company's growth rate. Using just the PE ratio makes high-growth companies look overvalued relative to others. By dividing the PE ratio by the earnings growth rate, the PEG ratio allows investors to accurately compare companies with different PE ratios and growth rates.</p>
                 <p className="py-2">A company with a PEG ratio below 1 is considered undervalued. A company with a PEG ratio around 1 is considered fairly valued. A company with a PEG ratio greater than 1 is considered overvalued.</p>
                 <p className="py-2">With the PEG Ratio, there are 3 possible scenarios:</p>
                 <p className="py-2">1. Positive PEG - There is a positive EPS as well as positive growth in EPS compared to a year ago.</p>
                 <p className="py-2">2. Negative PEG - EPS has a positive growth rate due to the nature of the calculation even though both EPS values are negative.</p>
                 <p className="py-2">3. Null PEG - EPS has a negative growth rate, so no PEG Ratio will show up.</p>
                 
                </label>
              </label> 
            </div>
            {stock.PEGRatio? (
            <p className="pl-3">{stock.PEGRatio}</p>
            ) : null}
        </div>
        

        
        
      </div>
    </div>
  )
}

export default StockFinancials
