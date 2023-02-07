import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Input } from "@material-tailwind/react";

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

  const fetchResults = async () => {
    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/symbol_search',
      params: { symbol: inputValue, outputsize: '2' },
      headers: {
        'X-RapidAPI-Key': '3739bf6e15msh3f361324e7ae496p1291a4jsneeac436b4fc4',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };

    axios.request(options).then((response) => {
      setSearchResults(response.data.data);
      setShowResults(true);
	    console.log('searchResults', searchResults);
      console.log('showResults', showResults);
    }).catch(function (error) {
	    console.error(error);
      setError(error);
    });
  }
      
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchResults();
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
      
      <Input 
        label="Search stocks by ticker symbol or company name" 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
        onKeyPress={handleKeyPress} 
        // onBlur={handleBlur}
      />
      
      </form>

      <div>
      
      
      {showResults && (
        <ul>
          {searchResults.map((result) => (
            
              <li key={result.exchange}>
                <Link to={`/stock/${result.symbol}`}>
                {result.symbol} - {result.instrument_name} - {result.exchange}
                </Link>
              </li>
            
          ))}
        </ul>
      )}
    </div>
      
    </div>
  );
}

export default StockSearch;