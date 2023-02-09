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
      <p><strong>Financials</strong></p> 
      <div className="grid grid-cols-4 p-4 gap-4">

        {/* GrossProfitTTM */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="GrossProfitTTM" className="btn btn-sm btn-ghost text-left">GrossProfitTTM</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="GrossProfitTTM" className="modal-toggle" />
              <label htmlFor="GrossProfitTTM" className="modal cursor-pointer">
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
            {stock.GrossProfitTTM? (
            <p className="pl-3">{decToPercentage(stock.GrossProfitTTM)}</p>
            ) : null}
        </div>

        {/* GrossMargin */}
        <div>
            <div className="text-gray-600 text-md">
              {/* The button to open modal */}
              <label htmlFor="GrossMargin" className="btn btn-sm btn-ghost text-left">GrossMargin</label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="GrossMargin" className="modal-toggle" />
              <label htmlFor="GrossMargin" className="modal cursor-pointer">
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
            {stock.GrossProfitTTM? (
            <p className="pl-3">{decToPercentage(stock.GrossProfitTTM)}</p>
            ) : null}
        </div>
        
        {/* ProfitMargin */}
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
        

        
        
      </div>
    </div>
  )
}

export default StockFinancials
