import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Avatar,
  Paper,
  Hidden,
} from "@mui/material";

import cardHeaderIMg from "../../assets/undraw/svg1.svg";

import { CardAvatar } from "../../widget/cardWidget";

// import ServerClient from "../../widget/serverCleint";
import { Motivation } from "../../widget/cardWidget";
import motivClass from "../../assets/photo/icons8-get-quote-80.png";
import motivProff from "../../assets/undraw/undraw_group_selfie_re_h8gb.svg";
import motivInfo from "../../assets/photo/phot5.jpg";
import { stringAvatar } from "../../widget/header";
import {
  IoAmericanFootballSharp,
  IoBalloonSharp,
  IoBuild,
  IoCalendarNumberOutline,
  IoTelescope,
  IoLaptopOutline,
  IoColorPaletteOutline,
  IoBulbSharp,
  IoLogoFacebook,
  IoLogoGoogle,
  IoLogoTwitter,
  IoLogoLinkedin,
} from "react-icons/io5";
import { ImQuotesRight } from "react-icons/im";
import sr, { textAccueilAnim, lampAnim } from "../../widget/Animation";

// import CardHeader from "./widget";
// // FIXME : import Icon
// import { GiTeacher, GiBookmarklet } from "react-icons/gi";
// import { FaChalkboardTeacher } from "react-icons/fa";
// FIXME:Data
const cardList = [
  {
    bgcolor: "var(--c-primary)",
    icon: <IoAmericanFootballSharp />,
    title: "Un apprentissage personnalisé",
    description:
      "Chaque élève est différent. Nous créons donc un programme pédagogique parfaitement adapté à chacun. ",
  },

  {
    bgcolor: "#d400d4",
    icon: <IoBalloonSharp />,
    title: "Une formation flexible 100% en ligne",
    description:
      "Depuis leur smartphone, leur ordinateur ou leur tablette, vos collaborateurs apprennent quand ils veulent, où ils veulent.",
  },

  {
    bgcolor: "#28a5f7",
    icon: <IoBuild />,
    title: "Un apprentissage par la pratique",
    description:
      "Vos collaborateurs mettent en pratique les compétences acquises dans des projets concrets conçus par nos ingénieurs pédagogiques.",
    // "Apprenez les compéteces clés de votre futur métier en validant des projet tirés de cas concret d'entreprise",
  },

  // { im: toff3, title: "Un Accompagnement personnalisé", description: "Bénéficiez de sesions de mentorat hebdomadaires avec un expert du métier   " },
];

// const dataAdvice = [
//   // {im:null,title:"",description:""}
//    { im: cardHeaderIMg, title: "Trouver un cours particulier", description: "Les cours particuliers peuvent être réservés à tout moment en accord avec le tuteur" },
//    { im: cardHeaderIMg, title: "Reporter une leçon ", description: "Il est possible de reporter une leçon facilement en seulement quelques clics." },
//    { im: cardHeaderIMg, title: "Remplaçant", description: "Nous trouvons toujours un remplaçant adéquat dans les plus brefs délais.  " },
//    { im: cardHeaderIMg, title: "Sécurité", description: "Toutes les données et informations personnelles que vous nous faites parvenir sont sécurisées à 100 %.  " },
//    { im: cardHeaderIMg, title: "Achat/Remboussement", description: "Toutes les données et informations personnelles que vous nous faites parvenir sont sécurisées à 100 %.  " },

//    { im: cardHeaderIMg, title: "Dépanage", description: "Toutes les données et informations personnelles que vous nous faites parvenir sont sécurisées à 100 %.  " },

// ]import ScrollReveal from 'scrollreveal';

