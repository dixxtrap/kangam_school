// import React, { useState } from "react";
// import { Grid, Divider, Box } from "@mui/material/";
// import Typography from "@mui/material/Typography";
// import PreHeader from "../../widget/preHeader";
// import imHeader from "../../assets/undraw/undraw_mathematics_-4-otb.svg";
// import { styled } from "@mui/material/styles";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Avatar from "@mui/material/Avatar";
// import { matterData, primary } from "../../data";

import React, { useState, useEffect } from "react";
// FIXME* Firebase Import
import { getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore/lite";
import { Routes, Route } from "react-router-dom";
import { Typography, Grid, Box, Select, Paper } from "@mui/material/";
import MenuItem from "@mui/material/MenuItem";
import PreHeader from "../../widget/preHeader";
import CardCourses, { LoadingCard } from "../Courses/CardCourses";
import ViewCourses from "../Courses/ViewCourses";
import imagePreHeaer from "../../assets/undraw/undraw_reading_time_re_phf7.svg";
import LoadingPage from "../../widget/loading";
import { CustomizedTabs } from "./books";
import { matterData, matterDataImg, levelData, choiceData } from "../../data";
import {
  BsBarChartSteps,
  BsDistributeVertical,
  BsFillDiagram3Fill,
  BsFillFilterSquareFill,
} from "react-icons/bs";
import { IoPodium, IoLibrary } from "react-icons/io5";
import CoursePlayist from "../Courses/coursePlayist";
const auth = getAuth();
const db = getFirestore();
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

// const StyledTabs = styled((props) => (
//   <Tabs
//     {...props}
//     TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
//   />
// ))({
//   color: primary[900],

//   "& .MuiTabs-indicator": {
//     display: "flex",
//     justifyContent: "center",
//     backgroundColor: "transparent",
//     zIndex: 0,
//     height: "40px",
//   },
//   "& .MuiTabs-indicatorSpan": {
//     width: "100%",
//     marginBottom: "10px",
//     backgroundColor: primary[500],
//     borderRadius: 10,
//     boxShadow: " 0 20px 25px #004C9913, 0 10px 10px #004C9913",
//   },
// });

// const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
//   ({ theme }) => ({
//     textTransform: "none",
//     zIndex: 1,
//     fontWeight: theme.typography.fontWeightRegular,
//     fontSize: theme.typography.pxToRem(15),
//     marginRight: theme.spacing(1),
//     color: "black",
//     "&.Mui-selected": {
//       color: "#fff",
//     },
//     "&.Mui-focusVisible": {
//       backgroundColor: "rgba(100, 95, 228, 0.32)",
//     },
//   })
// );

// export function CustomizedTabs({ value, setValue, list, img }) {
//   const handleChange = async (event, newValue) => {
//     await setValue(newValue);
//     console.log(list[newValue]);
//   };

//   return (
//     <Box
//       width={"98%"}
//       m={{ xs: 0, md: 1 }}
//       sx={{
//         bgcolor: "#f5f8fc",
//         border: " 1px solid rgba(0, 0, 0, 0.136)",
//         borderRadius: 1,
//       }}
//       display={"flex"}
//       justifyContent={"center"}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexGrow: 2,
//           justifyContent: "center",
//           maxHeight: 50,
//           width: { xs: 300, sm: 500, md: 700, lg: 1100 },
//         }}
//       >
//         <StyledTabs
//           value={value}
//           onChange={handleChange}
//           aria-label="styled tabs example"
//           variant="scrollable"
//           scrollButtons={true}
//         >
//           {img
//             ? list.map((item) => (
//                 <StyledTab
//                   label={
//                     <Box
//                       display={"flex"}
//                       alignItems={"center"}
//                       fontFamily={"poppins"}
//                     >
//                       <Box fontSize={20}>
//                         <Avatar src={img[item.toLowerCase()]} />
//                       </Box>
//                       {item}
//                     </Box>
//                   }
//                 />
//               ))
//             : list.map((item) => <StyledTab label={item} />)}
//         </StyledTabs>
//       </Box>
//     </Box>
//   );
// }
function Books() {
  const [data, setData] = useState(8);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState();
  const [{ filter, matterFilter, levelFilter, choiceFilter }, setFilter] =
    useState({
      filter: false,
      matterFilter: "Tout",
      levelFilter: "Tout",
      choiceFilter: "Tout",
    });
  const [matter, setMatter] = useState(0);
  const [level, setLevel] = useState(0);

  const getData = async () => {
    setLoading(true);

    try {
      const coursesRef = await collection(db, "Courses/");
      const coursesDoc = await getDocs(coursesRef);
      setData(coursesDoc.size - 1);

      const l = [];
      coursesDoc.forEach(async (courseDoc) => {
        const courseData = await courseDoc.data();
        console.log(courseData);
        await l.push({ ...courseData, id: courseDoc.id });
      });
      await setCourses(l);
      // const coursData = await (
      //   await getDoc(await doc(db, "AppData/courses"))
      // ).data();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);

      setError(err);
    }
  };
  useEffect(async () => {
    await getData();
  }, []);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setFilter((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <Grid container direction={"column"} width="100%" alignItems={"start"}>
      {/* {loading && <LoadingPage />} */}
      <PreHeader
        img={imagePreHeaer}
        icon={<IoLibrary />}
        title={" Decouvrez nos formations"}
        description={`${auth.currentUser?.displayName} Apprenez un métier d’avenir, grâce à KangamSchool, l’école nouvelle génération 100% en ligne.`}
      />
      {/* <CustomizedTabs value={level} setValue={setLevel} list={levelData} />
  <CustomizedTabs
    value={matter}
    setValue={setMatter}
    list={matterData}
    img={matterDataImg}
  /> */}
      <Grid container py={2} px={{ xs: 0, sm: 1, md: 3, lg: 5 }}>
        <Box
          fontWeight={"bold"}
          color="initial"
          sx={{
            mx: 1,
            textAlign: "center",
            minWidth: { xs: 50, md: 80 },
            fontFamily: "poppins",
            fontWeight: "bold",
            py: 1,
            borderRadius: 1,
            bgcolor: "#eee",
            border: "1px solid var(--c-text) ",
          }}
        >
          Filtre
        </Box>
        <Box flexGrow={2} />
        <Select
          labelId="level"
          id="level"
          defaultValue={choiceData[0].label}
          value={choiceFilter}
          name="choiceFilter"
          size="small"
          sx={{
            mx: 1,
            minWidth: { xs: 50, md: 200 },
            fontFamily: "sans-serif",
            fontWeight: "bold",

            bgcolor: "#eee",
            "&:focus ,&:hover": {
              borderColor: "var(--c-last)",
            },
          }}
          onChange={handleChange}
          startAdornment={
            <Box fontSize={{ xs: 20, md: 25 }} mr={2}>
              <IoPodium />
            </Box>
          }
        >
          {choiceData.map((item, idx) => (
            <MenuItem
              key={idx}
              sx={{ display: "flex", alignItems: "center" }}
              value={item.value}
            >
              <em>{item.label}</em>
            </MenuItem>
          ))}
        </Select>
        <Select
          labelId="level"
          id="level"
          defaultValue={levelData[0]}
          value={levelFilter}
          name="levelFilter"
          size="small"
          sx={{
            mx: 1,
            minWidth: { xs: 50, md: 200 },
            fontFamily: "sans-serif",
            fontWeight: "bold",

            bgcolor: "#eee",
          }}
          onChange={handleChange}
          startAdornment={
            <Box fontSize={{ xs: 20, md: 25 }} mr={2}>
              <BsFillDiagram3Fill />
            </Box>
          }
        >
          {levelData.map((item, idx) => (
            <MenuItem
              key={idx}
              sx={{ display: "flex", alignItems: "center" }}
              value={item}
            >
              <Box
                component="img"
                height={20}
                src={matterDataImg[item.toLowerCase()]}
              />
              <em>{item}</em>
            </MenuItem>
          ))}
        </Select>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          defaultValue={matterData[0]}
          value={matterFilter}
          name="matterFilter"
          size="small"
          onChange={handleChange}
          sx={{
            mx: 1,
            minWidth: { xs: 50, md: 200 },
            fontFamily: "sans-serif",
            fontWeight: "bold",

            bgcolor: "#eee",
          }}
          startAdornment={
            <Box fontSize={{ xs: 20, md: 25 }} mr={2}>
              <BsDistributeVertical />
            </Box>
          }
        >
          {matterData.map((item, idx) => (
            <MenuItem
              key={idx}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              value={item}
            >
              <em>{item}</em>
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid
        justifyContent={"center"}
        alignItems="stretch"
        minHeight={200}
        container
      >
        {/* {courses.map((item) => (
      <Grid item>
        <CardCourses data={item} />
      </Grid>
    ))}
    {loading &&
      [...Array(6).keys()]?.map((item) => (
        <Grid item>
          <LoadingCard />
        </Grid>
      ))} */}
      </Grid>
    </Grid>
  );
}

export default Books;
