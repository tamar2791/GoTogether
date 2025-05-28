import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { People, NearMe, TimeToLeave } from "@mui/icons-material";

export default function DailySummary({driver,time,km}) {
  return (
    <>
    <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, maxWidth: 800, mx: "auto" }}>
      <CardContent>
        {/* כותרת */}
        <Typography variant="h6" fontWeight="bold" textAlign="right">
          סיכום יומי
        </Typography>

        {/* נתוני הסיכום */}
        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
          {/* תלמידים */}
          <Grid item xs={4} textAlign="center">
            <People color="action" sx={{ fontSize: 30 }} />
            <Typography variant="h6" fontWeight="bold">{driver?.children.length}</Typography>
            <Typography variant="body2" color="textSecondary">תלמידים</Typography>
          </Grid>

          {/* זמן נסיעה כולל */}
          <Grid item xs={4} textAlign="center">
            <TimeToLeave color="action" sx={{ fontSize: 30 }} />
            <Typography variant="h6" fontWeight="bold">{time}</Typography>
            <Typography variant="body2" color="textSecondary">זמן נסיעה כולל</Typography>
          </Grid>

          {/* מרחק כולל */}
          <Grid item xs={4} textAlign="center">
            <NearMe color="action" sx={{ fontSize: 30 }} />
            <Typography variant="h6" fontWeight="bold">{km}</Typography>
            <Typography variant="body2" color="textSecondary">מרחק כולל</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </>
  );
}
