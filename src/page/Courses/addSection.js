import React, { useState } from "react";
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
} from "@mui/material";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import { headerHeight, KangamSchool } from "../../widget/header";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { BsCheckLg, BsPencilFill, BsXLg } from "react-icons/bs";
import img from "../../assets/undraw/undraw_group_selfie_re_h8gb.svg";
import CustomizeInput, { CustomizeRichText } from "../../widget/input";
import { BsPlusLg } from "react-icons/bs";
import { useParams } from "react-router-dom";
import LoadingPage from "../../widget/loading";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const db = getFirestore();
function AddSection({ setSection }) {
  const [data, setData] = useState({
    title: "",
    description: EditorState.createEmpty(),
  });
  const { idCourse } = useParams();
  const { description, title } = data;
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
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
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const sectionRef = doc(collection(db, `Courses/${idCourse}/Sections/`));
      const courseRef = doc(db, `Courses/${idCourse}`);
      await setDoc(sectionRef, {
        title: data.title,
        description: draftToHtml(convertToRaw(description.getCurrentContent())),
        date: serverTimestamp(),
      });
      await updateDoc(courseRef, { nbSection: increment(1) });
      setSection((prev) => {
        return [...prev, data];
      });
      handleClose();
      setData({ title: "", description: EditorState.createEmpty() });
    } catch (err) {
      console.log("un errrreur", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
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
        onClick={handleClickOpen}
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

        <Box width={"100%"} py={{ xs: 2, sm: 4, md: 8 }}>
          <form onSubmit={onSubmit}>
            <Grid
              container
              justifyContent={"center"}
              alignContent={"stretch"}
              alignItems={"stretch"}
              width={"100%"}
            >
              <Grid item xs={20} md={12}>
                <Grid container height={"100%"}>
                  <Box
                    display={"flex"}
                    flexDirection="column"
                    width={"100%"}
                    height="100%"
                    sx={{
                      borderRadius: 1,
                      bgcolor: "#eee",
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
                          sx={{ maxWidth: 400, my: 2 }}
                          placeholder={"Titre de la section"}
                          startIcon={<BsPencilFill />}
                          onChange={handleChange}
                          name="title"
                        />

                        <CustomizeRichText
                          value={description}
                          identity="description"
                          onChange={handleRichTextChange}
                          title="Description"
                        />
                        <Box component={"center"} my={3}>
                          <Button
                            variant="outlined"
                            size="small"
                            type="submit"
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
                            color="inherit"
                          >
                            nouvelle Section
                          </Button>
                        </Box>
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
              <Grid item xs={20} md={8}>
                <Box
                  display={"flex"}
                  flexDirection="column"
                  height={"100%"}
                  justifyContent="center"
                  px={{ xs: 2, sm: 3 }}
                >
                  <Box component={"img"} maxHeight={200} src={img} />
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
    </div>
  );
}

export default AddSection;
