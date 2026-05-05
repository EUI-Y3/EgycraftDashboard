import React from 'react';
import Aside from '../components/layout/aside';
import Navbar from '../components/layout/header';
import TitleBlock from '../components/common/title';
// import Button from '../components/common/button';
// import arrow2 from './../assets/tiltedarrow.svg'


import Footer from '../components/layout/footer';
import Table4 from '../components/sections/table4';
const Categories = () => {
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
                heading="Categories Management"
                subheading="Manage and edit all categories on Ma7gouz"
                />
                
                <Table4 />


           </section>
        <Footer />
        </main>
    </div>
    
    </> );
}
 
export default Categories;