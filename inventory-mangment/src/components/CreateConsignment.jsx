import React, { useState } from 'react';
import { request } from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateConsignment = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.currentUser);
    const [formData, setFormData] = useState({
        serialNumber: '',
        component: '',
        name: '',
        partNumber: '',
        dateReceived: '',
        numberReceived: 0,
    });
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        if (!user) {
            setError(true);
            setTimeout(() => setError(false), 3000);
            return;
        }

        try {
            const result = await request.post('http://localhost:5000/api/v1/addOrder', formData);
            console.log('Consignment created:', result.data);

            if (result.data.success) {
                navigate('/');
                resetForm();
            }
        } catch (err) {
            console.error('Error while creating consignment:', err);
        }
    };

    const resetForm = () => {
        setFormData({
            serialNumber: '',
            component: '',
            name: '',
            partNumber: '',
            dateReceived: '',
            numberReceived: 0,
        });
    };

    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <div className="flex flex-col items-center p-8 max-w-lg mx-auto bg-gradient-to-b from-white via-gray-100 to-gray-200 shadow-2xl rounded-lg border border-gray-300 hover:shadow-3xl transition-shadow duration-300">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 drop-shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">Create Consignment</h2>
            <div className="w-full space-y-4">
                <div>
                    <label className="block text-gray-700">Component</label>
                    <select
                        name="component"
                        value={formData.component}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select Component</option>
                        {['C1', 'C2', 'C3', 'C4', 'C5'].map((component) => (
                            <option key={component} value={component}>
                                {component}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Serial Number</label>
                    <input
                        type="number"
                        name="serialNumber"
                        placeholder="Enter Serial Number"
                        value={formData.serialNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Part Number</label>
                    <input
                        type="text"
                        name="partNumber"
                        placeholder="Enter Part Number"
                        value={formData.partNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Date Received</label>
                    <input
                        type="date"
                        name="dateReceived"
                        value={formData.dateReceived}
                        max={currentDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Number Received</label>
                    <input
                        type="number"
                        name="numberReceived"
                        placeholder="Enter Number Received"
                        value={formData.numberReceived}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none"
                    />
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 transition"
            >
                Submit
            </button>
            {error && (
                <div className="mt-4 text-red-500">
                    Please log in to submit the consignment.
                </div>
            )}
        </div>
    );
};

export default CreateConsignment;
