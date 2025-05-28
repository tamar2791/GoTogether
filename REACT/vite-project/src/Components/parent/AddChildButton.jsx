import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEdusAsync } from "../../Features/EduSlice"
import Autocomplete from "../Autocomplete";

const AddChildButton = ({ parent, onAddChild }) => {
  
  const dis = useDispatch();
  const e = useSelector((x) => x.edu);
  const [edus, setEdus] = useState([]);

 useEffect(() => {
    dis(fetchAllEdusAsync());
  }, []);
  useEffect(() => {
    setEdus(e.edus);
  }, e.edus);
  const [open, setOpen] = useState(false);
  const [newChild, setNewChild] = useState(
    {
      id: "",
      name: "",
      address: parent?.address,
      isCome: true,
      isLeave: false,
      status: true,
      isDisable: false,
      isPrivateCar: false,
      isPrivateChperone: false,
      eduId: 0,
      parentsId:parent?.id
    });
    useEffect(() => {
      if (parent?.address) {
        setNewChild((prev) => ({ ...prev, address: parent.address,parentsId:parent.id }));
      }
    }, [parent]); 
    
  const handleAdd = () => {
    if (newChild.id && newChild.name) {
      onAddChild(newChild);
      setOpen(false);
      setNewChild({ id: "", name: "", isDisable: false, isPrivateCar: false, isPrivateChperone: false, eduId: 0 });
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mt: 2 }}>
        הוסף ילד
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>הוסף ילד חדש</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="5px" label="תעודת זהות" onChange={(e) => setNewChild({ ...newChild, id: e.target.value })} />
          <TextField fullWidth label="שם" onChange={(e) => setNewChild({ ...newChild, name: e.target.value })} />
          <TextField
            select
            fullWidth
            label="מוסד חינוכי"
            value={newChild.eduId}
            onChange={(e) => setNewChild({ ...newChild, eduId: e.target.value })}
            SelectProps={{
              native: true,
            }}
            sx={{ mt: 2 }}
          >
            <option value={0}>בחר מוסד חינוכי</option>
            {edus.map((edu) => (
              <option key={edu.id} value={edu.id}>
                {edu.name}
              </option>
            ))}
          </TextField>
          {/* <Autocomplete textInput="מוסד לימודי"></Autocomplete> */}
          <Box sx={{ mt: 2 }}>
            <label>?נכה</label>
            <Switch
              checked={newChild.isDisable || false}
              onChange={(e) => setNewChild({ ...newChild, isDisable: e.target.checked })}
              sx={{ ml: 2 }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <label>הסעה פרטית?</label>
            <Switch
              checked={newChild.isPrivateCar || false}
              onChange={(e) => setNewChild({ ...newChild, isPrivateCar: e.target.checked })}
              sx={{ ml: 2 }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <label>מלווה פרטית?</label>
            <Switch
              checked={newChild.isPrivateChperone || false}
              onChange={(e) => setNewChild({ ...newChild, isPrivateChperone: e.target.checked })}
              sx={{ ml: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>ביטול</Button>
          <Button onClick={handleAdd}>הוסף</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddChildButton;
