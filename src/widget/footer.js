import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import { KangamSchool } from "./header";
import { AdviceCard } from "./cardWidget";
import pattern1 from "../assets/photo/pattern1.png";
import pattern2 from "../assets/photo/pattern2.png";

import {
  BsServer,
  BsBriefcaseFill,
  BsCurrencyExchange,
  BsBack,
  BsShieldLockFill,
  BsFillCpuFill,
  BsExclamationOctagonFill,
  BsSkype,
  BsYoutube,
  BsGithub,
  BsLinkedin,
  BsInstagram,
  BsFacebook,
  BsPencil,
} from "react-icons/bs";
import { IoMailUnreadOutline, IoSend } from "react-icons/io5";
import { AiFillCopyrightCircle } from "react-icons/ai";
import { iconFontSize } from "./header";
import { NavLink } from "react-router-dom";
import CustomizeInput, { CustmiseInputTextArea } from "./input";
import { fontSize } from "@mui/system";

const DividerHeight = { xs: 40, sm: 50, md: 60, lg: 65, xl: 70 };
const dataAdvice = [
  // {im:null,title:"",description:""}
  {
    im: BsBriefcaseFill,
    title: "Trouver un cours particulier",
    description:
      "Les cours particuliers peuvent être réservés à tout moment en accord avec le tuteur",
  },
  {
    im: BsExclamationOctagonFill,
    title: "Reporter une leçon ",
    description:
      "Il est possible de reporter une leçon facilement en seulement quelques clics.",
  },
  {
    im: BsBack,
    title: "Remplaçant",
    description:
      "Nous trouvons toujours un remplaçant adéquat dans les plus brefs délais.  ",
  },
  {
    im: BsShieldLockFill,
    title: "Sécurité",
    description:
      "Toutes les données et informations personnelles que vous nous faites parvenir sont sécurisées à 100 %.  ",
  },
  {
    im: BsCurrencyExchange,
    title: "Achat/Remboussement",
    description:
      "Toutes les données et informations personnelles que vous nous faites parvenir sont sécurisées à 100 %.  ",
  },

  {
    im: BsFillCpuFill,
    title: "Dépanage",
    description:
      "Toutes les données et informations personnelles que vous nous faites parvenir sont sécurisées à 100 %.  ",
  },
  {
    im: BsFillCpuFill,
    title: "Dépanage",
    description:
      "Toutes les données et informations personnelles que vous nous faites parvenir sont sécurisées à 100 %.  ",
  },
];

const listSites = [
  { href: "#", icon: BsSkype },
  { href: "#", icon: BsYoutube },
  { href: "#", icon: BsGithub },
  { href: "#", icon: BsLinkedin },
  { href: "#", icon: BsInstagram },
  { href: "#", icon: BsFacebook },
];
const data = [
  {
    title: "A propos de Kangam School",
    steps: [
      "premiére plateforme au Sénégal  pour proposer les meilleurs cours en ligne dans différents domaines : informatique , mathématique , physique , marketing , langues ect",
      <Grid
        container
        justifyContent={{ xs: "center", sm: "left" }}
        alignItems={"center"}
      >
        <BsServer /> Djiga2015@gmal.com
      </Grid>,
      <Grid
        container
        justifyContent={{ xs: "center", sm: "left" }}
        alignItems={"center"}
      >
        <BsServer /> 77 237 16 68
      </Grid>,
    ],
  },
  {
    title: "Kangam School",
    steps: [
      "Cours",
      "Tutoriels",
      "Contact",
      "A propos",
      "Conditions général d'tilisation",
      "Charte utilsateur",
      "Moyens de paiement",
    ],
  },
  {
    title: "Tutoriel",
    steps: [
      "Cours",
      "Tutoriels",
      "Contact",
      "A propos",
      "Conditions général d'tilisation",
      "Charte utilsateur",
      "Moyens de paiement",
    ],
  },

  {
    title: "De plus",
    steps: ["Devenir formateur", "Tarif", "Pour les parents (blogs)"],
  },
];

