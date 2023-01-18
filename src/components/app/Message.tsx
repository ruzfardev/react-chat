import { Avatar, Card, Image } from "antd";
import React from "react";

export const Message = () => {
  return (
    <Card
      className="glass owner"
      //   cover={
      //     // <Image
      //     //   alt="example"
      //     //   src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      //     // />
      //   }
    >
      {/* Message container with sender name and text, avatar */}
      <Card.Meta
        className="owner"
        style={{
          alignItems: "center",
        }}
        title="Sender Name"
        description="Hello, I am waiting your message. Reponse me as soon as possible."
        avatar={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar size={45} src="https://i.pravatar.cc/300" />
            {/* Timesatmp */}
            <span style={{ fontSize: "12px", color: "gray" }}>12:00 PM</span>
          </div>
        }
      />
    </Card>
  );
};
