import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteExistingUserAction, listStaffs } from '../../actions/user.actions';
import Loading from "../../components/Loading/Loading";
import DataListTable from '../data-list/DataListTable'; 
import EditUserModal from '../edit-form/EditUserModal';
import DeleteModal from '../delete/DeleteModal';
import { toast } from 'react-toastify';


const StaffsList = () => {
  const dispatch = useDispatch();

  const { staffs, loading, error } = useSelector((state) => state.userList);

  const auth = useSelector((state) => state.auth);

  const { userInfo } = auth;

  const userDelete = useSelector((state) => state.userDelete);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    if (userInfo) {
      dispatch(listStaffs());
    } else {
      console.error("User is not authenticated");
    }
  }, [dispatch, userInfo]);


  const handleEditUser = (id) => {
    try {
      const userToEdit = staffs.find((staff) => staff._id === id);
      setSelectedUser(userToEdit); // Set the selected user data
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  // Handle modal close
  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); // Clear selected user when closing the modal
  };

  const handleUserUpdateSuccess = () => {
    toast.success("User updated successfully!"); // Show toast here
    setTimeout(() => {
      dispatch(listStaffs()); // Refresh staff list after update
    }, 1000);
  };

  const handleDeleteUser = (id) => {
    console.log(`Delete staff with ID: ${id}`);
    setDeleteUserId(id); 
    setIsDeleteModalOpen(true); 

  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteUserId(null);
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
  

  if (loading) return <Loading />;
  if (error) return <div className='text-red-600 border-spacing-9'>Error: {error}</div>;

  return (
    <>
    <DataListTable 
        heading="Staffs" 
        data={staffs} 
        onEdit={handleEditUser} 
        onDelete={handleDeleteUser} 
        role={userInfo?.data?.role || []}  
      />
     {/* Modal for editing user */}
     {isModalOpen && (
      <EditUserModal 
        user={selectedUser} 
        isOpen={isModalOpen} 
        onClose={closeEditModal}
        onSuccess={handleUserUpdateSuccess} // Handle success with page reload
      />
    )}
     {/* Delete Confirmation Modal */}
     <DeleteModal 
        isOpen={isDeleteModalOpen} 
        onClose={closeDeleteModal} 
        onConfirm={confirmDelete} 
        toBeDeleted="staff"
      />
    </>
  );
};

export default StaffsList;
