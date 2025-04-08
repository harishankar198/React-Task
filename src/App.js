import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import DoctorList from "./pages/DoctorList"





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/doctor" element={<DoctorList/>} />
      </Routes>
    </Router>
  );
};

export default App;





