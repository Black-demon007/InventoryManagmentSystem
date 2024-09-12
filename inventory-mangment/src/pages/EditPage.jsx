import React from 'react';
import Navbar from '../components/NavBar';
import EditOrder from '../components/ModifyOrder';

const EditPage = () => {
  return (
    <div className="container mx-auto p-4">
   
      <header className="mb-6">
        <Navbar />
      </header>

    
      <main className="bg-white shadow-lg rounded-lg p-6 ">
        <h1 className="text-2xl font-bold mb-4">Edit Order</h1>
        <EditOrder />
      </main>
    </div>
  );
};

export default EditPage;
