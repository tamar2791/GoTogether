import React, { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import ParentDetails from "./ParentDetails";
import ChildSelector from "./ChildSelector";
import ChildDetails from "./ChildDetails";
import AddChildButton from "./AddChildButton";
import { fetchParentByIdAsync } from "../../Features/ParentSlice";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { addChildAsync } from "../../Features/ChildClice";

const ParentDashboard = () => {
  const parent=useSelector((state) => state.parent.currentParent);
  const dis=useDispatch()
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const decoded = jwtDecode(token);
    dis(fetchParentByIdAsync(decoded.Id))
}, []);
useEffect(() => {
    const token = localStorage.getItem("authToken");
    const decoded = jwtDecode(token);
    dis(fetchParentByIdAsync(decoded.Id))        
}, [parent]);
  const [selectedChild, setSelectedChild] = useState(null);

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <ParentDetails parent={parent} />
      <ChildSelector parent={parent} onSelectChild={setSelectedChild} />
      {selectedChild && <ChildDetails child={selectedChild} />}
      <AddChildButton parent={parent} onAddChild={(newChild) =>{
         setSelectedChild(newChild)
         dis(addChildAsync(newChild))
         } }/>
    </Box>
  );
};

export default ParentDashboard;
