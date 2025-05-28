import React from "react";
import { Box, Typography, Button, Paper, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";
import { Phone } from "@mui/icons-material";

const ChaperoneDetails = ({ child }) => {
  const chaperone = child.isPrivateChperone ? child.chaperone : child.driver?.chaperone
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">פרטי מלווה</Typography>
      <Typography>{chaperone?.name}</Typography>
      <Typography>מספר טלפון:{chaperone?.phone}</Typography>
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <IconButton color="primary" border={"0.5px "}>
          <Phone />
        </IconButton>
        <IconButton color="primary">
          <MessageIcon />
        </IconButton>

      </Box>
    </Paper>
  );
};

export default ChaperoneDetails;
