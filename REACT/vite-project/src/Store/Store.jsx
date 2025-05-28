import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import childReducer from "../Features/ChildClice";
import eduReducer from "../Features/EduSlice";
import driverReducer from "../Features/DriverSlice";
import chaperoneReducer from "../Features/ChaperoneSlice";
import managerReducer from "../Features/ManagerSlice";
import parentReducer from "../Features/ParentSlice";
import loginReducer from "../Features/LoginSlice";
export const Store = configureStore({
  reducer: {
    child: childReducer,
    edu: eduReducer,
    driver: driverReducer,
    chaperone: chaperoneReducer,
    manager: managerReducer,
    parent:parentReducer,
    login:loginReducer
  },
});
