import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography, Paper,Grid } from "@mui/material";
import StudentsManagement from "./Child/StudentsManagement";
import ParentsManagement from "./Parents/ParentsManagement";
import StatsCard from "./StatsCard";
import DriversManagement from "./Driver/DriversManagement";
import ChaperonesManagement from "./Chaperone/ChaperoneManagement";
import TransportAssignment from "./TransportAssignment";
import NavBar from "../NavBar";
import { useDispatch } from "react-redux";
import { fetchChildrenAsync } from "../../Features/ChildClice";
import { fetchAllParentsAsync } from "../../Features/ParentSlice";
import { fetchAllEdusAsync } from "../../Features/EduSlice";
import { fetchDriversAsync } from "../../Features/DriverSlice";
import { useSelector } from "react-redux";
import { fetchChaperones } from "../../Features/ChaperoneSlice";



const Dashboard = () => {
  const dis=useDispatch()
  const children=useSelector((x)=>x.child.children);
  const parent=useSelector((x)=>x.parent.parents);
  const driver=useSelector((x)=>x.driver.drivers);
  const edu=useSelector((x)=>x.edu.edus);
  const chaper=useSelector((x)=>x.chaperone.chaperones);
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [edus, setEdus] = useState([]);
  const [chaperones, setChaperones] = useState([]);
  useEffect(()=>{
    dis(fetchChildrenAsync());
    dis(fetchAllParentsAsync());
    dis(fetchDriversAsync());
    dis(fetchAllEdusAsync());
    dis(fetchChaperones());
  },[])
  useEffect(()=>{
    setStudents(children);
    setParents(parent);
    setDrivers(driver);
    setEdus(edu);
    setChaperones(chaper);
  },[children,parent,driver,edu,chaper])

  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar type="מנהל" name="מנהל המערכת"></NavBar>
      <br/>
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          לוח בקרה לניהול
        </Typography>
      {/* אזור הנתונים */}
      <Grid container spacing={2}>
        <StatsCard title="תלמידים" value={students.map(x=>x.status).length} subtext="סה״כ תלמידים" />
        <StatsCard title="הורים" value={parents.map(x=>x.status).length} subtext="סה״כ הורים" />
        <StatsCard title="נהגים" value={drivers.map(x=>x.status).length} subtext="סה״כ נהגים" />
        <StatsCard title="מלוות" value={chaperones.map(x=>x.status).length} subtext="סה״כ מלוות" />
      </Grid>
      {/* סרגל ניווט */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
          <Tab label="תלמידים" />
          <Tab label="הורים" />
          <Tab label="נהגים" />
          <Tab label="מלוות" />
          <Tab label="שיבוץ הסעות" />
        </Tabs>
      </Paper>

      {/* הצגת הקומפוננטה המתאימה לפי הטאב שנבחר */}
      {activeTab === 0 && <StudentsManagement students={students}/>}
      {activeTab === 1 && <ParentsManagement parents={parents} />}
      {activeTab === 2 && <DriversManagement drivers={drivers} />}
      {activeTab === 3 && <ChaperonesManagement chaperones={chaperones}/>}
      {activeTab === 4 && <TransportAssignment />}
      {activeTab === 5 && handleTabClick("/admin")}
    </Box>
    </Box>
  );
};

export default Dashboard;
