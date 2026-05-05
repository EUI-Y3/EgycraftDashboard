import React from 'react';
import Aside from '../components/layout/aside';
import Navbar from '../components/layout/header';
import TitleBlock from '../components/common/title';


import Footer from '../components/layout/footer';
// import Table5 from '../components/sections/table5';
import Table6 from '../components/sections/table6';

const Feedback = () => {
    return ( <>
    <div className='body2'>
    <Aside />
        <main className='main2'>
            <Navbar />
           <section className='mainCont'>
            <div className="tableFlex">
            </div>
             <TitleBlock
                class="title1"
                heading="Events Management"
                subheading="Manage and edit all events on Ma7gouz"
                />
                
                <Table6 />


           </section>
        <Footer />
        </main>
    </div>
    
    </> );
}
 
export default Feedback;