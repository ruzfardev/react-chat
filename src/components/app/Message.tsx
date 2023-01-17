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
        description="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        avatar={<Avatar size={45} src="https://i.pravatar.cc/300" />}
      />
    </Card>
  );
};
