import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../app/App";
import {
  setDoc,
  getFirestore,
  increment,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore/lite";
import { Grid, Paper, Box, Divider, Avatar } from "@mui/material/";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { BsCameraVideoFill } from "react-icons/bs";
import {
  IoStatsChart,
  IoFilm,
  IoEasel,
  IoCard,
  IoFolderOpen,
  IoStopwatch,
} from "react-icons/io5";
import { stringAvatar } from "../../widget/header";
import Button from "@mui/material/Button";

import LoadingPage from "../../widget/loading";

const db = getFirestore();
const chipData = [
  { title: "Matiére", data: "matter", icon: <IoStatsChart /> },
  { title: "Niveau", data: "level", icon: <IoEasel /> },
  { title: "Sections", data: "nbSection", icon: <IoFolderOpen /> },
  { title: "Videos", data: "nbLesson", icon: <IoFilm /> },
  { title: "Durréé", data: "duration", icon: <IoStopwatch /> },
  { title: "Prix", data: "price", icon: <IoCard /> },
];
function ViewCourses() {
  const { idCourse } = useParams();
  const [data, setData] = useState(null);
  const [ins, setIns] = useState(null);
  const [cU, setCU] = useContext(AppContext).currentUser;
  const nav = useNavigate();

  const [{ loading, likeLoading, wishLoading, error }, setState] = useState({
    loading: false,
    wishLoading: false,
    likeLoading: false,
    error: null,
  });

  const getData = async () => {
    try {
      setState((prev) => {
        return { ...prev, loading: true };
      });
      const coursesData = await (
        await getDoc(doc(db, `Courses/${idCourse}`))
      ).data();
      await setData(coursesData);

      console.log(coursesData);

      const insData = await (
        await getDoc(doc(db, `Users/${coursesData?.createBy}`))
      ).data();

      await setIns(insData);
    } catch (err) {
      setState((prev) => {
        return { ...prev, error: err };
      });
    } finally {
      setState((prev) => {
        return { ...prev, loading: false };
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return loading ? (
    <LoadingPage />
  ) : (
    <Grid
      container
      direction={"column"}
      px={{ xs: 1, md: 3 }}
      width="100%"
      alignItems={"start"}
    >
      <Grid
        container
        alignItems={"stretch"}
        width={"100%"}
        justifyContent={"space-around"}
        minHeight={"100%"}
        height={"100%"}
        columns={21}
      >
        <Grid position={"relatve"} item xs={20} md={5}>
          <Paper
            component={Grid}
            container
            position={"sticky"}
            top={{ md: 50, lg: 60 }}
            variant="outlined"
            p={{ xs: 2, md: 2 }}
            display={"flex"}
            alignItems={"center"}
            direction={"column"}
            justifyContent={"space-around"}
            alignContent={"center"}
            sx={{
              mt: 2,
              overflow: "hidden",
              width: "100%",
              textDecoration: "none",
              borderRadius: "3px",
              // bgcolor: "#e8ecf0",
              // "var(--c-last-vis)",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px ",
              minHeight: { xs: 300 },
            }}
          >
            <Box
              component="img"
              height={{ xs: 120, md: 130 }}
              borderRadius={1}
              sx={{ aspectRatio: "18/12" }}
              src={data?.photoURL}
            />
            <Box width={"100%"} mt={1}>
              <Typography
                variant="h5"
                fontFamily={"poppins"}
                fontWeight={"bold"}
                color="var(--c-text)"
                textAlign={"center"}
              >
                {data?.title}
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign={"justify"}
                color="var(--c-text)"
                fontSize={{ xs: 13, sm: 15, md: 15 }}
              ></Typography>
            </Box>
            <Box flexGrow={2} />
            <Box display={"flex"} flexDirection="column" width={"100%"}>
              <Box
                display={"flex"}
                justifyContent="space-between"
                width={"100%"}
                flexWrap="wrap"
                mt={2}
              >
                {chipData.map((item, idx) => (
                  <Box
                    key={idx}
                    variant="outlined"
                    border={"1px solid #0000001A"}
                    bgcolor="#0000000A"
                    display="flex"
                    alignItems={"center"}
                    width={{ xs: "max-content", md: "100%" }}
                    overflow="hidden"
                    sx={{
                      my: 1,
                      p: 0,
                      borderRadius: "3px",
                      pl: 2,
                      minWidth: { xs: 200, sm: 140, md: 120, lg: 150 },
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="inherit"
                      color="var(--c-text)"
                      fontWeight={600}
                      lineHeight={1}
                    >
                      {item.title} :
                    </Typography>
                    <Box flexGrow={2} />
                    <Typography
                      component={"span"}
                      variant="body2"
                      fontWeight={"bold"}
                      fontFamily={"poppins"}
                      color="dimgray"
                      pl={1}
                      pr={2}
                      lineHeight={1}
                    >
                      {data && data[item.data]}
                    </Typography>

                    <Box
                      fontSize={{ xs: 20, md: 22 }}
                      bgcolor="var(--c-primary)"
                      color={"var(--c-body)"}
                      px={1}
                      py={"3px"}
                      lineHeight={1}
                    >
                      {item.icon}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box flexGrow={2} />
            <Button
              component={Link}
              to={"playist"}
              variant="contained"
              sx={{
                textTransform: "none",
                dispaly: "flex",
                bgcolor: "var(--c-primary)",
                height: 28,
                pl: 0,
                my: 2,
                "&:hover": {
                  bgcolor: "var(--c-secondary)",
                },
              }}
              color="primary"
              startIcon={
                <Box
                  size="small"
                  sx={{
                    borderRadius: "2px",
                    textTransform: "none",
                    bgcolor: "var(--c-body)",
                    border: "1px solid #00000037",

                    px: 1,

                    justifyContent: "center",
                  }}
                  color="primary"
                >
                  <BsCameraVideoFill
                    style={{
                      color: "var(--c-primary)",
                      lineHeight: 1,
                      marginBottom: "-2px",
                    }}
                  />
                </Box>
              }
              // endIcon={
              //   <Box
              //     size="small"
              //     sx={{
              //       borderRadius: "5px",
              //       textTransform: "none",
              //       bgcolor: "var(--c-body)",
              //       border: "1px solid #00000037",

              //       px: 1,

              //       justifyContent: "center",
              //     }}
              //     color="primary"
              //   >
              //     <BsCameraVideoFill
              //       style={{
              //         color: "var(--c-middle)",
              //         lineHeight: 1,
              //         marginBottom: "-2px",
              //       }}
              //     />
              //   </Box>
              // }
            >
              Demarrer
            </Button>

            <Box flexGrow={2} />
          </Paper>
        </Grid>
        <Grid item xs={20} md={15}>
          <Grid
            container
            my={{ xs: 1, md: 0 }}
            ml={{ md: 2 }}
            direction={"column"}
          >
            <Paper
              component={Grid}
              variant="outlined"
              sx={{
                bgcolor: "#f5f8fc",
                my: { xs: 1, md: 2 },
                overflow: "hidden",
                width: "100%",
                textDecoration: "none",
                borderRadius: "2px",
              }}
            >
              <Grid
                container
                bgcolor={"var(--c-text)"}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box
                  component={"video"}
                  flexGrow={3}
                  p={0}
                  width={{ xs: "100%", md: "90%" }}
                  controls
                  src={data?.introduction}
                  poster={data?.photoURL}
                  contextMenu="return false;"
                  onContextMenu="return false;"
                  style={{ width: "100%", aspectRatio: "16 / 9", margin: 0 }}
                  gesture="media"
                  allowfullscreen
                  allowTransparency
                />
                <Box
                  p={"8px"}
                  display={"flex"}
                  flexDirection="column"
                  width="100%"
                >
                  <Box flexWrap="wrap" display="flex">
                    <Avatar
                      variant="square"
                      {...stringAvatar(ins?.displayName, {
                        borderRadius: "5px",
                        border: "1px Solid #00000009",
                        mr: 2,
                      })}
                      src={ins?.photoURL}
                    />
                    <Box display="flex" flexDirection={"column"}>
                      <Typography
                        variant="inherit"
                        fontWeight={"bold"}
                        color="initial"
                      >
                        {ins?.displayName}
                      </Typography>
                      <Typography
                        variant="inherit"
                        fontSize={{ xs: 12, md: 14 }}
                        color="initial"
                        lineHeight={1}
                      >
                        {ins?.email}
                      </Typography>
                    </Box>
                    <Box width="100%">
                      <Typography
                        variant="inherit"
                        fontWeight={"bold"}
                        color="initial"
                      >
                        Parcour
                      </Typography>
                      <Typography
                        variant="inherit"
                        fontSize={{ xs: 12, md: 14 }}
                        color="initial"
                      >
                        {"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).".substring(
                          0,
                          300
                        )}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    // borderLeft={{ md: "2px solid black" }}

                    flexDirection="column"
                  >
                    {" "}
                    <Typography
                      variant="inherit"
                      fontWeight={"bold"}
                      color="initial"
                    >
                      Description
                    </Typography>
                    <Typography
                      variant="inherit"
                      fontSize={{ xs: 12, md: 14 }}
                      color="initial"
                      maxHeight={300}
                      overflow="auto"
                    >
                      {data?.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Paper>
            {/* <Paper
              component={Grid}
              variant="outlined"
              sx={{
                bgcolor: "#f5f8fc",

                overflow: "hidden",
                width: "100%",
                textDecoration: "none",
                borderRadius: 2,
              }}
            >
              <Grid
                container
                py={1}
                direction={"column"}
                justifyContent={"center"}
              >
                <Typography
                  variant="subtitle2"
                  fontFamily={"poppins"}
                  fontWeight={"bold"}
                  color="initial"
                  px={{ xs: 1, md: 4, lg: 6 }}
                  py={1}
                >
                  Description
                </Typography>
                <Divider variant="fullWidth" sx={{ mt: 1, mb: 2 }} />
                <Typography
                  py={3}
                  maxHeight={400}
                  overflow="auto"
                  px={{ xs: 1, md: 4, lg: 6 }}
                  textAlign={"justify"}
                  variant="subtitle2"
                  color="initial"
                >
                  {data?.description}
                </Typography>
              </Grid>
            </Paper> */}
            <Paper
              component={Grid}
              variant="outlined"
              sx={{
                bgcolor: "#f5f8fc",
                my: { xs: 1, md: 2, lg: 4 },

                overflow: "hidden",
                width: "100%",
                textDecoration: "none",
                borderRadius: 2,
              }}
            >
              <Grid
                container
                py={1}
                direction={"column"}
                justifyContent={"center"}
              >
                <Typography
                  variant="subtitle2"
                  fontFamily={"poppins"}
                  fontWeight={"bold"}
                  color="initial"
                  px={{ xs: 1, md: 4, lg: 6 }}
                  py={1}
                >
                  Prerequis
                </Typography>
                <Divider variant="fullWidth" sx={{ mt: 1, mb: 2 }} />
                <Box
                  py={3}
                  maxHeight={400}
                  overflow="auto"
                  px={{ xs: 1, md: 4, lg: 6 }}
                  dangerouslySetInnerHTML={{ __html: data?.prerequis }}
                />
              </Grid>
            </Paper>
            <Paper
              component={Grid}
              variant="outlined"
              sx={{
                bgcolor: "#f5f8fc",

                overflow: "hidden",
                width: "100%",
                textDecoration: "none",
                borderRadius: 2,
              }}
            >
              <Grid
                container
                py={1}
                direction={"column"}
                justifyContent={"center"}
              >
                <Typography
                  variant="subtitle2"
                  fontFamily={"poppins"}
                  fontWeight={"bold"}
                  color="initial"
                  px={{ xs: 1, md: 4, lg: 6 }}
                  py={1}
                >
                  Objectifs
                </Typography>
                <Divider variant="fullWidth" sx={{ mt: 1, mb: 2 }} />
                <Box
                  py={3}
                  maxHeight={400}
                  overflow="auto"
                  px={{ xs: 1, md: 4, lg: 6 }}
                  dangerouslySetInnerHTML={{ __html: data?.objectif }}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ViewCourses;
