import React from 'react';
import Aside from '../components/layout/aside';
import Navbar from '../components/layout/header';
import TitleBlock from '../components/common/title';


import Footer from '../components/layout/footer';
import Table9 from '../components/sections/table9';
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
                heading="Event Details Management"
                subheading="Manage and edit all of the EgyCraft Exhibition Details"
                />
                 <Table9 />
           </section>
        <Footer />
        </main>
    </div>
    </> );
}
 
export default Events;