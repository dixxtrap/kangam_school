import { useState, useContext, useEffect, useRef } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  orderBy,
  setDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {
  Grid,
  Paper,
  Box,
  Avatar,
  Divider,
  Chip,
  LinearProgress,
  Slide,
  Skeleton,
  IconButton,
} from "@mui/material/";
import { useParams } from "react-router-dom";
import { Link, useNavigate, Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import {
  BsBookmarksFill,
  BsCalendarPlus,
  BsChatTextFill,
  BsCheckLg,
  BsChevronRight,
  BsLightningFill,
  BsMailbox2,
  BsPlusLg,
  BsXLg,
} from "react-icons/bs";
import { headerHeight, stringAvatar } from "../../widget/header";
import Button from "@mui/material/Button";
import { primary } from "../../data";
import { IoClose } from "react-icons/io5";
import { AppContext } from "../../app/App";
import { TransitionAlerts } from "../../widget/connexion";

import { CourseAccordions } from "./accordionCourses";

import { typography } from "@mui/system";
import CustomizeInput from "../../widget/input";
import TextField from "@mui/material/TextField";

const db = getFirestore();
const storage = getStorage();

const UpdateCourses = () => {
  const [cU, setCU] = useContext(AppContext).currentUser;
  const [data, setData] = useState(null);
  const [intro, setIntro] = useState(null);
  const [progress, setProgress] = useState(null);
  const [openupdate, setopenupdate] = useState(false);
  const [section, setSection] = useState([]);
  const [{ sectiontitle, openaddsection }, setaddSection] = useState({
    sectiontitle: "",
    openaddsection: false,
  });

  const [sectionState, setSectionState] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const { idCourse } = useParams();
  console.log("Id Course", idCourse);
  const [
    {
      loading,

      isRunning,
      isPaused,

      errorState,
      introduction,
    },
    setState,
  ] = useState({
    loading: false,
    progressLoading: false,
    isRunning: false,
    isPaused: false,
    errorState: null,
    introduction: null,
  });

  const getSections = async () => {
    try {
      setSectionState({ ...section, loading: true });
      const sectionsRef = await collection(db, `Courses/${idCourse}/Sections`);
      const sectionQuery = await getDocs(
        await query(sectionsRef, orderBy("date"))
      );

      const s = [];
      sectionQuery.forEach(async (sectionDoc) => {
        await s.push({ ...sectionDoc.data(), id: sectionDoc.id });
      });

      setSection(s);
      console.log("ma mist", s);
    } catch (e) {
      setSectionState({ ...section, error: e });
    } finally {
      setSectionState({ ...section, loading: false });
    }
  };
  const getData = async () => {
    try {
      const coursesData = await (
        await getDoc(doc(db, `Courses/${idCourse}`))
      ).data();
      await setData(coursesData);

      console.log("Datacourses", coursesData);
    } catch (err) {
      console.log(err);
      setState((prev) => {
        return { ...prev, error: err, loading: false };
      });
    } finally {
    }
  };
  useEffect(() => {
    if (introduction) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIntro(reader.result);
      };
      reader.readAsDataURL(introduction);
    } else {
      setIntro(null);
    }
  }, [introduction]);
  const handleImage = (e) => {
    const file = e.target.files[0];
    setState((prev) => {
      return { ...prev, introduction: file };
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...data, [name]: value });
  };
  const handleAdSection = () => {
    setaddSection((prev) => {
      return { ...prev, openaddsection: true };
    });
  };
  const handleAddSectionSubmit = async (e) => {
    e.preventDefault();
    try {
      const sectionRef = doc(collection(db, `Courses/${idCourse}/Sections/`));
      const courseRef = doc(db, `Courses/${idCourse}`);
      await setDoc(sectionRef, {
        title: data.title,
        date: serverTimestamp(),
      });
      await updateDoc(courseRef, { nbSection: increment(1) });
      setSection((prev) => {
        return [...prev, data];
      });

      setData({ title: "" });
    } catch (err) {
      console.log("un errrreur", err);
    } finally {
    }
  };
  useEffect(() => {
    getData();
    getSections();
  }, []);
  // if (cU.status.toLowerCase() !== "instructor") {
  //   return <Navigate to="/erreur" />;
  // }
  const addIntroduction = async () => {
    setState((prev) => {
      return { ...prev, progressLoading: true };
    });
    try {
      const docRef = doc(db, `Courses/${idCourse}`);

      const storageRef = ref(storage, `intro/${idCourse}/`);
      const uploadTask = uploadBytesResumable(storageRef, introduction);

      uploadTask.on(
        "state_changed",
        async (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progressState =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          await setProgress(progressState);
          console.log("Upload is " + progressState + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              setState((prev) => {
                return { ...prev, isPaused: true };
              });
              break;
            case "running":
              console.log("Upload is running");
              setState((prev) => {
                return { ...prev, isRunning: true, isPaused: false };
              });
              break;
            default:
              setState((prev) => {
                return { ...prev, isPaused: false, isRunning: false };
              });
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          setState((prev) => {
            return { ...prev, error: error };
          });
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(docRef, { introduction: url });
          setData((prev) => {
            return { ...prev, introduction: url };
          });
          setState((prev) => {
            return {
              ...prev,
              isPaused: false,
              isRunning: false,
              introduction: null,
            };
          });
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        }
      );
    } catch (e) {
      setState((prev) => {
        return { ...prev, error: e };
      });
    } finally {
      setState((prev) => {
        return { ...prev, progressLoading: false };
      });
    }
  };
  const closeupdate = () => {
    setopenupdate(false);
  };
  return (
    <Grid container>
      <Grid
        container
        alignItems={"stretch"}
        width={"100%"}
        justifyContent={"space-around"}
        minHeight={"100%"}
        height={"100%"}
        columns={21}
        // flexDirection={{ xs: "column-reverse", md: "row" }}
        flexWrap="wrap-reverse"
      >
        <Grid position={"relative"} item xs={20} md={6}>
          <Paper
            position={{ md: "sticky" }}
            component={Grid}
            top={{ md: 60 }}
            variant="outlined"
            p={{ xs: 2, md: 2 }}
            display={"flex"}
            alignItems={"center"}
            direction={"column"}
            justifyContent={"space-around"}
            alignContent={"center"}
            sx={{
              bgcolor: "#0000000C",
              mt: 2,
              overflow: "hidden",
              width: "100%",
              textDecoration: "none",
              borderRadius: "5px",

              minHeight: { md: 600, lg: 680 },
            }}
          >
            {loading ? (
              <>
                <Skeleton variant />
              </>
            ) : (
              <>
                <Box
                  component="img"
                  sx={{ aspectRatio: "16 / 10" }}
                  borderRadius={1}
                  width={{ xs: 120, md: 130, lg: 150 }}
                  src={data?.photoURL}
                />
                <Box width={"100%"} mt={3}>
                  <Typography
                    variant="h5"
                    fontFamily={"poppcU"}
                    fontWeight={"bold"}
                    color="initial"
                    textAlign={"center"}
                  >
                    {data?.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    textAlign={"justify"}
                    color="initial"
                    fontSize={{ xs: 13, sm: 15, md: 15 }}
                  ></Typography>
                </Box>
                <Box flexGrow={2} />
                <Button
                  variant={"contained"}
                  size="small"
                  color="primary"
                  sx={{
                    bgcolor: "var(--c-primary)",
                    textTransform: "capitalize",
                    borderRadius: "3px",
                    py: "2px",
                    "&:hover": {
                      bgcolor: "var(--c-secondary)",
                    },
                  }}
                >
                  Ouvrir
                </Button>
                <Box
                  mt={{ xs: 1, md: 2, lg: 3 }}
                  justifyContent="space-around"
                  width={"100%"}
                  display={"flex"}
                  flexWrap={"wrap"}
                >
                  <Chip
                    sx={{ fontWeight: "bold", my: 1 }}
                    label={data?.matter}
                  />
                  {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                  <Chip
                    sx={{ my: 1 }}
                    label={
                      <Box>
                        <Typography
                          component={"span"}
                          variant="inherit"
                          color="initial"
                          fontWeight={"bold"}
                        >
                          Classe :
                        </Typography>
                        <Typography
                          component={"span"}
                          variant="inherit"
                          color="initial"
                        >
                          {data?.level}
                        </Typography>
                      </Box>
                    }
                  />
                  {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                  <Chip
                    sx={{ my: 1 }}
                    label={
                      <Box>
                        <Typography
                          component={"span"}
                          variant="inherit"
                          color="initial"
                          fontWeight={"bold"}
                        >
                          prix :
                        </Typography>
                        <Typography
                          component={"span"}
                          variant="inherit"
                          color="initial"
                        >
                          {data?.price}
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
                <Box flexGrow={2} />

                <Box
                  mt={{ xs: 1, md: 2, lg: 3 }}
                  justifyContent="space-around"
                  width={"100%"}
                  display={"flex"}
                >
                  <Button
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "black",
                    }}
                  >
                    <Box fontSize={20} fontWeight={1000}>
                      {data?.like}
                      <BsLightningFill />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ textTransform: "none" }}
                      color="initial"
                    >
                      Aimer
                    </Typography>
                  </Button>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Button
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "black",
                    }}
                  >
                    <Box fontSize={20} fontWeight={1000}>
                      {data?.like}
                      <BsChatTextFill />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ textTransform: "none" }}
                      color="initial"
                    >
                      commentaire
                    </Typography>
                  </Button>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Button
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "black",
                    }}
                  >
                    <Box fontSize={20} fontWeight={1000}>
                      {data?.like}
                      <BsBookmarksFill />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ textTransform: "none" }}
                      color="initial"
                    >
                      Souhait
                    </Typography>
                  </Button>
                </Box>
                <Box flexGrow={2} />
                <Box>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setopenupdate(true)}
                    color="primary"
                    sx={{
                      bgcolor: "var(--c-primary)",
                      textTransform: "capitalize",
                      py: "2px",
                      "&:hover": {
                        bgcolor: "var(--c-secondary)",
                      },
                    }}
                    disabled={!!!data}
                  >
                    {" Modifier"}
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Grid>
        <Grid md={14} xs={20}>
          <Paper
            component={Grid}
            variant="outlined"
            sx={{
              bgcolor: "#fff",
              my: { xs: 1, md: 2 },
              overflow: "hidden",
              width: "100%",
              textDecoration: "none",
              borderRadius: "5px",
            }}
            container
            direction={"column"}
            justifyContent={"space-between"}
          >
            <Box flexGrow={3} width={"100%"}>
              <video
                controls
                width={"100%"}
                src={introduction ? intro : data?.introduction}
                contextMenu="return false;"
                onContextMenu="return false;"
                style={{ width: "100%", maxHeight: 500 }}
                gesture="media"
                allowfullscreen
                allowTransparency
                poster={data?.photoURL}
              />
            </Box>
            <Box
              display={"flex"}
              px={{ xs: 2, md: 4 }}
              flexDirection="column"
              width={"100%"}
            >
              <Typography
                width={"100%"}
                variant="subtitle2"
                textAlign={"left"}
                fontFamily={"poppcU"}
                fontWeight={"bold"}
                color="initial"
              >
                Creer par
              </Typography>
              <Box display={"flex"}>
                <Link to={""} style={{ width: "100%", textDecoration: "none" }}>
                  <Box display={"flex"}>
                    <Box>
                      <Avatar
                        {...stringAvatar(cU?.displayName)}
                        src={cU?.photoURL}
                      />
                    </Box>
                    <Box ml={2} lineHeight={1}>
                      <Typography variant="caption" color="initial">
                        {cU?.email}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={"bold"}
                        color="initial"
                      >
                        {cU?.displayName}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      dispaly: "flex",
                      bgcolor: "var(--c-middle)",
                      height: 20,
                      pr: 0,
                    }}
                    color="primary"
                    onClick={handleAdSection}
                    endIcon={
                      <Box
                        size="small"
                        sx={{
                          borderRadius: "5px",
                          textTransform: "none",
                          bgcolor: "var(--c-body)",
                          border: "1px solid #00000037",

                          aspectRatio: "1 / 1",
                          px: 1,

                          justifyContent: "center",
                        }}
                        color="primary"
                      >
                        <BsPlusLg
                          style={{
                            color: "var(--c-middle)",
                            lineHeight: 1,
                            marginBottom: "-2px",
                          }}
                        />
                      </Box>
                    }
                  >
                    Section
                  </Button>
                </Box>
              </Box>
            </Box>
            {errorState && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <TransitionAlerts error={errorState} />
                </Box>
              </Box>
            )}
            {(isRunning || isPaused) && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    height={10}
                    color="warning"
                    variant="determinate"
                    value={progress}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >{`${Math.round(progress)}%`}</Typography>
                </Box>
              </Box>
            )}
            <Box
              width="100%"
              py={2}
              justifyContent={"space-around"}
              display={"flex"}
              alignSelf={"baseline"}
            >
              <input
                accept="video/*"
                style={{ display: "none" }}
                onChange={handleImage}
                id="introduction"
                type="file"
              />

              {/* <label htmlFor="introduction">
                
                <Paper
                  sx={{
                    textTransform: "none",
                    color: "var(--c-text)",
                    px: { s: 1, md: 2 },
                    width: "max-content",
                    py: { xs: 1, md: 1 },
                    bgcolor: "var(--c-last-vis)",
                    borderColor: "var(--c-last)",
                    fontSize: { xs: 10, sm: 14, md: 17 },
                    fontWeight: "bold",
                    "&:hover": {
                      bgcolor: "var(--c-last)",
                      borderColor: "var(--c-last)",
                      color: "white",
                    },
                  }}
                  variant="outlined"
                >
                  <BsPlusLg style={{ marginRight: "6px" }} />
                  Introduction
                </Paper>
              </label> */}
              {intro && (
                <Button
                  size="small"
                  sx={{
                    textTransform: "none",
                    color: "black",
                    width: "max-content",
                    minWidth: { md: 160 },
                    bgcolor: "var(--c-last-vis)",
                    borderColor: "var(--c-last)",
                    fontSize: { xs: 10, sm: 14, md: 17 },
                    fontWeight: "bold",
                    "&:hover": {
                      bgcolor: "var(--c-footer)",
                      borderColor: "var(--c-footer)",
                      color: "white",
                    },
                  }}
                  startIcon={<BsCheckLg />}
                  variant="outlined"
                  onClick={addIntroduction}
                >
                  Valider
                </Button>
              )}
            </Box>
            <Box>
              {sectionState.loading ? (
                <Box component={"center"} sx={{ color: "var(--c-last)" }}>
                  <CircularProgress color="inherit" thickness={8} size={50} />
                </Box>
              ) : (
                section &&
                section?.map((item) => (
                  <CourseAccordions idSection={item.id} {...item} />
                ))
              )}
              {openaddsection && (
                <Box display={"flex"} alignItems="center">
                  <TextField
                    id=""
                    label="Nouvelle Section"
                    autoFocus
                    variant="standard"
                    sx={{ flexGrow: 1, borderRadius: 0 }}
                    // value={}
                    // onChange={}
                    inputProps={{ style: { flexGrow: 1, borderRadius: 0 } }}
                  />

                  <Box px={1}>
                    <IconButton sx={{ mr: 2 }}>
                      <BsPlusLg />
                    </IconButton>
                    <IconButton>
                      <BsPlusLg />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <UpdateCourse
        courseOut={data}
        openupdate={openupdate}
        close={closeupdate}
      />
    </Grid>
  );
};