const motivList = [
  {
    icon: <IoColorPaletteOutline />,
    bgcolor: "#28a5f7",
    title: "Le tuteur parfait, pour tous",
    description:
      "À partir d'une analyse précise de vos besoins, nous trouvons le tuteur idéal et compatible avec votre enfant.Un tuteur ou tuteuse qui pourra l'aider en presentielle comme en migne",
  },
  {
    icon: <IoCalendarNumberOutline />,
    bgcolor: "#d400d4",
    title: "Toujours informés",
    description:
      "Nous vous tiendrons informés de vos progrès  ou de celle de vos enfants . afin que le soutien scolaire se fasse en toute transparence. ",
  },
  {
    icon: <IoLaptopOutline />,
    bgcolor: "var(--c-primary)",
    title: "Notre classe virtuelle",
    description:
      "Des cours particuliers du plus haut niveau, à n'importe quel moment. Tableau numérique, fonction d'enregistrement, partage d'écran et bien plus encore. ",
  },
  {
    icon: <IoTelescope />,
    bgcolor: "#923fe1",
    title: "L'Avenir vous Appartient",
    description:
      "Devenez qui vous voulez être avec KangamSchool. Choisissez votre carrière. Suivez une formation constituée de projets professionnalisants et de séances individuelles avec un mentor dédié chaque semaine . Enrichissez votre CV avec les programmes en alternance proposés par OpenClassrooms et gagnez un salaire tout en suivant votre formation.",
  },

  // {im:null,title:"",description:""}
];

// const dataInstruction = [
//   {
//       im: cardHeaderIMg, title: "Je suis nouveau et je veux  m'inscrire à un cours", steps: ["Je crée mon compte. Un email d'activiation de compte m'est envoyé.",
//           "Je clique sur le lien d'activiation de mon compte depuis l'email reçu.", "J'accède à l'espace en cliquant sur le bouton \"Se connecter\".", "je fais entrer mon adresse email et mon mot de passe."], reverse: true
//   },
//   {
//       im: cardHeaderIMg, title: "J'ai un compte et je veux  m'inscrire à un cours", steps: ["J'accède à mon espace (tableau de bord) en cliquant sur le bouton \"Se connecter\"."
//           , "je fais entrer mon adresse email et mon mot de passe.", "je clique sur le lien \"Tous les cours\" ou je clique sur le logo du site \"Kangam School\".", "je clique sur le cours auquel je souhaite m'inscrire.", "Je clique sur le bouton \"Je m'inscris\". Mon tableau de bord affiche mes cours."], reverse: false
//   },
// ]

