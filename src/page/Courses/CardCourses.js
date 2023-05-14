/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect, useLayoutEffect } from "react";
import { AppContext } from "../../app/App";
import { setDoc, getFirestore, doc, getDoc } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import {
  Typography,
  Grid,
  Skeleton,
  Paper,
  Box,
  Hidden,
  IconButton,
  Button,
  CircularProgress,
  Avatar,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { stringAvatar, stringToColor } from "../../widget/header";
import {
  BsBookmarkFill,
  BsFillBookmarkHeartFill,
  BsFillChatSquareTextFill,
  BsShiftFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { useSessionStororage } from "../../hooks/useSessionStorage";
import { iconFontSize } from "../../widget/header";
import { matterDataImg } from "../../data";
import { IoBookmark } from "react-icons/io5";
import { RiFireFill } from "react-icons/ri";
import { CustmiseInputTextArea } from "../../widget/input";
import sr, { cardAnimation } from "../../widget/Animation";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  set,
  serverTimestamp,
} from "firebase/database";
const fs = getFirestore();
const db = getDatabase();
function CardCourses(props) {
  const data = props.data;
  const [ins, setIns] = useState(null);
  const [cU, setCU] = useContext(AppContext).currentUser;
  const [details, setdetails] = useState({});
  const [{ comment, opencomment }, setcomment] = useState({
    comment: "",
    opencomment: false,
  });
  const nav = useNavigate();

  const [{ loading, likeLoading, wishLoading, error }, setState] = useState({
    loading: false,
    wishLoading: false,
    likeLoading: false,
    error: null,
  });

  console.log("data============>", data);
  const getData = async () => {
    try {
      const insData = await (
        await getDoc(doc(fs, `Users/${props.data?.createBy}`))
      ).data();

      await setIns(insData);
      setState((prev) => {
        return { ...prev, loading: false };
      });
    } catch (err) {
      setState((prev) => {
        return { ...prev, error: err, loading: false };
      });
    }
  };

  const like = async () => {
    try {
      const likeListRef = ref(
        db,
        `Course/${data.id}/details/likeList/${cU.uid}`
      );
      const likeRef = ref(db, `Course/${data.id}/details/`);
      if (cU.uid) {
        if (!details?.likeList || !details.likeList[cU.uid]) {
          set(likeRef, { like: details?.like ? details?.like + 1 : 1 });
          set(likeListRef, {
            uid: cU.uid,
            email: cU.email,
            displayName: cU.displayName,
            date: serverTimestamp(),
          });
        } else {
          remove(likeListRef);
          set(likeRef, { like: details?.like - 1 });
        }
      }
    } catch (err) {
      console.log(err);
      setState((prev) => {
        return { ...prev, likeLoading: false, error: err };
      });
    }
  };
  const commentHandler = () => {
    setcomment((prev) => {
      return { ...prev, opencomment: !opencomment };
    });
  };

  const getcoursData = () => {
    const courseRef = ref(db, `Course/${data.id}/details`);
    onValue(courseRef, (snapshot) => {
      setdetails(snapshot.val());
    });
  };
  useEffect(() => {
    getData();
    // sr.reveal(".mycard", cardAnimation);
  }, []);
  useEffect(() => {
    getcoursData();
  }, []);

  return (
    <Grid container m={{ xs: 1, sm: 2, md: 2, lg: 1 }}>
      <Paper
        className="mycard"
        variant="outlined"
        sx={{
          bgcolor: "#f5f8fc",
          // bgcolor: "#fcfcfc",
          textDecoration: "none",
          borderColor: "#dedede",
          borderRadius: "5px",
          overflow: "hidden",
          transition: "all 0.3s 0.05s ease",

          boxShadow:
            // "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
            // " 0 0.875rem 0.875rem -0.375rem rgba(0,0,0,0.6392156862745098)",
            // "0 0.375rem 0.375rem -0.125rem rgba(0,0,0,0.4)",
            " rgba(0, 0, 0, 0.1) 0px 10px 50px",
          "&:hover": {
            boxShadow: " rgba(10, 37, 64, 0.35) 0px -2px 6px 0px ",
            transform: "translateY(-5px)",
          },
          "&:hover img": {
            transform: { md: "scale(1.1, 1.1) rotate(3deg)" },
          },
        }}
      >
        <Box
          width={"100%"}
          maxWidth={320}
          height={{ xs: "max-content", sm: 350, md: 350, lg: 350 }}
        >
          <Link
            style={{ textDecoration: "none", height: "100%", color: "inherit" }}
            to={`${data?.id}`}
          >
            <Grid
              container
              p={0}
              // onClick={(e)=>{e.preventDefault();nav(`${id}`)}}
              pb="8px"
              href={""}
              sx={{
                "&:hover": {
                  ".dots": {
                    display: "inline-flex",
                  },
                },
              }}
              justifyContent={"space-around"}
              direction={"column"}
              alignItems={"center"}
              height="100%"
            >
              <Box
                display={"flex"}
                width={"100%"}
                alignItems={"start"}
                justifyContent={"stretch"}
                minHeight={{ xs: 10, md: 30 }}
              >
                {/* <Box
                component="img"
                height={20}
                src={matterDataImg[data?.matter?.toLowerCase()]}
              /> */}
                <Box
                  px={1}
                  fontSize={17}
                  height={15}
                  width={15}
                  variant="body1"
                  color="white"
                  borderRadius="0 0 3px 0"
                  bgcolor={stringToColor(
                    `6e30f2${data?.matter} 306ef2${data?.matter} f230-e${data?.matter} `
                  )}
                />
                <Box flexGrow={2} />
                <IconButton
                  className="dots"
                  sx={{
                    fontSize: 10,
                    display: "none",
                    borderRadius: "3px",
                  }}
                  size="small"
                >
                  {data?.matter}
                </IconButton>
              </Box>
              <Box
                width="100%"
                flexGrow={2}
                display={"flex"}
                p={1}
                flexDirection={"column"}
              >
                <Box width="100%">
                  <Typography
                    width="100%"
                    variant="inherit"
                    fontFamily={"poppins"}
                    fontWeight={"bold"}
                    color=""
                    textAlign={"left"}
                    fontSize={{ xs: 15, sm: 16, md: 17 }}
                    lineHeight="1"
                  >
                    {data?.title}
                  </Typography>
                </Box>
                <Box flexGrow={2} />
                <Box
                  display={"flex"}
                  width="100%"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Box display={"flex"}>
                    <Avatar
                      sizes="20px 20px"
                      {...stringAvatar(ins?.displayName, {
                        height: 30,
                        width: 30,
                        borderRadius: "3px",
                        fontSize: 12,
                      })}
                      src={ins?.photoURL}
                    />{" "}
                    <Box display={"flex"} ml="4px" flexDirection={"column"}>
                      <Typography
                        component={"span"}
                        variant="caption"
                        fontFamily={"poppins"}
                        color="var(--c-text)"
                      >
                        {ins?.displayName}
                      </Typography>
                      <Typography
                        component={"span"}
                        variant="caption"
                        fontFamily={"poppins"}
                        color="gray"
                        lineHeight={1}
                        fontSize={9}
                      >
                        ingenieur en telecommunication
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    component={"span"}
                    variant="caption"
                    fontFamily={"poppins"}
                    fontWeight={"bold"}
                    color="var(--c-text)"
                  >
                    {data?.level}
                  </Typography>
                </Box>
              </Box>
              <Box
                position={"relative"}
                height={{ xs: 140, sm: 140, md: 150, lg: 170 }}
                width={{ xs: "98", md: "94%" }}
                borderRadius={"3px"}
                mb={1}
                overflow="hidden"
                boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 50px"
                // "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset"
              >
                <Box
                  component="img"
                  borderRadius={0}
                  width="100%"
                  src={data?.photoURL}
                  sx={{
                    margin: "auto",
                    transition: "transform 0.3s 0.05s ease",
                    aspectRatio: "20 / 12",
                  }}
                />
                <Box
                  position={"absolute"}
                  className="glace-nav-bar"
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  sx={{
                    p: 0,
                    display: "flex",
                    width: "100%",
                    height: "110%",
                    borderRadius: "5px",
                    transition: "0.3s",
                    transform: opencomment
                      ? "translateY(-100%)"
                      : "translateY(-0%)",
                  }}
                >
                  <TextField
                    multiline
                    fullWidth
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    label="Filled success"
                    variant="filled"
                    InputLabelProps={{
                      sx: {
                        color: "white!important",

                        fontFamily: "poppins",
                        pb: "12px",
                      },
                    }}
                    InputProps={{
                      sx: {
                        color: "white",
                        fontWeight: "300",
                        height: "100%",
                        borderRadius: "1px",
                        fontSize: 13,
                      },
                    }}
                    color="info"
                    sx={{
                      height: "100%",
                      fontFamily: 5,
                      bgcolor: "#0000008F",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                    rows={5}
                    focused
                  />
                </Box>
              </Box>
              <Box
                minHeight={{ xs: 20, sm: 30, md: 40 }}
                display={"flex"}
                width={"98%"}
                alignItems={"center"}
                bgcolor={"#00000005"}
                mx="auto"
                borderRadius={"5px"}
                justifyContent={"space-around"}
              >
                {opencomment ? (
                  <>
                    {" "}
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        setcomment((prev) => {
                          return { ...prev, opencomment: false };
                        });
                      }}
                      sx={{
                        fontWeight: "bold",
                        borderRadius: "5px",
                        fontSize: { xs: 11, sm: 14, md: 16 },
                        lineHeight: 1,
                        textTransform: "capitalize",
                        color: "var(--c-body)",
                        bgcolor: "var(--c-primary)",
                        "&:hover": {
                          bgcolor: "var(--c-secondary)",
                        },
                      }}
                    >
                      annuler
                    </Button>
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      sx={{
                        fontWeight: "bold",
                        borderRadius: "5px",
                        fontSize: { xs: 11, sm: 14, md: 16 },
                        lineHeight: 1,
                        textTransform: "capitalize",
                        color: "var(--c-body)",
                        bgcolor: "var(--c-primary)",
                        "&:hover": {
                          bgcolor: "var(--c-secondary)",
                        },
                      }}
                    >
                      comment
                    </Button>
                  </>
                ) : (
                  <>
                    {" "}
                    <IconButton
                      disabled={!cU}
                      onClick={(e) => {
                        e.preventDefault();
                        like();
                      }}
                      color="inherit"
                      sx={{
                        fontWeight: "bold",
                        borderRadius: "5px",
                        fontSize: { xs: 11, sm: 14, md: 16 },
                        lineHeight: 1,
                        color: "var(--c-primary)",
                      }}
                      aria-label="like"
                    >
                      {" "}
                      <Box color="#525866" px={"3px"} borderRadius="3px">
                        {likeLoading ? (
                          <CircularProgress
                            color="inherit"
                            sx={{
                              borderColor: "var(--c-primary)",
                            }}
                            thickness={10}
                            size={15}
                          />
                        ) : (
                          <RiFireFill style={{ fontSize: "inherit" }} />
                        )}
                      </Box>
                      {details?.like}
                    </IconButton>
                    <IconButton
                      color="inherit"
                      aria-label="like"
                      onClick={(e) => {
                        e.preventDefault();
                        commentHandler();
                      }}
                      sx={{
                        fontSize: { xs: 11, sm: 14, md: 16 },
                        lineHeight: 1,
                        borderRadius: "5px",
                        color: "#525866",
                        "&:hover": {
                          color: "var(--c-footer)",
                        },
                        "&::after": {
                          color: "#525866",
                          opacity: 1,
                        },
                      }}
                    >
                      {opencomment ? (
                        <BsShiftFill style={{ color: "var(--c-footer)" }} />
                      ) : (
                        <BsFillChatSquareTextFill />
                      )}
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      color="inherit"
                      sx={{
                        fontSize: { xs: 11, sm: 14, md: 16 },
                        color: "#525866",
                        borderRadius: "5px",
                        lineHeight: 1,
                      }}
                    >
                      <IoBookmark />
                    </IconButton>
                  </>
                )}
              </Box>
            </Grid>
          </Link>
        </Box>
      </Paper>
    </Grid>
  );
}
const LoadingCard = () => {
  return (
    <Grid container m={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
      <Paper
        variant="outlined"
        sx={{
          bgcolor: "#eee",

          textDecoration: "none",
          borderRadius: 2,
          overflow: "hidden",
          transition: "all 0.3s 0.05s ease",
          "&:hover": {
            boxShadow: " rgba(10, 37, 64, 0.35) 0px -2px 6px 0px ",
            transform: "translateY(-5px)",
          },
          "&:hover img": {
            transform: { md: "scale(1.1, 1.1) rotate(3deg)" },
          },
        }}
      >
        <Box
          width={"100%"}
          maxWidth={320}
          height={{ xs: "max-content", sm: 350, md: 350, lg: 350 }}
        >
          <Grid
            container
            p={1}
            justifyContent={"space-around"}
            direction={"column"}
            alignItems={"center"}
            minWidth={300}
            maxWidth={300}
            minHeight={360}
            width="100%"
          >
            <Box
              display={"flex"}
              width={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Skeleton
                variant="circular"
                animation="wave"
                sx={{ height: { xs: 30 }, width: { xs: 30 } }}
              />

              <IconButton size="small">
                <BsThreeDotsVertical />
              </IconButton>
            </Box>
            <Box width="100%" flexGrow={2}>
              <Skeleton animation="wave" variant="text" width={"80%"} />
              <Skeleton animation="wave" variant="text" width={"90%"} />
            </Box>
            <Box width="100%">
              <Skeleton animation="wave" variant="text" width={"90%"} />
            </Box>
            <Skeleton
              variant="rectangular"
              height={160}
              animation="wave"
              sx={{ borderRadius: 1 }}
              minWidth={{ xs: 100, sm: 180 }}
              width="98%"
            />
            <Box
              minHeight={50}
              display={"flex"}
              width={"100%"}
              alignItems={"center"}
              justifyContent={"space-around"}
            >
              <Skeleton
                variant="circular"
                animation="wave"
                sx={{ height: { xs: 30 }, width: { xs: 30 } }}
              />
              <Skeleton
                variant="circular"
                animation="wave"
                sx={{ height: { xs: 30 }, width: { xs: 30 } }}
              />
              <Skeleton
                variant="circular"
                animation="wave"
                sx={{ height: { xs: 30 }, width: { xs: 30 } }}
              />
            </Box>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};
const CardCourseForInstructor = (props) => {
  const data = props.data;
  return (
    <Paper
      variant="outlined"
      sx={{
        mx: { xs: 2, md: 5 },
        overflow: "hidden",
        bgcolor: "#0000006",
        "&:hover": {
          boxShadow:
            "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
        },
        "&::after": {
          opacity: 1,
        },
      }}
    >
      <Grid
        container
        component={Link}
        to={`${props.data?.id}`}
        justifyContent={"center"}
        alignContent={"stretch"}
        alignItems={"stretch"}
        sx={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Grid item xs={4} sm={3} md={4}>
          <Grid
            container
            // border={"1px solid green"}
            component={"img"}
            minHeight={{ xs: 90, sm: 150 }}
            height={"100%"}
            maxHeight={200}
            src={data.photoURL}
          />
        </Grid>
        <Grid item xs={8} sm={9} md={8}>
          <Grid
            container
            height={"100%"}
            // border={"1px solid red"}
            pl={3}
            py={{ xs: 1, md: 2 }}
            alignItems={""}
            ju
            direction={"column"}
          >
            <Typography
              variant="h6"
              fontFamily={"popins"}
              fontWeight={"bold"}
              color="initial"
              fontSize={{ xs: 13, sm: 15, md: 20 }}
            >
              {data.title}
            </Typography>
            <Hidden smDown>
              <Typography variant="subtitle1" color="initial">
                {data.description.substring(0, 200)}...
              </Typography>
            </Hidden>
            <Box flexGrow={2} />
            <Grid container justifyContent={"space-around"}>
              <Box fontSize={20} fontWeight={"bold"}>
                {data.like}
                <RiFireFill />
              </Box>
              <Box>
                <BsFillChatSquareTextFill />
              </Box>
              <Box>
                {" "}
                <BsBookmarkFill />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CardCourses;
export { CardCourseForInstructor, LoadingCard };
