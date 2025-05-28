import React, { useState } from "react";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,TextField,Typography,IconButton,Box,} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { setCurrent, updateChaperone } from "../../../Features/ChaperoneSlice";
import ChaperoneForm from "./ChaperoneForm";
import { useDispatch } from "react-redux";

const ChaperonesTable = ({ chaperones,onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFormU,setOpenFormU]=useState(false);
  const [openFormV,setOpenFormV]=useState(false);
  const dis=useDispatch();
const handleUpdateChaperone=(updateChap)=>{
  onUpdate(updateChap);
  setOpenFormU(false);
}
  return (
    <Box>
    <Paper sx={{ p: 2 }}>
      <TableContainer sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">תעודת זהות</TableCell>
              <TableCell align="center">שם מלווה</TableCell>
              <TableCell align="center">טלפון</TableCell>
              <TableCell align="center">אימייל</TableCell>
              <TableCell align="center">כתובת</TableCell>
              <TableCell align="center">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chaperones
              .filter((chaperone) =>chaperone.status&& chaperone.name.includes(searchTerm))
              .map((chaperone) => (
                <TableRow key={chaperone.id}>
                  <TableCell align="center">{chaperone.id}</TableCell>
                  <TableCell align="center">{chaperone.name}</TableCell>
                  <TableCell align="center">{chaperone.phone}</TableCell>
                  <TableCell align="center">{chaperone.email}</TableCell>
                  <TableCell align="center">{chaperone.address}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setOpenFormV(true);
                        dis(setCurrent(chaperone));
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="warning"
                      onClick={() => {setOpenFormU(true);
                          dis(setCurrent(chaperone));
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        if (
                          window.confirm(
                            "האם אתה בטוח שברצונך למחוק את המלווה?"
                          )
                        ) {
                          onUpdate({
                            ...chaperone,
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
    </Paper>
    {openFormU&&<ChaperoneForm typeForm={"update"}onUpdateChaperone={handleUpdateChaperone}onCancel={()=>setOpenFormU(false)} ></ChaperoneForm>}
    {openFormV&&<ChaperoneForm typeForm={"view"}onCancel={()=>setOpenFormV(false)} ></ChaperoneForm>}
    </Box>
  );
};

export default ChaperonesTable;
