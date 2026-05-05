import React from 'react';
import './title.css';

const TitleBlock = (props) => {
    return ( <>
        <div className={props.class}>
        <img  className={props.imgClass} src={props.img} alt="" />
        <h1 className='italic'>{props.heading}</h1>
        <h3>
            {props.subheading}
        </h3>
    </div>
    
    
    </> );
}
 
export default TitleBlock;