import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StatsCard = ({ title, value, subtext }) => {
  return (
    <Card sx={{ minWidth: 180, textAlign: "center", m: 1 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        <Typography variant="body2" color="text.secondary">
          {subtext}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
