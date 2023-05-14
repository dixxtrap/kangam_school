import React, { useState, useContext } from "react";
import { AppContext } from "../app/App";
import { styled } from "@mui/material/styles";
// FIXME:Firebase Import
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore/lite";
import app from "../service/firebase";
// FIXME:Material -UI import

import MuiAppBar from "@mui/material/AppBar";
import { TiChevronRight } from "react-icons/ti";
import {
  List,
  Box,
  // useMediaQuery,
  CssBaseline,
  Toolbar,
  Button,
  Hidden,
  Paper,
  Slide,
  Stack,
  IconButton,
  Divider,
  Typography,
  ClickAwayListener,
  Avatar,
  Grid,
  ListSubheader,
  Badge,
} from "@mui/material";

// FIXME: Router -import
import {
  BsFillBarChartLineFill,
  BsStar,
  BsInboxes,
  BsJournalBookmarkFill,
  BsFillEnvelopeFill,
  BsFillBookmarkFill,
  BsFillChatSquareTextFill,
  BsLightningFill,
  BsHouse,
  BsFillPlugFill,
  BsPersonLinesFill,
  BsPeople,
  BsBagCheck,
  BsJournals,
  BsCollectionPlay,
} from "react-icons/bs";

import { SiKaios, SiScribd } from "react-icons/si";
// FIXME: CSS import
import "./header.css";
// FIXME:ICON import

import { AiOutlineTeam } from "react-icons/ai";
import {
  IoLibraryOutline,
  IoBagHandleOutline,
  IoMedalOutline,
  IoEaselOutline,
  IoMailOutline,
} from "react-icons/io5";
// FIXME:Hooks import
// FIXME#import Widget
import CustomizedTabs from "./custumizeTap";
// import LoadingPage from "./loading";
import { ConnexionLabel } from "./connexion";
import { primary } from "../data";
// FIXME:Liste des navigation
import { useNavigate, NavLink } from "react-router-dom";
export const headerHeight = { xs: 45, sm: 45, md: 50 };
export const iconFontSize = { xs: 18, sm: 18, md: 20 };
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const list = [
  { icon: <BsHouse />, label: "Accueil", path: "/" },
  { icon: <IoLibraryOutline />, label: "Livres ", path: "/student/books" },
  {
    icon: <BsCollectionPlay />,
    label: "Formations ",
    path: "/student/courses",
  },
  // { icon: <BsFillPlayBtnFill />, label: "Tutoriel ", path: "/formation" },

  {
    icon: <BsPeople />,
    label: "Proffeseurs",
    path: "/student/instructor",
  },
];

const listService = [
  {
    icon: <BsJournals />,
    label: "Devenir Tuteur",
    path: "/student/BecomeTutor",
  },
  // { icon: <BsFillPlayBtnFill />, label: "Tutoriel ", path: "/formation" },

  {
    icon: <IoEaselOutline />,
    label: "Devenir Profeseur",
    path: "/student/BecomeInstructor",
  },
];

const listClient = [
  {
    icon: <BsPersonLinesFill />,
    label: "Profile ",
    path: "/student/profil",
  },
  {
    icon: <BsInboxes />,
    label: "Sections de cours ",
    path: "/student/sectionsCours",
  },

  {
    icon: <IoMedalOutline />,
    label: "Competenses",
    path: "/student/competences",
  },
  { icon: <BsJournalBookmarkFill />, label: "Notes", path: "/student/notes" },

  {
    icon: <IoBagHandleOutline />,
    label: "Pagner",
    path: "/student/formations",
  },
  // {
  //   icon: <BsFillBarChartLineFill />,
  //   label: "Mon Progression",
  //   path: "/student/progressions",
  // },
  { icon: <BsStar />, label: "Liste de  souhait", path: "/student/souhait" },
];
const listTeacher = [
  listClient[0],
  {
    icon: (
      <StyledBadge badgeContent={4} sx={{ mr: "6px" }} color="primary">
        <IoMailOutline />
      </StyledBadge>
    ),
    label: "Message",
    path: "/instructor/messages",
  },
  {
    icon: <BsCollectionPlay />,
    label: "Mes Formations",
    path: "/instructor/courses",
  },
  // {
  //   icon: <BsBagCheck />,
  //   label: "Nouvelle Tutoriel",
  //   path: "/instructor/courses/addCourses",
  // },
  // {
  //   icon: <BsBagCheck />,
  //   label: "Nouvelle  Formation",
  //   path: "/instructor/courses/addTutoriels",
  // },

  { icon: <IoLibraryOutline />, label: "Mes Livres", path: "/instructor/book" },

  // {
  //   icon: BsClipboardData,
  //   label: "Mon Progression",
  //   path: "/Teacher/Progresion",
  // },
];
const listAdmin = [
  { icon: <AiOutlineTeam />, label: "Proffeseurs", path: "/professeur" },
  { icon: <IoLibraryOutline />, label: "Livres ", path: "/client/books" },
  { icon: <BsBagCheck />, label: "Formations", path: "/student/formations" },
];
const drawerWidth = 240;
const db = getFirestore(app);

