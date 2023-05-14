/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// FIXME: Firebase Import
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, getDoc, setDoc } from "firebase/firestore/lite";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
// FIXME: Material Import
import {
  Grid,
  Typography,
  Button,
  Box,
  Avatar,
  Paper,
  CircularProgress,
  Hidden,
  AlertTitle,
  ButtonGroup,
} from "@mui/material";
import CustomizeInput, { CustomizeInputPassword } from "./input";
import { BsPersonCircle, BsPlugFill } from "react-icons/bs";
import { GiPadlock } from "react-icons/gi";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { TiDeleteOutline } from "react-icons/ti";
import { FcOldTimeCamera } from "react-icons/fc";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { styled as makeStyles } from "@mui/material/styles";
import { FcGoogle } from "react-icons/fc";

import Dialog from "@mui/material/Dialog";
import { headerHeight } from "./header";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { BsX } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import Slide from "@mui/material/Slide";
import { KangamSchool } from "./header";
// FIXME:Icon Import
import loginImg from "../assets/undraw/primary-bg.ec63b4f8.svg";
import signupImg from "../assets/undraw/primary-bg.ec63b4f8.svg";
const styles = {
  position: "fixed",
  top: { xs: 45, sm: 45, md: 50 },
  right: "0px",
  width: { xs: "100%", sm: 320, md: 350 },
};
const auth = getAuth();
const fireStorage = getStorage();
const fireStore = getFirestore();

const inputWidth = { maxWidth: 450, witdh: "100%" };
export function ConnexionLabel({ cU, setCU, connexion }) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
            <IoPersonSharp
              style={{
                color: "var(--c-middle)",
                lineHeight: 1,
                marginBottom: "-2px",
              }}
            />
          </Box>
        }
      >
        Connexion
      </Button>

      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box sx={styles}>
          <Paper
            variant="outlined"
            sx={{
              ...inputWidth,
              width: "100%",
              borderRadius: 1,
              height: "100%",

              px: { xs: 1 },
              pb: 2,
              overflow: "hidden",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 24px 55px, rgba(0, 0, 0, 0.08) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",

              // "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            }}
            elevation={12}
          >
            <Box my={3} width="100%" display={"flex"} justifyContent={"center"}>
              <ButtonGroup
                variant="contained"
                size="small"
                color="inherit"
                aria-label=""
                disableElevation
                sx={{
                  margin: "auto",

                  height: 25,
                  textTransform: "capitalize",
                }}
              >
                <Button
                  sx={{
                    textTransform: "none",
                    dispaly: "flex",
                    bgcolor: "var(--c-middle)",
                    color: "white",
                    pl: 0,
                  }}
                  color="info"
                  onClick={() => connexion()}
                  startIcon={
                    <Box
                      size="small"
                      sx={{
                        textTransform: "none",
                        bgcolor: "white",
                        alignContent: "center",
                        borderRadius: "3px",
                        border: "1px solid #00000037",

                        aspectRatio: "1 / 1",
                        px: 1,
                      }}
                      color="inherit"
                    >
                      <FcGoogle
                        style={{
                          lineHeight: 1,
                          color: "var(--bg-primary)",
                          marginBottom: "-4px",
                        }}
                      />
                    </Box>
                  }
                >
                  Google
                </Button>
                <Button
                  sx={{
                    textTransform: "none",
                    dispaly: "flex",
                    height: 25,
                    bgcolor: "var(--c-middle)",
                    color: "var(--c-body)",
                  }}
                  color="info"
                  onClick={() => {
                    setLabel(false);
                  }}
                  // startIcon={
                  //   <Box
                  //     size="small"
                  //     sx={{
                  //       borderRadius: "5px",
                  //       textTransform: "none",
                  //       bgcolor: "white",
                  //       alignContent: "center",
                  //       border: "1px solid #00000037",

                  //       aspectRatio: "1 / 1",
                  //       px: 1,
                  //     }}
                  //     color="primary"
                  //   >
                  //     <FcGoogle
                  //       style={{
                  //         lineHeight: 1,
                  //         color: "var(--bg-primary)",
                  //         marginBottom: "-4px",
                  //       }}
                  //     />
                  //   </Box>
                  // }
                >
                  Se connecter
                </Button>
                <Button
                  sx={{
                    textTransform: "none",
                    dispaly: "flex",
                    height: 25,
                    pr: 0,
                    color: "var(--c-body)",
                    bgcolor: "var(--c-middle)",
                  }}
                  color="info"
                  onClick={() => {
                    setLabel(true);
                  }}
                  endIcon={
                    <Box
                      size="small"
                      sx={{
                        borderRadius: "5px",
                        textTransform: "none",
                        bgcolor: "white",
                        alignContent: "center",
                        border: "1px solid #00000037",

                        aspectRatio: "1 / 1",
                        px: 1,
                      }}
                    >
                      <FcGoogle
                        style={{
                          lineHeight: 1,
                          color: "var(--bg-primary)",
                          marginBottom: "-4px",
                        }}
                      />
                    </Box>
                  }
                >
                  S'incrire
                </Button>
                {/* <Button
                  sx={{
                    textTransform: "none",
                    dispaly: "flex",
                    height: 20,
                    pl: 0,
                  }}
                  color="primary"
                  onClick={() => {
                    setLabel((prev) => !prev);
                  }}
                  startIcon={
                    <Box
                      size="small"
                      sx={{
                        borderRadius: "50%",
                        textTransform: "none",
                        bgcolor: "white",
                        alignContent: "center",
                        border: "1px solid #00000037",
                        mr: "8px",
                        aspectRatio: "1 / 1",
                        px: 1,
                      }}
                      color="primary"
                    >
                      <FcGoogle style={{ color: "var(--bg-primary)" }} />
                    </Box>
                  }
                >
                  S'inscrire
                </Button> */}
              </ButtonGroup>
            </Box>
            {label ? (
              <SignUp
                cU={cU}
                setCU={setCU}
                connexion={connexion}
                loading={loading}
                setLoading={setLoading}
                handleClose={handleClose}
                setLabel={setLabel}
              />
            ) : (
              <Connexion
                cU={cU}
                setCU={setCU}
                connexion={connexion}
                handleClose={handleClose}
                loading={loading}
                setLoading={setLoading}
                setLabel={setLabel}
              />
            )}
          </Paper>
        </Box>
      </Slide>
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export function TransitionAlerts({ error }) {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ margin: "10%", width: "100%", maxWidth: 500 }}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <TiDeleteOutline fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>error type: {error.type || "inconue"}</AlertTitle>

          {error.message}
        </Alert>
      </Collapse>
    </Box>
  );
}

