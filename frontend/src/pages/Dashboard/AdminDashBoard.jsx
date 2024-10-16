import React, { useEffect, useState } from 'react';
import SideBar from '../../components/sidebar/SideBar';
import Card from '../../components/card/Card';
import Header from '../../components/header/Header';
import { FaChildren } from "react-icons/fa6";
import { IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import Calendar from '../../components/calendar/Calendar';
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import { countLibrarianUsers, countStaffUsers, createNewUserAction } from '../../actions/user.actions';
import { countStudents } from '../../actions/student.actions';

const roleOptions = [
  { value: 'Staff', label: 'Staff' },
  { value: 'Librarian', label: 'Librarian' }
];

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
];

const AdminDashBoard = () => {
  const dispatch = useDispatch();
  
  const userCreate = useSelector((state) => state.userCreate);
  const { loading, error, user } = userCreate;

   // Get the staff and librarian counts from Redux store
   const { staffs, librarians, loading: countLoading, error: countError } = useSelector((state) => state.userCount);

   const { students } = useSelector((state) => state.studentCount)

   useEffect(() => {
     // Dispatch the actions when the component mounts
     dispatch(countStaffUsers());
     dispatch(countLibrarianUsers());
     dispatch(countStudents());
   }, [dispatch]);;


  const [formdata, setData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    gender: '',
    role: ''
  });

  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showLibrarianModal, setShowLibrarianModal] = useState(false);

  const handleInputChange = (e) => {
    const name = e.target ? e.target.name : e.name;
    const value = e.target ? e.target.value : e.value;
  
    setData({
      ...formdata,
      [name]: value,
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    
    dispatch(createNewUserAction(formdata)); 
    setShowStaffModal(false);
    setShowLibrarianModal(false);
  };

  return (
    <>
      <div className="flex flex-row min-h-screen">
        <SideBar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-6 w-[50%] gap-10 flex flex-row">
            <Card
              title={"Staffs"}
              count={countLoading ? "Loading..." : staffs}
              Icon={IoPeopleOutline}
              onClick={() => setShowStaffModal(true)} // Show Staff modal on button click
            />
            <Card
              title={"Librarians"}
              count={countLoading ? "Loading..." : librarians} 
              Icon={IoPersonOutline}
              onClick={() => setShowLibrarianModal(true)} // Show Librarian modal on button click
            />
            <Card
              title={"Students"}
              count={countLoading ? "Loading..." : students}
              Icon={FaChildren}
            />
          </div>

          <div className="min-h-screen flex items-center justify-center m-4">
            <Calendar />
          </div>

          {/* Staff Modal */}
          {showStaffModal && (
            <dialog id="staff_modal" className="modal" open>
              <div className="modal-box">
                <h3 className="font-bold text-lg">Add New Staff</h3>
                <form className="py-4" onSubmit={handleCreateUser}>
                  <input 
                    required
                    type="text" 
                    placeholder=" Name" 
                    className="input input-bordered w-full mb-2" 
                    onChange={handleInputChange}
                    name='name'
                    value={formdata.name}
                  />
                  <input 
                    required
                    type="email" 
                    placeholder=" Email" 
                    className="input input-bordered w-full mb-2" 
                    onChange={handleInputChange}
                    name='email'
                    value={formdata.email}
                  />
                  <input 
                    required
                    type="text" 
                    placeholder="Phone Number" 
                    className="input input-bordered w-full mb-2" 
                    onChange={handleInputChange}
                    name='phoneNumber'
                    value={formdata.phoneNumber}
                  />
                  <input 
                    required
                    type="text" 
                    placeholder=" Username" 
                    className="input input-bordered w-full mb-2" 
                    onChange={handleInputChange}
                    name='username'
                    value={formdata.username}
                  />
                  <input 
                    required
                    type="password" 
                    placeholder=" Password" 
                    className="input input-bordered w-full mb-2" 
                    onChange={handleInputChange}
                    name='password'
                    value={formdata.password}
                  />
                  <Select
                    required
                    options={roleOptions}
                    placeholder="Select Role"
                    className="input w-full p-[1px] h-[42px]" 
                    onChange={(selectedOption) => handleInputChange({ name: 'role', value: selectedOption.value })}
                    value={roleOptions.find(option => option.value === formdata.role)}
                  />
                  <Select
                    required
                    options={genderOptions}
                    placeholder="Select Gender"
                    className="input w-full p-[1px] h-[42px]" 
                    onChange={(selectedOption) => handleInputChange({ name: 'gender', value: selectedOption.value })}
                    value={genderOptions.find(option => option.value === formdata.gender)}
                  />
                  <div className="modal-action">
                    <button 
                      type='submit'
                      className="btn bg-indigo-950 text-white hover:bg-indigo-50 hover:text-black">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          )}

          {/* Librarian Modal */}
          {showLibrarianModal && (
            <dialog id="librarian_modal" className="modal" open>
              <div className="modal-box">
                <h3 className="font-bold text-lg">Add New Librarian</h3>
                <form className="py-4" onSubmit={handleCreateUser}>
                  <input 
                    required
                    type="text" 
                    placeholder=" Name" 
                    className="input input-bordered w-full mb-2" 
                    onChange={handleInputChange}
                    name='name'
                    value={formdata.name}
                  />
                  <input 
                    required
                    type="email" 
                    placeholder=" Email" 
                    className="input input-bordered w-full mb-2" 
                    onChange={handleInputChange}
                    name='email'
                    value={formdata.email}
                  />
                  <input 
                    required
                    type="text" 
                    placeholder=" Phone Number" 
                    className="input input-bordered w-full mb-2" 
                    onChange={handleInputChange}
                    name='phoneNumber'
                    value={formdata.phoneNumber}
                  />
                  <input 
                    required
                    type="text" 
                    placeholder=" Username" 
                    className="input input-bordered w-full mb-2" 
                    onChange={handleInputChange}
                    name='username'
                    value={formdata.username}
                  />
                  <input 
                    required
                    type="password" 
                    placeholder="Password" 
                    className="input input-bordered w-full mb-2" 
                    onChange={handleInputChange}
                    name='password'
                    value={formdata.password}
                  />
                  <Select
                    required
                    options={roleOptions}
                    placeholder="Select Role"
                    className="input w-full p-[1px] h-[42px]" 
                    onChange={(selectedOption) => handleInputChange({ name: 'role', value: selectedOption.value })}
                    value={roleOptions.find(option => option.value === formdata.role)}
                  />
                  <Select
                    required
                    options={genderOptions}
                    placeholder="Select Gender"
                    className="input w-full p-[1px] h-[42px]" 
                    onChange={(selectedOption) => handleInputChange({ name: 'gender', value: selectedOption.value })}
                    value={genderOptions.find(option => option.value === formdata.gender)}
                  />
                  <div className="modal-action">
                    <button  
                      type='submit'
                      className="btn bg-indigo-950 text-white hover:bg-indigo-50 hover:text-black">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
