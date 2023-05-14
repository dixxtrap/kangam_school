import { Paper, Stack, Box, CardActionArea, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { primary } from "../../data";
import { iconFontSize } from "../../widget/header";
import { Button } from "@mui/material";
function CardHeader({ icon, text, path, background }) {
  const Icon = icon;
  return (
    <Link style={{ textDecoration: "none" }} to={path}>
      
        <Button 
        startIcon={<Icon/>}
        sx={{
          height: 40,
          transition: "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
          borderRadius: 10,
          background: `var(--bg-footer)`,
          color: "whitesmoke",
          minWidth:{xs:180},
          boxShadow: ` ${primary[500]}A2 0px 10px 10px -12px inset, ${primary[500]}A2 0px 18px 36px -18px inset`,
          "&:hover": {
            boxShadow: `${primary[500]}16 0px 4px 15px 12px, ${primary[500]}A2 0px -12px 20px, ${primary[500]}30 0px 4px 6px, ${primary[500]}16 0px 12px 13px, ${primary[500]}16 0px -3px 5px`,
            transform: "scale(1.15, 1.15)",
          },
          "&:hover::after": {
            opacity: 1,
          },
        }}>
        
              <Typography
                variant="inherit"
                position={"relative"}
                textAlign={"left"}
                justifyContent="center"
                color="inherit"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 1000,
                }}
              >
                {text}
              </Typography>
        </Button>
        
     
    </Link>
  );
}

export default CardHeader;