export default UpdateCourses;

const UpdateCourse = ({ courseOut, close, openupdate }) => {
  const [course, setcourse] = useState(courseOut);
  useEffect(() => {
    setcourse(courseOut);
  }, []);

  return (
    <Slide direction="up" in={openupdate} mountOnEnter unmountOnExit>
      <Box
        position={"fixed"}
        left={0}
        right={0}
        height="100%"
        zIndex={1004}
        top={0}
        // border="3px solid red"
        className="glace"
        display="flex"
        justifyContent={"center"}
        alignContent="center"
        alignItems={"center"}
      >
        <Box
          maxHeight={600}
          maxWidth={600}
          height="100%"
          width="100%"
          border="1px solid #0000003F"
          position="relative"
          bgcolor="#FFF"
          display={"flex"}
          flexDirection="column"
          borderRadius={2}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: { xs: -5, md: -15 },
              right: { xs: -5, md: -15 },
              bgcolor: "red",
              color: "white",
              borderRadius: "8px",
              lineHeight: 1,
              "&:hover": {
                bgcolor: "red",
                color: "white",
              },
            }}
            color="error"
            onClick={() => close()}
          >
            <IoClose />
          </IconButton>
          <Box px={3}>
            <Typography variant="h6" textAlign={"center"} color="initial">
              {course?.title}
            </Typography>
          </Box>
          <Box height="100%" width="100%" overflow={"auto"}></Box>
        </Box>
      </Box>
    </Slide>
  );
};
