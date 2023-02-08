import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./routes/Home";
import StockDetail from "./routes/StockDetail";
import StockTable from "./routes/StockTable";

function App() {
  return (
    <>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stocktable" element={<StockTable />} />
          <Route path="/stock/:stockSymbol" element={<StockDetail />}>
            <Route path=":stockSymbol" />
          </Route>
        
        </Routes>
        {/* <Footer /> */}
    </>
  );
}

export default App;
