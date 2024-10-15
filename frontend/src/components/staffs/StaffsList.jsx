import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { listStaffs } from '../../actions/user.actions';
import Loading from "../../components/Loading/Loading";
import DataListTable from '../data-list/DataListTable'; 
import EditUserModal from '../edit-form/EditUserModal';

const StaffsList = () => {
  const dispatch = useDispatch();

  const { staffs, loading, error } = useSelector((state) => state.userList);

  const auth = useSelector((state) => state.auth);

  const { userInfo } = auth;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(() => {
    if (userInfo) {
      dispatch(listStaffs());
    } else {
      console.error("User is not authenticated");
    }
  }, [dispatch, userInfo]);

  const handleEditUser = (id) => {
    const userToEdit = staffs.find((staff) => staff._id === id);
    setSelectedUser(userToEdit); // Set the selected user data
    setIsModalOpen(true); // Open the modal
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); // Clear selected user when closing the modal
  };

  const handleDelete = (id) => {
    console.log(`Delete staff with ID: ${id}`);
  };

  if (loading) return <Loading />;
  if (error) return <div className='text-red-600 border-spacing-9'>Error: {error}</div>;

  return (
    <>
    <DataListTable 
      heading="Staffs" 
      data={staffs} 
      onEdit={handleEditUser} 
      onDelete={handleDelete} 
    />
     {/* Modal for editing user */}
     {isModalOpen && (
      <EditUserModal 
        user={selectedUser} 
        isOpen={isModalOpen} 
        onClose={closeModal}
      />
    )}
    </>
  );
};

export default StaffsList;
