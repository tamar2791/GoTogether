import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box, Tabs, Tab } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import StudentCard from "./StudentCard";
import SchoolCard from "./SchoolCard";
import RouteMap from "./RouteMap";
import { useSelector } from "react-redux";
import ChaperoneCard from "./ChaperoneCard";

export default function RouteDetails({ time, km }) {
    const driver = useSelector(state => state.driver.currentDriver);
    const edu = driver.children[0]?.educationalInstitution || {};
    const students = driver?.children || [];

    const [showMap, setShowMap] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [routeDetails, setRouteDetails] = useState(null);
    const [departureTimeDate, setDepartureTimeDate] = useState(null)

    time(routeDetails?.totalDuration);
    km(routeDetails?.totalDistance);

    const isMorning = selectedTab === 0;
    const studentsData = isMorning
        ? students.filter(x => x.isCome)
        : students.filter(x => !x.isLeave);
    // פונקציה לניקוי כתובות: מסירה סימני פיסוק ורווחים מיותרים
    const cleanAddress = (address) => {
        return address
            ?.replace(/[,.-]/g, "")
            .replace(/\s+/g, " ")
            .trim();
    };

    return (
        <Box position="relative">
            <h2>מסלולי היום</h2>

            {/* טאבים לבחירת מסלול בוקר / צהריים */}
            <Tabs value={selectedTab} onChange={(event, newValue) => setSelectedTab(newValue)} centered>
                <Tab label="מסלול בוקר" value={0} />
                <Tab label="מסלול צהריים" value={1} />
            </Tabs>

            {/* טעינת המפה עם רענון בכל מעבר טאבים */}
            <Box style={{ display: showMap ? "block" : "none" }}>
                <RouteMap
                    key={selectedTab} // שינוי מפתח כדי לגרום לרענון המפה
                    start={driver.chaperone?.address}
                    end={edu?.address}
                    waypoints={studentsData.map((s) => s.address).join(", ")}
                    isMorning={isMorning}
                    parents={studentsData.map(x => x.parents)}
                    onRouteCalculated={setRouteDetails}
                    onClose={() => setShowMap(false)}
                    desiredArrivalTime={isMorning ? `${new Date().toISOString().split('T')[0]}T${edu?.startTime}` : ""}
                    ondepartureTimeDate={setDepartureTimeDate}
                    startTime={`${new Date().toISOString().split('T')[0]}T${edu?.endTime}`}
                />
            </Box>

            <Card sx={{
                borderRadius: 3,
                boxShadow: 3,
                p: 2,
                maxWidth: 900,
                mx: "auto",
                opacity: showMap ? 0.3 : 1, 
                transition: "opacity 0.3s"
            }}>
                <CardContent>
                    <Typography variant="h6" fontWeight="bold" textAlign="right">
                        {isMorning ? "מסלול בוקר" : "מסלול צהריים"}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" textAlign="right">
                        שעת תחילת המסלול: {departureTimeDate?.toLocaleTimeString()}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-start", my: 2 }}>
                        <Button variant="contained" startIcon={<DirectionsIcon />} onClick={() => setShowMap(true)}>
                            פתיחת ניווט במפה
                        </Button>
                    </Box>

                    {!isMorning &&
                        <SchoolCard isMorning={isMorning} name={edu?.name} address={edu?.address} arrivalTime={edu?.endTime} />}
                    {isMorning &&
                        <ChaperoneCard isMorning={isMorning} name={driver?.chaperone?.name} address={driver?.chaperone?.address} arrivalTime={departureTimeDate?.toLocaleTimeString()} />}

                    {students.length > 0 ? (
                        students.map((student) => (
                            <StudentCard
                                key={student.id}
                                student={student}
                                isMorning={isMorning}
                                arrivalTime={
                                    routeDetails?.stopsArrivalTimes.find(stop => {
                                        const stopAddress = cleanAddress(stop.location);
                                        const studentAddress = cleanAddress(student.address);
                                        return stopAddress.includes(studentAddress) || studentAddress.includes(stopAddress);
                                    })?.arrivalTime || "לא ידוע"
                                }
                            />
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary" textAlign="center">
                            אין תלמידים במסלול זה.
                        </Typography>
                    )}

                    {isMorning &&
                        <SchoolCard isMorning={isMorning} name={edu?.name} address={edu?.address} arrivalTime={edu?.startTime} />}
                    {!isMorning &&
                        <ChaperoneCard isMorning={isMorning} name={driver?.chaperone?.name} address={driver?.chaperone?.address} arrivalTime={routeDetails.stopsArrivalTimes[routeDetails.stopsArrivalTimes.length - 1].arrivalTime} />}
                </CardContent>
            </Card>
        </Box>
    );
}
