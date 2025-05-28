import React from "react";
import { Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ParentDetails = ({parent}) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">פרטי הורה</Typography>
      <Typography>שם משפחה:{parent?.lastName}</Typography>
      <Typography>שם האבא:{parent?.fatherName}</Typography>
      <Typography>שם האמא:{parent?.motherName}</Typography>
      <Typography>טלפון האבא:{parent?.fatherPhone}</Typography>
      <Typography>טלפון האמא:{parent?.motherPhone}</Typography>
      <Typography>כתובת:{parent?.address}</Typography>      
    </Paper>
  );
};

export default ParentDetails;
