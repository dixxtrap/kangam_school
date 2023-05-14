import { useState, useEffect, useContext } from "react";
import {
  getDocs,
  getDoc,
  doc,
  collection,
  getFirestore,
  where,
  query,
} from "firebase/firestore/lite";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AppContext } from "../../app/App";
import {
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import AddTutoriels from "../Courses/AddTutoriels";
import AddCourses from "../Courses/AddCourses";
import PreHeader from "../../widget/preHeader";
import UpdateCourses from "../Courses/updateCourses";
import preHeaerIMG from "../../assets/undraw/undraw_group_selfie_re_h8gb.svg";
import { CardCourseForInstructor } from "../Courses/CardCourses";
import { headerHeight } from "../../widget/header";
import { borderRadius, Box, color } from "@mui/system";
import { BsPlusLg } from "react-icons/bs";
import { TransitionAlerts } from "../../widget/connexion";
import UpdateSections from "../Courses/updateSections";
import UpdateLesson from "../Courses/updateLesson";
const db = getFirestore();
const Home = () => {
  const [cU, setCU] = useContext(AppContext).currentUser;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const nav = useNavigate();
  const getData = async () => {
    console.log("current user===>", cU);
    if (cU && cU.status === "instructor") {
      try {
        setLoading(true);
        const q = await query(
          collection(db, "Courses"),
          where("createBy", "==", cU.uid)
        );
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          items.push({ ...doc.data(), id: doc.id });
        });
        await setData(items);
        setLoading(false);
      } catch (e) {
        setError(e);
        console.log("eror==>", e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Grid container direction={"column"} width="100%" alignItems={"start"}>
      <PreHeader title={"Tableau bde bord"} img={preHeaerIMG} />

      <Grid container justifyContent={"center"} alignItems={"stretch"}>
        <Grid item md={9}>
          {error ? (
            <TransitionAlerts error={error} />
          ) : loading ? (
            <Grid container color={"var(--c-last)"} justifyContent={"center"}>
              <CircularProgress color="inherit" thickness={8} size={50} />
            </Grid>
          ) : (
            <Grid container justifyContent={"center"}>
              {data?.map((item) => (
                <Grid item my={2} xs={12}>
                  <CardCourseForInstructor data={item} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
        <Grid
          item
          pr={2}
          pt={2}
          position={"relative"}
          xs={12}
          md={3}
          // border="red 2px solid"
        >
          <Grid
            minHeight={500}
            container
            component={Paper}
            position={"sticky"}
            top={headerHeight}
            direction={"column"}
            py={2}
            px={{ xs: 1, md: 2 }}
            sx={{
              bgcolor: "var(--c-last-vis)",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
            }}
          >
            <Typography
              variant="h5"
              fontFamily={"poppins"}
              fontWeight={"bold"}
              color="initial"
              sx={{}}
            >
              Tableau de bord
            </Typography>
            <Divider sx={{ borderWidth: 2, my: { sm: 1, md: 2 } }} />
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="subtitle1" color="initial">
                Formations
              </Typography>
              <Box
                component="span"
                sx={{
                  bgcolor: "var(--c-secondary)",
                  textAlign: "center",
                  px: 2,

                  fontWeight: "bold",
                  color: "whitesmoke",
                  borderRadius: 2,
                }}
              >
                {data.length}
              </Box>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="subtitle1" color="initial">
                Like
              </Typography>
              <Box
                component="span"
                sx={{
                  bgcolor: "var(--c-secondary)",
                  textAlign: "center",
                  px: 2,

                  fontWeight: "bold",
                  color: "whitesmoke",
                  borderRadius: 2,
                }}
              >
                {data.reduce((a, b) => a + b.like, 0)}
              </Box>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="subtitle1" color="initial">
                Comment
              </Typography>
              <Box
                component="span"
                sx={{
                  bgcolor: "var(--c-secondary)",
                  textAlign: "center",
                  px: 2,

                  fontWeight: "bold",
                  color: "whitesmoke",
                  borderRadius: 2,
                }}
              >
                {data.length}
              </Box>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="subtitle1" color="initial">
                Suivi
              </Typography>
              <Box
                component="span"
                sx={{
                  bgcolor: "var(--c-secondary)",
                  textAlign: "center",
                  px: 2,

                  fontWeight: "bold",
                  color: "whitesmoke",
                  borderRadius: 2,
                }}
              >
                {data.length}
              </Box>
            </Grid>
            <Box flexGrow={2} />
            <Button
              startIcon={
                <Box>
                  <BsPlusLg />
                </Box>
              }
              endIcon={<Box></Box>}
              variant="outlined"
              onClick={() => {
                nav("./addCourses");
              }}
              sx={{
                color: "var(--c-body)",
                textTransform: "none",
                bgcolor: "var(--c-primary)",
                borderColor: "#00000008",
                fontFamily: "poppins",
                fontWeight: "bold",
                "&:active,&:hover": {
                  bgcolor: "var(--c-secondary)",
                  color: "white",
                  borderColor: "var(--c-footer)",
                },
              }}
            >
              Creer une formation
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

function Formation() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="addTutoriels" element={<AddTutoriels />} />
      <Route path="addCourses" element={<AddCourses />} />
      <Route path=":idCourse" element={<UpdateCourses />} />
      <Route path=":idCourse/:idSection" element={<UpdateSections />} />
      <Route path=":idCourse/:idSection/:idLesson" element={<UpdateLesson />} />
    </Routes>
  );
}

export default Formation;
