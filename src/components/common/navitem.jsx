import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import './navitem.css';

const Navitem = (props) => {
    const isActive = useMatch(props.link);
    return (
        <li className={`${props.style1} ${isActive ? "active" : ""}`}>
            <Link to={props.link} id="link">
                <img src={props.icon} alt="" />
                {props.title}
            </Link>
        </li>
    );
}
export default Navitem;