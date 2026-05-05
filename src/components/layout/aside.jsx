import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo1.svg'
import './aside.css';
import Navigations from './navigation';
const Aside = () => {
    return ( <>
    <div className="aside_container">

  <aside>
    <nav>
      <ul id="sidebar" className="main_nav">
        {/* LOGO */}
        <li className="logo">
          <Link to="/"> 
            <img src={logo} alt="" />
          </Link>
        </li>
        {/* 1 */} 
         <Navigations />

      </ul>
    </nav>
  </aside>
</div>
    
    </> );
}
 
export default Aside;