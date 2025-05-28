import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ParentForm = ({ onCancel }) => {
  const par = useSelector((x) => x.parent.currentParentManager);
  const [parenttData, setParentData] = useState({
    lastName: par.lastName,
    fatherName: par.fatherName,
    motherName: par.motherName,
    fatherPhone: par.fatherPhone,
    motherPhone: par.motherPhone,
    address: par.address,
    email: par.email,
  });

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
        <Typography variant="h6">טופס ילד</Typography>
        {
          <TextField
            fullWidth
            name="lastName"
            label="שם משפחה"
            value={parenttData.lastName || "-"}
            sx={{ my: 1 }}
            InputProps={{
              readOnly: true,
            }}
          />
        }
        <TextField
          fullWidth
          name="fatherName"
          label="שם אבא"
          value={parenttData.fatherName || "-"}
          sx={{ my: 1 }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          name="motherName"
          label="שם  אמא"
          value={parenttData.motherName || "-"}
          sx={{ my: 1 }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          name="fatherPhone"
          label="טלפון אבא "
          value={parenttData.fatherPhone || "-"}
          sx={{ my: 1 }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          name="motherPhone"
          label="טלפון אמא "
          value={parenttData.motherPhone || "-"}
          sx={{ my: 1 }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          name="address"
          label="כתובת"
          value={parenttData.address || "-"}
          sx={{ my: 1 }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          name="email"
          label="מייל"
          value={parenttData.email || "-"}
          sx={{ my: 1 }}
          InputProps={{
            readOnly: true,
          }}
        />

        <Button
          variant="outlined"
          color="primary"
          onClick={() => onCancel()}
          sx={{ mt: 2, ml: 1 }}
        >
          {"סגור"}
        </Button>
      </Paper>
    </Box>
  );
};

export default ParentForm;