function Home() {
  useEffect(() => {
    sr.reveal(".preheaderIcon", lampAnim);
    sr.reveal(".preheaderText", textAccueilAnim);
  }, []);

  return (
    <Grid container direction={"column"} width="100%" alignItems={"start"}>
      <Grid item position="relative">
        <Paper
          variant="outlined"
          sx={{
            position: "relative",

            overflow: "hidden",
            border: "none",

            bgcolor: "var(--c-primary)",
            borderRadius: 0,
            backgroundSize: "100%",
            py: { sx: 1, md: 0 },
            boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px inset",
          }}
        >
          <Grid
            container
            justifyContent="center"
            bgcolor={"var(--bg-primary)"}
            alignItems="center"
          >
            <Grid item pt={{ lg: 8 }} xs={12} sm={3} lg={4}>
              <Grid container justifyContent={"center"}>
                <Box
                  // src={cardHeaderIMg}
                  // component="img"
                  sx={{
                    fontSize: { xs: 100, md: 250, lg: 300 },
                    color: "var(--c-body)",
                    lineHeight: 1,
                    overflow: "visible",
                    filter:
                      "drop-shadow(0 0 20px #3fefefA3) drop-shadow(0 0 30px #3fefef56)",
                  }}
                  className="preheaderIcon"
                >
                  <IoBulbSharp />
                </Box>
              </Grid>
            </Grid>
            <Grid item sx={12} sm={9} md={8} lg={5}>
              <Grid
                container
                direction="column"
                pt={{ xs: 2, md: 3, lg: 5 }}
                alignItems="flex-start"
              >
                <Grid item style={{ textAlign: "left" }}>
                  <Grid
                    container
                    className={"preheaderText"}
                    justifyContent={"center"}
                    pl={{ lg: 2 }}
                  >
                    <Typography
                      variant="inherit"
                      position={"relative"}
                      textAlign={"center"}
                      color="var(--c-body)"
                      fontSize={{
                        xs: "1.50rem",
                        sm: "1.80rem",
                        md: " 2.0rem",
                        lg: "2.1rem",
                        xl: "2.6rem",
                      }}
                      lineHeight={{
                        xs: 1.0222222222222223,
                        md: 1.2222222222222223,
                      }}
                      fontWeight={"bold"}
                      fontFamily={"Poppins"}
                      sx={{
                        wordSpacing: { xs: 4, sm: 5, md: 8, lg: 10 },

                        pb: { xs: 2, sm: 3, md: 3 },
                      }}
                    >
                      {/* Poursuivez vos Reve ou que vous soyez <br/> */}
                      La première école internationale pour les cours
                      particuliers
                    </Typography>
                    <Hidden smDown>
                      <Box>
                        <Typography
                          className="gradient-text"
                          textAlign={"center"}
                          fontSize={{
                            xs: "1.30rem",
                            sm: "1.45rem",
                            md: " 1.5rem",
                            lg: "1.7111rem",
                          }}
                          fontWeight={600}
                          fontFamily={"poppins"}
                          justifyContent={"center"}
                        >
                          Apprenez à apprendre. Découvrez les compétences de
                          demain. Et prenez votre carrière en main.
                        </Typography>
                      </Box>
                    </Hidden>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item width="100%" style={{ marginTop: 50, marginBottom: 50 }}>
        <Box>
          <Typography
            component={"span"}
            variant="inherit"
            position={"relative"}
            textAlign={"left"}
            pl={{ xs: 1, md: 3, lg: 5 }}
            color="var(--c-text)"
            fontSize={{
              xs: "1.50rem",
              sm: "1.80rem",
              md: " 2.0rem",
              lg: "2.9rem",
              xl: "2.8rem",
            }}
            lineHeight={{
              xs: 1.0222222222222223,
              md: 1.2222222222222223,
            }}
            className="gradient-text-dark"
            fontWeight={"bold"}
            fontFamily={"Poppins"}
            sx={{
              wordSpacing: { xs: 4, sm: 5, md: 8, lg: 10 },

              pb: { xs: 2, sm: 3, md: 3 },
            }}
          >
            {/* Poursuivez vos Reve ou que vous soyez <br/> */}
            Qu'est ce que nous faisons?
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent={"space-around"}
          alignContent="stretch"
          alignItems={"stretch"}
          flexWrap="wrap"
          pt={{ xs: 2, md: 3 }}
          pb={{ xs: 2, md: 10 }}
          px={{ xs: 1, md: 5 }}
          sx={{
            gap: 2,
            "& > *": {
              flexBasis: "calc(800px - 100%)",
              flexGrow: 1,
            },
          }}
        >
          {cardList.map((item, idx) => (
            <CardAvatar {...item} idx={idx + 1} />
          ))}
        </Box>
      </Grid>
      <Grid item width="100%">
        <Grid container justifyContent={"flex-end"} width="100%">
          <Box>
            <Typography
              component={"span"}
              variant="inherit"
              position={"relative"}
              textAlign={"left"}
              pr={{ xs: 1, md: 3, lg: 5 }}
              color="var(--c-text)"
              fontSize={{
                xs: "1.50rem",
                sm: "1.80rem",
                md: " 2.0rem",
                lg: "2.9rem",
                xl: "2.8rem",
              }}
              lineHeight={{
                xs: 1.0222222222222223,
                md: 1.2222222222222223,
              }}
              className="gradient-text-dark"
              fontWeight={"bold"}
              fontFamily={"Poppins"}
              sx={{
                wordSpacing: { xs: 4, sm: 5, md: 8, lg: 10 },

                pb: { xs: 2, sm: 3, md: 3 },
              }}
            >
              {/* Poursuivez vos Reve ou que vous soyez <br/> */}
              C'est quoi KangamSchool ?
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid px={{ sx: 1, sm: 2, md: 3, lg: 10, xl: 10 }} container>
        {motivList.map((item, index) => (
          <Grid key={index} item>
            <Motivation {...item} index={index} />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent={"center"} mt={5} direction="column">
        <Box justifyContent={"center"} display="flex">
          <Typography
            component={"span"}
            variant="inherit"
            position={"relative"}
            textAlign={"center"}
            alignSelf="center"
            pl={{ xs: 1, md: 3, lg: 5 }}
            color="var(--c-text)"
            fontSize={{
              xs: "1.50rem",
              sm: "1.80rem",
              md: " 2.0rem",
              lg: "2.9rem",
              xl: "2.8rem",
            }}
            lineHeight={{
              xs: 1.0222222222222223,
              md: 1.2222222222222223,
            }}
            className="gradient-text-dark"
            fontWeight={"bold"}
            fontFamily={"Poppins"}
            sx={{
              wordSpacing: { xs: 4, sm: 5, md: 8, lg: 10 },

              pb: { xs: 2, sm: 10 },
            }}
          >
            {/* Poursuivez vos Reve ou que vous soyez <br/> */}
            Temoignage !
          </Typography>
        </Box>
        <div class="swiper mySwiper">
          <div class="swiper-wrapper">
            {[...Array(4).keys()].map((item) => (
              <Box
                width={{ xs: 230, md: 300 }}
                display="flex"
                flexDirection={"column"}
                bgcolor="#FFF"
                border="4px solid var(--c-last)"
                className="swiper-slide"
                position={"relative"}
                sx={{
                  p: 2,
                  borderRadius: "5px",
                }}
              >
                <Box mx={2} alignSelf={"end"}>
                  <Box
                    component="img"
                    height={10}
                    width={10}
                    src={motivClass}
                    color="#0000003A"
                  />
                </Box>
                <Box
                  sx={{
                    transition: "height .35s ease-in-out",

                    overflow: "hidden",
                    px: 2,
                    zIndex: 4,
                    my: 4,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontFamily="Poppins"
                    fontWeight={500}
                    color="#000000DA"
                    fontSize={14}
                  >
                    {" "}
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley Lorem Ipsum is simply dummy text of
                    the printing and typesetting industry.
                  </Typography>
                </Box>
                <Box width="100%" display="flex" p={2} sx={{ zIndex: 4 }}>
                  <Avatar
                    {...stringAvatar("djiga salane", { borderRadius: "5px" })}
                    src={motivInfo}
                  />
                  <Box px={{ xs: 1, sm: 2 }}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="var(--c-primary)"
                      width="100%"
                      lineHeight={1}
                    >
                      Djiga Salane
                    </Typography>
                    <Typography
                      fontWeight="thin"
                      width="100%"
                      fontSize={12}
                      color="dimgray"
                    >
                      INgenieur en telecommunicatio
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Grid>
      <Box
        position={"relative"}
        mt={10}
        bottom={0}
        display="flex"
        width={"100%"}
        justifyContent="center"
      >
        {/* <Box
          component="img"
          sx={{
            height: "auto",
            alignSelf: "center",
            // height: { ...DividerHeight },
            width: "100%",
            left: `calc(100%,-150)`,
            maxWidth: 300,
            mt: { md: -50 },
            zIndex: 1,
          }}
          src={pattern1}
        /> */}
        <Box
          sx={{
            fontSize: { xs: 100, md: 250, lg: 300 },
            color: "var(--c-primary)",
            lineHeight: 1,
            overflow: "visible",
            filter:
              "drop-shadow(0 0 20px var(--c-last)) drop-shadow(0 0 30px var(--c-last))",
          }}
        >
          <IoBulbSharp />
        </Box>
      </Box>
    </Grid>
  );
}

export default Home;
