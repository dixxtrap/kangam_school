import React from "react";
import { Routes, Route } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import AddBook from "../Book/AddBook";
const Home = () => {
  return (
    <Grid container direction={"column"} width="100%" alignItems={"start"}>
      <Typography variant="h1" color="initial">
        Book Proffesseur
      </Typography>
    </Grid>
  );
};
function Book() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="addBook" element={<AddBook />} />
      <Route path="editBook" element={<AddBook />} />
      <Route path="deleteBook" element={<AddBook />} />
    </Routes>
  );
}

export default Book;
