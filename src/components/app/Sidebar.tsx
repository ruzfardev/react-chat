import React from "react";
import { Chats } from "./Chats";
import { Navbar } from "./Navbar";
import { SearchBar } from "./SearchBar";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <SearchBar />
      <Chats />
    </div>
  );
};
