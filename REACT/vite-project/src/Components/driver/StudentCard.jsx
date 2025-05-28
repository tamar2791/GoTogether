import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, IconButton, Chip, TextField, Box } from "@mui/material";
import { CheckCircle, Cancel, Message, ChildCareSharp, Send } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { sendMessageToParentsAsync } from "../../Features/DriverSlice";

export default function StudentCard({ student, isMorning, arrivalTime }) {
  const [showInput, setShowInput] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSendClick = () => {
    const id = [student.parents.id];
    dispatch(sendMessageToParentsAsync(id));

    setShowInput(false); 
    setMessage(""); 
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 1, my: 1, p: 1 }}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          {/* מספר סידורי */}
          <Grid item>
            <ChildCareSharp />
          </Grid>

          {/* פרטי תלמיד */}
          <Grid item xs>
            <Typography variant="h6" fontWeight="bold">
              {student.name+" "+student.parents?.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {student.address}
            </Typography>
            {isMorning && student.isCome && (
              <Typography variant="body2" fontWeight="bold">
                זמן איסוף משוער: {arrivalTime}
              </Typography>
            )}
            {!isMorning && !student.isLeave && (
              <Typography variant="body2" fontWeight="bold">
                זמן הגעה משוער: {arrivalTime}
              </Typography>
            )}
          </Grid>

          {/* סטטוס */}
          <Grid item>
            <Chip
              label={isMorning ? (student.isCome ? "מאושר" : "לא נמצא") : !student.isLeave ? "מאושר" : "לא נמצא"}
              color={isMorning ? (student.isCome ? "success" : "error") : !student.isLeave ? "success" : "error"}
              icon={isMorning ? (student.isCome ? <CheckCircle /> : <Cancel />) : !student.isLeave ? <CheckCircle /> : <Cancel />}
            />
          </Grid>
        </Grid>

        {/* אזור כפתור הודעה ושדה טקסט */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <IconButton color="primary" onClick={() => setShowInput(!showInput)} sx={{ flexShrink: 0 }}>
            <Message />
          </IconButton>

          {showInput && (
            <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="הקלד הודעה..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ minWidth: "200px", flexGrow: 1 }} // מבטיח שהאינפוט יהיה בגודל יציב
              />
              <IconButton color="primary" onClick={handleSendClick} disabled={!message.trim()}>
                <Send/>
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
