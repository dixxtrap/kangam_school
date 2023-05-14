/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  // setDoc,
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore/lite";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { TiChevronRight } from "react-icons/ti";
import { Box, IconButton, Button } from "@mui/material";
import { BsFolderFill } from "react-icons/bs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IoFilm } from "react-icons/io5";
import { TransitionAlerts } from "../../widget/connexion";
import { useNavigate, useParams } from "react-router-dom";
import AddLesson from "./addLesson";
import { getDate } from "../../data";

import { IoBookmarkOutline } from "react-icons/io5";
const db = getFirestore();

const Accordion = styled((props) => (
  <MuiAccordion
    disableGutters
    elevation={0}
    square
    sx={{ bgcolor: "var(--c-last-vis)" }}
    {...props}
  />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <TiChevronRight
        style={{
          fontSize: { xs: "0.9rem", md: "1.2rem" },
          color: "var(--c-text)",
        }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .5)" : "transparent",
  borderTop: "1px solid #FFFFFF25",
  borderBottom: "1px solid #FFFFFF25",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
const LessonItem = ({ idSection, lessons, setLessons }) => {
  const [error, setError] = useState(false);
  const { idCourse } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const getLessons = async () => {
    try {
      console.log("id section ", idSection);
      setLoading(true);
      const lessonsRef = await collection(
        db,
        `/Courses/${idCourse}/Sections/${idSection}/Lessons/`
      );

      const lessonsQuery = await getDocs(
        await query(lessonsRef, orderBy("date", "asc"))
      );
      const l = [];
      !lessonsQuery.empty &&
        lessonsQuery.forEach((lessonDoc) => {
          const lessonsDat = lessonDoc.data();
          const dateTime = getDate(lessonsDat.date);
          const lessonData = {
            ...lessonsDat,
            id: lessonDoc.id,
            date: dateTime,
          };
          console.log("time");

          // console.log("Data", lessonData);
          l.push(lessonData);
        });
      await setLessons(l);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getLessons();
  }, []);
  return error ? (
    <TransitionAlerts error={error} />
  ) : loading ? (
    <Box component={"center"} sx={{ color: "var(--c-last)" }}>
      <CircularProgress color="inherit" thickness={3} size={50} />
    </Box>
  ) : (
    <List>
      {lessons.map((item, idx) => {
        return (
          <ListItem
            key={idx}
            onClick={() => {
              nav(`${idSection}/${item.id}`);
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemText
                primary={item.title}
                secondaryTypographyProps={{ variant: "caption" }}
                // secondary={`${item?.date.getDay()} , ${item?.date.getMonth()} ,${item?.date.getFullYear()}`}
              />
              <Box>
                <Button>Modifier</Button>
                <Button>Modifier</Button>
              </Box>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
export function CourseAccordions({ idSection, title }) {
  const nav = useNavigate();
  const [expanded, setExpanded] = useState("panel1");
  const [lessons, setLessons] = useState([]);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === idSection}
      onChange={handleChange(idSection)}
    >
      <AccordionSummary
        aria-controls={`panel${idSection}-content`}
        id={`panel${idSection}-header`}
        sx={{ bgcolor: "#0000000A" }}
      >
        <Box
          flexGrow={2}
          flexDirection={"row"}
          justifyContent="space-between"
          display="flex"
          alignItems={"center"}
        >
          <Typography flexGrow={2} component={"span"} fontWeight={"bold"}>
            {title}
          </Typography>
          <AddLesson idSection={idSection} setLesson={setLessons} />
          <IconButton
            size="small"
            sx={{
              zIndex: 4,
              color: "black",
              ml: 2,
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
            onClick={(e) => {
              e.preventDefault();
              nav(`${idSection}`);
            }}
          >
            <BsFolderFill />
          </IconButton>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <LessonItem
          idSection={idSection}
          lessons={lessons}
          setLessons={setLessons}
        />
      </AccordionDetails>
    </Accordion>
  );
}

// TODO:STUDENT

export function CourseAccordionsStudent({
  idSection,
  title,
  setCurrent,
  current,
}) {
  const [expanded, setExpanded] = useState(idSection);
  const [lessons, setLessons] = useState([]);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === idSection}
      onChange={handleChange(idSection)}
      sx={{ p: 0 }}
    >
      <AccordionSummary
        aria-controls={`panel${idSection}-content`}
        id={`panel${idSection}-header`}
        sx={{ bgcolor: "#0000000A" }}
      >
        <Box
          flexGrow={2}
          flexDirection={"row"}
          justifyContent="space-between"
          display="flex"
          alignItems={"center"}
        >
          <Typography
            flexGrow={2}
            color="var(--c-text)"
            component={"span"}
            fontWeight={"bold"}
          >
            {title}
          </Typography>
          {/* <AddLesson idSection={idSection} setLesson={setLessons} />
          <IconButton
            size="small"
            sx={{
              zIndex: 4,
              color: "black",
              ml: 2,
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
            onClick={(e) => {
              e.preventDefault();
              nav(`${idSection}`);
            }}
          >
            <BsFolderFill />
          </IconButton> */}
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <LessonItemStudent
          idSection={idSection}
          lessons={lessons}
          setLessons={setLessons}
          setCurrent={setCurrent}
          current={current}
          sectiontitle={title}
        />
      </AccordionDetails>
    </Accordion>
  );
}

const LessonItemStudent = ({
  idSection,
  lessons,
  setLessons,
  setCurrent,
  sectiontitle,
  current,
}) => {
  const [error, setError] = useState(false);
  const { idCourse } = useParams();
  // const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const getLessons = async () => {
    try {
      console.log("id section ", idSection);
      setLoading(true);
      const lessonsRef = await collection(
        db,
        `/Courses/${idCourse}/Sections/${idSection}/Lessons/`
      );

      const lessonsQuery = await getDocs(
        await query(lessonsRef, orderBy("date", "asc"))
      );
      const l = [];
      !lessonsQuery.empty &&
        lessonsQuery.forEach((lessonDoc) => {
          const lessonsDat = lessonDoc.data();

          const lessonData = {
            ...lessonsDat,
            id: lessonDoc.id,
            date: getDate(lessonsDat.date),
            idSection: idSection,
            sectionTitle: sectiontitle,
          };

          // console.log("Data", lessonData);
          l.push(lessonData);
        });
      await setLessons(l);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLessons();
  }, []);
  return error ? (
    <TransitionAlerts error={error} />
  ) : loading ? (
    <Box component={"center"} sx={{ color: "var(--c-last)" }}>
      <CircularProgress color="inherit" thickness={3} size={50} />
    </Box>
  ) : (
    <List key={lessons.id}>
      {lessons.map((item, index) => {
        return (
          <ListItemButton
            key={index}
            onClick={() => {
              setCurrent(item);
            }}
            className="playistStudent"
            sx={{
              py: "0 !important",
              minHeight: 45,
              ...(item.id === current?.id && {
                borderLeft: "6px solid var(--c-footer)",
                bgcolor: "#00000009",
              }),
              "&:hover": {
                bgcolor: "#00000030",
                backdropFilter: "blur(50px)",
              },
            }}
          >
            <Box
              border="1px solid black"
              mr={3}
              height={"10px"}
              width={"10Px"}
              borderRadius="50%"
              sx={{
                ...(item.id === current?.id && {
                  bgcolor: "#00000030",
                }),
              }}
            />
            <ListItemText
              secondaryTypographyProps={{
                color: "var(--c-text)",
                variant: "caption",
              }}
              primaryTypographyProps={{
                fontFamily: "poppins",
                color: "var(--c-text)",
                fontSize: { xs: 14, sm: 13, lg: 14 },
              }}
              primary={item.title || item.id}
              // secondary={`${item?.date.getDate()}/${item?.date.getMonth()}/${item?.date.getFullYear()}`}
            />

            <IoBookmarkOutline style={{ fill: "white", stroke: "dimgray" }} />
          </ListItemButton>
        );
      })}
    </List>
  );
};
