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
import FeesHistory from "./pages/side-menu/FeesHistory";
import PrivateRoute from "./components/protect/PrivateRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer  autoClose={3000} newestOnTop={true} pauseOnHover theme="colored"/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/admin/dashboard" element={<PrivateRoute Component={AdminDashBoard} />}/>
        <Route path="/staffs" element={<PrivateRoute Component={Staffs}/>}/>
        <Route path="/fees/history" element={<PrivateRoute Component={FeesHistory}/>}/>
        <Route path="/librarians" element={<PrivateRoute Component={Librarians}/>}/>
        <Route path="/library/history" element={<PrivateRoute Component={LibraryHistory}/>}/>
        <Route path="/students" element={<PrivateRoute Component={Students}/>}/>
        <Route path="/staff" element={<PrivateRoute Component={StaffDashboard}/>}/>
        <Route path="/librarian" element={<PrivateRoute Component={LibrarianDashboard}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
