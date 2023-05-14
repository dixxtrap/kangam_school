import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Books from "./books";
import Courses from "./Courses";
import Error from "./error";
import Competence from "./competences";
import Note from "./note";
import Instructor from "./instructor";
import Profil from "./profil";
import BecomeTutor from "./becomeTutor";
import BecomeInstructor from "./becomeInstructor";
import "./client.css";
function Client() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="books" element={<Books />} />
      <Route path="courses/*" element={<Courses />} />
      <Route path="competences" element={<Competence />} />
      <Route path="notes" element={<Note />} />
      <Route path="instructor" element={<Instructor />} />
      <Route path="profil" element={<Profil />} />
      <Route path="BecomeTutor" element={<BecomeTutor />} />
      <Route path="BecomeInstructor" element={<BecomeInstructor />} />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default Client;
