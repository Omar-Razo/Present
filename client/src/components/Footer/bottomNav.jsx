import React from "react";
import { House, Camera, Gear, User } from "@phosphor-icons/react";


const buttonsFeed = [
  { id: 1, label: "Profile", icon: <User />, path: "/profile" },
  { id: 2, label: "Camera", icon: <Camera />, path: "/camera" },
  { id: 3, label: "Settings", icon: <Gear />, path: "/settings" },
];

const buttonsProf = [
  { id: 1, label: "Feed", icon: <House />, path: "/" },
  { id: 2, label: "Camera", icon: <Camera />, path: "/camera" },
  { id: 3, label: "Settings", icon: <Gear />, path: "/settings" },
];

export {buttonsProf, buttonsFeed};
