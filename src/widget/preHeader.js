import { Box } from "@mui/system";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Grid, Paper } from "@mui/material";
import sr, { lampAnim, textAccueilAnim } from "./Animation";
const PreHeader = ({ img, title, description, icon }) => {
  useEffect(() => {
    sr.reveal(".preheaderIcon", lampAnim);
    sr.reveal(".preheaderText", lampAnim);
  }, []);

  return (
    <Box p={1} id="preheader" overflow={"hidden"} width="100%">
      <Paper
        variant="outlined"
        sx={{
          position: "relative",
          borderRadius: "5px",
          borderColor: "#00000009",
          px: { xs: 1, sm: 5, md: 10, lg: 15 },
          width: "100%",
          py: { sx: 1, md: 1 },
          bgcolor: "var(--c-primary)",
          boxShadow: " rgba(255, 255, 255, 0.35) 1px 1px 15px 1px inset",
        }}
      >
        <Grid
          container
          flexDirection={{
            xs: "column-reverse",
            sm: "column-reverse",
            md: "row",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item sx={12} sm={9} md={8}>
            <Grid container direction="column" alignItems="flex-start">
              <Grid item style={{ textAlign: "left" }}>
                <Grid container className="preheaderText" direction={"column"}>
                  <Typography
                    variant="inherit"
                    fontWeight={"bold"}
                    color="whitesmoke"
                    fontFamily={"Poppins"}
                    fontSize={{
                      xs: "1.50rem",
                      sm: "1.6rem",
                      md: " 1.8rem",
                      lg: "3.0rem",
                    }}
                    lineHeight={{
                      xs: 1.1222222222222223,
                      md: 1.2222222222222223,
                    }}
                    sx={{
                      letterSpacing: 0,
                      wordSpacing: 8,
                      fontFamily: "Poppins",
                    }}
                  >
                    {/* Poursuivez vos Reve ou que vous soyez <br/> */}
                    {title}
                  </Typography>
                  <br />
                  <Typography
                    textAlign={"left"}
                    maxWidth={600}
                    fontSize={{
                      xs: "0rem",
                      sm: "1.45rem",
                      md: " 1.5rem",
                      lg: "1.7111rem",
                    }}
                    fontFamily={"popins"}
                    fontWeight={600}
                    color={"var(--c-text-dark)"}
                    justifyContent={"center"}
                    className="gradient-text"
                  >
                    {description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} sm={3} xs={11}>
            {icon ? (
              <Grid container justifyContent={{ xs: "left", sm: "center" }}>
                <Box
                  className="preheaderIcon"
                  sx={{
                    fontSize: { xs: 100, md: 250, lg: 300 },
                    height: { xs: 100, md: 250, lg: 300 },
                    width: { xs: 100, md: 250, lg: 300 },
                    color: "whitesmoke",
                    lineHeight: 1,
                    filter:
                      "drop-shadow(0 0 20px #3fefefA3) drop-shadow(0 0 30px #3fefef56)",
                  }}
                >
                  {icon}
                </Box>
              </Grid>
            ) : (
              <Box
                src={img}
                component={"img"}
                sx={{
                  maxWidth: 600,
                  maxHeight: { xs: 150, md: 200, lg: 300 },
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              ></Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
export default PreHeader;
