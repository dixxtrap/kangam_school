import React, { useEffect } from "react";
import {
  Hidden,
  Grid,
  IconButton,
  Avatar,
  Paper,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { IoAccessibilitySharp } from "react-icons/io5";
import pattern1 from "../assets/photo/pattern1.png";
import pattern3 from "../assets/photo/pattern3.png";
import sr, { lampAnim } from "./Animation";
const Motivation = ({ index, icon, title, description, bgcolor }) => {
  useEffect(() => {
    sr.reveal(".motivation");
    sr.reveal(".motivDescriptionLeft,.motivIconRight", {
      origin: "left",

      distance: "150%",

      opacity: null,
    });
    sr.reveal(".motivDescriptionRight,.motivIconLeft", {
      origin: "right",

      distance: "150%",

      opacity: null,
    });
  }, []);

  return (
    <Paper
      sx={{
        my: { xs: 2, sm: 4, md: 6 },
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
      }}
    >
      <Grid
        container
        borderRadius={"5px"}
        overflow="hidden"
        className="motivation"
        direction={{
          xs: "column",

          md: index % 2 == 1 ? "row-reverse" : "row",
        }}
        alignItems="stretch"
        justifyContent={{ sx: "center", md: "space-between" }}
      >
        <Grid item xs={12} sm={3} md={4} lg={5} xl={5}>
          <Grid
            container
            pb={"3px"}
            pt={"8px"}
            justifyContent="center"
            height={"100%"}
            sx={{ background: bgcolor }}
          >
            <Box
              className={index % 2 === 1 ? "motivIconLeft" : "motivIconRight"}
              sx={{
                fontSize: { xs: 100, md: 250, lg: 300 },
                color: "white",
                // "var(--c-text-dark)",
                lineHeight: 1,
                filter:
                  "drop-shadow(0 0 20px #3fefefA3) drop-shadow(0 0 30px #3fefef56)",
              }}
            >
              {icon}
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={9} md={8} lg={7} xl={6}>
          <Grid
            container
            textOverflow={"clip"}
            py={{ xs: 1, sm: 2, md: 3 }}
            mx={{ xs: 0 }}
          >
            <Typography
              fontFamily={"poppins"}
              sx={{
                fontSize: { xs: 20, sm: 20, md: 30, lg: 30 },

                width: "100%",
                fontWeight: "bold",
                pb: { xs: 1, sm: 1.5, md: 3 },
              }}
              textAlign={{ xs: "center" }}
              variant="inherit"
              color="var(--c-text)"
            >
              {title}
            </Typography>

            <Typography
              className={
                index % 2 === 1
                  ? "motivDescriptionLeft"
                  : "motivDescriptionRight"
              }
              textAlign={"center"}
              fontFamily="poppins"
              sx={{
                fontSize: { xs: 15, sm: 18, md: 20, lg: 22, xl: 25 },
                color: "black",
                width: "100%",
                px: { xs: 1 },
              }}
            >
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const CardAvatar = ({ title, description, icon, bgcolor, idx }) => {
  return (
    <Paper
      component={Box}
      display={"flex"}
      flexDirection="column"
      height="100%"
      width={"100%"}
      variant="outlined"
      sx={{
        borderRadius: "3px",
        width: "100%",
        bgcolor: "#00000008",
        my: 2,
        transition: "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
        // boxShadow:
        //   "0 8px 12px 1px rgba(29,17,51,.04),0 3px 16px 2px rgba(9,32,77,.12),0 5px 10px -3px rgba(29,17,51,.12)",

        // "rgba(50, 50, 93, 0.15) 0px 10px 30px -12px inset, rgba(0, 0, 0, 0.2) 0px 18px 36px -18px inset",
        "&:hover": {
          // boxShadow:
          //   "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.08) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        },
        "& img": {
          transition: "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
        },
        "&:hover img": {
          transform: "scale(1.1, 1.1)",
        },
        "&:hover::after": {
          opacity: 1,
        },
        px: 2,
        py: { xs: 1, sm: 1, md: 2 },
      }}
    >
      <Box
        component={"span"}
        py={1}
        px={3}
        sx={{
          alignSelf: "start",
          width: "min-content",
          float: "right",
          bgcolor: bgcolor,
          color: "white",
          lineHeight: 1,
          borderRadius: "3px",
          boxShadow:
            "0 8px 12px 1px rgba(29,17,51,.04),0 3px 16px 2px rgba(9,32,77,.12),0 5px 10px -3px rgba(29,17,51,.12)",
          filter:
            "drop-shadow(0 0 4px " +
            bgcolor +
            "50) drop-shadow(0 0 10px " +
            bgcolor +
            "50)",
          fontSize: { xs: 15, sm: 18, md: 20 },
        }}
        border="1px solid #00000034"
      >
        {icon}
      </Box>
      <Typography
        variant="inherit"
        fontFamily={"poppins"}
        sx={{
          mt: 2,
          fontSize: { xs: 15, sm: 18, md: 20, lg: 18 },
          fontWeight: "700",
          width: "100%",
        }}
        textAlign={"start"}
        color="var(--c-text)"
      >
        {title}
      </Typography>

      <Typography
        variant="inherit"
        textAlign={"start"}
        lineHeight={1.3}
        fontFamily="poppins"
        sx={{
          my: 2,
          fontSize: { xs: 13, sm: 15, md: 18, lg: 16 },
          width: "100%",
        }}
        color="var(--c-text)"
      >
        {description}
      </Typography>
    </Paper>
  );
};
const DividerSections = ({ text }) => {
  return (
    <Grid item p={0} m={0} bgcolor={"var(--c-last)"} xs={12}>
      <Grid container>
        <Box
          component="img"
          sx={{
            height: { xs: 18, sm: 25, md: 30 },
            width: "100%",
            bgcolor: "var(--c-last)",
            p: 0,
            m: 0,
          }}
          src={pattern1}
        />
        {/* <Box
        sx={{ height: { xs: 18, sm: 25, md: 30 } }}
        className="skew-section-cc"
      /> */}

        <Typography
          sx={{
            fontSize: { xs: 22, md: 30, lg: 35 },
            fontWeight: "bold",
            bgcolor: "transparent",
            width: "100%",
          }}
          color="white"
          textAlign={"center"}
        >
          {text}
        </Typography>

        <Box
          component="img"
          maxHeight={{ xs: 18, sm: 25, md: 30 }}
          sx={{
            width: "100%",
            bgcolor: "var(--c-last)",
          }}
          src={pattern3}
        />
      </Grid>

      {/* TODO:Contenue */}
    </Grid>
  );
};
const Instruction = (props) => {
  return (
    <Box style={{ background: "transparent" }}>
      <Grid
        container
        justifyContent="space-between"
        px={{ sm: 10 }}
        sx={{ padding: "0px 0px" }}
        direction={props.reverse ? "row-reverse" : ""}
        alignItems="center"
      >
        <Grid item md={5}>
          <Paper
            elevation={10}
            sx={{
              height: { sm: 400 },
              alignSelf: "self-end",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <img src={props.src} style={{ height: "100%", width: "100%" }} />
          </Paper>
        </Grid>
        <Grid item md={7}>
          <Grid
            container
            direction="column"
            pl={3}
            rowSpacing={{ md: 3 }}
            justifyContent="flex-start"
          >
            <Grid item>
              <Typography
                variant="h4"
                align="left"
                sx={{ fontSize: { sm: 35 }, fontWeight: "bold" }}
                color="var(--c-text)"
              >
                {props.title}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={2} direction="column">
                {props.steps.map((val) => (
                  <Grid item>
                    <Typography
                      variant="body1"
                      fontSize={{ xs: 14, sm: 15, md: 18, lg: 20 }}
                      color="var(--c-text)"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexWrap: "nowrap",
                      }}
                      alignItems="center"
                      justifyItems="center"
                    >
                      {val}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const AdviceCard = (props) => {
  const Icon = props.icon;
  return (
    <Paper
      p={{ sm: 1, md: 4 }}
      variant="outlined"
      sx={{
        width: "100%",
        minHeight: 100,
        minWidth: { xs: 300 },
        maxWidth: { xs: 350, sm: 340, md: 350 },
        mt:
          props.index / 2 > 1
            ? props.index % 2 !== 1
              ? { xs: 0, md: 0, lg: -4 }
              : { xs: 0, md: 0, lg: 4 }
            : props.index % 2 !== 1
            ? { xs: 0, md: 0, lg: 4 }
            : { xs: 0, md: 0, lg: -4 },
        transition: "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
        boxShadow:
          "rgba(50, 50, 93, 0.15) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.2) 0px 18px 36px -18px inset",
        "&:hover": {
          boxShadow:
            "rgba(255, 255, 255, 0.25) 0px 24px 20px, rgba(255, 255, 255, 0.08) 0px -12px 30px, rgba(255, 255, 255, 0.12) 0px 4px 6px, rgba(255, 255, 255, 0.17) 0px 12px 13px, rgba(255, 255, 255, 0.09) 0px -3px 5px",
          transform: "scale(1.05, 1.05)",
        },
        "&:hover::after": {
          opacity: 1,
        },
      }}
    >
      <Grid
        container
        alignItems={"center"}
        height={"100%"}
        justifyContent={"space-around"}
        py={2}
      >
        <Grid item xs={3} sm={3} md={3}>
          <Grid
            container
            sx={{
              fontSize: { xs: 30, sm: 30, md: 30 },
              color: "black",
              lineHeight: 1,
            }}
            justifyContent="center"
          >
            <Icon />
          </Grid>
        </Grid>
        <Grid item xs={9} md={9} sm={9}>
          <Grid container textAlign={{ xs: "center", md: "left" }}>
            <Typography
              variant="caption"
              pb={{ xs: "4px" }}
              width={"100%"}
              color="var(--c-text)"
              fontWeight={"bold"}
              fontFamily={"poppins"}
              fontSize={{ xs: 12, sm: 13, md: 14, lg: 15 }}
            >
              {props.title}
            </Typography>
            <Typography
              variant="subtitle1"
              fontFamily={"poppins"}
              width={"100%"}
              lineHeight={1.3}
              fontSize={{ xs: 12, sm: 12, md: 13, lg: 15 }}
              color="var(--c-text)"
            >
              {props.description}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export { AdviceCard, Instruction, CardAvatar, DividerSections, Motivation };
