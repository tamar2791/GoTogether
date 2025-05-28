import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthPage from "./AuthPage";
import Dashboard from "./manager/Dashboard";
import DriverMain from "./driver/DriverMain";
import ParentDashboard from "./parent/ParentDashboard";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/driver" element={<DriverMain />} />
      <Route path="/parent" element={<ParentDashboard />} />
    </Routes>
  );
};

export default Routing;
