import React from "react";
import { Chat } from "./app/Chat";
import { Sidebar } from "./app/Sidebar";

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
      {/* <h1>ruzfardev</h1> */}
      <div className="container-app">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
