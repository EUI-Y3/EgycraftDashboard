import React from 'react';
import Aside from '../components/layout/aside';
import Navbar from '../components/layout/header';
import TitleBlock from '../components/common/title';
// import Button from '../components/common/button';
// import arrow2 from './../assets/tiltedarrow.svg'


import Footer from '../components/layout/footer';
import Table2 from '../components/sections/table2';
import Preloader from '../components/layout/preloader';
const Tickets = () => {
    return ( <>
        <Preloader />

    <div className='body2'>
    <Aside />
        <main id='main-content' className='main2'>
            <Navbar />
           <section className='mainCont'>
             <TitleBlock
                class="title1"
                heading="Tickets & Bookings"
                subheading="Manage and view all bookings and tickets from Ma7gouz's official website"
                />
                
                <Table2 />


           </section>
        <Footer />
        </main>
    </div>
    </> );
}
 
export default Tickets;