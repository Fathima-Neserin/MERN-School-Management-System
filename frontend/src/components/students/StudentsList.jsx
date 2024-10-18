import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, listStudents } from '../../actions/student.actions';
import EditStudentModal from '../edit-form/EditStudentModal';
import DeleteModal from "../delete/DeleteModal";
import { toast } from 'react-toastify';
import AddStudentModal from './AddStudentModal';


const StudentsList = () => {

  const dispatch = useDispatch();

  const { students, loading, error } = useSelector((state) => state.studentList);

  const auth = useSelector((state) => state.auth);

  const { userInfo } = auth;

  const [isAddModalOpen, setAddModalOpen] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (userInfo) {
      dispatch(listStudents());
    } else {
      console.error("User is not authenticated");
    }
  }, [dispatch, userInfo]);

  const handleAddNewStudent = () => {
    setAddModalOpen(true); 
  };

  const closeAddModal = () => {
    setAddModalOpen(false); 
  };
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleDeleteStudent = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setSelectedStudent(null); 
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedStudent(null);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      dispatch(deleteStudent(selectedStudent._id))
        .then(() => {
          
          toast.success('Student deleted successfully!', {
            onClose: () => {
              
              window.location.reload();
            },
          });

          setShowDeleteModal(false);
          setSelectedStudent(null);
        })
        .catch(error => {
          console.error("Failed to delete student", error);
          toast.error('Failed to delete student.');
        });
    }
  };

  const canAddStudent = userInfo?.data?.role?.includes('Admin') || userInfo?.data?.role?.includes('Staff');


  return (
    <div className="max-w-4xl mx-4 p-5">      
    <div className="flex justify-between items-center mb-6">  
    <h2 className="text-2xl font-bold text-center mb-6">Students</h2>
      {canAddStudent && (
      <button
      className="bg-indigo-950 text-white py-2 px-4 rounded hover:bg-indigo-50 hover:text-black flex items-center ml-auto mb-2"
      onClick={handleAddNewStudent}
    >
      <FaPlus className="mr-2" /> New Student
    </button>
    )}
    </div>
      <table className="w-full max-w-screen bg-gray-50 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-indigo-950 text-white text-left">
            <th className="py-6 px-8">ID</th>
            <th className="py-6 px-8">Name</th>
            <th className="py-6 px-8">Standard</th>
            <th className="py-6 px-8">Date Of Birth</th>
            <th className="py-6 px-8">Age</th>
            <th className="py-6 px-8">Place</th>
            <th className="py-6 px-8">Gender</th>
            <th className="py-6 px-8">Phone Number</th>
            <th className="py-6 px-8">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td className="py-3 px-4">{student.studentId}</td>
              <td className="py-3 px-4">{student.studentName}</td>
              <td className="py-3 px-4">{student.standard}<sup>th</sup></td>
              <td className="py-3 px-4">{student.dob}</td>
              <td className="py-3 px-4">{student.age}</td>
              <td className="py-3 px-4">{student.place}</td>
              <td className="py-3 px-4">{student.gender}</td>
              <td className="py-3 px-4">{student.contactNumber}</td>
              <td className="py-3 px-4 flex space-x-6">
                <button 
                className="text-indigo-950 hover:text-blue-700 mt-3 ml-2"
                onClick={() => handleEditStudent(student)}
                >
                  <FaEdit />
                </button>
                <button 
                className="text-indigo-950 hover:text-red-700 mt-3 ml-2"
                onClick={() => handleDeleteStudent(student)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditModal && (
        <EditStudentModal
          showModal={showEditModal}
          closeModal={closeModal}
          studentData={selectedStudent} // Pass the selected student data to the modal
        />
      )}
      
      <AddStudentModal showModal={isAddModalOpen} closeModal={closeAddModal} /> 

       <DeleteModal 
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        toBeDeleted="student"
      />
    </div>
  );
};

export default StudentsList;
