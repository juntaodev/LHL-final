import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


function StockOverview() {
  const [stock, setstock] = useState(null);

  const param = useParams();

  useEffect(() => {
    const API_KEY = 'CW78WPZZAQ61P2ZU';
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${param.stockSymbol}&apikey=${API_KEY}`;

    async function fetchData() {
      try {
        const response = await axios.get(url);
        setstock(response.data);
        console.log("stock", response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  if (!stock) {
    return <div>Loading...</div>;
  }

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
    <div>
      <p><strong>Key Stats</strong></p> 
      <div className="grid grid-cols-4 py-4 gap-4">
        
        <div>
            <p className="text-gray-600 text-md">Market Cap</p>
            {stock.MarketCapitalization? (
            <p>${intToString(stock.MarketCapitalization)}</p>
            ) : null}
        </div>

        <div>
            <p className="text-gray-600 text-md">Shares Outstanding</p>
            {stock.SharesOutstanding? (
            <p>{intToString(stock.SharesOutstanding)}</p>
            ) : null}
        </div>

        <div>
            <p className="text-gray-600 text-md">EPS</p>
            {stock.EPS? (
            <p>${stock.EPS}</p>
            ) : null}
        </div>

        <div>
            <p className="text-gray-600 text-md">P/E</p>
            {stock.PERatio? (
            <p>{stock.PERatio}</p>
            ) : null}
        </div>

        <div>
            <p className="text-gray-600 text-md">Revenue (ttm)</p>
            {stock.RevenueTTM? (
            <p>${intToString(stock.RevenueTTM)}</p>
            ) : null}
        </div>

        <div>
            <p className="text-gray-600 text-md">P/S (ttm)</p>
            {stock.PriceToSalesRatioTTM? (
            <p>{stock.PriceToSalesRatioTTM}</p>
            ) : null}
        </div>

        <div>
            <p className="text-gray-600 text-md">Book Value</p>
            {stock.BookValue? (
            <p>{stock.BookValue}</p>
            ) : null}
        </div>

        <div>
            <p className="text-gray-600 text-md">P/B</p>
            {stock.PriceToBookRatio? (
            <p>{stock.PriceToBookRatio}</p>
            ) : null}
        </div>

        <div>
            <p className="text-gray-600 text-md">Profit Margin</p>
            {stock.ProfitMargin? (
            <p>{decToPercentage(stock.ProfitMargin)}</p>
            ) : null}
        </div>

        <div>
            <p className="text-gray-600 text-md">Operating Margin (ttm)</p>
            {stock.OperatingMarginTTM? (
            <p>{decToPercentage(stock.OperatingMarginTTM)}</p>
            ) : null}
        </div>

        <div>
            <p className="text-gray-600 text-md">Return On Assets (ttm)</p>
            {stock.ReturnOnAssetsTTM? (
            <p>{decToPercentage(stock.ReturnOnAssetsTTM)}</p>
            ) : null}
        </div>

        <div>
            <p className="text-gray-600 text-md">Return On Equity (ttm)</p>
            {stock.ReturnOnEquityTTM? (
            <p>{decToPercentage(stock.ReturnOnEquityTTM)}</p>
            ) : null}
        </div>
      </div>
    </div>
  );
}

export default StockOverview;
