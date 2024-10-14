import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { listLibrarians } from '../../actions/user.actions';
import Loading from "../../components/Loading/Loading";
import DataListTable from '../data-list/DataListTable'; 

const LibrariansList = () => {
  const dispatch = useDispatch();

  const librarians = useSelector((state) => state.userList.librarians);
  const auth = useSelector((state) => state.auth);

  const { loading, users, error } = librarians || {};

  const { userInfo } = auth;

  useEffect(() => {
    if (userInfo) {
      dispatch(listLibrarians());
    } else {
      console.error("User is not authenticated");
    }
  }, [dispatch, userInfo]);
  
  const handleEdit = (id) => {
    console.log(`Edit librarian with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete librarian with ID: ${id}`);
  };

  if (loading) return <Loading />;
  if (error) return <div className='text-red-600 border-spacing-9'>Error: {error}</div>;

  return (
    <DataListTable 
      heading="Librarians" 
      data={librarians} 
      onEdit={handleEdit} 
      onDelete={handleDelete} 
    />
  );
};

export default LibrariansList;
