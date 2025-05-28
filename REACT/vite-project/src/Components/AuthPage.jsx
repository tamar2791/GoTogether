import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Typography, Paper } from "@mui/material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPage = () => {
  const [tab, setTab] = useState(0);
  useEffect(() => {
    localStorage.removeItem("authToken");
  }, []);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        width: "400px",
        margin: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" sx={{ color: "#1976d2", fontWeight: "bold", mb: 1 }}>
        מערכת ניהול הסעות
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        התחבר או הירשם למערכת
      </Typography>

      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label="כניסה" />
        <Tab label="הרשמה" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tab === 0 ? <LoginForm /> : <RegisterForm />}
      </Box>

      <Typography variant="body2" sx={{ mt: 2, textAlign: "center", color: "gray" }}>
        הרשמה מיועדת להורים בלבד. נהגים ומנהלים יקבלו פרטי כניסה מהמערכת.
      </Typography>
    </Box>
  );
};

export default AuthPage;