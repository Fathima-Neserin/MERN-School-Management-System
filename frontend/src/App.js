import { BrowserRouter , Route, Routes } from "react-router-dom";
import AdminDashBoard from "./pages/Dashboard/AdminDashBoard";
import StaffDashboard from "./pages/Dashboard/StaffDashboard";
import LibrarianDashboard from "./pages/Dashboard/LibrarianDashboard";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import Staffs from "./pages/side-menu/Staffs";
import Librarians from "./pages/side-menu/Librarians";
import Students from "./pages/side-menu/Students";
import LibraryHistory from "./pages/side-menu/LibraryHistory";

function App() {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer  autoClose={3000} newestOnTop={true} pauseOnHover theme="colored"/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/admin/dashboard" element={<AdminDashBoard/>}/>
        <Route path="/admin/staffs" element={<Staffs/>}/>
        <Route path="/admin/librarians" element={<Librarians/>}/>
        <Route path="/admin/library/history" element={<LibraryHistory/>}/>
        <Route path="/admin/students" element={<Students/>}/>
        <Route path="/staff" element={<StaffDashboard/>}/>
        <Route path="/librarian" element={<LibrarianDashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