const Connexion = ({
  cU,
  setCU,
  loading,
  setLoading,
  handleClose,
  connexion,
  setLabel,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = (await signInWithEmailAndPassword(auth, email, password))
        .user;

      console.log("myUser", user);
      if (user) {
        const userDoc = await getDoc(await doc(fireStore, `Users/${user.uid}`));
        if (userDoc.exists) {
          await setCU({ ...user, ...userDoc.data(), uid: userDoc.id });
        }
      }
      setLoading(false);
      handleClose();
    } catch (err) {
      console.log("catch", err);

      setError(err);
      setLoading(false);
    }
  };

  return !loading ? (
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
        width="100%"
      >
        <Grid item>
          <Grid container justifyContent={"center"} direction={"column"}>
            {/* <Box
              fontSize={{ xs: 30, sm: 60, md: 80, lg: 100 }}
              color={"dimgray"}
            >
              <Hidden mdDown>
                <BsPersonCircle />
              </Hidden>
              <Hidden mdUp>
                <Box
                  maxWidth={250}
                  width="90%"
                  component="img"
                  src={loginImg}
                />
              </Hidden>
            </Box> */}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justifyContent={"center"} direction={"column"}>
            <Typography
              variant="inherit"
              color="dimgray"
              fontSize={{ xs: "1.50rem", sm: "2.0rem", md: " 2.2rem" }}
              lineHeight={{ sm: 1.1222222222222223, md: 1.2222222222222223 }}
              sx={{ letterSpacing: 0, fontFamily: "Pppins", fontWeight: 1000 }}
              fontFamily="poppins"
            >
              Connexion
            </Typography>
          </Grid>
        </Grid>
        {error && (
          <Grid item>
            <Grid container justifyContent={"center"} direction={"column"}>
              <TransitionAlerts error={error} />
            </Grid>
          </Grid>
        )}
        <Grid item width="100%" pt={2}>
          <Grid container width={"100%"} flexDirection={"column"}>
            <CustomizeInput
              startIcon={<BsPersonCircle />}
              placeholder="Donnez vore email"
              value={email}
              onChange={handleEmail}
            />
          </Grid>
        </Grid>
        <Grid width="100%" item pt={2}>
          <Grid flexDirection={"column"} container>
            <CustomizeInputPassword
              startIcon={<GiPadlock />}
              placeholder="mot de passe"
              value={password}
              onChange={handlePassword}
            />
          </Grid>
        </Grid>
        <Grid item pt={2}>
          <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            direction="column"
          >
            <Button
              disabled={!email || !password}
              variant="contained"
              type="submit"
              color="primary"
              sx={{
                bgcolor: "var(--c-primary)",
                textTransform: "none",
                color: "white",
                borderRadius: "4px",
                py: "2px",
                "&:hover": { bgcolor: "var(--c-secondary)" },
              }}
            >
              Connexion
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  ) : (
    <center>
      <Box
        my={{ xs: 3, md: 10 }}
        className="myloader"
        alignSelf={"center"}
      ></Box>
    </center>
  );
};

