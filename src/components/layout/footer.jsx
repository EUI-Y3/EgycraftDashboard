import React from 'react';
import logo from '../../assets/logo1.svg'
import './footer.css'
const Footer = () => {
    return ( <>
    <div className="container">
        <footer>
            <div className="btnFlex">
                <img src={logo} alt="" />
        <p>Designed by FM Studios © EGYCRAFT. All Rights Reserved.</p>
            </div>
        </footer>
    </div>
    
    </> );
}
 
export default Footer;