import React from 'react';
import Aside from '../components/layout/aside';
import Navbar from '../components/layout/header';
import TitleBlock from '../components/common/title';


import Footer from '../components/layout/footer';
import Table1 from '../components/sections/table1';
import Preloader from '../components/layout/preloader';

const Vendors = () => {
    return ( <>
        <Preloader />

    <div className='body2'>
    <Aside />
        <main id='main-content' className='main2'>
            <Navbar />
           <section className='mainCont'>
             <TitleBlock
                class="title1"
                heading="Vendors Management"
                subheading="Manage and edit all Vendors in EgyCraft Exhibition"
                />
                <Table1 />


           </section>
        <Footer />
        </main>
    </div>
    
    </> );
}
 
export default Vendors;