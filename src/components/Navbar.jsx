import React from 'react';
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <Link to="/">
        <h1 className="text-2xl ">Screener</h1>
      </Link>
      
    </div>
  )
}

export default Navbar
