import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import DriversTable from "./DriverTable";
import DriverForm from "./DriverForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addDriverAsync,
  fetchDriversAsync,
  setCurrentDriver,
  updateDriverAsync,
} from "../../../Features/DriverSlice";

const DriversManagement = ({drivers}) => {
  const dis = useDispatch();
  const [drs, setDrivers] = useState([...drivers]);
  const dr = useSelector((x) => x.driver);
  useEffect(() => {
    dis(fetchDriversAsync());
  }, []);
  useEffect(() => {
    setDrivers(dr.drivers);
  }, dr.drivers);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleAddDriver = (newDriver) => {
    newDriver = { ...newDriver, password: "1234", status: true };
    dis(addDriverAsync(newDriver));
    setDrivers([...drs, newDriver]);
    setOpenModal(false);
  };
  const handleUpdateDriver = (updateDr) => {debugger
    dis(updateDriverAsync({ driverId: updateDr.driverId, updatedData: updateDr }));
    setDrivers([
      ...drs.map((driver) =>
        driver.driverId === updateDr.driverId ? updateDr : driver
      ),
    ]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">ניהול נהגים</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpenModal(true);
            dis(
              setCurrentDriver({
                name: "",
                phone: "",
                address: "",
                email: "",
              })
            );
          }}
        >
          הוספת נהג +
        </Button>
      </Paper>
      <br></br>
      <DriversTable
        drivers={drs}
        searchTerm={searchTerm}
        onUpdate={handleUpdateDriver}
      />

      {openModal && (
        <DriverForm
          typeForm={"add"}
          onAddDriver={handleAddDriver}
          onCancel={() => {
            setOpenModal(false);
          }}
        />
      )}
    </Box>
  );
};

export default DriversManagement;
