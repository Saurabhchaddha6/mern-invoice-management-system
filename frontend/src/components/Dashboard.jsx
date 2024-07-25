/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/invoices");
        setInvoices(response.data);

        const total = response.data.reduce((acc, invoice) => acc + parseFloat(invoice.amount), 0);
        setTotalAmount(total);
      } catch (error) {
        console.error("Error fetching invoices", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      <div className="flex justify-around mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md w-1/2">
          <h2 className="text-xl font-semibold">Total Invoices</h2>
          <p className="text-2xl mt-2">{invoices.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md w-1/2">
          <h2 className="text-xl font-semibold">Total Amount</h2>
          <p className="text-2xl mt-2">${totalAmount.toFixed(2)}</p>
        </div>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Recent Invoices</h3>
        <ul>
          {invoices.slice(0, 5).map(invoice => (
            <li key={invoice._id} className="bg-white p-4 mb-2 rounded-lg shadow-sm">
              {invoice.title} - ${invoice.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
