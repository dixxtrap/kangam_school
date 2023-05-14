import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { headerHeight } from "./header";
export default function LoadingPage() {
  return (
    <Box
      position={"fixed"}
      zIndex={1000}
      // top={{ ...headerHeight }}
      top={0}
      left={0}
      bottom={0}
      bgcolor={"rgba(0,0,0,0.2)"}
      width="100%"
    >
      <LinearProgress
        color="warning"
        sx={{
          borderRadius: 1,
          height: "3px",
          color: "var(--c-last)",
          borderColor: "red",
        }}
        variant="indeterminate"
      />
      <center>
        <Grid
          container
          mt={{ xs: 10, md: 30 }}
          color={"var(--c-last)"}
          justifyContent={"center"}
        >
          <CircularProgress color="inherit" thickness={8} size={50} />
        </Grid>
      </center>
    </Box>
  );
}
