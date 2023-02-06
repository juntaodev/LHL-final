import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

import Home from "./routes/Home";

function App() {
  return (
    <ThemeProvider>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          
        
        </Routes>
        <Footer />
    </ThemeProvider>
  );
}

export default App;
