import React from "react";
import { Card, CardContent, Typography, Grid, Chip } from "@mui/material";
import { School, CheckCircle } from "@mui/icons-material";

export default function SchoolCard({isMorning, name, address, arrivalTime }) {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 1, my: 1, p: 1, backgroundColor: "#E3F2FD" }}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          {/* אייקון של בית ספר */}
          <Grid item>
            <School color="primary" sx={{ fontSize: 30 }} />
          </Grid>

          {/* פרטי בית ספר */}
          <Grid item xs>
            <Typography variant="h6" fontWeight="bold">{name}</Typography>
            <Typography variant="body2" color="textSecondary">{address}</Typography>
            <Typography variant="body2" fontWeight="bold">זמן {isMorning?"הגעה":"איסוף"} משוער: {arrivalTime}</Typography>
          </Grid>

          {/* סטטוס אישור הגעה */}
          <Grid item>
            <Chip label={isMorning?"יעד סופי":"מקום איסוף"} color="primary" icon={<CheckCircle />} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
