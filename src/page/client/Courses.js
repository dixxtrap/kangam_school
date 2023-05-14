import React, { useState, useEffect, useLayoutEffect } from "react";
// FIXME* Firebase Import
import { getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  getDoc,
  getDocs,
  query,
  orderBy,
  collection,
} from "firebase/firestore/lite";
import { Routes, Route } from "react-router-dom";
import { Typography, Grid, Box, Select, Paper } from "@mui/material/";
import MenuItem from "@mui/material/MenuItem";
import PreHeader from "../../widget/preHeader";
import CardCourses, { LoadingCard } from "../Courses/CardCourses";
import ViewCourses from "../Courses/ViewCourses";
import imagePreHeaer from "../../assets/undraw/undraw_online_learning_re_qw08.svg";
import LoadingPage from "../../widget/loading";
import { CustomizedTabs } from "./books";
import { matterData, matterDataImg, levelData } from "../../data";

import { IoPodium, IoSearch } from "react-icons/io5";
import CoursePlayist from "../Courses/coursePlayist";
import { TransitionAlerts } from "../../widget/connexion";
import CustomizeInput from "../../widget/input";
import { IoTennisballSharp } from "react-icons/io5";
import sr, { lampAnim, textAccueilAnim } from "../../widget/Animation";
const auth = getAuth();
const db = getFirestore();

const choiceData = [
  { label: "Tout", value: "tout" },
  { label: "Aimé", value: "like" },
  { label: "Acheté", value: "buy" },
  { label: "commenté", value: "comment" },
];

const styleSelect = {
  mx: 1,
  minWidth: { xs: 50, md: 200 },
  fontFamily: "sans-serif",
  fontWeight: "bold",
  borderRadius: "5px",
  bgcolor: "#eee",
  "&:focus ,&:hover": {
    borderColor: "var(--c-last)",
  },
};

const Home = () => {
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
      const coursesDoc = await getDocs(
        query(coursesRef, orderBy("date", "desc"))
      );
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
  useEffect(() => {
    sr.reveal(".mycard", { interval: 16, reset: true });
  }, [data]);

  return (
    <Grid container direction={"column"} width="100%" alignItems={"start"}>
      {/* {loading && <LoadingPage />} */}
      <PreHeader
        img={imagePreHeaer}
        title={" Decouvrez nos formations"}
        description={`${auth.currentUser?.displayName} Apprenez un métier d’avenir, grâce à KangamSchool, l’école nouvelle génération 100% en ligne.`}
        icon={<IoTennisballSharp />}
      />
      {/* <CustomizedTabs value={level} setValue={setLevel} list={levelData} />
      <CustomizedTabs
        value={matter}
        setValue={setMatter}
        list={matterData}
        img={matterDataImg}
      /> */}
      <Grid container px={{ xs: 0, sm: 1, md: 2, lg: 3 }} py={2}>
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
            borderRadius: "5px",
            bgcolor: "#eee",
            border: "1px solid var(--c-text) ",
          }}
        >
          Filtre
        </Box>
        <Box flexGrow={2} />
        {/* <Select
          labelId="level"
          id="level"
          defaultValue={choiceData[0].label}
          value={choiceFilter}
          name="choiceFilter"
          size="small"
          sx={styleSelect}
          onChange={handleChange}
          startAdornment={
            <Box fontSize={{ xs: 20, md: 25 }} mr={2}>
              <IoPodium />
            </Box>
          }
        >
          {choiceData.map((item) => (
            <MenuItem
              sx={{ display: "flex", alignItems: "center" }}
              value={item.value}
            >
              <em>{item.label}</em>
            </MenuItem>
          ))}
        </Select> */}
        <CustomizeInput
          placeholder={"Recherche"}
          startIcon={<IoSearch />}
          sx={{ alignSelf: "end", maxWidth: 300, bgcolor: "#0000000F" }}
        />
      </Grid>
      <Grid
        container
        justifyContent={"end"}
        py={2}
        px={{ xs: 0, sm: 1, md: 2, lg: 3 }}
      ></Grid>
      <Grid
        justifyContent={{ xs: "center", md: "normal" }}
        alignItems="stretch"
        px={{ xs: 0, sm: 1, md: 3, lg: 2 }}
        minHeight={200}
        container
      >
        {courses.map((item) => (
          <Grid item xs={10} className="mycard" sm={5} md={4} lg={3} p={1}>
            <CardCourses data={item} />
          </Grid>
        ))}
        {loading &&
          [...Array(12).keys()]?.map((item) => (
            <Grid item>
              <LoadingCard />
            </Grid>
          ))}
        {error && (
          <Grid item xs={12}>
            <Grid container justifyContent={"center"}>
              <TransitionAlerts error={error} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

function Courses() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path=":idCourse" element={<ViewCourses />} />
      <Route path=":idCourse/playist" element={<CoursePlayist />} />
    </Routes>
  );
}

export default Courses;
