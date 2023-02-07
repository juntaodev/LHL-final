import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <Link to="/">
        <h1 className="text-2xl ">Screener</h1>
      </Link>
      <div className="hidden md:block">
        {/* <ThemeToggle /> */}
      </div>
    </div>
  )
}

export default Navbar
