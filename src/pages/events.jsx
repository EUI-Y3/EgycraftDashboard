import React from 'react';
import Aside from '../components/layout/aside';
import Navbar from '../components/layout/header';
import TitleBlock from '../components/common/title';
// import Button from '../components/common/button';
// import arrow2 from './../assets/tiltedarrow.svg'


import Footer from '../components/layout/footer';
import Table1 from '../components/sections/table1';
const Events = () => {


    return ( <>
    <div className='body2'>
    <Aside />
        <main id='main-content' className='main2'>
            <Navbar />
           <section className='mainCont'>
            <div className="tableFlex">
            </div>
             <TitleBlock
                class="title1"
                heading="Events Management"
                subheading="Manage and edit all events on Ma7gouz"
                />
                
                <Table1 />


           </section>
        <Footer />
        </main>
    </div>
    </> );
}
 
export default Events;