import React from 'react';
import './../common/button.css'
import './header.css'
import './../common/popup.css'
import burger from './../../assets/burger.svg'
import close from './../../assets/close.svg'
import logout from './../../assets/logout.svg'

import { useState } from 'react';
import pfp from './../../assets/pfp.svg';
import Navigations from './navigation';

// FUNCTIONS
const Navbar = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };


// CODE
    return ( <>
    <header>
            <div className="btnFlex">
            <div className="profile">
                <img src={pfp} alt="" />
                <div>
                    <h5>Ahmed Amin</h5>
                    <h5>admin</h5>
                </div>
            </div>
        <div className='btnFlex7'>
            <button className='btn3'><img src={logout} alt="" /></button>
        <a href="#main-content" aria-label='Open Menu' className='btn3' >Skip to main content</a>
        </div>

        <button aria-label='Open Menu' className='btn3 burgermenu' onClick={openPopup}> <img src={burger} alt="" /></button>
            </div>
    </header>
        
    {/* POPUP */}

    <div className={`popUp ${isOpen ? "show" : "hide"}`}>
        <div>
            <ul className='burgernav'>
         <Navigations />
              
            </ul>
            {/* CLOSEBTN */}
        <button className='btn3 closed'  onClick={closePopup}><img src={close} alt="" /></button>
        </div>
    </div>
    <span></span>
    </> );
}
 
export default Navbar;