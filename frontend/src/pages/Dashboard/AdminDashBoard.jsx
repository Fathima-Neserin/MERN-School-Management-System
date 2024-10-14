import React, { useState } from 'react';
import SideBar from '../../components/sidebar/SideBar';
import Card from '../../components/card/Card';
import Header from '../../components/header/Header';
import { FaChildren } from "react-icons/fa6";
import { IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import Calendar from '../../components/calendar/Calendar';
import Select from "react-select";


const roleOptions = [
  { value: 'Staff', label: 'Staff' },
  { value: 'Librarian', label: 'Librarian' }
];

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
];

const AdminDashBoard = () => {
  // State for controlling modals
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showLibrarianModal, setShowLibrarianModal] = useState(false);

  return (
    <>
      <div className="flex flex-row min-h-screen">
        <SideBar />

        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-6 w-[50%] gap-10 flex flex-row">
            {/* Staffs Card */}
            <Card
              title={"Staffs"}
              count={20}
              Icon={IoPeopleOutline}
              onClick={() => setShowStaffModal(true)} // Show Staff modal on button click
            />

            {/* Librarian Card */}
            <Card
              title={"Librarian"}
              count={5}
              Icon={IoPersonOutline}
              onClick={() => setShowLibrarianModal(true)} // Show Librarian modal on button click
            />

            <Card
              title={"Students"}
              count={600}
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
                <form className="py-4">
                  {/* Form inputs go here */}
                  <input type="text" placeholder=" Name" className="input input-bordered w-full mb-2" />
                  <input type="text" placeholder=" Email" className="input input-bordered w-full mb-2" />
                  <input type="text" placeholder=" Phone Number" className="input input-bordered w-full mb-2" />
                  <input type="text" placeholder=" Username" className="input input-bordered w-full mb-2" />
                  <input type="text" placeholder=" Password" className="input input-bordered w-full mb-2" />
                  <Select
                    options={roleOptions}
                    placeholder="Select Role"
                    className="input w-full p-[1px] h-[42px]" 
                  />
                    <Select
                    options={genderOptions}
                    placeholder="Select Gender"
                    className="input w-full p-[1px] h-[42px]" 
                  />
                </form>
                <div className="modal-action">
                  <button 
                  className="btn bg-indigo-950 text-white hover:bg-indigo-50 hover:text-black" 
                  onClick={() => setShowStaffModal(false)}>
                    Add
                    </button>
                </div>
              </div>
            </dialog>
          )}

          {/* Librarian Modal */}
          {showLibrarianModal && (
            <dialog id="librarian_modal" className="modal" open>
              <div className="modal-box">
                <h3 className="font-bold text-lg">Add New Librarian</h3>
                <form className="py-4">
                  <input type="text" placeholder=" Name" className="input input-bordered w-full mb-2" />
                  <input type="text" placeholder=" Email" className="input input-bordered w-full mb-2" />
                  <input type="text" placeholder=" Phone Number" className="input input-bordered w-full mb-2" />
                  <input type="text" placeholder=" Username" className="input input-bordered w-full mb-2" />
                  <input type="text" placeholder=" Password" className="input input-bordered w-full mb-2" />
                  <Select
                    options={roleOptions}
                    placeholder="Select Role"
                    className="input w-full p-[1px] h-[42px]" 
                  />
                    <Select
                    options={genderOptions}
                    placeholder="Select Gender"
                    className="input w-full p-[1px] h-[42px]" 
                  />
                  
                </form>
                <div className="modal-action">
                  <button  
                  className="btn bg-indigo-950 text-white hover:bg-indigo-50 hover:text-black" 
                  onClick={() => setShowLibrarianModal(false)}>
                    Add
                    </button>
                </div>
              </div>
            </dialog>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
