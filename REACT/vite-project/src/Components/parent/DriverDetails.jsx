import React from "react";
import { Paper, Typography, Button, Box, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";
import { Phone } from "@mui/icons-material";

const DriverInfo = ({child}) => {
  const driver=child.driver
  return (
    <Paper sx={{ p: 2, mt: 2 }}>

      <Typography variant="h6">פרטי נהג</Typography>
      <Typography>{driver?driver.name:"הילד לא משובץ בהסעה, נא לפנות להנהלה"}</Typography>
      <Typography>מספר טלפון:{driver?.phone}</Typography>
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

export default DriverInfo;
