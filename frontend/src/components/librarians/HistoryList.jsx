import React, { useEffect, useState } from 'react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { deleteLibraryHistory, listHistories } from '../../actions/library.actions';
import AddHistoryModal from './AddHistoryModal';
import EditLibraryHistoryModal from '../edit-form/EditLibraryHistoryModal';
import DeleteModal from "../delete/DeleteModal"

const HistoryList = () => {
    
      const dispatch = useDispatch();

      const { histories, loading, error } = useSelector((state) => state.libraryHistory);
    
      const auth = useSelector((state) => state.auth);
    
      const { userInfo } = auth;

      const [isModalOpen, setModalOpen] = useState(false); 
      const [isEditModalOpen, setEditModalOpen] = useState(false);
      const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
      const [selectedHistory, setSelectedHistory] = useState({}); 
      const [historyToDelete, setHistoryToDelete] = useState(null);
    
      useEffect(() => {
        if (userInfo) {
          dispatch(listHistories());
        } else {
          console.error("User is not authenticated");
        }
      }, [dispatch, userInfo]);

      const handleAddNewHistory = () => {
        setModalOpen(true); 
      };

      const closeModal = () => {
        setModalOpen(false); 
      };

      const handleEditHistory = (history) => {
        console.log("Edit Icon clicked", history);
        
        setSelectedHistory(history); 
        setEditModalOpen(true); 
      };

      const closeEditModal = () => {
        setEditModalOpen(false); 
        setSelectedHistory(null); 
      };

      const handleDeleteHistory = (history) => {
        setHistoryToDelete(history); 
        setDeleteModalOpen(true); 
      };

      const handleDeleteConfirm = () => {
        if (historyToDelete) {
          dispatch(deleteLibraryHistory(historyToDelete._id))
            .then(() => {
              setDeleteModalOpen(false); 
              setHistoryToDelete(null); 
              dispatch(listHistories());
            })
            .catch(error => console.error(error));
        }
      };

      const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setHistoryToDelete(null);
      };

      // Check if the user role is Admin or Librarian
      const canEditAndDelete = userInfo?.data?.role?.includes('Admin') || userInfo?.data?.role?.includes('Librarian');
      // Check if the user role is Admin or Librarian for adding new history
      const canAddHistory = userInfo?.data?.role?.includes('Admin') || userInfo?.data?.role?.includes('Librarian');

      return (
        <>
        <div className="max-w-4xl mx-4 p-5">  
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-center">Library History</h2>
            {canAddHistory && ( // Conditional rendering for "New History" button
              <button
                className="bg-indigo-950 text-white py-2 px-4 rounded hover:bg-indigo-50 hover:text-black flex items-center ml-auto"
                onClick={handleAddNewHistory}
              >
                <FaPlus className="mr-2" /> New History
              </button>
            )}
          </div>
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
                <th className="py-4 px-5">Available Count</th>
                <th className="py-4 px-5">Total Count</th>
                {canEditAndDelete && <th className="py-4 px-5">Actions</th>} {/* Conditional rendering */}
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
                  {canEditAndDelete && ( // Only render buttons if the user is Admin or Librarian
                    <td className="py-2 px-4 flex space-x-6">
                      <button 
                        className="text-indigo-950 hover:text-blue-700 mt-3 ml-2"
                        onClick={() => handleEditHistory(history)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="text-indigo-950 hover:text-red-700 mt-3 ml-2"
                        onClick={() => handleDeleteHistory(history)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <AddHistoryModal isOpen={isModalOpen} onClose={closeModal} /> 
          <EditLibraryHistoryModal 
            isOpen={isEditModalOpen} 
            onClose={closeEditModal} 
            historyData={selectedHistory} 
          />
          <DeleteModal 
            isOpen={isDeleteModalOpen} 
            onClose={closeDeleteModal} 
            onConfirm={handleDeleteConfirm} 
            toBeDeleted="library history"
          />
        </div>
        </>
      )
}

export default HistoryList;
