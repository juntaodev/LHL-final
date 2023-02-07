import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider>
      
        <Navbar />
        <Footer/>
      
    </ThemeProvider>
  );
}

export default App;
