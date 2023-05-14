import { Suspense, Context, createContext, useEffect } from "react";

// FIXME:CSS-import
import "./App.css";
// FIXME:Firebase
import {
  doc,
  getFirestore,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore/lite";

// FIXME:MAterial-UI

import {
  Toolbar,
  Box,
  Typography,
  AppBar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// FIXME:FILE-Import
import Client from "../page/client";
import MyHeader from "../widget/header";
import Instructor from "../page/instructor";
import Footer from "../widget/footer";
import { headerHeight } from "../widget/header";
import { useSessionStororage } from "../hooks/useSessionStorage";
import LoadingPage from "../widget/loading";
import { getAuth } from "firebase/auth";
import Error from "../page/client/error";
import Home from "../page/client/home";
import Admin from "../page/admin";
const auth = getAuth();
const db = getFirestore();
export const AppContext = createContext();
function App() {
  const [cU, setCU] = useSessionStororage("cU");
  const [list, setList] = useSessionStororage("list");
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  const item = {};
  const getUser = async () => {
    const user = await auth?.currentUser;
    console.log(user);
    try {
      if (auth?.currentUser) {
        const userDoc = await getDoc(await doc(db, `Users/${user.uid}`));
        userDoc
          ? await setCU({
              ...user,
              ...userDoc.data(),
              uid: user.uid,
              ...auth?.currentUser,
            })
          : await setCU(auth?.currentUser);
      }
    } catch (error) {
      console.log(error);
      setCU();
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <AppContext.Provider
      value={{
        currentUser: [cU, setCU],
        list: [list, setList],
        match: [matchesXs, matchesSm],
      }}
    >
      <Router>
        <Box
          sx={{
            display: "flex",
            bgcolor: "oranged",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <MyHeader cu={cU} />
          <Box height={headerHeight} />
          <Box
            sx={{
              display: "flex",
              flexGrow: 2,
              flexDirection: "column",
              width: "100%",

              p: 0,
              paddingLeft: { xs: "8px", sm: "8px", md: "50px" },
            }}
          >
            {/* <Box sx={{ width: "100%", height: { ...headerHeight } }} /> */}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/instructor/*" element={<Instructor />} />
              <Route path="/student/*" element={<Client />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
