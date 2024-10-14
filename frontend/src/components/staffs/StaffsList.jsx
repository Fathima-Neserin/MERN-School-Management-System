import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { listStaffs } from '../../actions/user.actions';
import Loading from "../../components/Loading/Loading";
import DataListTable from '../data-list/DataListTable'; 

const StaffsList = () => {
  const dispatch = useDispatch();

  const { staffs, loading, error } = useSelector((state) => state.userList);

  const auth = useSelector((state) => state.auth);


  const { userInfo } = auth;

  useEffect(() => {
    if (userInfo) {
      dispatch(listStaffs());
    } else {
      console.error("User is not authenticated");
    }
  }, [dispatch, userInfo]);

  // Handle edit and delete actions
  const handleEdit = (id) => {
    console.log(`Edit staff with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete staff with ID: ${id}`);
  };

  if (loading) return <Loading />;
  if (error) return <div className='text-red-600 border-spacing-9'>Error: {error}</div>;

  return (
    <DataListTable 
      heading="Staffs" 
      data={staffs} 
      onEdit={handleEdit} 
      onDelete={handleDelete} 
    />
  );
};

export default StaffsList;
