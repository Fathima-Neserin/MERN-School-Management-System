import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { listHistories } from '../../actions/library.actions';

const HistoryList = () => {
    
      const dispatch = useDispatch();

      const { histories, loading, error } = useSelector((state) => state.libraryHistory);
    
      const auth = useSelector((state) => state.auth);
    
      const { userInfo } = auth;
    
      
  useEffect(() => {
    if (userInfo) {
      dispatch(listHistories());
    } else {
      console.error("User is not authenticated");
    }
  }, [dispatch, userInfo]);

  return (
    
    <div className="max-w-4xl mx-4 p-5">
      <h2 className="text-2xl font-bold text-center mb-6">Library History</h2>
      <table className="w-full max-w-screen bg-gray-50 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-indigo-950 text-white text-left">
            <th className="py-4 px-5">Book ID</th>
            <th className="py-4 px-5">Book Name</th>
            <th className="py-4 px-5">Borrowed By</th>
            <th className="py-4 px-5">Student ID</th>
            <th className="py-4 px-5">Standard</th>
            <th className="py-4 px-5">Borrowed Date</th>
            <th className="py-4 px-5">Return Date</th>
            <th className="py-4 px-5">Status</th>
            <th className="py-4 px-5">Availabe Count</th>
            <th className="py-4 px-5">Total Count</th>
            <th className="py-4 px-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((history) => (
            <tr key={history._id}>
              <td className="py-2 px-4">{history.bookId}</td>
              <td className="py-2 px-4">{history.bookName}</td>
              <td className="py-2 px-4">{history.borrowedStudent}</td>
              <td className="py-2 px-4">{history.studentID}</td>
              <td className="py-2 px-4">{history.standard}<sup>th</sup></td>
              <td className="py-2 px-4">{history.borrowedDate}</td>
              <td className="py-2 px-4">{history.returnDate}</td>
              <td className="py-2 px-4">{history.status}</td>
              <td className="py-2 px-4">{history.availableCount}</td>
              <td className="py-2 px-4">{history.totalCount}</td>
              <td className="py-2 px-4 flex space-x-6">
                <button 
                className="text-indigo-950 hover:text-blue-700 mt-3 ml-2"
                // onClick={() => handleEditStudent(student)}
                >
                  <FaEdit />
                </button>
                <button 
                className="text-indigo-950 hover:text-red-700 mt-3 ml-2"
                // onClick={() => handleDeleteStudent(student)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HistoryList
