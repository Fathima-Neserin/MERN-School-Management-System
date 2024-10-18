import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFeeHistory, listFeesHistories } from '../../actions/fees.actions';
import AddFeesHistoryModal from './AddFeesHistoryModal';
import EditFeesHistoryModal from '../edit-form/EditFeesHistoryModal';
import DeleteModal from '../delete/DeleteModal';


const FeesHistoryList = () => {
  const dispatch = useDispatch();

  const { histories, loading, error } = useSelector((state) => state.feesHistory);

  const auth = useSelector((state) => state.auth);

  const { userInfo } = auth;

  const [isModalOpen, setModalOpen] = useState(false); 
  const [isEditFeeModalOpen, setEditFeeModalOpen] = useState(false);
  const [isDeleteFeeModalOpen, setDeleteFeeModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState({}); 
  const [historyToDelete, setHistoryToDelete] = useState(null);

  const handleAddNewFeesHistory = () => {
    setModalOpen(true); 
  };

  const closeModal = () => {
    setModalOpen(false); 
  };
  
  const handleEdiFeetHistory = (history) => {
    console.log("Edit Icon clicked", history);
    
    setSelectedHistory(history); 
    setEditFeeModalOpen(true); 
  };

  const closeEditFeeModal = () => {
    setEditFeeModalOpen(false); 
    setSelectedHistory(null); 
  };
  
  const handleDeleteFeeHistory = (history) => {
    setHistoryToDelete(history); 
    setDeleteFeeModalOpen(true); 
  };

  const handleDeleteConfirm = () => {
    if (historyToDelete) {
      dispatch(deleteFeeHistory(historyToDelete._id))
        .then(() => {
          setDeleteFeeModalOpen(false); 
          setHistoryToDelete(null); 
          dispatch(listFeesHistories());
        })
        .catch(error => console.error(error));
    }
  };

  const closeDeleteFeeModal = () => {
    setDeleteFeeModalOpen(false);
    setHistoryToDelete(null);
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(listFeesHistories());
    } else {
      console.error("User is not authenticated");
    }
  }, [dispatch, userInfo]);  return (
    <div className="max-w-4xl mx-4 p-5"> 
     <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-center">Fees History</h2>
    <button
      className="bg-indigo-950 text-white py-2 px-4 rounded hover:bg-indigo-50 hover:text-black flex items-center ml-auto"
      onClick={handleAddNewFeesHistory}
    >
      <FaPlus className="mr-2" /> New History
    </button>
  </div>
      <table className="w-full max-w-screen bg-gray-50 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-indigo-950 text-white text-left">
            <th className="py-8 px-10">Fee Name</th>
            <th className="py-8 px-10">Amount</th>
            <th className="py-8 px-10">Student Name</th>
            <th className="py-8 px-10">Student ID</th>
            <th className="py-8 px-10">Section</th>
            <th className="py-8 px-10">Paid Date</th>
            <th className="py-8 px-10">Actions</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((history) => (
            <tr key={history._id}>
              <td className="py-6 px-8">{history.feeName}</td>
              <td className="py-6 px-8">{history.amount}</td>
              <td className="py-6 px-8">{history.studentName}</td>
              <td className="py-6 px-8">{history.studentID}</td>
              <td className="py-6 px-8">{history.section}</td>
              <td className="py-6 px-8">{history.paidDate}</td>
              <td className="py-6 px-8 flex space-x-6">
                <button 
                className="text-indigo-950 hover:text-blue-700 mt-3 ml-2"
                onClick={() => handleEdiFeetHistory(history)}
                >
                  <FaEdit />
                </button>
                <button 
                className="text-indigo-950 hover:text-red-700 mt-3 ml-2"
                onClick={() => handleDeleteFeeHistory(history)}  
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddFeesHistoryModal isOpen={isModalOpen} onClose={closeModal} /> 
      <EditFeesHistoryModal 
        isOpen={isEditFeeModalOpen} 
        onClose={closeEditFeeModal} 
        historyData={selectedHistory} 
      />
      <DeleteModal 
        isOpen={isDeleteFeeModalOpen} 
        onClose={closeDeleteFeeModal} 
        onConfirm={handleDeleteConfirm} 
        toBeDeleted="fee history"
      />
    </div>
  )
}

export default FeesHistoryList
