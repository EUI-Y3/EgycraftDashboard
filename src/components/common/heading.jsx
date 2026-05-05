import React from 'react';
import './heading.css';
const Heading = (props) => {
    return (<>
    <h2 className='heading'>
        {props.heading}
    </h2>
    
    </>  );
}
 
export default Heading;