import React from "react";
import { Card, CardContent, Typography, Grid, Chip } from "@mui/material";
import { CheckCircle, Person } from "@mui/icons-material";

export default function ChaperoneCard({isMorning, name, address, arrivalTime }) {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 1, my: 1, p: 1, backgroundColor: "#E3F2FD" }}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          {/* אייקון של אדם */}
          <Grid item>
            <Person color="primary" sx={{ fontSize: 30 }} />
          </Grid>

          {/* פרטי מלווה */}
          <Grid item xs>
            <Typography variant="h6" fontWeight="bold">{name}</Typography>
            <Typography variant="body2" color="textSecondary">{address}</Typography>
            <Typography variant="body2" fontWeight="bold">זמן {isMorning?"תחילת המסלול":"הגעה משוער"}: {arrivalTime}</Typography>
          </Grid>

          <Grid item>
            <Chip label="מאושר" color="primary" icon={<CheckCircle />} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
