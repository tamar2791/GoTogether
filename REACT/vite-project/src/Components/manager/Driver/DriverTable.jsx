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
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  setCurrentDriver,
} from "../../../Features/DriverSlice";
import DriverForm from "./DriverForm";

const DriverTable = ({ drivers, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFormV, setOpenFormV] = useState(false);
  const dis = useDispatch();

  const handleSearch = (event) => setSearchTerm(event.target.value.toLowerCase());

  const handleUpdateDriver = (updateDr) => {
    onUpdate(updateDr);
    setOpenFormV(false);
  };

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
              <TableCell align="center"> מייל</TableCell>
              <TableCell align="center"> כתובת</TableCell>
              <TableCell align="center">טלפון</TableCell>
              <TableCell align="center">שם</TableCell>
              <TableCell align="center">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers
              .filter((driver) => {
                const searchFields = [
                  driver.email,
                  driver.address,
                  driver.phone,
                  driver.name,
                ]
                  .filter(Boolean)
                  .map((field) => field.toLowerCase());
                return searchFields.some((field) => field.includes(searchTerm));
              })
              .map((driver) => (driver.status&&
                <TableRow key={driver.driverId}>
                  <TableCell align="center">{driver.email}</TableCell>
                  <TableCell align="center">{driver.address}</TableCell>
                  <TableCell align="center">{driver.phone}</TableCell>
                  <TableCell align="center">{driver.name}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setOpenFormV(true);
                        dis(setCurrentDriver(driver));
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => {
                        if (
                          window.confirm("האם אתה בטוח שברצונך למחוק את הנהג?")
                        ) {
                          onUpdate({
                            ...driver,
                            status: false,
                          });
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openFormV && (
        <DriverForm
          typeForm={"view"}
          onCancel={() => setOpenFormV(false)}
          onUpdate={handleUpdateDriver}
        ></DriverForm>
      )}
    </Paper>
  );
};

export default DriverTable;