import React, { useState, useEffect, useContext } from "react";
// FIXME* Firebase Import
import { getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  collection,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore/lite";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
// FIXME* material import
import {
  Grid,
  Typography,
  Paper,
  Avatar,
  Button,
  IconButton,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import PreHeader from "../../widget/preHeader";
import PreHeaderImg from "../../assets/photo/photo4.jpg";
import CustomizeInput, {
  CustomizeSelect,
  CustmiseInputTextArea,
  CustomizeRichText,
} from "../../widget/input";
// FIXME*Icon import
import {
  BsBarChartSteps,
  BsCameraFill,
  BsCashStack,
  BsCollectionPlayFill,
  BsFillPenFill,
  BsPlusLg,
  BsStack,
  BsXCircleFill,
  BsXLg,
} from "react-icons/bs";
// FIXME/DAta import

import { matterData, priceData, levelData, draftDataList } from "../../data";
import { TransitionAlerts } from "../../widget/connexion";
import { useSessionStororage } from "../../hooks/useSessionStorage";
import { AppContext } from "../../app/App";
import { useNavigate } from "react-router-dom";
const db = getFirestore();
const fireStorage = getStorage();
const myAuth = getAuth();

function AddCourses() {
  // FIXME: Mes States
  const [
    { title, level, matter, image, description, objectif, prerequis, price },
    setData,
  ] = useState({
    image: "",
    title: "",
    level: "",
    matter: "",
    price: "",
    description: "",
    objectif: EditorState.createEmpty(),
    prerequis: EditorState.createEmpty(),
  });
  const [cU, setCU] = useContext(AppContext).currentUser;
  const [{ loading, imageUrl, error }, setState] = useState({
    loading: false,
    imageUrl: null,
    error: null,
  });
  const [{ prerequisItem, objectifItem }, setItem] = useState({
    prerequisItem: "",
    objectifItem: "",
  });
  const nav = useNavigate();
  // FIXME: les Handles
  const handleImage = (e) => {
    const file = e.target.files[0];
    setData((prev) => {
      return { ...prev, image: file };
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const addItemToPrerequis = () => {
    if (prerequisItem && prerequis.indexOf(prerequisItem) == -1) {
      prerequis.push(prerequisItem);
      setData((prev) => {
        return { ...prev, prerequis: prerequis };
      });
      setItem((prev) => {
        return { ...prev, prerequisItem: "" };
      });
    }
  };
  const removeItemToPrerequis = (index) => {
    prerequis.splice(index, 1);
    setData((prev) => {
      return { ...prev, prerequis: prerequis };
    });
  };

  const addItemToObjectif = () => {
    if (objectifItem && objectif.indexOf(objectifItem) == -1) {
      objectif.push(objectifItem);
      setData((prev) => {
        return { ...prev, objectif: objectif };
      });
      setItem((prev) => {
        return { ...prev, objectifItem: "" };
      });
    }
  };
  const handleRichTextChange = (e, identity) => {
    console.log(e);
    setData((prev) => {
      return { ...prev, [identity]: e };
    });
  };
  // FIXME:Les EFfect
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState((prev) => {
          return { ...prev, imageUrl: reader.result };
        });
      };
      reader.readAsDataURL(image);
    } else {
      setState((prev) => {
        return { ...prev, imageUrl: null };
      });
    }
  }, [image]);
  // FIXME: Soumision de la Formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setState((pre) => {
        return { ...pre, loading: true };
      });
      console.log("submit");
      if (image) {
        const coursesRef = await doc(collection(db, "/Courses"));
        const coursesDoc = await getDoc(coursesRef);
        const appDataCoursesRef = await doc(db, "AppData/courses");
        const insRef = await doc(db, `Instructor/${cU.uid}`);

        const storageRef = await ref(
          fireStorage,
          `img/courses/${coursesDoc.id}`
        );
        console.log("storageRef", storageRef);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        console.log(url);
        await setDoc(coursesRef, {
          title: title,
          price: price,
          level: level,
          matter: matter,
          description: description,
          objectif: draftToHtml(convertToRaw(objectif.getCurrentContent())),
          prerequis: draftToHtml(convertToRaw(prerequis.getCurrentContent())),
          photoURL: url,
          createBy: cU.uid,
          nbSection: 0,
          nbCourse: 0,
          like: 0,
          duration: 0,
          likeList: [],
          date: serverTimestamp(),
        });
        await updateDoc(appDataCoursesRef, { list: arrayUnion(coursesDoc.id) });
        await updateDoc(insRef, { courses: arrayUnion(coursesDoc.id) });
        nav(`/instructor/courses/${coursesDoc.id}`);
        console.log("success");
      }
      setState((pre) => {
        return { ...pre, loading: false };
      });
    } catch (err) {
      console.log("erreur", err);
      setState((prev) => {
        return { ...prev, error: err };
      });
      setState((pre) => {
        return { ...pre, loading: false };
      });
    }
  };
  return (
    <Grid container direction={"column"} width="100%" alignItems={"start"}>
      <PreHeader
        img={PreHeaderImg}
        description={
          "Creer une formation signifie aider beaucoup de jeunes qui evoluent dans le secteur concerner"
        }
        title="Partager vos connaissances"
      />

      <Grid item width={"100%"}>
        <Grid container>{error && <TransitionAlerts error={error} />}</Grid>
      </Grid>
      <Grid item width={"100%"}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            columns={13}
            py={{ xs: 3 }}
            px={{ xs: 1 }}
            justifyContent={"space-around"}
            alignItems={"stretch"}
            width="100%"
            position={"relative"}
          >
            {loading && (
              <Box
                bgcolor={"rgba(0,0,0,0.1)"}
                zIndex={100}
                position={"absolute"}
                display={"flex"}
                alignContent={"center"}
                alignItems={"center"}
                justifyContent={"center"}
                top={0}
                left={0}
                bottom={0}
                height={"100%"}
                right={0}
              >
                <CircularProgress color="warning" size={100} thickness={10} />
              </Box>
            )}
            <Grid xs={13} sm={12} md={5} lg={4}>
              <Paper
                variant="outlined"
                sx={{
                  width: "100%",
                  borderRadius: { xs: 1, md: 2 },
                  height: "100%",

                  overflow: "hidden",
                  boxShadow:
                    "rgba(50, 50, 93, 0.15) 0px 10px 10px -12px inset, rgba(0, 0, 0, 0.2) 0px 18px 36px -18px inset",
                  "&:hover": {
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 14px 20px, rgba(0, 0, 0, 0.04) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                  },
                  "&:hover::after": {
                    opacity: 1,
                  },
                  transition: "box-shadow 0.3s 0.05s ease",
                }}
                p={"4px"}
                elevation={12}
              >
                <Grid
                  minHeight={500}
                  container
                  direction={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  pt={2}
                >
                  <Grid width="100%" item>
                    <Grid
                      container
                      width="100%"
                      my={3}
                      justifyContent={"center"}
                      alignItems={"flex-end"}
                    >
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImage}
                        id="ImageURL"
                        type="file"
                      />
                      <label htmlFor="ImageURL">
                        <IconButton
                          style={{ color: "var(--c-footer)" }}
                          aria-label="upload picture"
                          component="span"
                        >
                          {imageUrl ? (
                            <Box
                              component="img"
                              variant="square"
                              src={imageUrl}
                              sx={{ height: 120, width: 160, borderRadius: 5 }}
                            />
                          ) : (
                            <BsCameraFill style={{ height: 100, width: 100 }} />
                          )}
                        </IconButton>
                      </label>

                      {image && (
                        <IconButton
                          variant="outlined"
                          size="small"
                          sx={{ textTransform: "none" }}
                          color="error"
                          onClick={() => {
                            setData((prev) => {
                              return { ...prev, image: null };
                            });
                          }}
                        >
                          <BsXCircleFill />
                        </IconButton>
                      )}
                      <Typography
                        textAlign={"center"}
                        variant="subtitle1"
                        width={"100%"}
                        color="initial"
                      >
                        Donner le profil de votre formation
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      px={{ xs: "4px", md: 2 }}
                      direction={"column"}
                    >
                      <CustomizeInput
                        startIcon={<BsFillPenFill />}
                        placeholder={"Titre de la formaion"}
                        onChange={handleInputChange}
                        name={"title"}
                        value={title}
                        sx={{ my: { xs: 1, md: 2 } }}
                      />
                      <CustomizeSelect
                        startIcon={<BsStack />}
                        placeholder={"Matiére"}
                        onChange={handleInputChange}
                        name={"matter"}
                        list={matterData}
                        value={matter}
                        sx={{ my: { xs: 1, md: 2 } }}
                      />
                      <CustomizeSelect
                        startIcon={<BsBarChartSteps />}
                        placeholder={"Niveau concerné"}
                        onChange={handleInputChange}
                        name={"level"}
                        list={levelData}
                        value={level}
                        sx={{ my: { xs: 1, md: 2 } }}
                      />
                      <CustomizeSelect
                        startIcon={<BsCashStack />}
                        placeholder={"prix de la formaion"}
                        onChange={handleInputChange}
                        name={"price"}
                        list={priceData}
                        value={price}
                        sx={{ my: { xs: 1, md: 2 } }}
                      />
                      <CustmiseInputTextArea
                        placeholder={"Donner une description de la formation"}
                        onChange={handleInputChange}
                        name={"description"}
                        value={description}
                        minRows={4}
                        sx={{ my: { xs: 1, md: 2 } }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid xs={13} sm={12} md={7} lg={8}>
              <Grid
                minHeight={500}
                height={"100%"}
                container
                direction={"column"}
                alignItems={"center"}
                justifyContent={"space-between"}
                alignContent={"space-between"}
                width={"100%"}
              >
                <Grid width={"100%"} mb={3} item>
                  <Paper
                    variant="outlined"
                    sx={{
                      width: "100%",
                      borderRadius: { xs: 1, md: 2 },
                      height: "100%",
                      transition: "all 0.3s 0.05s ease",
                      overflow: "hidden",

                      boxShadow:
                        "rgba(50, 50, 93, 0.15) 0px 10px 10px -12px inset, rgba(0, 0, 0, 0.2) 0px 18px 36px -18px inset",
                      "&:hover": {
                        boxShadow:
                          "rgba(0, 0, 0, 0.25) 0px 24px 55px, rgba(0, 0, 0, 0.04) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                      },
                      "&:hover::after": {
                        opacity: 1,
                      },
                    }}
                    p={"4px"}
                  >
                    <Grid
                      container
                      alignItems={"center"}
                      flexDirection={"column"}
                      width={"100%"}
                    >
                      <CustomizeRichText
                        value={prerequis}
                        identity="prerequis"
                        onChange={handleRichTextChange}
                        title="prerequis"
                        toolbar={draftDataList}
                        classe="list"
                      />
                    </Grid>
                  </Paper>
                </Grid>
                <Grid width={"100%"} pt={3} item>
                  <Paper
                    variant="outlined"
                    sx={{
                      width: "100%",
                      borderRadius: { xs: 1, md: 2 },
                      height: "100%",

                      overflow: "hidden",
                      transition: "all 0.3s 0.05s ease",
                      boxShadow:
                        "rgba(50, 50, 93, 0.15) 0px 10px 10px -12px inset, rgba(0, 0, 0, 0.2) 0px 18px 36px -18px inset",
                      "&:hover": {
                        boxShadow:
                          "rgba(0, 0, 0, 0.25) 0px 24px 55px, rgba(0, 0, 0, 0.04) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                      },
                      "&:hover::after": {
                        opacity: 1,
                      },
                    }}
                    p={"4px"}
                    elevation={12}
                  >
                    <Grid
                      container
                      justifyContent={"center"}
                      alignItems={"center"}
                      flexDirection={"column"}
                      width={"100%"}
                    >
                      <CustomizeRichText
                        value={objectif}
                        identity="objectif"
                        onChange={handleRichTextChange}
                        title="objectif"
                        toolbar={draftDataList}
                        classe="list"
                      />
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item></Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>
            <Button
              disabled={!image || !title || !description || !matter || !level}
              startIcon={<BsPlusLg />}
              endIcon={<BsCollectionPlayFill />}
              variant="contained"
              size="large"
              type="submit"
              sx={{
                textTransform: "none",
                fontSize: { xs: 20 },
                minWidth: { xs: 100, sm: 180 },
                mt: 5,
                bgcolor: "var(--c-footer)",
                color: "white",
              }}
              color="primary"
            >
              Creer Formation
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default AddCourses;
