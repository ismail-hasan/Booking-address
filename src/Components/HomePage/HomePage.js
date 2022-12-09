import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const HomePage = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default HomePage;