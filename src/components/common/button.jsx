import React from 'react';
import './button.css'
import { Link } from 'react-router-dom';
const Button = (props) => {
    return ( <>
    <Link id="Link" to={props.link}>
    <button className={props.class}>
        {props.cta}
    <img src={props.img} alt="" />
    </button>
    </Link>
    </> );
}
 
export default Button;