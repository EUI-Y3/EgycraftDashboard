import React from 'react';
import './button.css'
const Button = (props) => {
    return ( <>
    <button className={props.class}>
        {props.cta}
    <img src={props.img} alt="" />
    </button>
    </> );
}
 
export default Button;