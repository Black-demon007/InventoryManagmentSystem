import { request } from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const location = useLocation();
    const productId = location.pathname.split('/')[2];
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [formError, setFormError] = useState('');
    const [productData, setProductData] = useState({});
    const [showError, setShowError] = useState(false);
    const user = useSelector(state => state.user.currentUser);
    const [productDetails, setProductDetails] = useState({
        serialNumber: '',
        component: '',
        name: '',
        partNumber: '',
        dateReceived: '',
        numberReceived: 0,
        numberDispatched: 0,
        dateDispatched: '',
        balanceItems: 0,
    });

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const res = await request.get(`http://localhost:5000/api/v1/getOrder?id=${productId}`);
                const data = res.data.data;
                setProductData(data);
                setProductDetails({
                    serialNumber: data.serialNumber,
                    component: data.component,
                    name: data.name,
                    partNumber: data.partNumber,
                    dateReceived: data.dateReceived,
                    numberReceived: data.numberReceived,
                    numberDispatched: data.numberDispatched,
                    dateDispatched: data.dateDispatched,
                    balanceItems: data.balanceItems,
                });
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProductData();
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const updatedProduct = {
                ...productDetails,
                isPartialUpdate: false
            };
            await request.put(`http://localhost:5000/api/v1/updateOrder?id=${productId}`, updatedProduct);
            navigate('/');
            setEditMode(false);
        } catch (error) {
            setShowError(true);
            setFormError(error.response?.data?.message || 'Error updating product');
            setTimeout(() => setFormError(''), 3000);
        }
    };

    return (
        <div className="container mx-auto py-6">
            <div className="bg-gray-50 shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Product Information</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2">Component</label>
                        {editMode ? (
                            <select
                                name="component"
                                value={productDetails.component}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Choose Component</option>
                                <option value="C1">C1</option>
                                <option value="C2">C2</option>
                                <option value="C3">C3</option>
                                <option value="C4">C4</option>
                                <option value="C5">C5</option>
                            </select>
                        ) : (
                            <p>{productDetails.component}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2">Serial Number</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="serialNumber"
                                value={productDetails.serialNumber}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        ) : (
                            <p>{productDetails.serialNumber}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2">Name</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="name"
                                value={productDetails.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        ) : (
                            <p>{productDetails.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2">Part Number</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="partNumber"
                                value={productDetails.partNumber}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        ) : (
                            <p>{productDetails.partNumber}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2">Date Received</label>
                        {editMode ? (
                            <input
                                type="date"
                                name="dateReceived"
                                value={productDetails.dateReceived}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        ) : (
                            <p>{productDetails.dateReceived}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2">Number Received</label>
                        {editMode ? (
                            <input
                                type="number"
                                name="numberReceived"
                                value={productDetails.numberReceived}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        ) : (
                            <p>{productDetails.numberReceived}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2">Date Dispatched</label>
                        {editMode ? (
                            <input
                                type="date"
                                name="dateDispatched"
                                value={productDetails.dateDispatched}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        ) : (
                            <p>{productDetails.dateDispatched}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2">Number Dispatched</label>
                        {editMode ? (
                            <input
                                type="number"
                                name="numberDispatched"
                                value={productDetails.numberDispatched}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        ) : (
                            <p>{productDetails.numberDispatched}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2">Balance Items</label>
                        <p>{productDetails.balanceItems}</p>
                    </div>

                    <div>
                        <label className="block mb-2">QR Code</label>
                        <img src={productData.qrCode} alt="QR Code" className="mt-2 w-32 h-32" />
                    </div>
                </div>

                {editMode ? (
                    <div className="mt-4">
                        <button
                            onClick={handleSaveChanges}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditMode(false)}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => user ? setEditMode(true) : navigate('/login')}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
                    >
                        Edit
                    </button>
                )}

                {showError && (
                    <p className="text-red-500 mt-4 text-center">{formError}</p>
                )}
            </div>
        </div>
    );
};

export default UpdateProduct;
