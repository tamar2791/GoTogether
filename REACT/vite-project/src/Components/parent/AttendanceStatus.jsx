import React, { useEffect, useState } from "react";
import { Paper, Typography, Switch, Button } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useDispatch } from "react-redux";
import { updateChildAsync } from "../../Features/ChildClice";

const AccessibilityStatus = ({child}) => {
  const [presentM,setPresentM]=useState(child.isCome);
  const [presentA,setPresentA]=useState(!child.isLeave);
  useEffect(()=>{
    setPresentM(child.isCome)
    setPresentA(!child.isLeave)
  },[child])
  const dis=useDispatch()
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">סטטוס נוכחות</Typography>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <Typography>נוכחות בוקר: {presentM ? "נוכח" : "לא נוכח"}</Typography>
          <Switch
            checked={presentM}
            onChange={() => {
              dis(updateChildAsync({ ...child, isCome: !child.isCome }));
              setPresentM(!presentM);
            }}
          />
        </div>
        <div>
          <Typography>נוכחות צהריים: {presentA ? "נוכח" : "לא נוכח"}</Typography>
          <Switch
            checked={presentA}
            onChange={() => {
              dis(updateChildAsync({ ...child, isLeave: !child.isLeave }));
              setPresentA(!presentA);
            }}
          />
        </div>
      </div>
    </Paper>
  );
};

export default AccessibilityStatus;
