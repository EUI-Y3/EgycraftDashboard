import React from 'react';
import './statcard.css'
const StatCard = (props) => {
    return ( <>
    <div className="statCard">
                        <h3>{props.title}</h3>
                        <h1>{props.number}</h1>
                        <h4 className='statText'>
                            {props.extra}
                        </h4>
                    </div>
    
    </> );
}
 
export default StatCard;