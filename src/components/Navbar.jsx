import React from 'react';
import { Link } from "react-router-dom";
import RealTime from './RealTime';

const Navbar = () => {
  return (
    
      
    <div className="navbar bg-base-100 max-w-[1280px] w-full mx-auto">

      <div className="dropdown">
        <label tabIndex={0} className="">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li className='text-secondary'><Link to="/starter">Starter</Link></li>
          {/* <li className='text-secondary'><Link to="/screener">Screener</Link></li> */}
        </ul>
      </div>

      
      
      <div className="flex-1 px-12 flex justify-between">   
        <Link to="/">
          <div className="btn btn-ghost normal-case text-xl text-secondary">STOCK 101</div>
        </Link>
        
        
        <div className="hidden lg:block">
          <RealTime />
        </div>
      </div>
    </div>
  )
}

export default Navbar
