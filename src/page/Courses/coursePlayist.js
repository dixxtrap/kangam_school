/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState,
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { AppContext } from "../../app/App";
import {
  getFirestore,
  doc,
  getDoc,
  orderBy,
  query,
  getDocs,
  collection,
} from "firebase/firestore/lite";
import { Grid, Box, IconButton, Divider, Hidden, Chip } from "@mui/material/";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { TiTimes } from "react-icons/ti";

import Button from "@mui/material/Button";
import { getDate, primary } from "../../data";

import { CourseAccordionsStudent } from "./accordionCourses";
import { Tabulation } from "./tabulation";
import { IoListOutline } from "react-icons/io5";
const db = getFirestore();
const CoursesPlayist = () => {
  const { idCourse } = useParams();
  const [data, setData] = useState(null);
  const [ins, setIns] = useState(null);
  const [cU, setCU] = useContext(AppContext).currentUser;
  const [section, setSection] = useState([]);
  const [current, setCurrent] = useState(null);

  const [open, setopen] = useState(true);
  const videoRef = useRef(null);
  const nav = useNavigate();
  let videoRef1 = null;
  const [{ loading, sectionLoading, error }, setState] = useState({
    loading: false,
    sectionLoading: false,
    likeLoading: false,
    error: null,
  });
  console.log(cU);
  const getData = async () => {
    try {
      const coursesData = await (
        await getDoc(doc(db, `Courses/${idCourse}`))
      ).data();
      await setData({ ...coursesData, id: idCourse });

      const insData = await (
        await getDoc(doc(db, `Users/${coursesData?.createBy}`))
      ).data();
      console.log("instructors", insData);
      await setIns(insData);
      setState((prev) => {
        return { ...prev, loading: false };
      });
    } catch (err) {
      console.log(err);
      setState((prev) => {
        return { ...prev, error: err, loading: false };
      });
    }
  };
  const getSections = async () => {
    try {
      setState((prev) => {
        return { ...prev, sectionLoading: false };
      });
      const sectionsRef = await collection(db, `Courses/${idCourse}/Sections`);
      const sectionQuery = await getDocs(
        await query(sectionsRef, orderBy("date", "asc"))
      );

      const s = [];

      sectionQuery.forEach(async (sectionDoc) => {
        const sectionData = sectionDoc.data();
        await s.push({
          ...sectionData,
          id: sectionDoc.id,
          dateTime: getDate(sectionData.date),
        });
      });

      setSection(s);
      console.log("ma mist", s);
    } catch (e) {
      setState((prev) => {
        return { ...prev, errorCourse: e };
      });
    } finally {
      setState((prev) => {
        return { ...prev, sectionLoading: false };
      });
    }
  };
  const getVideoRef = () => {
    // console.log("currentTime", videoRef.current.currentTime);

    // console.log("HOooooooooooooo VIdeo Change");
    // console.log(videoRef.current.duration);
    // console.log("seconde", Math.round(videoRef.current.duration % 60));
    // console.log("minute", Math.floor(videoRef.current.duration / 60));
    return videoRef.current.currentTime;
  };
  useEffect(() => {
    getData();
    getSections();
  }, []);

  return (
    <Grid
      container
      alignItems={"stretch"}
      width={"100%"}
      justifyContent={"space-around"}
      minHeight={"100%"}
      height={"100%"}
      columns={20}
      mb={15}
    >
      <Grid
        position={"relative"}
        item
        bgcolor={"var(--c-last-vis)"}
        xs={20}
        md={open ? 5 : 20}
      >
        <Grid
          position={"sticky"}
          top={0}
          variant="outlined"
          py={0}
          display={"flex"}
          alignItems={"center"}
          direction={"column"}
          justifyContent={""}
          alignContent={"center"}
          bgcolor={"var(--c-last-vis)"}
          sx={{
            overflow: "hidden",
            width: "100%",
            textDecoration: "none",
            borderRadius: 0,
            borderRight: "2px solid #00000023",
            height: "100%",
            maxHeight: { xs: 700, md: 600, lg: 700, xl: 800 },
            overflowY: "auto",
          }}
          container
        >
          <Box
            bgcolor="transparent"
            // border="1px solid #00000023"
            width={"100%"}
          >
            <Box
              display={"flex"}
              justifyContent="space-between"
              alignItems={"center"}
              bgcolor="#00000012"
              px="8px"
              py={{ xs: 1 }}
            >
              <Button
                size="large"
                sx={{
                  textTransform: "none",
                  color: "var(--c-text)",
                  fontWeight: "bold",
                  fontSize: { xs: 14, md: 16, ld: 20 },
                }}
                startIcon={<IoListOutline />}
              >
                Sommaire
              </Button>

              <IconButton
                sx={{ border: "2px solid #ffffff10" }}
                color="inherit"
                onClick={() => {
                  setopen(!open);
                }}
              >
                <TiTimes />
              </IconButton>
            </Box>
            <Box height={!open && 0} bgcolor={"var(--c-last-vis)"}>
              {section?.map((item, idx) => (
                <CourseAccordionsStudent
                  key={idx}
                  idSection={item.id}
                  {...item}
                  setCurrent={setCurrent}
                  current={current}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={20} md={open ? 15 : 20}>
        <Grid
          container
          pb={0}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box flexGrow={3} p={0} m={0} width={"100%"}>
            <Box
              component={"video"}
              controls
              bgcolor={"var(--c-last-vis)"}
              onChangeCapture={() => {
                console.log("=changging to load video");
              }}
              width={"100%"}
              onLoadStart={() => {
                console.log("Starting to load video");
              }}
              src={current?.videoURL ? current?.videoURL : data?.introduction}
              poster={current?.imageURL ? current?.imageURL : data?.photoURL}
              sx={{ aspectRatio: "16/9" }}
              gesture="media"
              ref={videoRef}
              allowFullScreen
              allowtransparency="true"
              title="djisg"
              id="myVideo"
            />
          </Box>
          {/* <Button
            size="small"
            variant="contained"
            disableElevation
            sx={{ textTransform: "none", borderRadius: "2px", py: 0 }}
            color="primary"
            onClick={getVideoRef}
          >
            getVideo
          </Button> */}
          {!!data && (
            <Tabulation
              ins={ins}
              course={data}
              current={current}
              cU={cU}
              videoRef={videoRef}
              currentTime={getVideoRef}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CoursesPlayist;
