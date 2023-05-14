import * as React from "react";

import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { iconFontSize } from "./header";
import { primary } from "../data";
import soulign from "../assets/undraw/soulign.svg";
// const AntTabs = styled(Tabs)({
//   borderBottom: "1px solid " + primary[600],
//   "& .MuiTabs-indicator": {
//     backgroundColor: "#1890ff",
//   },
// });

// const AntTab = styled((props) => <Tab disableRipple {...props} />)(
//   ({ theme }) => ({
//     textTransform: "none",
//     minWidth: 0,
//     [theme.breakpoints.up("sm")]: {
//       minWidth: 0,
//     },
//     fontWeight: theme.typography.fontWeightRegular,
//     marginRight: theme.spacing(1),
//     color: "rgba(0, 0, 0, 0.85)",
//     fontFamily: [
//       "Poppins",
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:hover": {
//       color: "#40a9ff",
//       opacity: 1,
//     },
//     "&.Mui-selected": {
//       color: "#1890ff",
//       fontWeight: "bold",
//     },
//     "&.Mui-focusVisible": {
//       backgroundColor: "#d1eaff",
//     },
//   })
// );

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  color: primary[50],

  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "end",
    backgroundColor: "transparent",
    zIndex: 0,
    height: "42px",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    marginBottom: "10px",
    backgroundImage: `url(${soulign})`,

    backgroundSize: "120px 170%",
    backgroundRepeat: "no-repeat",
    borderRadius: 10,
    boxShadow: " 0 20px 25px #004C9913, 0 10px 10px #004C9913",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    zIndex: 1,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "white",
    "&.Mui-selected": {
      color: "#fff",
      fontWeight: "bold",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);
export default function CustomizedTabs({ value, setValue, list, handle }) {
  const handleChange = (event, newValue) => {
    handle(list[newValue]);
    setValue(newValue);

    console.log(list[newValue]);
  };

  return (
    <Box
      height={"100%"}
      sx={{ borderRadius: "0 0 5px 5px" }}
      display={"flex"}
      justifyContent={"center"}
    >
      <Box sx={{ display: "flex", justifyContent: "start", width: "100%" }}>
        <StyledTabs
          sx={{ maxHeight: "min-content", mt: 0 }}
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
          variant="scrollable"
          scrollButtons={true}
        >
          {list.map((item, index) => (
            <StyledTab
              onClick={() => {
                handle(list[index]);
              }}
              label={
                <Stack
                  display={"flex"}
                  justifyContent={"end"}
                  alignItems={"baseline"}
                  flexDirection={"row"}
                  flexWrap={"nowrap"}
                >
                  <Box mr="6px" fontSize={{ ...iconFontSize }}>
                    {item.icon}
                  </Box>
                  <Box>{item.label}</Box>
                </Stack>
              }
            />
          ))}
        </StyledTabs>
      </Box>
    </Box>
  );
}
