import React, { useEffect, useState } from 'react';
import Aside from '../components/layout/aside';
import Navbar from '../components/layout/header';
import TitleBlock from '../components/common/title';
import Footer from '../components/layout/footer';
import Table5 from '../components/sections/table5';
import Table3 from '../components/sections/table3';
import Table7 from '../components/sections/table7';

const ContentManagement = () => {

    const [activeSection, setActiveSection] = useState('header-management');

    useEffect(() => {

        const sections = document.querySelectorAll('[data-section]');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }

                });
            },
            {
                threshold: 0.4,
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };

    }, []);
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
                heading="Content Management"
                subheading="Manage and edit all web content on the EgyCraft Website"
                />
                <div className="chipsFlex">
                     <a
                                className={`chip ${activeSection === 'header-management' ? 'active' : ''}`}
                                href="#header-management"
                            >
                                Header Management
                            </a>

                            <a
                                className={`chip ${activeSection === 'section-management' ? 'active' : ''}`}
                                href="#section-management"
                            >
                                Section Management
                            </a>
                            <a
                                className={`chip ${activeSection === 'FAQ-management' ? 'active' : ''}`}
                                href="#FAQ-management"
                            >
                                FAQ
                            </a>
                </div>
                < Table5 />
                <Table3 />
                <Table7 />

           </section>
        <Footer />
        </main>
    </div>
    </> );
}
 
export default ContentManagement;