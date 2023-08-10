import "./App.css";
import React, { useEffect } from "react";
import Login from "./components/Login";
// import Primary from './components/signupprimary';
import EnterEmail from "./components/enterEmail";
import { Routes, Route, Navigate } from "react-router-dom";
// import ForgotPass from './components/forgotPassword';
import { AuthProvider } from "./context/AuthContext";
import UserHome from "./components/User/UserHome";
import VerifyEmail from "./components/VerifyEmail";
import ResetPassword from "./components/forgotPassword";
import Primary from "./components/signupprimary";
import Landing from "./components/landing-page";
import ManageUsers from "./components/Admin/manageEndUsers";
import SectorScan from "./components/User/SectorScan";
import IpoDashboard from "./components/User/ipoDashboard";
import Compare from "./components/User/companyCompare"

function App() {

  const [companyData, setCompanyData] = React.useState({});

  useEffect(() => {
    setCompanyData({});
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/login" element={<Login />} />

          <Route path="/sign-up" element={<Primary />} />

          <Route path="/forgot-pass" element={<EnterEmail />} />

          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route path="/user-home" element={<UserHome companyData={companyData} setCompanyData={setCompanyData} />} />

          <Route path="/reset-pass" element={<ResetPassword />} />

          <Route path="/compare" element={<Compare companyData={companyData} setCompanyData={setCompanyData}/>} />
          
          <Route path="/manage-users" element={<ManageUsers />} />

          <Route path="/sector-scan" element={<SectorScan companyData={companyData} setCompanyData={setCompanyData} />} />
          
          <Route path="/ipo-dashboard" element={<IpoDashboard companyData={companyData} setCompanyData={setCompanyData} />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;