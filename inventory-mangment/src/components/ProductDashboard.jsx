import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveAs } from 'file-saver';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { request } from '../utils/axios';
import { removeProduct } from '../features/productRedux';

const Dashboard = () => {
  const data = useSelector((state) => state.products);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to sign-in if user is not logged in
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  const downloadQR = (item) => {
    saveAs(item.qrCode, `${item.name}_QR.png`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await request.delete(`http://localhost:5000/api/v1/deleteOrder?id=${id}`);
      if (response.statusText === 'OK') {
        dispatch(removeProduct(id));
      }
    } catch (error) {
      console.log('Error deleting data:', error);
    }
  };

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="overflow-x-auto flex justify-center">
      <table className="my-8 mx-16 bg-white border border-gray-300">
        <thead>
          <tr className="text-center border-b border-gray-300 space-x-3">
            <th className="p-3 text-sm font-semibold text-gray-600">Component</th>
            <th className="p-3 text-sm font-semibold text-gray-600">Name</th>
            <th className="p-3 text-sm font-semibold text-gray-600">Date Received/Quantity</th>
            <th className="p-3 text-sm font-semibold text-gray-600">Date Dispatched/Quantity</th>
            <th className="p-3 text-sm font-semibold text-gray-600">Pending Items</th>
            <th className="p-3 text-sm font-semibold text-gray-600">Status</th>
            <th className="p-3 text-sm font-semibold text-gray-600">QR Code</th>
            <th className="p-3 text-sm font-semibold text-gray-600">Admin Panel</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b text-center border-gray-300">
              <td className="p-3 text-sm text-gray-700">{item.component}</td>
              <td className="p-3 text-sm text-gray-700">{item.name}</td>
              <td className="p-3 text-sm text-gray-700">{item.dateReceived}/{item.numberReceived}</td>
              <td className="p-3 text-sm text-gray-700">
                {item.dateDispatched ? `${item.dateDispatched}` : 'Nothing Dispatched'} / {item.numberDispatched}
              </td>
              <td className="p-3 text-sm text-gray-700">{item.balanceItems}</td>
              <td className={`p-3 text-sm ${item.status === 'Delivered' ? 'text-green-600' : 'text-red-600'}`}>
                {item.status ? 'Delivered' : 'Pending'}
              </td>
              <td className="p-3 cursor-pointer" onClick={() => downloadQR(item)}>
                <img src={item.qrCode} alt="QR Code" height={100} width={100} />
              </td>
              <td className="p-3 text-sm text-gray-700 flex justify-center items-center">
                <NavLink to={user ? `/edit/${item._id}?component=${item.component}` : '/signin'}>
                  <MdModeEdit className="text-2xl cursor-pointer" />
                </NavLink>
                <MdDelete
                  className="text-2xl cursor-pointer"
                  onClick={() => user ? handleDelete(item._id) : navigate('/signin')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
