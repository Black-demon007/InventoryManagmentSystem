import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../features/userRedux';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);

    const handleLogout = () => {
        localStorage.removeItem('persist:root');
        localStorage.removeItem('token');
        dispatch(logout());
    };

    return (
        <header className="w-full bg-gradient-to-r from-black to-gray-800">
            <nav className="container mx-auto flex justify-between items-center py-4 px-6">
               
                <NavLink
                    to="/"
                    className="text-white font-bold text-2xl tracking-wider hover:text-red-500 transition-all"
                >
                    Inventory Mangment System
                </NavLink>

               
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                
                <div
                    className={`${isOpen ? 'block' : 'hidden'
                        } md:flex items-center space-x-6`}
                >
                    <NavLink
                        to="/generateqr"
                        className="text-white hover:text-red-500 font-semibold tracking-wide transition-colors duration-300 ease-in-out transform hover:scale-105"
                    >
                        Generate QR Code
                    </NavLink>

                    <NavLink
                        to="/qrscan"
                        className="text-white hover:text-red-500 font-semibold tracking-wide transition-colors duration-300 ease-in-out transform hover:scale-105"
                    >
                        Scan QR Code
                    </NavLink>
                </div>

               
                <div className={`${isOpen ? 'block' : 'hidden'} md:flex items-center space-x-6`}>
                    {user ? (
                        <NavLink
                            to="/"
                            onClick={handleLogout}
                            className="text-white hover:text-gray-200 transition-all"
                        >
                            Log Out
                        </NavLink>
                    ) : (
                        <NavLink
                            to="/signin"
                            className="text-white hover:text-gray-200 transition-all"
                        >
                            Log In
                        </NavLink>
                    )}
                    <NavLink
                        to="/signup"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-all"
                    >
                        Sign Up
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
