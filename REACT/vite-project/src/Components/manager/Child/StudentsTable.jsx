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
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchChildrenAsync,setCurrentChild } from "../../../Features/ChildClice";
import StudentForm from "./StudentForm‏";

export default function StudentsTable({students}) {

  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSearch = (event) =>
    setSearchTerm(event.target.value.toLowerCase());

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
              <TableCell align="center">מוסד לימודים</TableCell>
              <TableCell align="center">שם משפחה</TableCell>
              <TableCell align="center">שם פרטי</TableCell>
              <TableCell align="center">תעודת זהות</TableCell>
              <TableCell align="center"> צפיה בפרטים</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students
              .filter((student) => {
                const searchFields = [
                  student.id,
                  student.name,
                  student.parent?.lastName,
                  student.educationalInstitution?.name,
                ]
                  .filter(Boolean)
                  .map((field) => field.toLowerCase());
                return searchFields.some((field) => field.includes(searchTerm));
              })
              .map((student) => (
                <TableRow key={student.id}>
                  <TableCell align="center">
                    {student.educationalInstitution?.name || "-"}
                  </TableCell>
                  <TableCell align="center">
                    {(student.parents?.lastName) || "-"}
                  </TableCell>
                  <TableCell align="center">{student.name}</TableCell>
                  <TableCell align="center">{student.id}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setOpenModal(true);
                        dis(setCurrentChild(student));
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

      {openModal && <StudentForm onCancel={() => setOpenModal(false)} />}
    </Paper>
  );
}
