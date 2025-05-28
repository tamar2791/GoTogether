import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const DriverForm = ({ typeForm, onAddDriver, onUpdateDriver, onCancel }) => {
  const dr = useSelector((x) => x.driver.currentDriver);
  const [driverData, setDriverData] = useState({
    name: dr.name || "",
    phone: dr.phone || "",
    address: dr.address || "",
    email: dr.email || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setDriverData({ ...driverData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!driverData.name) tempErrors.name = "שם הוא שדה חובה";
    if (!driverData.phone) tempErrors.phone = "טלפון הוא שדה חובה";
    else if (!/^\d{9,10}$/.test(driverData.phone))
      tempErrors.phone = "מספר טלפון לא תקין";
    if (!driverData.address) tempErrors.address = "כתובת היא שדה חובה";
    if (!driverData.email) tempErrors.email = "מייל הוא שדה חובה";
    else if (!/^\S+@\S+\.\S+$/.test(driverData.email))
      tempErrors.email = "כתובת מייל לא תקינה";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      switch (typeForm) {
        case "add":
          onAddDriver(driverData);
          break;
        case "update":
          onUpdateDriver(driverData);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
      }}
    >
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">טופס נהג</Typography>

        <TextField
          fullWidth
          name="name"
          label="שם"
          value={driverData.name}
          sx={{ my: 1 }}
          onChange={handleChange}
          InputProps={{ readOnly: typeForm === "view" }}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          fullWidth
          name="phone"
          label="טלפון"
          value={driverData.phone}
          sx={{ my: 1 }}
          onChange={handleChange}
          InputProps={{ readOnly: typeForm === "view" }}
          error={!!errors.phone}
          helperText={errors.phone}
        />

        <TextField
          fullWidth
          name="address"
          label="כתובת"
          value={driverData.address}
          sx={{ my: 1 }}
          onChange={handleChange}
          InputProps={{ readOnly: typeForm === "view" }}
          error={!!errors.address}
          helperText={errors.address}
        />

        <TextField
          fullWidth
          name="email"
          label="מייל"
          value={driverData.email}
          sx={{ my: 1 }}
          onChange={handleChange}
          InputProps={{ readOnly: typeForm === "view" }}
          error={!!errors.email}
          helperText={errors.email}
        />

        {typeForm === "add" && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            הוספה
          </Button>
        )}
        {typeForm === "update" && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            עדכון
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={onCancel}
          sx={{ mt: 2, ml: 1 }}
        >
          {(typeForm !== "view" && "ביטול") || "סגור"}
        </Button>
      </Paper>
    </Box>
  );
};

export default DriverForm;
