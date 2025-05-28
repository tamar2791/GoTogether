import React from "react";
import { Paper, Button, Typography, Box } from "@mui/material";

const ChildSelection = ({ onSelectChild,parent }) => {
  const children = parent?.children

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">בחר ילד:</Typography>
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        {children?.map((child) => (
          <Button key={child.id} variant="contained" onClick={() => onSelectChild(child)}>
            {child.name}
          </Button>
        ))}
      </Box>
    </Paper>
  );
};

export default ChildSelection;
