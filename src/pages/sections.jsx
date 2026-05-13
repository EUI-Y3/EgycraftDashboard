import React from 'react';
import Aside from '../components/layout/aside';
import Navbar from '../components/layout/header';
import TitleBlock from '../components/common/title';

import Footer from '../components/layout/footer';
import Table3 from '../components/sections/table3';
const Sections = () => {
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
                heading="Sections Management"
                subheading="Manage and edit all sections on Ma7gouz's official website"
                />
                


           </section>
        <Footer />
        </main>
    </div>
    </> );
}
 
export default Sections;