export const KangamSchool = ({ color, header, gradient }) => (
  <Box
    color={color || "orangered"}
    sx={{
      display: "flex",
      alignItems: "center",
      fontFamily: "Roboto",
      fontWeight: 1000,
      lineHeight: 1,
      zIndex: 4,
      ...(header && {
        borderRadius: "5px",
        bgcolor: "#ffffff5A",
        border: "1px solid #0000000D",
        p: { xs: 1, md: 1 },
        ml: { md: -2, ld: -3 },
        justifySelf: "start",
      }),
    }}
    m={0}
  >
    <Box
      sx={{
        color: "inherit",
        fontSize: header
          ? { xs: 16, md: 18, lg: 20 }
          : { xs: 24, md: 28, lg: 50 },
        p: 0,
        m: 0,
        lineHeight: 1,
        fontWeight: "bold",
        fontFamily: "revert",
      }}
    >
      <SiKaios />
    </Box>
    <Box
      sx={{
        fontSize: header
          ? { xs: 16, md: 18, lg: 20 }
          : { xs: 0, md: 22, lg: 28 },
        lineHeight: 1,
      }}
    >
      angam{" "}
    </Box>
    <Box
      sx={{
        color: "inherit",
        fontSize: header
          ? { xs: 16, md: 18, lg: 20 }
          : { xs: 24, md: 28, lg: 50 },
        p: 0,
        m: 0,
        lineHeight: 1,
        fontWeight: "bold",
        fontFamily: "cursive",
      }}
    >
      <SiScribd />
    </Box>
    <Box
      sx={{
        fontSize: header
          ? { xs: 16, md: 18, lg: 20 }
          : { xs: 0, md: 22, lg: 28 },
        lineHeight: 1,
      }}
    >
      chool{" "}
    </Box>
  </Box>
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
// const styles = {
//   position: "fixed",
//   top: 0,
//   right: 0,
//   left: 0,
//   bottom: 0,
//   zIndex: 100,
//   overflow: "hidden",
//   bgcolor: "rgba(0,0,0,0.2)",
//   display: "flex",
//   flexDirection: "column",
//   bgcolor: "rgba(0,0,0,0.2)",
// };

// const selectedItem = {
//   borderRadius: "30px",
//   py: "3px",
//   color: "inherit",
//   "&.Mui-selected": {
//     background: primary[600],
//     boxShadow: `${primary[600]}46 0px 19px 38px,${primary[600]}10 0px 15px 12px;`,
//     color: "whitesmoke",
//   },
//   "&.Mui-selected:hover": { color: "dimgray" },
// };

export default function MyHeader(props) {
  const auth = getAuth();

  auth.languageCode = "fr";
  const provider = new GoogleAuthProvider();

  const [cU, setCU] = useContext(AppContext).currentUser;
  const [value, setValue] = useState(0);
  console.log("myCU==============>", cU);
  // const theme = useTheme();
  const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState(0);
  // const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonStyle = {
    display: "flex",
    textTransform: "none",
    color: "#2d3843",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
    transition: "width 100ms linear",
    width: !open ? "40px !important" : "98%",
    minWidth: 0,
    height: 35,
    borderRadius: "5px",
    bgcolor: "#ffffff5A",
    border: "1px solid #ffffff53",
    pt: "12px",
    "&:hover": {
      bgcolor: "var(--c-secondary)",
      color: "white",
    },
  };
  const nav = useNavigate();
  const handleNav = (item) => {
    nav(item.path);
  };
  const connexion = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const user = await result.user;

        const userRef = await doc(db, "Users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();

          await setCU(userData);
        } else {
          await setDoc(userRef, {
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            phoneNmber: user.phoneNumber,
            email: user.email,
            emailVerified: user.emailVerified,
            status: "student",
          });
          await setCU({
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            phoneNmber: user.phoneNumber,
            email: user.email,
            emailVerified: user.emailVerified,
            status: "student",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const navigation = (path) => {
  //   setSelected(path);
  //   nav(path);
  //   handleDrawerClose();
  // };
  const activeList =
    cU?.status === "instructor"
      ? listTeacher
      : cU?.status === "admin"
      ? listAdmin
      : null;
  const drawer = (
    <React.Fragment>
      <Box
        display={{ xs: open ? "flex" : "none", sm: "flex" }}
        flexDirection={"column"}
        alignContent="flex-start"
        justifyContent={"flex-start"}
        alignItems="flex-start"
        px={{ xs: "4px" }}
        // border="2px solid red"
        width="100%"
      >
        {list.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            style={{
              textDecoration: "none",
              margin: "auto",
              marginTop: "10px",

              width: "98%",
            }}
          >
            <Button className="navlink" sx={buttonStyle}>
              <Box fontSize={iconFontSize} pr={2}>
                {item.icon}
              </Box>
              <span>{item.label}</span>
            </Button>
          </NavLink>
        ))}
        {activeList && (
          <>
            <Divider sx={{ my: 1 }} />

            {activeList?.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                style={{
                  textDecoration: "none",
                  margin: "auto",
                  marginTop: "10px",
                  width: "98%",
                }}
              >
                <Button className="navlink" sx={buttonStyle}>
                  <Box fontSize={iconFontSize} mr={2}>
                    {item.icon}
                  </Box>
                  <span>{item.label}</span>
                </Button>
              </NavLink>
            ))}
          </>
        )}{" "}
        <Box flexGrow={2} />
        {cU?.status === "student" && (
          <>
            <Divider sx={{ my: 1 }} />

            {listClient.concat(listService)?.map((item, idx) => (
              <NavLink
                to={item.path}
                key={idx}
                style={{
                  textDecoration: "none",
                  margin: "auto",
                  marginTop: "10px",

                  width: "98%",
                }}
              >
                <Button className="navlink" sx={buttonStyle}>
                  <Box fontSize={iconFontSize} mr={2}>
                    {item.icon}
                  </Box>
                  <span>{item.label}</span>
                </Button>
              </NavLink>
            ))}
          </>
        )}
      </Box>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        sx={{ zIndex: 999, width: "100%!important" }}
        color="transparent"
        variant="outlined"
        position="fixed"
        className="glace-nav-bar"
      >
        <Toolbar
          variant="compact"
          sx={{
            bgcolor: "transparent",
            color: "white",
            height: { ...headerHeight },
            px: 0,
          }}
        >
          {/* <LoadingPage/> */}

          <KangamSchool header color="var(--c-primary)" />
          {/* <Hidden mdDown>
             <CustomizedTabs
              handle={handleNav}
              value={value}
              setValue={setValue}
              list={list}
            /> 
          </Hidden> */}
          <Box flexGrow={1} />

          <Stack direction={"row"} alignItems={"center"} justifyContent={"end"}>
            {cU !== null && cU?.email !== null ? (
              <>
                {/* <Hidden lgDown>
              <Button size="small" sx={{fontSize:10}} variant="text" color="warning">
                Devenir Tuteur
              </Button>
              <Button size="small"  sx={{fontSize:10}} variant="text" color="warning">
                Devenir Formateur
              </Button>
              </Hidden> */}
                {/* <Box>
                  <IconButton
                    color="default"
                    size="small"
                    sx={{
                      color: "var(--c-text)",
                      mx: { xs: 1, md: 2 },
                      // fontSize: { ...iconFontSize },
                      borderRadius: "5px",
                      bgcolor: "var(--c-primary)",
                      "&:hover": {
                        bgcolor: "var(--c-secondary)",
                      },
                      border: "2px solid #ffffff23",
                    }}
                  >
                    <BsLightningFill />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      mx: { xs: 1, md: 2 },
                      color: "var(--c-text)",
                      // fontSize: { ...iconFontSize },
                      borderRadius: "5px",
                      bgcolor: "var(--c-primary)",
                      "&:hover": {
                        bgcolor: "var(--c-secondary)",
                      },
                      border: "2px solid #ffffff23",
                    }}
                    color="default"
                  >
                    <BsFillChatSquareTextFill />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      mx: { xs: 1, md: 2 },
                      color: "var(--c-text)",
                      // fontSize: { ...iconFontSize },
                      borderRadius: "5px",
                      bgcolor: "var(--c-primary)",
                      "&:hover": {
                        bgcolor: "var(--c-secondary)",
                      },
                      border: "2px solid #ffffff23",
                    }}
                    color="default"
                  >
                    <BsFillBookmarkFill />
                  </IconButton>
                </Box> */}
                <UserMenu cU={[cU, setCU]} />
              </>
            ) : (
              <ConnexionLabel cu={cU} setCU={setCU} connexion={connexion} />
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        // border={"2px solid red"}
        className="glace-nav-bar"
        sx={{
          position: "fixed",
          flexDirection: "row",
          display: "flex",
          // zIndex: open ? 1010 : 900,
          zIndex: 900,
          top: 0,
          bottom: 0,
          // transform: open ? `translateX(0px)` : `translateX(-245px)`,
          width: open ? `${drawerWidth}px` : { xs: 0, md: `50px` },
          borderRight: {
            xs: " 6px solid var(--c-footer)",
            md: " 1px solid rgba(0,0,0,0.1)",
          },
          transition: "all 500ms",
          boxSizing: "content-box",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              overflowY: "auto",
              alignContent: "center",
              color: "white",
              borderRadius: "0 20px 0 0",
            }}
            pt={1}
            pl={2}
            height={{ ...headerHeight }}
            // border="2px soldi green"
          >
            <Divider />
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                right: { xs: -25, md: -18 },
                zIndex: 2000,
                top: 100,
                bgcolor: "var(--c-primary)",
                color: "white",
                borderRadius: "4px",
                border: "1px solid #00000009",
                "&:hover": {
                  bgcolor: "var(--c-secondary)",
                },
                "&::after": {
                  opacity: 1,
                },
              }}
              color="primary"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <TiChevronRight
                style={{
                  transition: "all 1000ms",
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </IconButton>
          </Box>
          <Box
            sx={{
              borderRadius: "0 0px 20px 0",
              height: "100%",

              overflowX: "hidden",

              // border: "2px solid yellow",
              width: open ? 230 : { xs: 0, md: `50px` },
              color: "white",
            }}
            elevation={10}
          >
            {drawer}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string?.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name, xs) {
  if (!name) {
    return null;
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
      fontFamily: "poppins",
      fontWeight: "bold",
      borderRadius: "5px",
      ...xs,
    },
    children: `${name?.split(" ")[0][0]}${name.split(" ")[1][0]}`.toUpperCase(),
  };
}
// const ListItemStyle = {
//   width: "100%!important",
//   fontSize: { xs: 20 },
//   "&:hover": { bgcolor: primary[400] },
//   borderRadius: 5,
// };
// const ListIconStyle = { fontSize: { ...iconFontSize }, color: "white" };

const UserMenu = (props) => {
  const [cU, setCU] = props.cU;
  const [open, setOpen] = React.useState(false);
  const auth = getAuth();
  const nav = useNavigate();

  // const currentUser=ac.getCurrentUser();
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  const activeList =
    cU.status === "instructor"
      ? listTeacher
      : cU.status === "admin"
      ? listAdmin
      : listClient;
  const deconnexion = async () => {
    nav("/");
    await signOut(auth);

    setCU(null);
  };
  const styles = {
    position: "fixed",
    top: headerHeight,
    borderRadius: "10px",
    right: "0px",
    width: { xs: "100%", sm: 220 },
    zIndex: 1,

    color: "white",
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
      <Box sx={{ position: "relative" }}>
        <Box display={"flex"} alignItems={"baseline"}>
          <Button
            variant="contained"
            disableElevation
            sx={{
              textTransform: "capitalize",
              dispaly: "flex",
              height: { xs: 20, sm: 25 },
              pr: 0,
              pl: "3px",
              fontFamily: "poppins",
              fontWeight: "bold",
              borderRadius: "2px",
              bgcolor: "var(--c-primary)",
              border: "1px solid #00000013",
              color: "var(--c-text)",
              "&:hover": {
                bgcolor: "var(--c-secondary)",
                color: "white",
              },
            }}
            color="primary"
            onClick={handleClick}
            endIcon={
              <Avatar
                variant="square"
                sx={{
                  bgcolor: "var(--c-primary)",
                  borderRadius: "3px",
                  "&:hover": { bgcolor: "var(--c-secondary)" },
                }}
                src={cU.photoURL}
              />
            }
          >
            {`${cU?.displayName?.split(" ")[0][0]}${
              cU?.displayName?.split(" ")[1][0]
            }`.toUpperCase()}
          </Button>
          {/* <IconButton
            onClick={handleClick}
            sx={{
              m: 0,
              p: 0,
              border: "1px solid rgba(255,255,255,0.145)",
            }}
          >
            
          </IconButton> */}
        </Box>

        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Paper sx={styles} elevation={5}>
            <Box
              display={"flex"}
              bgcolor="var(--c-primary)"
              flexDirection="column"
              p={2}
              borderRadius="5px"
            >
              <Grid
                container
                justifyContent="flex-start"
                direction={"row"}
                px={0}
                wrap="nowrap"
                alignItems="center"
                bgcolor={"var(--c-footer)"}
              >
                <Grid item>
                  <Avatar
                    src={cU.photoURL}
                    {...stringAvatar(cU?.displayName, {
                      height: 34,
                      width: 34,
                      fontSize: 14,
                    })}
                  />
                </Grid>
                <Grid item sx={{ lineHeight: 1 }} px={1}>
                  <Typography
                    fontWeight="bold"
                    fontSize={12}
                    variant="body1"
                    fontFamily={"Poppins"}
                    align="left"
                    color={primary[50]}
                  >
                    {cU?.displayName}
                  </Typography>
                  <Typography
                    variant="caption"
                    align="left"
                    color={primary[100]}
                  >
                    {cU?.email}
                  </Typography>
                </Grid>
              </Grid>

              <Divider
                sx={{ borderColor: primary[600], mb: "2px" }}
                variant="fullWidth"
              />
              <Box display={"flex"} flexDirection={"column"}>
                {activeList.map((item, idx) => (
                  <Button
                    key={idx}
                    component="span"
                    onClick={() => {
                      nav(item.path);
                    }}
                    size="small"
                    sx={{
                      pl: { xs: 1, sm: 2 },
                      justifyContent: "flex-start",
                      textTransform: "none",
                      color: primary[50],
                      fontSize: 13,
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: "#FFFFFF20",
                      },
                    }}
                    startIcon={item.icon}
                  >
                    {item.label}
                  </Button>
                ))}

                <Button
                  component="span"
                  onClick={deconnexion}
                  size="small"
                  sx={{
                    pl: { xs: 1, sm: 2 },
                    justifyContent: "flex-start",
                    textTransform: "none",
                    color: primary[50],
                    fontSize: 13,
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "#FFFFFF20",
                    },
                  }}
                  startIcon={<BsFillPlugFill />}
                >
                  Deconnexion
                </Button>
              </Box>
            </Box>
          </Paper>
        </Slide>
      </Box>
    </ClickAwayListener>
  );
};
