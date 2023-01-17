import React from "react";
import { Avatar, Dropdown, Layout, MenuProps, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Header } = Layout;
export const Navbar = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
      label: "Logout",
    },
  ];
  return (
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
          level={3}
          style={{
            margin: 0,
            color: "#202020",
          }}
        >
          ReactChat
        </Typography.Title>
        <Dropdown menu={{ items }} arrow={true}>
          <Avatar icon={<UserOutlined />} shape="circle" size={40} />
        </Dropdown>
      </Space>
    </Header>
  );
};
