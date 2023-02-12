import React from 'react';
import { Link } from "react-router-dom";
import RealTime from './RealTime';

const Navbar = () => {
  return (
    
      
    <div className="navbar bg-base-100 max-w-[1280px] w-full mx-auto">
      
      <div className="flex-1 px-12 flex justify-between">
        <Link to="/">
          <div className="btn btn-ghost normal-case text-xl text-secondary">STOCK 101</div>
        </Link>
        <div className="flex-none">
          <RealTime/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
