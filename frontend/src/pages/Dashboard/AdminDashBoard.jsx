import React from 'react';
import SideBar from '../../components/sidebar/SideBar';
import Card from '../../components/card/Card';
import Header from '../../components/header/Header';
import { FaChildren } from "react-icons/fa6";
import { IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import Calendar from '../../components/calendar/Calendar';

const AdminDashBoard = () => {
  return (
    <>
    <div className="flex flex-row min-h-screen">
      <SideBar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 w-[50%] gap-10 flex flex-row"> 
          <Card  title={"Students"} count={600} Icon={FaChildren}/>
          <Card  title={"Staffs"} count={20} Icon={IoPeopleOutline}/>
          <Card  title={"Librarian"} count={5} Icon={IoPersonOutline}/>

        </div>
        <div className="min-h-screen flex items-center justify-center m-4">
      <Calendar />
    </div>
      </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
