import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const StudentForm = ({ onCancel }) => {
  const stud = useSelector((x) => x.child.currentChild);
  const [studentData, setStudentData] = useState({
    id: stud?.id,
    name: stud?.name,
    lastName: stud?.parents?.lastName,
    school: stud?.educationalInstitution?.name,
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
            name="id"
            label="תעודת זהות"
            value={studentData.id|| "-"}
            sx={{ my: 1 }}
            InputProps={{
              readOnly: true,
            }}
          />
        }
        <TextField
          fullWidth
          name="name"
          label="שם"
          value={studentData.name|| "-"}
          sx={{ my: 1 }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          name="lastName"
          label="שם משפחה"
          value={studentData.lastName|| "-"}
          sx={{ my: 1 }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          name="school"
          label="מוסד לימודים"
          value={studentData.school|| "-"}
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

export default StudentForm;
