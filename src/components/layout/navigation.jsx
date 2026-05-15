import React from 'react';
import './../common/button.css'
import './header.css'
import './../common/popup.css'

import Navitem from '../common/navitem';


import icon1 from './../../assets/icon01.svg';
import icon2 from './../../assets/icon03.svg';
import icon3 from './../../assets/icon03.svg';
import icon4 from './../../assets/icon12.svg';
import icon5 from './../../assets/icon05.svg';
import icon6 from './../../assets/icon06.svg';
import icon7 from './../../assets/category.svg';


const Navigations = () => {
    return ( <>
    <Navitem icon={icon1} title="Dashboard"  link="/dashboard" style1="asideNav" index={1} />
            <Navitem icon={icon2} title="Web Content" link="/contentmanagement"    style1="asideNav" index={2} />
            <Navitem icon={icon5} title="Booths"      link="/sections"  style1="asideNav" index={3} />
            <Navitem icon={icon3} title="Event"       link="/events"    style1="asideNav" index={4} />
            <Navitem icon={icon7} title="Categories"  link="/categories" style1="asideNav" index={5} />
            <Navitem icon={icon4} title="Tickets"     link="/tickets"   style1="asideNav" index={6} />
            <Navitem icon={icon6} title="Vendors"     link="/vendors"  style1="asideNav" index={7} />
    
    </> );
}
 
export default Navigations;