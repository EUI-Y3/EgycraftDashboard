import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo1.svg'
import './aside.css';
import Navigations from './navigation';
const Aside = () => {
    return ( <>
    <div className="aside_container">

  <aside aria-label="Sidebar navigation" >
    <li className="logo">
          <Link Link to="/" tabIndex={0} aria-label="Go to Login Page"> 
            <img src={logo} alt="EgyCraft Logo" />
          </Link>
        </li>
    <nav role="navigation" aria-label="Main navigation">
      <ul id="sidebar" className="main_nav">
         <Navigations />
      </ul>
    </nav>
  </aside>
</div>
    
    </> );
}
 
export default Aside;