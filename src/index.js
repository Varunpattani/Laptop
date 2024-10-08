import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Laptop from './Laptop';
import LaptopById from './LaptopById';
import AddLaptop from './AddLaptop';
import EditItem from './EditItem'; // Ensure the path is correct
import About from './About';
import Contact from './Contact';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/laptop" element={<Laptop />} />
                <Route path="/laptop/:item" element={<LaptopById />} />
                <Route path='/laptop/add' element={<AddLaptop />} />
                <Route path='/laptop/edit/:item' element={<EditItem />} />  
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />  // Ensure the path is correct to display the Contact component
            </Route>
        </Routes>
    </BrowserRouter>
);
