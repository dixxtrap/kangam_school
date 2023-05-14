import React, { useEffect, useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import imagePreHeaer from "../../assets/undraw/undraw_team_re_0bfe.svg";
import PreHeader from "../../widget/preHeader";
import { getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore/lite";
import LoadingPage from "../../widget/loading";
import CardInstructor from "../instructor/cardInstructor";

import {
  IoLogoFacebook,
  IoLogoGoogle,
  IoLogoTwitter,
  IoLogoLinkedin,
} from "react-icons/io5";
import { Box, Avatar } from "@mui/material";
import { stringAvatar } from "../../widget/header";

const db = getFirestore();
function Instructor() {
  const auth = getAuth();
  const list = [];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getInstrucor = async () => {
    try {
      const instrucorsRef = collection(db, "/Instructor/");
      const query = await getDocs(instrucorsRef);
      console.log(query);

      query.forEach((instructorDoc) => {
        list.push({ ...instructorDoc.data(), id: instructorDoc.id });
      });
    } catch (error) {
    } finally {
      console.log(list);
      setData(list);
      setLoading(false);
    }
  };
  useEffect(() => {
    getInstrucor();
  }, []);

  return (
    <Grid container direction={"column"} width="100%" alignItems={"start"}>
      {/* {loading && <LoadingPage />} */}
      <PreHeader
        img={imagePreHeaer}
        title={" Decouvrez nos formations"}
        description={`${auth.currentUser?.displayName} Trouver le tuteurs parfait  pour votre formations`}
      />
      {/* <CustomizedTabs value={level} setValue={setLevel} list={levelData} />
<CustomizedTabs
value={matter}
setValue={setMatter}
list={matterData}
img={matterDataImg}
/> */}
      <Grid
        container
        justifyContent={"space-between"}
        py={2}
        px={{ xs: 0, sm: 1, md: 3, lg: 30 }}
      >
        {loading ? <LoadingPage /> : data.map((item) => <CardUser {...item} />)}
      </Grid>
    </Grid>
  );
}
const CardUser = ({ id }) => {
  const [data, setdata] = useState(null);
  console.log("myId", id);
  const getData = async () => {
    const userData = await (await getDoc(doc(db, `Users/${id}/`))).data();
    console.log("myData", userData);
    setdata(userData);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      width={250}
      mt={{ xs: "40px ", md: "50px" }}
      display="flex"
      flexDirection={"column"}
      bgcolor="#0000000C"
      justifyContent={"center"}
      position={"relative"}
      border="1px solid var(--c-last)"
      sx={{
        pt: 2,
        borderRadius: "5px",
        "&:hover .social": {
          width: 30,
        },
      }}
    >
      <Avatar
        src={data?.photoURL}
        {...stringAvatar(data?.displayName, {
          m: "auto",
          borderRadius: "20px",
          border: "1px solid #0000001F",
          width: 150,
          height: 120,
          "& img": { aspectRatio: " 5 / 4" },
          zIndex: 4,
        })}
        m="auto"
        my={4}
      />
      <Box my={4} width="100%" sx={{ zIndex: 4 }}>
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          color="var(--c-primary)"
          width="100%"
          sx={{ textTransform: "capitalize" }}
        >
          {data?.displayName}
        </Typography>
        <Typography
          textAlign="center"
          fontWeight="thin"
          width="100%"
          my={2}
          fontSize={14}
          color="dimgray"
          px={2}
        >
          Ingenieur en telecommunication
        </Typography>
      </Box>

      <Box
        display={"flex"}
        position="absolute"
        alignSelf="flex-end"
        justifySelf={"end"}
        border="1px solid rgba(110, 48, 242, 0.2)"
        boxShadow={" rgba(110, 48, 242, 0.3) 0px 7px 29px 0px"}
        borderRadius={"4px 0   0 4px"}
        className="social"
        flexDirection="column"
        bgcolor="var(--c-primary)"
        alignItems={"center"}
        zIndex={4}
        py={2}
        gap={2}
        width={0}
        overflow="hidden"
        sx={{
          transition: "width 0.4s linear",
        }}
      >
        <Box
          lineHeight={1}
          component={"a"}
          p={"2px"}
          px="5px"
          fontSize={15}
          borderRadius="3px"
          color="var(--c-body)"
        >
          <IoLogoFacebook />
        </Box>
        <Box
          lineHeight={1}
          component={"a"}
          p={"2px"}
          px="5px"
          fontSize={15}
          borderRadius="3px"
          color="var(--c-body)"
        >
          <IoLogoLinkedin />
        </Box>
        <Box
          lineHeight={1}
          component={"a"}
          p={"2px"}
          px="5px"
          fontSize={15}
          borderRadius="3px"
          color="var(--c-body)"
        >
          <IoLogoTwitter />
        </Box>
      </Box>
    </Box>
  );
};

export default Instructor;
