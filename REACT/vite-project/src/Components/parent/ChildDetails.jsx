import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import AccessibilityStatus from "./AttendanceStatus";
import DriverInfo from "./DriverDetails";
import ChaperoneDetails from "./ChaperoneDetails";

const ChildDetails = ({ child }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">{child.name}</Typography>
      <Typography>מוסד לימודים:{child.educationalInstitution?.name}</Typography>
        <AccessibilityStatus child={child} />
        <Grid
        container
        spacing={2}
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center" }}>
          <ChaperoneDetails child={child} />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center" }}>
          <DriverInfo child={child} />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center" }}>
          
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChildDetails;
