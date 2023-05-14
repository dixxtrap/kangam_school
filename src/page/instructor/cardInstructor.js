import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Avatar, Paper, Typography, Box } from "@mui/material";
import { BsCollectionFill } from "react-icons/bs/";
import { stringToColor } from "../../widget/header";
import { Link } from "react-router-dom";
import {
  doc,
  getFirestore,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore/lite";
const sizeAvatar = {
  xs: 30,
  md: 70,
};
const db = getFirestore();
function CardInstructor({ id, courses }) {
  const [data, setData] = useState({});
  const getData = async () => {
    const instructorRef = await doc(db, `Users/${id}`);
    const instructorData = await getDoc(instructorRef);
    setData({ ...instructorData.data(), uid: instructorRef.id });
    console.log(instructorData.data());
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Paper
      variant="outlined"
      sx={{
        bgcolor: "transparent",

        position: "relative",
        transition: "all 0.3s 0.05s ease",
        "&:hover": {
          boxShadow: " rgba(10, 37, 64, 0.35) 0px -2px 6px 0px ",
          transform: "translateY(-5px)",
        },
        "&:hover img": {
          transform: { md: "scale(1.1, 1.1) rotate(3deg)" },
        },
        "&:hover .monAvatar": {
          transform: "translateY(-10px)",
        },
        width: "100%",
      }}
    >
      <Grid
        container
        width="100%"
        component={Link}
        to={"/"}
        direction={"colums"}
        sx={{ textDecoration: "none" }}
        // border={"2px solid red"}
      >
        <Grid item>
          <Grid container position={"relative"}>
            <Box
              position={"absolute"}
              component="img"
              width={{ sm: 250, md: 270, lg: 290 }}
              height={200}
              sx={{
                borderRadius: 1,
                transition: "all 0.3s 0.05s ease",
              }}
              src={data.photoURL}
            />

            <Grid
              container
              width={{ sm: 250, md: 270, lg: 290 }}
              height={200}
              sx={{
                borderRadius: 1,

                background: `
          linear-gradient(127deg, rgba(6, 4, 71,0.1) 0.0%,rgba(0, 0, 0,0.3) 109.65%)`,
                "mix-blend-mode": "normal",

                boxSizing: "border-box",
                backdropFilter: "blur(8px)",
              }}
            >
              <Grid item width="100%" flexGrow={2}>
                <Grid
                  container
                  justifyContent={"center"}
                  alignContent="center"
                  alignItems={"center"}
                  height={"100%"}
                  direction="column"
                >
                  <Avatar
                    sizes="contain"
                    className="monAvatar"
                    sx={{
                      height: sizeAvatar,
                      width: sizeAvatar,
                      border: "4px solid white",
                      transition: "all 0.3s 0.05s ease",
                    }}
                    src={data.photoURL}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    fontFamily={"poppins"}
                    color="white"
                  >
                    {" "}
                    {data.displayName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  justifyContent={"space-between"}
                  border="2px soid red"
                  px={2}
                  color="white"
                >
                  <BsCollectionFill />
                  <Typography
                    component={"span"}
                    fontWeight="bold"
                    variant="body2"
                    color="white"
                  >
                    {courses ? courses?.length : 0} Cours
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item flexGrow={1} xs={8}>
          <Grid
            container
            justifyContent={"space-between"}
            px={{ xs: 2, md: 4 }}
            pt={2}
            color="white"
          >
            <Typography
              variant="h6"
              fontWeight={"bold"}
              fontFamily={"poppins"}
              color="dimgray"
            >
              Description
            </Typography>
            <br />
            <Typography
              component={"span"}
              variant="body2"
              color="dimgray"
              mb={2}
            >
              {data.description}
              {(
                "Retrouvez sur la fiche métier professeur toutes les informations" +
                "utiles sur ce travail : Salaire, études, formation, rôle," +
                "description du poste professeur, les qualités et compétences" +
                "requises pour travailler en tant que professeur. Le métier" +
                "professeur fait partie du domaine Enseignement. Le rôle du" +
                "professeur est de transmettre des connaissances à des élèves de" +
                "collège ou de lycée. Spécialisé dans une matière en particulier" +
                "il a la charge de faire découvrir de nouveaux domaines par le" +
                "biais de chapitres élaborés en fonction du niveau de chaque" +
                "classe. Le but est d’aborder une thématique, de faire des" +
                "recherches afin de mieux se l’approprier, d’analyser ensemble des" +
                "documents. A la fin du chapitre, chaque élève doit avoir des" +
                "acquisitions qui seront vérifiées par le biais d’une évaluation"
              ).substring(0, 500)}
              ...
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CardInstructor;
