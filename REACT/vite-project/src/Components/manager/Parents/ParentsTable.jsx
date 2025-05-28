import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchAllParentsAsync, setCurrentParentManager } from "../../../Features/ParentSlice";
import ParentForm from "./ParentForm‏";

const ParentsTable = ({parents}) => {
 
  const dis=useDispatch()
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSearch = (event) => setSearchTerm(event.target.value.toLowerCase());

  return (
    <Paper sx={{ p: 2 }}>
      <TextField
        label="חיפוש"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
      <TableContainer sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"> כתובת מייל</TableCell>
              <TableCell align="center"> כתובת </TableCell>
              <TableCell align="center">טלפון אם</TableCell>
              <TableCell align="center">טלפון אב</TableCell>
              <TableCell align="center">שם האם</TableCell>
              <TableCell align="center">שם האב</TableCell>
              <TableCell align="center">שם משפחה</TableCell>
              <TableCell align="center">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parents
              .filter((parent) => {
                const searchFields = [
                  parent.email,
                  parent.address,
                  parent.motherPone,
                  parent.fatherPone,
                  parent.motherName,
                  parent.fatherName,
                  parent.lastName
                ]
                  .filter(Boolean)
                  .map((field) => field.toLowerCase());
                return searchFields.some((field) => field.includes(searchTerm));
              })
              .map((parent) => (
                <TableRow key={parent.id}>
                  <TableCell align="center">{parent.email}</TableCell>
                  <TableCell align="center">{parent.address}</TableCell>
                  <TableCell align="center">{parent.motherPhone}</TableCell>
                  <TableCell align="center">{parent.fatherPhone}</TableCell>
                  <TableCell align="center">{parent.motherName}</TableCell>
                  <TableCell align="center">{parent.fatherName}</TableCell>
                  <TableCell align="center">{parent.lastName}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        dis(setCurrentParentManager(parent));
                        setOpenModal(true);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openModal && <ParentForm onCancel={() => setOpenModal(false)} />}
    </Paper>
  );
};

export default ParentsTable;
