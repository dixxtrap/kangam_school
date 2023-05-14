/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { AppContext } from "../../app/App";
import {
  IoNewspaper,
  IoNewspaperOutline,
  IoPlayOutline,
  IoSend,
  IoChevronDown,
} from "react-icons/io5";
import {
  BsFillJournalBookmarkFill,
  BsChatRightText,
  BsJournalMedical,
  BsPlus,
} from "react-icons/bs";
import { CustmiseInputTextArea, CustomizeRichText } from "../../widget/input";
import { stringAvatar } from "../../widget/header";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import EditorState from "draft-js/lib/EditorState";
import { draftDataList, getDate, MonthData } from "../../data";

// Firebase import

import {
  ref,
  set,
  getDatabase,
  serverTimestamp,
  push,
  onValue,
  update,
} from "firebase/database";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore/lite";
import { Divider } from "@mui/material";
const db = getDatabase();
const fs = getFirestore();
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ py: 3, px: { xs: 0, md: 3, lg: 18, xl: 18 } }}>{children}</Box>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const stylelabel = {
  fontWeight: 600,
  color: "var(--c-text)",
  textTransform: "capitalize",
  fontSize: { md: 12, lg: 14 },
  py: 0,
  my: 0,
};
const Tabulation = ({ ins, course, videoRef, cU, current, currentTime }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const match = useContext(AppContext).match;
  // console.log("macth", match);
  return (
    <Box sx={{ width: "100%" }} bgcolor="#fff" p={0} m={0}>
      <Box
        sx={{ display: "flex", borderBottom: 1, borderColor: "divider" }}
        p={0}
        m={0}
      >
        <Box flexGrow={1} />
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ py: 0, my: 0 }}
          py={0}
          my={0}
        >
          <Tab
            sx={stylelabel}
            // icon={
            //   <Box fontSize={{ xs: 20, sm: 25, md: 30 }} my={0}>
            //     <IoNewspaperOutline />
            //   </Box>
            // }
            // iconPosition="start"
            label={
              <Box display="flex" justifyContent={"center"} alignItems="center">
                <Box fontSize={{ xs: 20, md: 25 }} pr={1} py={0} my={0}>
                  <IoNewspaperOutline />
                </Box>
                {!match[0] && <span>Descriptif</span>}
              </Box>
            }
            {...a11yProps(0)}
          />
          <Tab
            sx={stylelabel}
            // iconPosition="start"
            // icon={
            //   <Box fontSize={{ xs: 20, sm: 25, md: 30 }} my={0}>
            //     <IoChatboxEllipsesOutline />
            //   </Box>
            // }
            label={
              <Box display="flex" justifyContent={"center"} alignItems="center">
                <Box fontSize={{ xs: 20, md: 25 }} pr={1} py={0} my={0}>
                  <BsChatRightText />
                </Box>
                {!match[0] && <span>Q & R</span>}
              </Box>
            }
            {...a11yProps(1)}
          />
          <Tab
            sx={stylelabel}
            label={
              <Box display="flex" justifyContent={"center"} alignItems="center">
                <Box fontSize={{ xs: 20, md: 25 }} pr={1} py={0} my={0}>
                  <BsFillJournalBookmarkFill />
                </Box>
                {!match[0] && <span> NoteBook</span>}
              </Box>
            }
            {...a11yProps(2)}
          />

          <Tab
            sx={stylelabel}
            // iconPosition="start"
            // icon={

            // }
            label={
              <Box display="flex" justifyContent={"center"} alignItems="center">
                <Box fontSize={{ xs: 20, md: 25 }} pr={1} py={0} my={0}>
                  <BsJournalMedical />
                </Box>
                {!match[0] && <span> Course</span>}
              </Box>
            }
            {...a11yProps(3)}
          />
        </Tabs>
        <Box flexGrow={1} />
      </Box>
      <TabPanel value={value} index={0}>
        {ins?.displayName}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {current?.description ? (
          <Box
            sx={{ fontSize: "1px!important", overflowY: "auto" }}
            width={"100%"}
            maxHeight={500}
            dangerouslySetInnerHTML={{
              __html: current?.description,
            }}
          />
        ) : (
          <Typography variant="h1" color="initial">
            Nothing to describe
          </Typography>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NoteBookTap
          cU={cU}
          current={current}
          videoRef={videoRef}
          course={course}
          currentTime={currentTime}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {!!course && <QRtap course={course} />}
      </TabPanel>
    </Box>
  );
};

