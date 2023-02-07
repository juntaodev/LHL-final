import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./routes/Home";
import StockDetail from "./components/StockDetail";

function App() {
  return (
    <>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/stock/:stockSymbol" element={<StockDetail />}>
            <Route path=":stockSymbol" />
          </Route>
        
        </Routes>
        {/* <Footer /> */}
    </>
  );
}

export default App;
