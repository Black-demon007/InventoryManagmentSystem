import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginstart, loginsuccess, loginFailure } from '../features/userRedux';
import { request } from '../utils/axios';
import Navbar from './../components/NavBar';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isFetching, error } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginstart());
        try {
            const response = await request.post('http://localhost:5000/api/v1/signin',
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log('response:', response.data.token);

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                dispatch(loginsuccess({
                    email: response.data.user,
                    userId: response.data.userId,
                    token: response.data.token
                }));
                dispatch(loginFailure(false));
                navigate('/')
            } else {
                dispatch(loginFailure(true));
            }
        } catch (err) {
            dispatch(loginFailure(true));
        }
    };


    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
                <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Login</h2>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border rounded "
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
                    <button
    type="submit"
    className={`w-full bg-blue-700 text-white py-2 px-4 rounded ${isFetching ? 'opacity-50' : 'hover:bg-blue-500'}`}
>
    {isFetching ? 'Logging in...' : 'Login'}
</button>

                     
                    <NavLink to={"/signup"} className="text-blue-800 text-center hover:text-blue-600">
                    Are you a new user? Signup
                    </NavLink>
                    {error && <p className="text-red-500 mt-4">Something went wrong. Please try again.</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;