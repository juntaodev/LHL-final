import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import StockOverview from '../components/StockOverview';
import StockHeader from '../components/StockHeader';

function StockDetail() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  useEffect(() => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/logo',
      params: {symbol: `${param.stockSymbol}`},
      headers: {
        'X-RapidAPI-Key': '3739bf6e15msh3f361324e7ae496p1291a4jsneeac436b4fc4',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };
    axios
      .request(options)
      .then(response => {
        setData(response.data.url);
        setLoading(false);
        console.log("imgurl", response.data)
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [param.stockSymbol]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className="max-w-[1280px] w-full mx-auto pt-2 h-screen">
      <div>
        <StockHeader />
      </div>

      <div className="divider"></div>

      <div>
        <StockOverview />
      </div>

      {/* <h2>Company LOGO</h2>
      <img className="mask mask-circle"  src={data} alt="company logo"/> */}
      

      
    </div>
  );
}

export default StockDetail;
