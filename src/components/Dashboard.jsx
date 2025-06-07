import React, { useContext, useEffect } from 'react';
import { FaVideo, FaUsers, FaClipboardList, FaCog } from 'react-icons/fa';
import { MyContext } from '../MyContext/Mycontext';

const Dashboard = () => {


  const { fetchAnswer } = useContext(MyContext);
  useEffect(() => {
    fetchAnswer();
  }, [])


  return (
    <div className="flex min-h-screen bg-gray-100">


      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>

        </header>

        {/* Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Video</h2>
            <p className="text-3xl font-bold text-blue-600">24</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Images</h2>
            <p className="text-3xl font-bold text-green-500">58</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total  Answer</h2>
            <p className="text-3xl font-bold text-yellow-500">12</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Question</h2>
            <p className="text-3xl font-bold text-red-500">5</p>
          </div>
        </section>

        {/* Recent Activity */}
        {/* <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg">
              <thead>
                <tr className="bg-blue-100 text-gray-700">
                  <th className="p-4 text-left">Client Name</th>
                  <th className="p-4 text-left">Service</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4">John Doe</td>
                  <td className="p-4">Wedding Shoot</td>
                  <td className="p-4">2025-05-02</td>
                  <td className="p-4 text-green-600">Confirmed</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4">Jane Smith</td>
                  <td className="p-4">Birthday Event</td>
                  <td className="p-4">2025-05-04</td>
                  <td className="p-4 text-yellow-500">Pending</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4">Michael Lee</td>
                  <td className="p-4">Corporate Video</td>
                  <td className="p-4">2025-05-06</td>
                  <td className="p-4 text-green-600">Confirmed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section> */}
      </main>
    </div>
  );
};

export default Dashboard;
