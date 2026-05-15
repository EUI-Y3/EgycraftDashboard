import React from 'react';
import Aside from '../components/layout/aside';
import Navbar from '../components/layout/header';
import TitleBlock from '../components/common/title';


import Footer from '../components/layout/footer';
// import Table5 from '../components/sections/table5';
import Table1 from '../components/sections/table1';

const Vendors = () => {
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