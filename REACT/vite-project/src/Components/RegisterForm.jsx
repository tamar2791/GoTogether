import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Details, Email, Lock, Person, Phone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SignUpParentAsync } from "../Features/ParentSlice";
import { setCurrentParentManager } from "../Features/ParentSlice";
import { loginAsync } from "../Features/LoginSlice";
import Autocomplete from "./Autocomplete";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [fatherPhone, setFatherPhone] = useState("");
  const [motherPhone, setMotherPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    // בדיקות תקינות
    if (
      !lastName ||
      !fatherName ||
      !motherName ||
      !fatherPhone ||
      !motherPhone ||
      !email ||
      !password ||
      !address
    ) {
      alert("אנא מלא את כל השדות.");
      return;
    }

    // בדיקת אימייל תקני
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("אימייל לא תקני");
      return;
    } else {
      setEmailError("");
    }

    // בדיקת טלפונים (רק מספרים)
    if (!/^\d{10}$/.test(fatherPhone)) {
      setPhoneError("טלפון אב צריך לכלול 10 ספרות");
      return;
    } else if (!/^\d{10}$/.test(motherPhone)) {
      setPhoneError("טלפון אם צריך לכלול 10 ספרות");
      return;
    } else {
      setPhoneError("");
    }

    // בדיקת סיסמה
    if (password.length < 6) {
      setPasswordError("הסיסמה צריכה להיות באורך מינימום של 6 תווים");
      return;
    } else {
      setPasswordError("");
    }

    // יצירת אובייקט עם הנתונים המעודכנים
    const formData = {
      lastName,
      fatherName,
      motherName,
      fatherPhone,
      motherPhone,
      email,
      password,
      address,
      status: true,
      children: [],
    };

    // שליחת הנתונים מיד
    dispatch(SignUpParentAsync(formData));
    dispatch(setCurrentParentManager(formData));
    dispatch(loginAsync(formData))
    alert("הרשמה בוצעה בהצלחה! אתה מועבר לדף הורים.");
    navigate("/parent");
  };

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
      <Box width="48%">
        <TextField
          fullWidth
          label="שם משפחה"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          InputProps={{ endAdornment: <Person /> }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="שם האבא"
          variant="outlined"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
          InputProps={{ endAdornment: <Person /> }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="טלפון האבא"
          variant="outlined"
          value={fatherPhone}
          onChange={(e) => setFatherPhone(e.target.value)}
          InputProps={{ endAdornment: <Phone /> }}
          sx={{ mb: 2 }}
          error={!!phoneError}
          helperText={phoneError}
        />
        <TextField
          fullWidth
          label="אימייל"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{ endAdornment: <Email /> }}
          sx={{ mb: 2 }}
          error={!!emailError}
          helperText={emailError}
        />
      </Box>
      <Box width="48%">
        <TextField
          fullWidth
          label="שם האמא"
          variant="outlined"
          value={motherName}
          onChange={(e) => setMotherName(e.target.value)}
          InputProps={{ endAdornment: <Person /> }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="טלפון האמא"
          variant="outlined"
          value={motherPhone}
          onChange={(e) => setMotherPhone(e.target.value)}
          InputProps={{ endAdornment: <Phone /> }}
          sx={{ mb: 2 }}
          error={!!phoneError}
          helperText={phoneError}
        />
        <Autocomplete textInput={"כתובת"}></Autocomplete>
        <TextField
          fullWidth
          label="סיסמה"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{ endAdornment: <Lock /> }}
          sx={{ mb: 2 }}
          error={!!passwordError}
          helperText={passwordError}
        />
      </Box>
      <Box width="100%">
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRegister}
        >
          הרשמה
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;

