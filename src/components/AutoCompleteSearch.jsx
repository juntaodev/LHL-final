import React, { useState, useEffect, useRef } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AutoCompleteSearch = () => {

  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const firstRender = useRef(true);
  
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/symbol_search',
      params: {symbol: `${inputValue}`, format: 'json', outputsize: '10'},
      headers: {
        'X-RapidAPI-Key': '3739bf6e15msh3f361324e7ae496p1291a4jsneeac436b4fc4',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };
    axios
      .request(options)
      .then(response => {
        setSearchResults(response.data.data);
        
        // console.log("price", response.data)
      })
      .catch(error => {
        setError(error);
        
      });
    }
  }, [inputValue]);


  const items = [
    {
      id: 0,
      name: searchResults[0]?.symbol,
      company: searchResults[0]?.instrument_name,
    }
  ]
  
  const goToPage = () =>
    navigate({
      pathname: `/stock/${inputValue}`,
      
    });

  // Reset Input Field handler
  const resetInputField = () => {
    setInputValue("");
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    setInputValue(string);
    
    // console.log("onsearch", string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    // console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    
    resetInputField();
    goToPage();
    console.log(inputValue);
    
  }

  const handleOnFocus = () => {
    // console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left', fontWeight:'bold', fontFamily:'Inter' }}>{item.name}</span>
        <span style={{ display: 'block', textAlign: 'left', fontFamily:'Inter' }}>{item.company}</span>
      </>
    )
  }
  

  return (
    <div className='px-8 pt-8 pb-24'> 
    <div className="App">
      <header className="App-header">
        <div style={{ width: 500 } } className="mx-auto">
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            placeholder={`Search Stocks`}
          />
        </div>
      </header>
    </div>
    </div>
  )
  }


export default AutoCompleteSearch
