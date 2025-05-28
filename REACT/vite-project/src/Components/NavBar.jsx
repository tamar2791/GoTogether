import React from "react";
import "./NavBar.css";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function NavBar(props) {
  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar className="navbar-toolbar">
        <Typography variant="h6" className="navbar-user">
          שלום ל{props.name}
        </Typography>
        <Typography variant="h6" className="navbar-title">
          מערכת לניהול הסעות - ממשק {props.type}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
