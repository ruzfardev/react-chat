import React, { useContext } from "react";
import { Space, Typography, Layout } from "antd";
import { Messages } from "./Messages";
import { ChatContext } from "../../context/ChatContext";
import { SendInput } from "./SendInput";
const { Header } = Layout;

export const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <Header className="header">
        <Space
          size={"large"}
          align="center"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography.Title
            level={5}
            style={{
              margin: 0,
              color: "#202020",
            }}
          >
            {data.user?.name}
          </Typography.Title>
        </Space>
      </Header>
      <Messages />
      <SendInput />
    </div>
  );
};
