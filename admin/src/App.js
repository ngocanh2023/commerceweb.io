import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/admin/admin";
import Update from "./components/update/update"
import ChatApp from "./components/chatApp/chatApp"
import Login from "./components/Login/login"
import Dashboard from "./components/dashboard/dashboard"
import AddNew from "./components/addNew/addNew"

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/chatApp" element={<ChatApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addnew" element={<AddNew/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
