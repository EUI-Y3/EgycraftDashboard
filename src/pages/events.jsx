import React from 'react';
import Aside from '../components/layout/aside';
import { useState , useEffect } from 'react';
import Navbar from '../components/layout/header';
import TitleBlock from '../components/common/title';
import { supabase } from '../supabase';

import Footer from '../components/layout/footer';
import Table9 from '../components/sections/table9';
import Preloader from '../components/layout/preloader';
const Events = () => {

  const [activeSection, setActiveSection] = useState('EventDate');
  const [exhibitionDate, setExhibitionDate] = useState("");
  const [recordId, setRecordId] = useState(null);

  const getExhibitionTime = async () => {
    const { data } = await supabase
      .from("exhibitionTime")
      .select("id, time")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    if (data) {
      setRecordId(data.id);
      if (data.time) {
        setExhibitionDate(new Date(data.time).toISOString().split("T")[0]);
      }
    }
  };

  useEffect(() => {
    getExhibitionTime();
  }, []);

  const handleSaveDate = async () => {
    if (!exhibitionDate) return;

    if (recordId) {
      await supabase
        .from("exhibitionTime")
        .update({ time: exhibitionDate, last_updated: new Date().toISOString() })
        .eq("id", recordId);
    } else {
      const { data } = await supabase
        .from("exhibitionTime")
        .insert([{ time: exhibitionDate, last_updated: new Date().toISOString() }])
        .select()
        .single();

      if (data) setRecordId(data.id);
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <>
        <Preloader />

      <div className='body2'>
        <Aside />

        <div className="chipsFlex">
          <a className={`chip ${activeSection === 'EventDate' ? 'active' : ''}`} href="#EventDate">
            Exhibition Date
          </a>
          <a className={`chip ${activeSection === 'EventDetails' ? 'active' : ''}`} href="#EventDetails">
            Exhibition Details
          </a>
        </div>

        <main id='main-content' className='main2'>
          <Navbar />

          <section style={{ margin: '40px 0 0 0' }} className='mainCont'>

            <TitleBlock
              class="title1"
              heading="Event Details Management"
              subheading="Manage and edit all of the EgyCraft Exhibition Details"
            />

            <div data-section id='EventDate' className="chipsFlex chipsFlex2 table_container">
                <div style={{ margin: '0 0 20px 0' }} className="btnFlex">
              <h3>Exhibition End Date <span>*</span></h3>
               <button className="btn1" onClick={handleSaveDate}>
                Save Date
              </button>
                </div>
              <input
                type="date"
                value={exhibitionDate}
                onChange={(e) => setExhibitionDate(e.target.value)}
              />
              
              <div className="note">
                <span>
                  * <h6 className='note'>Users won't be able to create bookings after this date</h6>
                </span>
              </div>
            </div>

            <Table9 />

          </section>

          <Footer />
        </main>
      </div>
    </>
  );
};

export default Events;