function Footer() {
  const onsubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Box position={"relative"} mt={20} bottom={0} bgcolor={"var(--c-primary)"}>
      <Box
        component="img"
        sx={{
          position: "absolute",
          height: "100%",
          // height: { ...DividerHeight },
          width: "100%",
          zIndex: 0,
        }}
        src={pattern2}
      />

      <Box
        component="img"
        sx={{
          height: { ...DividerHeight },
          width: "100%",
        }}
        src={pattern1}
      />
      <Box
        position={"relative"}
        pl={{ xs: "8px", sm: "8px", md: "50px" }}
        zIndex={2}
        bottom={0}
        width={"100%"}
      >
        <Box width={"100%s"}>
          <Typography
            variant="inherit"
            position={"relative"}
            textAlign={"center"}
            color="white"
            fontSize={{
              xs: "1.50rem",
              sm: "1.80rem",
              md: " 2.0rem",
              lg: "2.9rem",
              xl: "2.8rem",
            }}
            lineHeight={{
              xs: 1.0222222222222223,
              md: 1.5222222222222223,
            }}
            fontWeight={"bold"}
            fontFamily={"Poppins"}
            sx={{
              wordSpacing: { xs: 4, sm: 5, md: 8, lg: 10 },
              pb: { xs: 2, sm: 3, md: 5 },
            }}
          >
            Trouvez Tous au meme androit
          </Typography>
          <Grid
            container
            justifyContent={{ xs: "flex-start", md: "center" }}
            py={{ xs: 2, md: 3 }}
            flexWrap={{ xs: "nowrap", md: "wrap" }}
            overflow={{ xs: "auto", md: "hidden" }}
          >
            {dataAdvice.map((item, index) => (
              <Grid key={index} item>
                <Grid
                  container
                  justifyContent={"center"}
                  py={3}
                  width="100%"
                  px={{ xs: 2, sm: 2, md: 6 }}
                >
                  <AdviceCard
                    icon={item.im}
                    title={item.title}
                    description={item.description}
                    index={index}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Grid
        container
        justifyContent={"space-between"}
        width={"100%"}
        py={2}
        px={{ xs: 2, md: 4, lg: 6 }}
        zIndex={6}
        sx={{ background: "var(--c-secondary)", zIndex: 4 }}
        paddingLeft={{ xs: "12px", sm: "12px", md: "60px", lg: 6 }}
      >
        <Grid item md={6}>
          <Grid container pl={3} direction={"column"}>
            <Box display="flex">
              <KangamSchool color="white" />
            </Box>
            {[
              "Cours",
              "Tutoriels",
              "Contact",
              "A propos",
              "Conditions général d'tilisation",
              "Charte utilsateur",
              "Moyens de paiement",
            ].map((item, idx) => (
              <Typography
                component={NavLink}
                fontFamily={"poppins"}
                to={"#"}
                pl={{ xs: 1, md: 2 }}
                key={idx}
                sx={{
                  color: "var(--c-body)",
                  textDecoration: "none",
                  margin: "5px 10px",
                  zIndex: 5,
                  "&:hover": {
                    textDecoration: "underline",
                    fontWeight: "bold",
                    fontStyle: " italic",
                  },
                }}
              >
                {" "}
                {item}
                {}
              </Typography>
            ))}
            <Grid container className="gradient-text" my={2} spacing={0}>
              {listSites.map((item, idx) => (
                <IconButton
                  key={idx}
                  sx={{
                    zIndex: 3,
                    mx: { xs: 1, md: 3 },
                    borderRadius: "5px",
                    fontSize: { ...iconFontSize },
                    color: "var(--c-body)",
                    bgcolor: "#FFFFFF17",
                    border: "1px solid #FFFFFF37",
                    transition: "all 0.3s 0.05s ease",
                    "&:hover": {
                      color: "whiteSmoke",
                      transform: "scale(1.5,1.5)",
                    },
                  }}
                  href={item.href}
                  aria-label=""
                >
                  <item.icon />
                </IconButton>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid pl={3} item md={6}>
          <Grid
            component={"form"}
            onSubmit={onsubmit}
            container
            sx={{ zIndex: 8 }}
            direction={"column"}
          >
            <Box
              display={"flex"}
              sx={{ zIndex: 8 }}
              justifyContent="space-between"
            >
              <CustomizeInput
                sx={{
                  bgcolor: "#FFFFFF16",
                  zIndex: 7,
                  width: { sx: "100%", md: 220 },
                }}
                placeholder="Donnez notre Prenom"
                startIcon={<BsPencil />}
                color={"white"}
              />
              <CustomizeInput
                placeholder="Donnez notre Nom"
                sx={{
                  bgcolor: "#FFFFFF16",
                  zIndex: 7,
                  width: { sx: "100%", md: 220 },
                  fontFamily: "poppins",
                  fontWeight: 200,
                }}
                sxInput={{ fontFamily: "poppins", fontWeight: 200 }}
                startIcon={<BsPencil />}
                color={"white"}
              />
            </Box>
            <CustomizeInput
              sx={{
                bgcolor: "#FFFFFF16",
                zIndex: 7,
                my: 3,
              }}
              type="email"
              placeholder="Doonez votre Email"
              startIcon={<IoMailUnreadOutline />}
              color={"white"}
            />
            <CustmiseInputTextArea
              sx={{
                bgcolor: "#FFFFFF16",
                zIndex: 7,
              }}
              color={"white"}
              minRows={7}
              placeholder="Ecrivez votre Message"
            />
            <Box alignSelf={"end"} zIndex={5} mt={2}>
              <Button
                type="submit"
                variant="contained"
                size={"small"}
                sx={{ textTransform: "none", borderRadius: "2px" }}
                endIcon={<IoSend />}
              >
                Envoyer
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid item pl={2} xs={12}>
          <Grid
            container
            borderTop={"1px solid var(--c-body)"}
            justifyContent={"center"}
            bgcolor="var(--c-secondary)"
            style={{ zIndex: 10 }}
            pt={2}
          >
            <Box
              fontFamily="poppins"
              variant="caption"
              alignItems={"center"}
              className="gradient-text"
              lineHeight={1}
              display="flex"
              justifyItems="center"
              bgcolor="var(--c-secondary)"
              color={"var(--c-body)"}
            >
              <AiFillCopyrightCircle style={{ fontSize: "25px" }} />
              <span>opyleft-[2022]-Kanagam-Academy</span>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
