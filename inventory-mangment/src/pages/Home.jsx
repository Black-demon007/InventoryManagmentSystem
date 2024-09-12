import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/NavBar';
import Dashboard from '../components/ProductDashboard';
import {request} from '../utils/axios';
import { setProducts } from '../features/productRedux';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await request.get('http://localhost:5000/api/v1/getOrders');
        dispatch(setProducts(response.data.data));
      } catch (error) {
        console.log('error in fetching data');
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className='bg-slate-100 min-h-screen w-full'>
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default Home;