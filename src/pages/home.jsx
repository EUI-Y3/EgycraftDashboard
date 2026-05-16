import React, { useEffect, useState } from 'react';
import Aside from '../components/layout/aside';
import Navbar from '../components/layout/header';
import TitleBlock from '../components/common/title';
import Button from '../components/common/button';
import arrow2 from './../assets/tiltedarrow.svg';
import icon1 from './../assets/icon06.svg';
import icon2 from './../assets/icon12.svg';
import icon3 from './../assets/icon05.svg';
import Footer from '../components/layout/footer';
import StatCard from '../components/common/statcard';
import { TicketRevenueChart, UserGrowthChart } from '../components/layout/chart1';
import { supabase } from './../supabase';
import Preloader from '../components/layout/preloader';
const Home = () => {
    const [vendorCount, setVendorCount] = useState(null);
    const [ticketCount, setTicketCount] = useState(null);
    const [boothCount, setBoothCount] = useState(null);

    useEffect(() => {
        const fetchCounts = async () => {
            const [
                { data: vendors },
                { data: bookings },
                { data: booths },
            ] = await Promise.all([
                supabase.from('vendors').select('id'),
                supabase.from('booking').select('id'),
                supabase.from('booths').select('id'),
            ]);

            if (vendors)  setVendorCount(vendors.length);
            if (bookings) setTicketCount(bookings.length);
            if (booths)   setBoothCount(booths.length);
        };

        fetchCounts();
    }, []);

    return (
        <>
        <Preloader />
            <div className='body2'>
                <Aside />
                <Navbar />
                <main id="main-content" className='main2'>
                    <section className='mainCont'>
                        <TitleBlock
                            class="title1"
                            heading="Dashboard"
                            subheading="Preview data about EgyCraft Exhibition"
                        />
                        <div className="categoriesFlex">
                            <div className="statCard">
                                <img src={icon1} alt="" />
                                <h3>Total Vendors</h3>
                                <Button img={arrow2} class="btn1 btn3" cta="view website" />
                                <h1>{vendorCount ?? '...'}</h1>
                            </div>
                            <div className="btnFlex">
                                <StatCard
                                    icon={icon2}
                                    title="Total Tickets"
                                    number={ticketCount ?? '...'}
                                    extra="15% increase from last week"
                                />
                                <StatCard
                                    icon={icon3}
                                    title="Total Booths"
                                    number={boothCount ?? '...'}
                                />
                            </div>
                        </div>
                        <div className="categoriesFlex chartsFlex">
                            <TicketRevenueChart />
                            <UserGrowthChart />
                        </div>
                    </section>
                    <Footer />
                </main>
            </div>
        </>
    );
};

export default Home;