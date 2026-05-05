import React from 'react';
import './../common/button.css'
import './header.css'
import './../common/popup.css'

import Navitem from '../common/navitem';


import icon1 from './../../assets/icon01.svg';
import icon2 from './../../assets/icon02.svg';
import icon3 from './../../assets/icon03.svg';
import icon4 from './../../assets/header.svg';
import icon5 from './../../assets/icon05.svg';
import icon6 from './../../assets/icon06.svg';
import icon7 from './../../assets/category.svg';


const Navigations = () => {
    return ( <>
    <Navitem icon={icon6} title="Dashboard" link="/dashboard" style1="asideNav"/>
         <Navitem icon={icon4} title="Header" link="/header" style1="asideNav"/>
         <Navitem icon={icon5} title="Sections" link="/sections" style1="asideNav"/>
         <Navitem icon={icon3} title="Events" link="/events" style1="asideNav"/>
         <Navitem icon={icon7} title="Categories" link="/categories" style1="asideNav"/>
         <Navitem icon={icon1} title="Tickets" link="/tickets" style1="asideNav"/>
         <Navitem icon={icon2} title="Feedback" link="/feedback" style1="asideNav"/>
    
    </> );
}
 
export default Navigations;