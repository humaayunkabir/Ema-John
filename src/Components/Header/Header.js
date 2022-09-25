import React from 'react';
import logo from '../../images/Logo.svg'
import './Header.css'

const Header = () => {
    return (
        <nav className='navbar'>
            <div className='container'>
                <a href="/home"><img src={logo} alt="" /></a>
                <div>
                    <a href="/order">Order</a>
                    <a href="/order-review">Order Review</a>
                    <a href="/manage-inventory">Manage Inventory</a>
                    <a href="/login">Login</a>
                </div>
            </div>
        </nav>
    );
};

export default Header;