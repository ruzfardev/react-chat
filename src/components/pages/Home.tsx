import React from "react";
import { Chat } from "../app/Chat";
import { Sidebar } from "../app/Sidebar";

const Home = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container-app glass">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
