import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import ParentsTable from "./ParentsTable";

const ParentsManagement = ({parents}) => {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">ניהול הורים</Typography>
      </Paper>

      <ParentsTable parents={parents} searchTerm={searchTerm} />

    </Box>
  );
};

export default ParentsManagement;
