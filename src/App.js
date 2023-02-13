import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./routes/Home";
import StockDetail from "./routes/StockDetail";
import Starter from "./routes/Starter";
import Screener from "./routes/Screener";
import StockDocuments from "./routes/StockDocuments";
import StockEvaluation from "./routes/StockEvaluation";

function App() {
  return (
    <>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/starter" element={<Starter />} />
          <Route path="/screener" element={<Screener />} />
          <Route path="/stock/:stockSymbol" element={<StockDetail />}>
            <Route path=":stockSymbol" />
          </Route>
          <Route path="/stock/:stockSymbol/documents" element={<StockDocuments />}>
            <Route path=":stockSymbol/documents" />
          </Route> 
          <Route path="/stock/:stockSymbol/evaluations" element={<StockEvaluation />}>
            <Route path=":stockSymbol/evaluations" />
          </Route> 
        </Routes>
        <Footer />
    </>
  );
}

export default App;
