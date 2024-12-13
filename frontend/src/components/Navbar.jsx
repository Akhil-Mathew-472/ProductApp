import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMoon, FaSun,FaShoppingCart  } from "react-icons/fa"; 



export const Navbar = ({isDarkMode,setIsDarkMode}) => {
 
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/create');  // Correctly navigate to /create
  };


  return (
    <div className={isDarkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{ minHeight: "8vh" }} >
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold text-primary fs-3">
            PRODUCT STORE 
            <FaShoppingCart className="" size={24}  style={{ marginLeft:"8px",marginBottom:"5px"}}/>
          </Link>
          <div>
          <BiAddToQueue className="mt-1" size={26}  onClick={handleNavigate}/>
          <button className="btn btn-link ms-auto text-decoration-none" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <FaSun size={24} className="text-warning" title="Switch to Light Mode" />
            ) : (
              <FaMoon size={24} className="text-primary" title="Switch to Dark Mode" />
            )}
          </button>
          </div>
        </div>
      </nav>
     
    </div>
  
  );
};

export default Navbar;