// Description
const DescriptionTap = (matter, idCouse) => {
  return <div>Description</div>;
};

// Question &Response
const QRtap = ({ course }) => {
  const [cU, setCU] = useContext(AppContext).currentUser;
  const [{ question, respone }, setState] = useState({
    question: "",
    respone: "",
  });
  const [post, setpost] = useState([]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = async () => {
    const forumRef = await ref(db, `Course/${course.id}/Forum`);
    const postRef = await push(forumRef);

    set(postRef, {
      user: {
        uid: postRef.key,
        userUid: cU.uid,
        displayName: cU.displayName,
        photoURL: cU?.photoURL,
        email: cU.email,
      },
      post: question,

      date: serverTimestamp(),
    });
    console.log("success");
    setState((prev) => {
      return { ...prev, question: "" };
    });
  };

  useEffect(() => {
    onValue(
      ref(db, `Course/${course.id}/Forum`),

      (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data !== null) {
          setpost([]);
          Object.values(data).map((post) => {
            setpost((prev) => [
              ...prev,
              { ...post, dateTime: getDate(post.date, true) },
            ]);
          });
        }
      }
    );
  }, []);

  // const ctx = useContext(AppContext);
  // console.log("ctx", ctx);
  return (
    cU && (
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"column"}
        border="1px solid #00000012"
        minHeight={{ xs: 300, md: 600 }}
      >
        <Box
          pt={{ xs: 1, md: 3 }}
          px={{ xs: 0, md: 3 }}
          width={"100%"}
          display="flex"
        >
          <Avatar
            {...stringAvatar(cU.displayName, { mr: 2 })}
            src={cU.photoURL}
          />
          <CustmiseInputTextArea
            sx={{ flexGrow: 2 }}
            placeholder="poser votre question"
            onChange={handleChange}
            value={question}
            name="question"
            startIcon={"?"}
            size="small"
            minRows={"2"}
          />
        </Box>
        <Box my="6px" px={{ xs: 0, md: 3 }} mb="15px" alignSelf={"end"}>
          {!!question && (
            <Button
              size="small"
              variant="contained"
              disableElevation
              sx={{ textTransform: "none", borderRadius: "2px", py: 0 }}
              color="primary"
              endIcon={<IoSend />}
              onClick={onSubmit}
            >
              Poster
            </Button>
          )}
        </Box>
        <Divider />
        <Box
          width={"100%"}
          display="flex"
          px={{ xs: 0, md: 3 }}
          // bgcolor={"var(--c-last-vis)"}
          flexGrow={2}
          flexDirection={"column-reverse"}
        >
          {post.map((item, index) => (
            <Box key={index} display="flex" my={2} flexDirection={"column"}>
              <Box display="flex" alignItems={"start"}>
                <Avatar
                  {...stringAvatar(cU.displayName, { borderRadius: "3px" })}
                  src={item.user.photoURL}
                />
                {/* <Box
                  p={0}
                  component="span"
                  m={0}
                  color={"var(--c-last-vis)"}
                  fontSize={{ xs: 11, md: 15, lg: 30 }}
                >
                  <IoCaretBackOutline />
                </Box> */}
                <Box
                  ml="10px"
                  display="flex"
                  boxShadow=" rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
                  flexDirection={"column"}
                  borderRadius={"3px"}
                  flexGrow={2}
                  bgcolor="#0000000F"
                  border="1px soild #e0e5e9 "
                  p={2}
                  pt={{ xs: "6px", md: "8px" }}
                >
                  {" "}
                  <Typography
                    lineHeight={1}
                    variant="subtitle2"
                    color="initial"
                  >
                    {item.user.displayName}
                  </Typography>{" "}
                  <Box display="flex" justifyContent={"space-between"}>
                    <Typography
                      lineHeight={1.6}
                      variant="subtitle2"
                      color="gray"
                      fontFamily={"poppins"}
                      fontStyle="italic"
                      fontWeight="thin"
                      fontSize={{ xs: 10, sm: 12 }}
                    >
                      {item.user.email}
                    </Typography>{" "}
                    <Typography
                      lineHeight={1.3}
                      variant="subtitle2"
                      color="gray"
                      fontSize={{ xs: 10, sm: 11 }}
                      fontWeight="400"
                    >
                      {`  ${item.dateTime.getHours()}  :  ${item.dateTime.getMinutes()} | 
                      ${MonthData[item.dateTime.getMonth()]} 
                      , ${item.dateTime.getDate()} , 
                     
                       ${item.dateTime.getFullYear()}`}
                    </Typography>{" "}
                  </Box>
                  <Typography
                    overflow="clip"
                    variant="body2"
                    color="var(--c-text)"
                    mt={"8px"}
                    fontFamily="sans-serif"
                  >
                    {item.post}
                  </Typography>
                </Box>
              </Box>
              {/* <Box
                mt={{ xs: 1, md: 2 }}
                pr={{ md: 3 }}
                pl={{ xs: 1, md: 5, lg: 8 }}
                bgcolor={"var(--c-last-vis)"}
              ></Box> */}
              <Box mt="6px" px={{ xs: 0, md: 3 }} alignSelf={"end"}>
                <Button
                  size="small"
                  variant="text"
                  disableElevation
                  sx={{
                    textTransform: "none",
                    borderRadius: "2px",
                    py: 0,
                    fontWeight: 600,
                  }}
                  color="primary"
                >
                  Aimer
                </Button>
                <Button
                  size="small"
                  variant="text"
                  disableElevation
                  sx={{
                    textTransform: "none",
                    borderRadius: "2px",
                    py: 0,
                    mx: 1,
                    fontWeight: 600,
                  }}
                  color="primary"
                >
                  Repondre
                </Button>
                <Button
                  size="small"
                  variant="text"
                  disableElevation
                  sx={{
                    textTransform: "none",
                    borderRadius: "2px",
                    py: 0,
                    fontWeight: 600,
                  }}
                  color="primary"
                >
                  Reposter
                </Button>

                <Typography variant="caption" color="initial">
                  | 23 liked
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    )
  );
};
// Note book

const NoteBookTap = ({ cU, course, current, videoRef, currentTime }) => {
  const [{ note, noteString }, setstate] = useState({
    note: "",
    noteString: "",
  });
  const [notes, setnotes] = useState([]);
  const { idCourse } = useParams();
  const HandleChange = (e) => {
    const { value, name } = e.target;
    setstate((prev) => {
      return { ...prev, [name]: value };
    });
    console.log("note===========>", note);
  };

  const validate = (e) => {
    if (e.key === "Enter" && e.shiftKey) console.log("shift + enter");
  };
  const onSubmit = async () => {
    if (!!current) {
      try {
        const noteRef = ref(
          db,
          `User/${cU.uid}/Note/${idCourse}/${current.idSection}/notes`
        );

        const postRef = push(noteRef);
        set(postRef, {
          note: note,
          position: currentTime(),
          current: current,
        });
        setstate((prev) => {
          return { ...prev, note: "" };
        });
        if (notes.findIndex((i) => i.key === current.idSection) === -1) {
          const notesRef = ref(
            db,
            `User/${cU.uid}/Note/${idCourse}/${current.idSection}/`
          );
          update(notesRef, {
            title: current.sectionTitle,
          });
        }
      } catch (error) {}
    }
  };

  const getdada = async () => {
    if (!!cU)
      onValue(ref(db, `User/${cU.uid}/Note/${idCourse}/`), (snap) => {
        const snapshot = snap.val();
        if (snapshot !== null) {
          setnotes([]);
          Object.values(snapshot)?.forEach((post) => {
            console.log("post", post);
            setnotes((prev) => [
              ...prev,
              { ...post, dateTime: getDate(post.date, true) },
            ]);
          });
        }
      });
  };
  useEffect(() => {
    document.addEventListener("keydown", validate);
    getdada();
  }, []);
  return !!cU ? (
    notes ? (
      <Box
        display={"flex"}
        flexDirection="column"
        width={"100%"}
        // border="2px solid red"
      >
        <Box>
          {/* <CustmiseInputTextArea
          startIcon={<BsFillJournalBookmarkFill />}
          placeholder={"Noter une phrase"}
          minRows={3}
        /> */}
          <CustmiseInputTextArea
            placeholder={"shift+entrer (pour valider la note)"}
            minRows={4}
            value={note}
            onChange={HandleChange}
            name="note"
          />
        </Box>
        <Box mt="8px">
          {note.length > 20 && (
            <Button
              size="small"
              variant="contained"
              disableElevation
              sx={{ textTransform: "none", borderRadius: "2px", py: 0 }}
              color="primary"
              endIcon={<IoSend />}
              onClick={onSubmit}
            >
              Noter
            </Button>
          )}
        </Box>
        <Box display={"flex"} flexDirection="column">
          {notes?.map((item, idx) => (
            <NoteItem {...{ item, idx }} />
          ))}
        </Box>
      </Box>
    ) : (
      <Box>sknsnsnk</Box>
    )
  ) : (
    <Typography variant="h4" color="initial">
      Vous devez vous connecter
    </Typography>
  );
};

const NoteItem = ({ idx, item }) => {
  const [open, setopen] = useState(false);
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      border="1px solid #00000016"
      borderRadius={"4px"}
      my={1}
    >
      <Box display={"flex"} flexDirection="column">
        <Button
          display={"flex"}
          color={"inherit"}
          py={1}
          px={2}
          sx={{
            justifyContent: "space-between",
            borderRadius: 0,
            bgcolor: "#00000012",
          }}
          onClick={() => {
            setopen(!open);
          }}
          endIcon={<IoChevronDown />}
        >
          <Typography
            variant="inherit"
            fontFamily={"poppins"}
            color="initial"
            fontWeight={"bold"}
          >
            {idx + 1} : {item.title}
          </Typography>
        </Button>
        <Box
          overflow={"hidden"}
          sx={{
            // transitionProperty: "height",
            // " transition-duration": "2s",
            // "transition-timing-function": "",
            // transitionTimingFunction: "linear",
            height: !open ? 0 : "100%",
            // ,transition: "height 4s linear"
          }}
        >
          {Object.values(item.notes)?.map((inote, idx) => (
            <Box display={"flex"} flexDirection="column">
              <Button
                startIcon={<IoPlayOutline />}
                variant="text"
                sx={{
                  textTransform: "capitalize",
                  justifyContent: "flex-start",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                color="primary"
              >
                {inote.current.title} (
                {`0${Math.floor(inote.position / 60)}`.substr(-2)}
                {" : "}
                {`0${Math.round(inote.position % 60)}`.substr(-2)})
              </Button>

              <Typography
                fontFamily={"poppins"}
                // height={0}
                // overflow="hidden"
                pl={2}
              >
                {inote.note}
              </Typography>
              <Box display={"flex"} justifyContent={"flex-end"}>
                <Button
                  color={"inherit"}
                  sx={{
                    textTransform: "none",
                    borderRadius: "2px",
                    color: "var(--c-text)",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Modifier
                </Button>
                <Divider
                  variant="middle"
                  sx={{ mx: 2 }}
                  orientation="vertical"
                  flexItem
                />
                <Button
                  color={"inherit"}
                  sx={{
                    textTransform: "none",
                    borderRadius: "2px",
                    color: "var(--c-text)",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Modifier
                </Button>
              </Box>
              <Divider variant="middle" />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export { Tabulation };
