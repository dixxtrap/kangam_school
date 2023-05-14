import { Grid, Typography } from "@mui/material";
import React from "react";

function AddBook() {
  return (
    <Grid container direction={"column"} width="100%" alignItems={"start"}>
      <Typography variant="h1" color="initial">
        Add Book
      </Typography>
    </Grid>
  );
}

export default AddBook;
