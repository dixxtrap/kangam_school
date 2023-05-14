import React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Box } from "@mui/material";
import ErrorImg from "../../assets/photo/error.png";
function Error() {
  return (
    <Grid container justifyContent={"center"} width={"100%"}>
      <Box component="img" src={ErrorImg} maxWidth={500} width={"90%"} />
    </Grid>
  );
}

export default Error;
