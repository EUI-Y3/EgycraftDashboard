import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Sections from './pages/sections';
import Events from './pages/events';
import Tickets from './pages/tickets';
import Categories from './pages/categories';
import ContentManagement from './pages/contentmanagement';
import Feedback from './pages/vendors';
import Error from './pages/error';
import Vendors from './pages/vendors';

function Paths() {
    return (

    <BrowserRouter>
    <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/sections" element={<Sections />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contentmanagement" element={<ContentManagement />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/vendors" element={<Vendors />} />

        <Route path="*" element={<Error />} />
    </Routes>
    </BrowserRouter>
    );
}
 
export default Paths;