const SignUp = ({ cU, setCU, loading, setLoading, handleClose }) => {
  const classes = useStyles();
  console.log("Connexion:myUser", cU);
  const [login, setLogin] = useState({
    email: "",
    displayName: "",
    imageURL: "",
    image: null,
    password: "",
    confirmPassword: "",
  });
  const { displayName, email, password, confirmPassword } = login;
  const [image, setImage] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogin({ ...login, imageURL: reader.result });
      };
      reader.readAsDataURL(image);
    } else {
      setLogin({ ...login, imageURL: "" });
    }
  }, [image]);
  const handleImage = (e) => {
    const files = e.target.files[0];
    setImage(files);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCrdential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCrdential.user;
      if (user) {
        if (image) {
          const storageRef = await ref(fireStorage, `img/profil/${user.uid}`);
          await uploadBytes(storageRef, image);
          const url = await getDownloadURL(storageRef);
          await setLogin({ ...login, url: url });
          await updateProfile(user, {
            displayName: displayName,
            photoURL: url,
          });
        } else {
          await updateProfile(user, {
            displayName: displayName,
            photoURL: "",
          });
        }

        const userDoc = doc(fireStore, `Users/${user.uid}`);
        const userData = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          emailVerified: user.emailVerified,
          status: "student",
          uid: user.uid,
        };
        await setDoc(userDoc, userData);
        await setCU(userData);
        console.log(user);
        setLoading(false);

        handleClose();
      }
    } catch (err) {
      console.log("catch");
      console.log(err);
      setError(err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {loading ? (
        <center>
          <Box
            my={{ xs: 3, md: 10 }}
            className="myloader"
            alignSelf={"center"}
          ></Box>
        </center>
      ) : (
        <Grid
          container
          rowSpacing={3}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          pt={2}
        >
          {error && (
            <Grid item>
              <TransitionAlerts error={error} />
            </Grid>
          )}
          {/* <Grid item>
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: "none" }}
              onChange={handleImage}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                style={{ color: "var(--c-text)" }}
                aria-label="upload picture"
                component="span"
              >
                {login.imageURL !== "" ? (
                  <Avatar
                    src={login.imageURL}
                    style={{ height: 100, width: 100 }}
                  />
                ) : (
                  <FcOldTimeCamera style={{ height: 100, width: 100 }} />
                )}
              </IconButton>
            </label>
          </Grid> */}
          <Grid width="100%" item>
            <CustomizeInput
              startIcon={<BsPersonCircle />}
              placeholder="nom , prenom"
              name="displayName"
              value={displayName}
              onChange={handleChange}
            />
          </Grid>
          <Grid width="100%" item>
            <CustomizeInput
              startIcon={<MdOutlineAlternateEmail />}
              placeholder="email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Grid>
          <Grid width="100%" item>
            <CustomizeInputPassword
              startIcon={<GiPadlock />}
              placeholder="mot de passe"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Grid>
          <Grid width="100%" item>
            <CustomizeInputPassword
              startIcon={<GiPadlock />}
              value={confirmPassword}
              name="confirmPassword"
              placeholder="confirmer votre mot de passe "
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Grid
              container
              justifyContent="center"
              direction="column"
              alignItems="center"
              pb={3}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  minWidth: 230,
                  bgcolor: "var(--c-footer)",
                  textTransform: "none",
                  color: "white",
                }}
                type="submit"
                disabled={
                  !displayName ||
                  !email ||
                  !password ||
                  !(password === confirmPassword)
                }
              >
                S'inscrire{" "}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </form>
  );
};

export default Connexion;
export { SignUp };
