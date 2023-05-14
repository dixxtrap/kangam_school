import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home";
import Book from "./Book";
import Formation from "./Formation";
import { AppContext } from "../../app/App";
function Instructor() {
  const [cU, setCU] = useContext(AppContext).currentUser;

  return cU?.status === "instructor" ? (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="book/*" element={<Book />} />
      <Route path="courses/*" element={<Formation />} />
    </Routes>
  ) : (
    <Navigate to="/" />
  );
}

export default Instructor;
