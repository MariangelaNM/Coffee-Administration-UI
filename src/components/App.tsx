import React from "react";
import Layout from "../layout/layout";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import Admin from "./routes/Admin";
import UserRegister from "./routes/UserRegister";


import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.scss'

function App() {
  return (
    <Router>
    <Layout>
      <Routes>
        <Route path="/" element={< UserRegister/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<UserRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </Layout>
  </Router>
  );
}



export default App;

 
