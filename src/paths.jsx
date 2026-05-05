import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Sections from './pages/sections';
import Events from './pages/events';
import Tickets from './pages/tickets';
import Categories from './pages/categories';
import HeaderContent from './pages/headermanagement';
import Feedback from './pages/feedback';

function Paths() {
    return (

    <BrowserRouter>
    <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/sections" element={<Sections />} />
        <Route path="/events" element={<Events />} />
        <Route path="/header" element={<HeaderContent />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/feedback" element={<Feedback />} />

    </Routes>
    </BrowserRouter>
    );
}
 
export default Paths;