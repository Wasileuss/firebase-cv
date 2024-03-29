import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const Layout = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('lock');
        } else {
            document.body.classList.remove('lock');
        }
    }, [isMenuOpen]);

    return (
        <div className="wrapper">
            <Header isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick} />
            <main className="page">
                <div className="page__container">
                    <Outlet />
                    <Navigation isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
                </div>
            </main>
            <Footer />
        </div>
    )
};

export default Layout;