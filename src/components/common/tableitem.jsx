import React from 'react';
import './tableitem.css'
const TableItem = (props) => {
    return ( <>
      <div role={props.role} className={props.class}><h5 className={props.font}>{props.text}</h5></div>
    </> );
}
 
export default TableItem;