import { Avatar, List } from "antd";
import React from "react";

export const Chats = () => {
  return (
    <List
      className="hide_scrollbar"
      style={{
        overflowY: "scroll",
        height: "calc(100vh - 64px)",
        maxHeight: "calc(80vh - 64px)",
      }}
    >
      <List.Item
        style={{
          padding: "0.5rem",
          cursor: "pointer",
        }}
      >
        <Avatar
          src="https://i.pravatar.cc/300"
          size={55}
          style={{ marginRight: "1rem", border: "2px solid #1890ff" }}
        />

        <List.Item.Meta
          title="Title"
          description={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#202020" }}>Description</span>
              <span style={{ color: "#202020", fontSize: "0.8rem" }}>
                {" "}
                12:00 AM
              </span>
            </div>
          }
        />
      </List.Item>
    </List>
  );
};
