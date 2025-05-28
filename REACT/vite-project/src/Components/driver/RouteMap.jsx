import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { sendMessageToParentsAsync } from "../../Features/DriverSlice";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "50vh",
};

const RouteMap = ({ start, end, waypoints, isMorning, parents, onRouteCalculated, onClose, desiredArrivalTime,ondepartureTimeDate,startTime }) => {
  const [directions, setDirections] = useState(null);
  const dispatch = useDispatch();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
    language: "he",
  });

  useEffect(() => {
    if (isLoaded && start && end) {
      calculateRoute();
      let messeges=[]
      for (let i = 0; i < parents.length; i++) {
        messeges.push({
          id:parents[i].id,
          number:parents[i].motherPhone,
          messege:`הנהג יגיע בשעה`
        })
      }
      dispatch(sendMessageToParentsAsync(messeges));
    }
  }, [isLoaded, start, end, waypoints, desiredArrivalTime]);

  const calculateRoute = () => {
    if (!isLoaded || !start || !end || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: isMorning ? start : end,
        destination: !isMorning ? start : end,
        waypoints: waypoints
          ? waypoints.split(",").map((w) => ({ location: w.trim(), stopover: true }))
          : [],
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          extractRouteDetails(result);
        } else {
          console.error("Directions request failed", status);
        }
      }
    );
  };

  const extractRouteDetails = (result) => {
    if (!result || !result.routes.length) return;

    const route = result.routes[0];
    let totalDurationSec = 0;
    let totalDistanceMeters = 0;
    let arrivalTimes = [];

    // חישוב זמן נסיעה כולל
    route.legs.forEach((leg) => {
      totalDurationSec += leg.duration.value;
      totalDistanceMeters += leg.distance.value;
    });

    // המרת שעת הגעה רצויה לאובייקט Date
    let arrivalTimeDate = new Date(desiredArrivalTime);
    
    // חישוב זמן יציאה נדרש
    let departureTimeDate = new Date(isMorning?arrivalTimeDate.getTime() - totalDurationSec * 1000:startTime);
    ondepartureTimeDate(departureTimeDate)

    // חישוב זמני הגעה לנקודות העצירה
    let currentTime = new Date(departureTimeDate);
    route.legs.forEach((leg) => {
      currentTime = new Date(currentTime.getTime() + leg.duration.value * 1000);
      arrivalTimes.push({
        location: leg.end_address,
        arrivalTime: currentTime.toLocaleTimeString(),
      });
    });

    if (onRouteCalculated) {
      onRouteCalculated({
        totalDuration: `${Math.floor(totalDurationSec / 60)} דקות`,
        totalDistance: `${(totalDistanceMeters / 1000).toFixed(1)} ק"מ`,
        stopsArrivalTimes: arrivalTimes,
        requiredDepartureTime: departureTimeDate.toLocaleTimeString(),
      });
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return isLoaded ? (
    <div className="modal">
      <div className="overlay" onClick={onClose}></div>
      <div className="map-container">
        <button className="close-button" onClick={onClose}> סגור</button>
        <GoogleMap zoom={10} mapContainerStyle={mapContainerStyle}>
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <div>Loading map...</div>
  );
};

export default RouteMap;
