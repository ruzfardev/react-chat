import React from "react";
import { Chats } from "./Chats";
import { Navbar } from "./Navbar";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Chats />
    </div>
  );
};
