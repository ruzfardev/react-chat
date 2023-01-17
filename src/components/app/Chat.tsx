import React from "react";
import { Space, Typography, Layout, Input, Button, Upload } from "antd";
import { Messages } from "./Messages";
import { SendOutlined } from "@ant-design/icons";
import { ImAttachment } from "react-icons/im";
import { BsImage } from "react-icons/bs";
const { Header } = Layout;

export const Chat = () => {
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
            John Smith
          </Typography.Title>
        </Space>
      </Header>
      <Messages />
      <div className="send_message">
        <Upload capture={true}>
          <Button type="primary" icon={<ImAttachment />} />
        </Upload>
        <Upload capture={true}>
          <Button type="primary" icon={<BsImage />} />
        </Upload>
        <Input
          className="glass"
          style={{ width: "calc(100% - 200px)" }}
          placeholder="Send Message..."
        />
        <Button
          style={{ width: "100px" }}
          color="#84c0f8bf"
          type="primary"
          icon={<SendOutlined />}
        />
      </div>
    </div>
  );
};
