import { Avatar, Card, Image } from "antd";
import React, { FC } from "react";

export const Message: FC<{ message: any }> = (props) => {
  const { message } = props;
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        // TODO: Make this dynamic
        flexDirection: "row-reverse",
      }}
    >
      <Card
        // TODO: Make this dynamic
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
          // TODO: Make this dynamic
          className="owner"
          style={{
            alignItems: "center",
          }}
          title="Sender Name"
          description={message.text}
          avatar={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar size={45} src="https://i.pravatar.cc/300" />
              <span style={{ fontSize: "12px", color: "gray" }}>12:00 PM</span>
            </div>
          }
        />
      </Card>
    </div>
  );
};
