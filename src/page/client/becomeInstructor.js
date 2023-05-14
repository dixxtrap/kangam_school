import React from "react";
import { Box, Button, Hidden } from "@mui/material/";
import PreHeader from "../../widget/preHeader";
import { IoEaselOutline, IoEasel } from "react-icons/io5";
import CustomizeInput, { CustmiseInputTextArea } from "../../widget/input";
import Typography from "@mui/material/Typography";

function BecomeInstructor() {
  return (
    <Box>
      <Hidden smDown>
        <PreHeader
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="inherit"
              height="inherit"
              fill="currentColor"
              class="bi bi-easel2-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z" />
              <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z" />
            </svg>
          }
          title="Instructor"
        />
      </Hidden>
      <Box
        height={{ xs: "max-content", md: 500 }}
        position="relative"
        display="flex"
        borderRadius={2}
        justifyContent={"center"}
        alignItems="center"
        bgcolor="var(--c-body)"
        alignContent={"center"}
        flexWrap="wrap"
        sx={{
          width: { xs: "98%", md: "90%", lg: "80%" },
          zIndex: 2,
        }}
        m="auto"
        mt={{ md: 15 }}
        p={{ xs: 2, md: 0 }}
      >
        <Box
          height={{ xs: "max-content", md: 600 }}
          width={{ xs: "100%", md: 350 }}
          maxWidth={350}
          bgcolor="var(--c-primary)"
          zIndex={2}
          borderRadius={2}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          alignContent={"center"}
          p={2}
          boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
        >
          <Box
            my={5}
            width={100}
            color="var(--c-body)"
            className="gradient-text"
            height={100}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="inherit"
              height="inherit"
              fill="currentColor"
              class="bi bi-easel2-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8.447.276a.5.5 0 0 0-.894 0L7.19 1H2.5A1.5 1.5 0 0 0 1 2.5V10h14V2.5A1.5 1.5 0 0 0 13.5 1H8.809L8.447.276Z" />
              <path
                fill-rule="evenodd"
                d="M.5 11a.5.5 0 0 0 0 1h2.86l-.845 3.379a.5.5 0 0 0 .97.242L3.89 14h8.22l.405 1.621a.5.5 0 0 0 .97-.242L12.64 12h2.86a.5.5 0 0 0 0-1H.5Zm3.64 2 .25-1h7.22l.25 1H4.14Z"
              />
            </svg>
          </Box>
          <Box width={"100%"} display={{ xs: "none", md: "block" }}>
            <Typography
              variant="h6"
              fontWeight={"bold"}
              color="var(--c-body)"
              textAlign={"left"}
            >
              Confidentialite <span>@5t3ph</span>
            </Typography>
            <Typography variant="caption" color="var(--c-body)">
              Ne vous inquiétez pas les informtion saisie ici seront strictement
              utilsé ades fins d'anayse .elle ne seront ni publier, ni divulguer
              .
            </Typography>
            <Typography
              mt={5}
              variant="h6"
              fontWeight={"bold"}
              color="var(--c-body)"
              textAlign={"left"}
            >
              Contacter Nous
            </Typography>
            <Box display="flex" justifyContent={"space-between"}>
              <Typography variant="body1" color="var(--c-body)">
                Email
              </Typography>
              <Typography variant="caption" color="var(--c-body)">
                Djiga2015@gmai.com
              </Typography>
            </Box>
            <Box display="flex" justifyContent={"space-between"}>
              <Typography variant="body1" color="var(--c-body)">
                Phone
              </Typography>
              <Typography variant="caption" color="var(--c-body)">
                00 221 77 237 16 68
              </Typography>
            </Box>
            <Box display="flex" justifyContent={"space-between"}>
              <Typography variant="body1" color="var(--c-body)">
                LinkedIn
              </Typography>
              <Typography variant="caption" color="var(--c-body)">
                kanga-linkedIn.com
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          height={"100%"}
          pt={3}
          flexGrow={2}
          px={3}
          maxWidth={500}
          width="100%"
          zIndex={2}
          component={"form"}
        >
          <CustomizeInput
            placeholder={"Email"}
            sx={{ my: 2, fontWeigt: "bold", maxWidth: 350 }}
          />
          <CustomizeInput
            placeholder={"Proffesion"}
            sx={{ my: 2, fontWeigt: "bold", maxWidth: 350 }}
          />

          <CustomizeInput
            placeholder={"Phone"}
            sx={{ my: 2, fontWeigt: "bold", maxWidth: 350 }}
          />
          <CustmiseInputTextArea
            rows={5}
            placeholder="Motivation"
            sx={{ my: 2, fontWeigt: "bold" }}
          />
          <Box display="flex" justifyContent={"space-between"}>
            <input
              type={"file"}
              style={{ display: "none" }}
              id="cv"
              name="cv"
            />
            <label htmlFor="cv">Doner votre cv</label>
            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                borderRadius: "3px",
                bgcolor: "var(--c-primary)",
                "&:hover": {
                  bgcolor: "var(--c-secondary)",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default BecomeInstructor;
