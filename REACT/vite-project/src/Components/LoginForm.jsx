import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllParentsAsync } from "../Features/ParentSlice";
import { fetchDriversAsync } from "../Features/DriverSlice";
import { fetchManagersAsync } from "../Features/ManagerSlice";
import { loginAsync } from "../Features/LoginSlice";

const LoginForm = () => {
    const dis=useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    dis(loginAsync({ email, password }))
      .unwrap()
      .then(({ token, role,decoded }) => {        
        switch (role) {
          case "admin":
            navigate("/admin");
            break;
          case "driver":
            navigate("/driver");
            break;
          case "parent":
            navigate("/parent");
            break;
          default:
            alert("Unauthorized role");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("אימייל או סיסמה שגויים");
      });
};


  return (
    <Box>
      <TextField dir="ltr"
        fullWidth
        label="כתובת אימייל"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{ endAdornment: <Email /> }}
        sx={{ mb: 2 }}
      />
      <TextField dir="ltr"
        fullWidth
        label="סיסמה"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{ endAdornment: <Lock /> }}
        sx={{ mb: 2 }}
      />
      <Typography
        variant="body2"
        color="primary"
        sx={{ cursor: "pointer", mb: 2 }}
        onClick={() => alert("שכחת סיסמה? תכונה זו תתווסף בקרוב!")}
      >
        שכחת סיסמה?
      </Typography>
      <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
        כניסה למערכת
      </Button>
    </Box>
  );
};

export default LoginForm;
