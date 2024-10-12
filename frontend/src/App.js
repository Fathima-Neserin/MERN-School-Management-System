import { BrowserRouter , Route, Routes } from "react-router-dom";
import AdminDashBoard from "./pages/Dashboard/AdminDashBoard";
import StaffDashboard from "./pages/Dashboard/StaffDashboard";
import LibrarianDashboard from "./pages/Dashboard/LibrarianDashboard";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer theme="colored"/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/admin" element={<AdminDashBoard/>}/>
        <Route path="/staff" element={<StaffDashboard/>}/>
        <Route path="/librarian" element={<LibrarianDashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
