import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { addNewStudentAction } from '../../actions/student.actions';


const genderOptions = [
  { value: 'Boy', label: 'Boy' },
  { value: 'Girl', label: 'Girl' }
];

const stdOptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },
  ];

const AddStudentModal = ({ showModal, closeModal }) => {
  const [formdata, setData] = useState({
    studentId: '',
    studentName: '',
    standard:'',
    age: '',
    dob: '',
    contactNumber: '',
    place: '',
    gender: ''
  });

  const dispatch = useDispatch();

  const studentCreate = useSelector((state) => state.studentCreate)

  const handleInputChange = (e) => {
    const name = e.target ? e.target.name : e.name;
    const value = e.target ? e.target.value : e.value;

    setData({
      ...formdata,
      [name]: value,
    });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    
    dispatch(addNewStudentAction(formdata))
    closeModal()
    window.location.reload();
    
  };

  if (!showModal) return null; // Do not render the modal if it's not shown

  return (
    <dialog className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add New Student</h3>
        <form className="py-4" onSubmit={handleAddStudent}>
        <input 
            required
            type="number" 
            placeholder="Student ID" 
            className="input input-bordered w-full mb-2" 
            onChange={handleInputChange}
            name='studentId'
            value={formdata.studentId}
          />
          <input 
            required
            type="text" 
            placeholder="Name" 
            className="input input-bordered w-full mb-2" 
            onChange={handleInputChange}
            name='studentName'
            value={formdata.studentName}
          />
          <input 
            required
            type="number" 
            placeholder="Age" 
            className="input input-bordered w-full mb-2" 
            onChange={handleInputChange}
            name='age'
            value={formdata.age}
          />
          <input 
            required
            type="text" 
            placeholder="Contact Number" 
            className="input input-bordered w-full mb-2" 
            onChange={handleInputChange}
            name='contactNumber'
            value={formdata.contactNumber}
          />
          <input 
            required
            type="text" 
            placeholder="Place" 
            className="input input-bordered w-full mb-2" 
            onChange={handleInputChange}
            name='place'
            value={formdata.place}
          />
          <input 
            required
            type="date" 
            placeholder="Date of Birth" 
            className="input input-bordered w-full mb-2" 
            onChange={handleInputChange}
            name='dob'
            value={formdata.dob}
          />
          <Select
            required
            options={genderOptions}
            placeholder="Select Gender"
            className="input w-full p-[1px] h-[42px]" 
            onChange={(selectedOption) => handleInputChange({ name: 'gender', value: selectedOption.value })}
            value={genderOptions.find(option => option.value === formdata.gender)}
          />
          <Select
            required
            options={stdOptions}
            placeholder="Select Standard"
            className="input w-full p-[1px] h-[42px]" 
            onChange={(selectedOption) => handleInputChange({ name: 'standard', value: selectedOption.value })}
            value={stdOptions.find(option => option.value === formdata.standard)}
          />
          <div className="modal-action">
            <button 
              type='submit'
              className="btn bg-indigo-950 text-white hover:bg-indigo-50 hover:text-black">
              Add
            </button>
            <button 
              type='button'
              className="btn bg-gray-300 text-black hover:bg-gray-400"
              onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddStudentModal;
