import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const DataListTable = ({ heading, data, onEdit, onDelete }) => {
  return (
    <div className="max-w-4xl mx-8 p-8">
      <h2 className="text-2xl font-bold text-center mb-6">{heading}</h2>
      <table className="w-full max-w-screen bg-gray-50 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-indigo-950 text-white text-left">
            <th className="py-6 px-8">Name</th>
            <th className="py-6 px-8">Email</th>
            <th className="py-6 px-8">Username</th>
            <th className="py-6 px-8">Gender</th>
            <th className="py-6 px-8">Phone Number</th>
            <th className="py-6 px-8">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item._id}> {/* Use _id as key */}
              <td className="py-3 px-4">{item.name}</td>
              <td className="py-3 px-4">{item.email}</td>
              <td className="py-3 px-4">{item.username}</td>
              <td className="py-3 px-4">{item.gender}</td>
              <td className="py-3 px-4">{item.phoneNumber}</td>
              <td className="py-3 px-4 flex space-x-6">
                <button onClick={() => onEdit(item._id)} className="text-indigo-950 hover:text-blue-700 mt-3 ml-2">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(item._id)} className="text-indigo-950 hover:text-red-700 mt-3 ml-2">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataListTable;
