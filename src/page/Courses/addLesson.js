import React, { useState, useEffect, useRef } from "react";
import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  updateDoc,
  increment,
} from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import {
  Grid,
  Typography,
  Button,
  Box,
  Avatar,
  Paper,
  CircularProgress,
  Hidden,
  IconButton,
  Skeleton,
  LinearProgress,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import { headerHeight, KangamSchool } from "../../widget/header";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  BsCameraFill,
  BsCameraVideoFill,
  BsCheckLg,
  BsPencilFill,
  BsXLg,
} from "react-icons/bs";
import img from "../../assets/undraw/undraw_group_selfie_re_h8gb.svg";
import CustomizeInput, { CustomizeRichText } from "../../widget/input";
import { BsPlusLg } from "react-icons/bs";
import { useParams } from "react-router-dom";
import LoadingPage from "../../widget/loading";
import e from "cors";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const db = getFirestore();
const storage = getStorage();
function AddLesson({ setLesson, idSection }) {
  const [data, setData] = useState({
    title: "",
    description: EditorState.createEmpty(),
    videoFile: null,
    imageFile: null,
  });
  const { idCourse } = useParams();
  const { description, title, videoFile, imageFile } = data;
  const [open, setOpen] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const videoRef = useRef();
  const [{ isRunning, isPaused }, setState] = useState({
    isRunning: false,
    isPaused: false,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRichTextChange = (e, identity) => {
    console.log(e);
    setData({ ...data, [identity]: e });
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });
  };
  const handleVideo = (e) => {
    console.log("changement de video");
    const file = e.target.files[0];

    console.log("target", file);
    setData({ ...data, videoFile: file });
  };
  // useEffect(() => {
  //   console.log("video", e.target);
  //   console.log("videoRef", videoRef.current?.value);

  //   console.log("duration", videoRef.current?.duration);
  //   console.log("second", Math.round(videoRef.current?.duration) % 60);
  //   console.log("minute", Math.round(videoRef.current?.duration / 60) % 60);
  //   console.log(
  //     "Heure",
  //     Math.round(videoRef.current?.duration / (60 * 60)) % 60
  //   );
  // }, [videoFile]);

  const handleImage = (e) => {
    console.log("changement de video");
    const file = e.target.files[0];
    setData({ ...data, imageFile: file });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setState((prev) => {
      return { ...prev, progressLoading: true };
    });
    try {
      const lessonRef = await doc(
        collection(db, `Courses/${idCourse}/Sections/${idSection}/lessons/`)
      );

      const videoRef = await ref(
        storage,
        `course/${idCourse}/video/${lessonRef.id}/`
      );
      const uploadTask = uploadBytesResumable(videoRef, videoFile);

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
          console.log("erreur snapshot", error);
          setErrorState(error);
        },
        async () => {
          const lessonRef = await doc(
            collection(db, `Courses/${idCourse}/Sections/${idSection}/Lessons/`)
          );
          const courseRef = await doc(db, `Courses/${idCourse}`);
          await setData({ ...data, videoFile: null });
          const imageRef = await ref(
            storage,
            `course/${idCourse}/image/${lessonRef.id}`
          );

          await uploadBytes(imageRef, imageFile);
          const imageurl = await getDownloadURL(imageRef);
          const videourl = await getDownloadURL(uploadTask.snapshot.ref);
          await setDoc(lessonRef, {
            title: title,
            description: draftToHtml(
              convertToRaw(description.getCurrentContent())
            ),
            imageURL: imageurl,
            videoURL: videourl,
            date: serverTimestamp(),
          });
          await updateDoc(courseRef, {
            nbLesson: increment(1),
            duration: increment(videoRef.current.duration),
          });
          setLesson((prev) => {
            return [
              ...prev,
              {
                title: title,
                description: draftToHtml(
                  convertToRaw(description.getCurrentContent())
                ),
                imageURL: imageurl,
                videoURL: videourl,
              },
            ];
          });

          setData({ title: "", description: EditorState.createEmpty() });
          setLoading(false);
          setState((prev) => {
            return {
              ...prev,
              isPaused: false,
              isRunning: false,
              introduction: null,
              progressLoading: false,
            };
          });
          handleClose();
        }
      );
    } catch (e) {
      console.log("erreur catch", e);
      setErrorState(e);
      setErrorState(false);
    }
  };

  useEffect(() => {
    console.log("efect video");
    if (videoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoURL(reader.result);
      };
      reader.readAsDataURL(videoFile);
      videoRef.current = document.getElementById("video");
    } else {
      setVideoURL(null);
    }
  }, [videoFile]);
  useEffect(() => {
    console.log("efect video");
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImageURL(null);
    }
  }, [imageFile]);
  return (
    <div>
      <IconButton
        variant="outlined"
        size="small"
        sx={{
          color: "black",

          bgcolor: "white",
          borderColor: "var(--c-last)",
          fontSize: { xs: 10, sm: 14, md: 17 },
          fontWeight: "bold",
          "&:hover": {
            bgcolor: "var(--c-footer)",
            borderColor: "var(--c-footer)",
            color: "white",
          },
        }}
        color="inherit"
        onClick={handleClickOpen}
      >
        <BsPlusLg />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <AppBar
          variant="outlined"
          position="fixed"
          sx={{
            color: "white",
            bgcolor: "var(--c-footer)",
          }}
        >
          <Toolbar variant="dense" sx={{ height: { ...headerHeight } }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <BsXLg />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <KangamSchool header color={"white"} />
            </Typography>
          </Toolbar>
        </AppBar>

        <Box width={"100%"} py={{ xs: 2, sm: 4, md: 8 }} bgcolor="#eee">
          <form onSubmit={onSubmit}>
            <Grid
              container
              justifyContent={"center"}
              alignContent={"stretch"}
              alignItems={"stretch"}
              width={"100%"}
            >
              <Grid item xs={20} mb={2} md={20}>
                <Grid container height={"100%"}>
                  <Box
                    display={"flex"}
                    flexDirection="column"
                    width={"100%"}
                    height="100%"
                    sx={{
                      borderRadius: 1,
                      bgcolor: "white",
                      border: "1px solid rgba(0,0,0,0.1)",
                      p: { xs: 1, md: 2 },
                    }}
                  >
                    {loading ? (
                      <LoadingPage />
                    ) : (
                      <>
                        <Typography
                          my={4}
                          fontSize="poppins"
                          fontWeight={"bold"}
                          variant="h4"
                          color="initial"
                        >
                          Creation d une nouvelle section
                        </Typography>
                        <CustomizeInput
                          value={title}
                          sx={{ maxWidth: 400, my: 1 }}
                          placeholder={"Titre de la section"}
                          startIcon={<BsPencilFill />}
                          onChange={handleChange}
                          name="title"
                        />
                        <Grid
                          container
                          height={"100%"}
                          justifyContent={"space-between"}
                          alignContent={"space-around"}
                          m={0}
                        >
                          <Grid item xs={20} md={10}>
                            <Grid container>
                              <Typography
                                fontFamily={"poppins"}
                                variant="h5"
                                color="initial"
                              >
                                Cours Video
                              </Typography>
                              {videoURL ? (
                                <video
                                  ref={videoRef}
                                  controls
                                  width={"100%"}
                                  src={videoURL}
                                  contextMenu="return false;"
                                  onContextMenu="return false;"
                                  style={{ aspectRatio: "5 / 3", margin: 0 }}
                                  gesture="media"
                                  allowfullscreen
                                  allowTransparency
                                  id="video"
                                />
                              ) : (
                                <Skeleton
                                  variant="rectangle"
                                  sx={{
                                    width: "100%",
                                    minHeight: 300,
                                    aspectRatio: "4 / 3",
                                  }}
                                />
                              )}
                              <Grid
                                container
                                width={"100%"}
                                justifyContent={"space-around"}
                                mt={2}
                              >
                                <input
                                  accept="video/*"
                                  style={{ display: "none" }}
                                  onChange={handleVideo}
                                  id={`video${idSection}`}
                                  type="file"
                                />

                                <Button
                                  size="small"
                                  LinkComponent={"label"}
                                  htmlFor={`video${idSection}`}
                                  sx={{
                                    textTransform: "none",
                                    color: "var(--c-text)",
                                    width: "max-content",

                                    bgcolor: "white",
                                    borderColor: "var(--c-last)",

                                    fontWeight: "bold",
                                    "&:hover": {
                                      bgcolor: "var(--c-last)",
                                      borderColor: "var(--c-last)",
                                      color: "white",
                                    },
                                  }}
                                  variant="outlined"
                                  startIcon={
                                    <BsCameraVideoFill
                                      style={{ marginRight: "6px" }}
                                    />
                                  }
                                >
                                  {" "}
                                  <label htmlFor={`video${idSection}`}>
                                    Video
                                  </label>
                                </Button>

                                <Button
                                  sx={{
                                    textTransform: "none",
                                    color: "var(--c-text)",

                                    width: "max-content",

                                    bgcolor: "white",
                                    borderColor: "var(--c-rose)",

                                    fontWeight: "bold",
                                    "&:hover": {
                                      bgcolor: "var(--c-rose)",
                                      borderColor: "var(--c-rose)",
                                      color: "white",
                                    },
                                  }}
                                  variant="outlined"
                                  startIcon={<BsXLg />}
                                  onClick={() => {
                                    setData({ ...data, videoFile: null });
                                  }}
                                >
                                  Annuler
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={20} md={10}>
                            <Grid container>
                              <Typography
                                fontFamily={"poppins"}
                                variant="h5"
                                color="initial"
                              >
                                Image de prechargement
                              </Typography>
                              {imageFile ? (
                                <img
                                  controls
                                  width={"100%"}
                                  src={imageURL}
                                  onContextMenu="return false;"
                                  style={{ aspectRatio: "5 / 3", margin: 0 }}
                                />
                              ) : (
                                <Skeleton
                                  variant="rectangle"
                                  sx={{
                                    width: "100%",
                                    minHeight: 300,
                                    aspectRatio: "3 / 5",
                                  }}
                                />
                              )}
                              <Grid
                                container
                                width={"100%"}
                                justifyContent={"space-around"}
                                mt={2}
                              >
                                <input
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  onChange={handleImage}
                                  id={`image${idSection}`}
                                  type="file"
                                />

                                <Button
                                  size="small"
                                  LinkComponent={"label"}
                                  htmlFor={`image${idSection}`}
                                  sx={{
                                    textTransform: "none",
                                    color: "var(--c-text)",
                                    width: "max-content",

                                    bgcolor: "white",
                                    borderColor: "var(--c-last)",

                                    fontWeight: "bold",
                                    "&:hover": {
                                      bgcolor: "var(--c-last)",
                                      borderColor: "var(--c-last)",
                                      color: "white",
                                    },
                                  }}
                                  variant="outlined"
                                  startIcon={
                                    <BsCameraFill
                                      style={{ marginRight: "6px" }}
                                    />
                                  }
                                >
                                  {" "}
                                  <label htmlFor={`image${idSection}`}>
                                    Image
                                  </label>
                                </Button>

                                <Button
                                  sx={{
                                    textTransform: "none",
                                    color: "var(--c-text)",

                                    width: "max-content",

                                    bgcolor: "white",
                                    borderColor: "var(--c-rose)",

                                    fontWeight: "bold",
                                    "&:hover": {
                                      bgcolor: "var(--c-rose)",
                                      borderColor: "var(--c-rose)",
                                      color: "white",
                                    },
                                  }}
                                  variant="outlined"
                                  startIcon={<BsXLg />}
                                >
                                  Annuler
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </>
                    )}
                    {/* <Box
                    dangerouslySetInnerHTML={{
                      __html: draftToHtml(
                        convertToRaw(description.getCurrentContent())
                      ),
                    }}
                  /> */}
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={20} md={20}>
                <Box height={"100%"}>
                  <CustomizeRichText
                    value={description}
                    identity="description"
                    onChange={handleRichTextChange}
                    title="Description"
                  />
                </Box>
              </Grid>
              <Grid item xs={20} mt={2} md={20}>
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
                <Box component={"center"} width="100%" height={"100%"}>
                  <Button
                    type="submit"
                    sx={{
                      textTransform: "none",
                      color: "var(--c-text)",
                      minWidth: { xs: "auto", md: 200 },
                      width: "max-content",

                      bgcolor: "white",
                      borderColor: "var(--c-rose)",

                      fontWeight: "bold",
                      "&:hover": {
                        bgcolor: "var(--c-rose)",
                        borderColor: "var(--c-rose)",
                        color: "white",
                      },
                    }}
                    variant="outlined"
                    size="small"
                    startIcon={<BsCheckLg />}
                  >
                    Valider
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
    </div>
  );
}

export default AddLesson;
