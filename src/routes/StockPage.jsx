import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const StockPage = () => {

  const [stock, setStock] = useState({});
  const params = useParams();
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setStock(response.data);
      console.log(response.data);
    });
  }, [url]);


  return (
    <>
      
    </>
  )
}

export default StockPage
