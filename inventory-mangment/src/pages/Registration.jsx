import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginstart, loginFailure } from '../features/userRedux';
import { request } from '../utils/axios';
import Navbar from './../components/NavBar';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        dispatch(loginstart());

        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await request.post(
                'http://localhost:5000/api/v1/signup',
                { email, password, userName, confirmPassword },  
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            console.log('Response:', response); 

            if (response.status === 201) {
                
                navigate('/signin');
            } else {
                
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            
            console.error('Error during registration:', err?.response?.data || err.message || err);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
                <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Register</h2>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="user">User Name</label>
                        <input
                            id="user"
                            type="text"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter your username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="confirmpassword">Confirm Password</label>
                        <input
                            id="confirmpassword"
                            type="password"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-500"
                    >
                        Register
                    </button>
                    <div className="mt-4 text-center">
                        <NavLink to="/signin" className="text-blue-800 hover:text-blue-600">
                            Already have an account? Login
                        </NavLink>
                    </div>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
