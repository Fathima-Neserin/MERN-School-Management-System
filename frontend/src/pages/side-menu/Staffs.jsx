import React from 'react'
import SideBar from '../../components/sidebar/SideBar'
import Header from '../../components/header/Header'
import StaffsList from '../../components/staffs/StaffsList'

const Staffs = () => {
  return (
    <div>
       <div className="flex flex-row min-h-screen">
      <SideBar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 w-[50%] gap-10 flex flex-row"> 
          <StaffsList/>

        </div>
        
      </div>
      </div>
    </div>
  )
}

export default Staffs
