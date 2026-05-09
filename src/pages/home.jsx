import React from 'react';
import Aside from '../components/layout/aside';
import Navbar from '../components/layout/header';
import TitleBlock from '../components/common/title';
import Button from '../components/common/button';
import arrow2 from './../assets/tiltedarrow.svg'

import Footer from '../components/layout/footer';
import StatCard from '../components/common/statcard';
import { TicketRevenueChart, UserGrowthChart } from '../components/layout/chart1';
const Home = () => {
    return ( <>
    <div className='body2'>
    <Aside />
            <Navbar />
        <main className='main2'>
           <section className='mainCont'>
             <TitleBlock
                class="title1"
                heading="Dashboard"
                subheading="Preview data on Ma7gouz"
                />
                <div className="categoriesFlex chartsFlex">
                    <TicketRevenueChart />
                    <UserGrowthChart />
                </div>
                <div className="categoriesFlex">
                    <div className="statCard">
                        <h3>total users</h3>
                        <Button img={arrow2} class="btn1 btn3" cta="view website" />
                        <h1>24k</h1>
                        <h4 className='statText'>
                            24% increase from last month
                        </h4>
                    </div>
                    <div className="btnFlex">
                        <StatCard 
                        title="Total Events"
                        number="120"
                        extra="15% increase from last month"
                        />
                         <StatCard 
                        title="Total Events"
                        number="120"
                        extra="15% increase from last month"
                        />
                    </div>
                </div>
           </section>
        <Footer />
        </main>
    </div>
    </> );
}
 
export default Home;