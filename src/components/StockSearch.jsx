import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


const StockSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  }

  // const fetchResults = async () => {

  //   const API_KEY = 'CW78WPZZAQ61P2ZU';
  //   const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${API_KEY}`;

    
    
  //   axios.request(url).then((response) => {
  //     setSearchResults(response.data.data);
  //     setShowResults(true);
	//     console.log('searchResults', searchResults);
  //     console.log('showResults', showResults);
  //   }).catch(function (error) {
	//     console.error(error);
  //     setError(error);
  //   });
  // } 
  
    

    async function fetchData() {

      const API_KEY = 'KJEJ4ZQQOGDC75P4';
      const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${API_KEY}`;

      try {
        const response = await axios.get(url);
        setSearchResults(response.data.bestMatches[0]);
        setShowResults(true);
        console.log("stock", response.data.bestMatches[0]);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }
      
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handleBlur = () => {
    setShowResults(false);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!searchResults) {
    return <div>Loading...</div>;
  }
  
  return (
    
    <div className="rounded-div p-4">
      <form onSubmit={handleSubmit}>
      
      <input 
        type="text" 
        placeholder="Search stocks by ticker symbol or company name"   
        className="input input-ghost w-full" 
        value={inputValue} 
        onChange={handleInputChange} 
        onKeyPress={handleKeyPress} 
      />
      
      </form>

      <div>
      
      
      {showResults && (
      
          
            
              
        <Link to={`/stock/${searchResults["1. symbol"]}`}>
        <p>{searchResults["1. symbol"]} - {searchResults["2. name"]}</p>
          </Link>
              
            
          
        
      )}
    </div>
      
    </div>
  );
}

export default StockSearch;