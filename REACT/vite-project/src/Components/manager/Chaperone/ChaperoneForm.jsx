import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Autocomplete from "../../Autocomplete"; // Import the Autocomplete component

const ChaperoneForm = ({
  typeForm,
  onAddChaperone,
  onUpdateChaperone,
  onCancel,
}) => {
  const chap = useSelector((x) => x.chaperone.currentChaperone);
  const [chaperoneData, setChaperoneData] = useState({
    id: chap.id || "",
    name: chap.name || "",
    phone: chap.phone || "",
    email: chap.email || "",
    address: chap.address || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setChaperoneData({ ...chaperoneData, [e.target.name]: e.target.value });
  };

  const handleAddressSelect = (selectedAddress, type) => {
    setChaperoneData({ ...chaperoneData, address: selectedAddress });
  };

  const validate = () => {
    let tempErrors = {};
    if (!chaperoneData.id) tempErrors.id = "שדה חובה";
    if (!chaperoneData.name) tempErrors.name = "שדה חובה";
    if (!chaperoneData.phone.match(/^\d{9,10}$/))
      tempErrors.phone = "מספר טלפון לא תקין";
    if (!chaperoneData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      tempErrors.email = "כתובת מייל לא תקינה";
    if (!chaperoneData.address) tempErrors.address = "שדה חובה";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      switch (typeForm) {
        case "add":
          onAddChaperone(chaperoneData);
          break;
        case "update":
          onUpdateChaperone(chaperoneData);
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
        <Typography variant="h6">טופס מלווה</Typography>
        {typeForm !== "update" && (
          <TextField
            fullWidth
            name="id"
            label="תעודת זהות"
            value={chaperoneData.id}
            sx={{ my: 1 }}
            onChange={handleChange}
            error={!!errors.id}
            helperText={errors.id}
            InputProps={{
              readOnly: typeForm === "view",
            }}
          />
        )}
        <TextField
          fullWidth
          name="name"
          label="שם"
          value={chaperoneData.name}
          sx={{ my: 1 }}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          InputProps={{
            readOnly: typeForm === "view",
          }}
        />
        <TextField
          fullWidth
          name="phone"
          label="טלפון"
          value={chaperoneData.phone}
          sx={{ my: 1 }}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          InputProps={{
            readOnly: typeForm === "view",
          }}
        />
        <TextField
          fullWidth
          name="email"
          label="מייל"
          value={chaperoneData.email}
          sx={{ my: 1 }}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            readOnly: typeForm === "view",
          }}
        />
        <Autocomplete
          onSelect={handleAddressSelect} 
          textInput="כתובת"
          type="address"
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
          onClick={() => onCancel()}
          sx={{ mt: 2, ml: 1 }}
        >
          {(typeForm !== "view" && "ביטול") || "סגור"}
        </Button>
      </Paper>
    </Box>
  );
};

export default ChaperoneForm;
