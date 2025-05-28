import React, { useState } from "react";
import { Box, Paper, Typography, Button, TextField } from "@mui/material";
import StudentTable from "./StudentsTable";

const StudentsManagement = ({students}) => {


  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  return (
    <Box>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">ניהול תלמידים</Typography>
      </Paper>

      <StudentTable searchTerm={searchTerm} students={students}/>
    </Box>
  );
};

export default StudentsManagement;
