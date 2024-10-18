import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteExistingUserAction, listLibrarians } from '../../actions/user.actions';
import Loading from "../../components/Loading/Loading";
import DataListTable from '../data-list/DataListTable'; 
import EditUserModal from '../edit-form/EditUserModal';
import { toast } from 'react-toastify';
import DeleteModal from '../delete/DeleteModal';

const LibrariansList = () => {
  const dispatch = useDispatch();

  const librarians = useSelector((state) => state.userList.librarians);
  const auth = useSelector((state) => state.auth);

  const { loading, users, error } = librarians || {};

  const { userInfo } = auth;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);



  useEffect(() => {
    if (userInfo) {
      dispatch(listLibrarians());
    } else {
      console.error("User is not authenticated");
    }
  }, [dispatch, userInfo]);
  
  
  const handleEditUser = (id) => {
    const userToEdit = librarians.find((librarian) => librarian._id === id);
    setSelectedUser(userToEdit); // Set the selected user data
    setIsModalOpen(true); // Open the modal
  };

  const handleUserUpdateSuccess = () => {
    toast.success("User updated successfully!"); // Show toast here
    setTimeout(() => {
      dispatch(listLibrarians()); // Refresh staff list after update
    }, 1000);
  };

  const handleDeleteUser = (id) => {
    console.log(`Delete staff with ID: ${id}`);
    setDeleteUserId(id); 
    setIsDeleteModalOpen(true); 

  };

    // Handle modal close
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedUser(null); // Clear selected user when closing the modal
    };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteExistingUserAction(deleteUserId));
      closeDeleteModal(); // Close the delete modal
      
      setTimeout(() => {
        window.location.reload(); // Reload the page after the toast
      }, 1000); 
    } catch (error) {
      console.error("Error deleting the user:", error);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteUserId(null);
  };
  if (loading) return <Loading />;
  if (error) return <div className='text-red-600 border-spacing-9'>Error: {error}</div>;

  return (
    <>
    <DataListTable 
      heading="Librarians" 
      data={librarians} 
      onEdit={handleEditUser} 
      onDelete={handleDeleteUser} 
      role={userInfo?.data?.role || []}  

    />
     {/* Modal for editing user */}
     {isModalOpen && (
      <EditUserModal 
        user={selectedUser} 
        isOpen={isModalOpen} 
        onClose={closeModal}
        onSuccess={handleUserUpdateSuccess} // Handle success with page reload
      />
    )}
      {/* Delete Confirmation Modal */}
      <DeleteModal 
        isOpen={isDeleteModalOpen} 
        onClose={closeDeleteModal} 
        onConfirm={confirmDelete} 
        toBeDeleted="librarian"
        />
    </>
  );
};

export default LibrariansList;
