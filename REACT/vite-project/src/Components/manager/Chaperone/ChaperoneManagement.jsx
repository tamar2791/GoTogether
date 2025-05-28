import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import ChaperonesTable from "./ChaperoneTable";
import ChaperoneForm from "./ChaperoneForm";
import { addChaperone, fetchChaperones, setCurrent, updateChaperone } from "../../../Features/ChaperoneSlice";
import { useDispatch, useSelector } from "react-redux";

const ChaperonesManagement = () => {
  const dis = useDispatch();
  const [chaperones, setChaperones] = useState([]);
  const ch = useSelector((x) => x.chaperone);
  useEffect(() => {
    dis(fetchChaperones());
  }, []);
  useEffect(() => {
    setChaperones(ch.chaperones);
  }, ch.chaperones);

  const [openModal, setOpenModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleAddChaperone = (newChaperone) => {
    newChaperone = { ...newChaperone, status: true };
    dis(addChaperone(newChaperone));
    setChaperones([
      ...chaperones, newChaperone,
    ]);
    setOpenModal(false);
  };
  const handleUpdateChaperone=(updateChap)=>{
    dis(updateChaperone({ id: updateChap.id, updatedData:updateChap }));
    setChaperones([...chaperones.map((chaperone) => chaperone.id === updateChap.id ? updateChap : chaperone)]);
  }
  return (
    <Box>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">ניהול מלווים</Typography>
        <TextField
          fullWidth
          placeholder="חפש לפי שם או טלפון..."
          value={searchTerm}
          onChange={handleSearch}
          sx={{ my: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() =>{ setOpenModal(true);
          dis(setCurrent({
            id: "",
            name: "",
            phone: "",
            email: "",
            address:""
          }));
          }}
        >
          הוספת מלווה +
        </Button>

      </Paper>
      <br />

      <ChaperonesTable chaperones={chaperones} searchTerm={searchTerm} onUpdate={handleUpdateChaperone} />
      {openModal && <ChaperoneForm typeForm={"add"} onAddChaperone={handleAddChaperone} onCancel={() => setOpenModal(false)} />}
    </Box>
  );
};

export default ChaperonesManagement;
