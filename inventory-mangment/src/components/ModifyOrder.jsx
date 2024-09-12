import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SiTicktick } from 'react-icons/si';
import { request } from '../utils/axios';

const ModifyOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const orderId = location.pathname.split('/')[2];
  const selectedComponent = location.search.split('=')[1];
  
  const [dispatchQuantity, setDispatchQuantity] = useState(0);
  const [dispatchDate, setDispatchDate] = useState('');
  const [operationSuccess, setOperationSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const currentDate = new Date().toISOString().split('T')[0];

  const updateOrder = async () => {
    setShowError(false);
    try {
      const response = await request.put(
        `http://localhost:5000/api/v1/updateOrder?id=${orderId}`,
        { 
          numberDispatched: dispatchQuantity, 
          dateDispatched: dispatchDate, 
          isPartialUpdate: true 
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setOperationSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (err) {
      setShowError(true);
      const errorMessage = err?.response?.data?.message || 'Error occurred';
      setError(errorMessage);
      setTimeout(() => setError(''), 2000);
      console.error('Order update failed:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="border shadow-lg px-8 py-6 w-full max-w-md">
        <h2 className="text-2xl text-center text-blue-800 font-semibold mb-4">Modify Order</h2>
        <div className="mb-3">
          <label className="block text-gray-600 mb-1">Component</label>
          <input 
            type="text" 
            value={selectedComponent} 
            disabled 
            className="w-full border px-3 py-2 rounded-sm bg-gray-100" 
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-600 mb-1">Dispatch Date</label>
          <input 
            type="date" 
            max={currentDate}
            onChange={(e) => setDispatchDate(e.target.value)}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-600 mb-1">Dispatch Quantity</label>
          <input 
            type="number" 
            value={dispatchQuantity}
            onChange={(e) => setDispatchQuantity(e.target.value)}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>
        {operationSuccess ? (
          <div className="flex justify-center items-center gap-2 bg-green-400 py-2 rounded-sm mt-4">
            <span className="text-white">Update Successful</span>
            <SiTicktick className="text-green-700" />
          </div>
        ) : (
          <button 
            onClick={updateOrder} 
            className="bg-blue-600 text-white w-full py-2 rounded-sm mt-4"
          >
            Update Order
          </button>
        )}
        {showError && (
          <div className="text-red-500 text-center mt-4 font-semibold">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifyOrder;
