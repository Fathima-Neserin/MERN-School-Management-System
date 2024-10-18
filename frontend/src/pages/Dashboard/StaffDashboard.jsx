import React from 'react'
import SideBar from '../../components/sidebar/SideBar'
import Header from '../../components/header/Header'

const StaffDashboard = () => {
  return (
    <div>
       <div className="flex flex-row min-h-screen">
        <SideBar/>
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-6 w-[50%] gap-10 flex flex-row"></div>
    </div>
 </div>
 </div>
  )
}

export default StaffDashboard