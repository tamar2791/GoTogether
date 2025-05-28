import React, { useEffect, useState } from "react";
import DailySummary, { } from "./DailyRoute"
import RouteDetails from "./RouteDetails";
import NavBar from "../NavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchDriverByIdAsync } from "../../Features/DriverSlice";
import { jwtDecode } from "jwt-decode";
export default function DriverMain() {
    const dis = useDispatch()
    const driver = useSelector(state => state.driver.currentDriver);
    const [time,setTime]=useState(0)
    const [km,setKm]=useState(0)
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const decoded = jwtDecode(token);
        dis(fetchDriverByIdAsync(decoded.Id))
    }, []);
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const decoded = jwtDecode(token);
        dis(fetchDriverByIdAsync(decoded.Id))        
    }, [driver]);
    return (
        <div>
            {driver &&
            <NavBar type="נהג" name={driver?.name }></NavBar>
            }
            <br />
            <DailySummary driver={driver} time={time} km={km}></DailySummary>
            <br></br>
            {driver?.address&&
            <RouteDetails address={driver.address} time={setTime} km={setKm}></RouteDetails>}
        </div>
    );
};