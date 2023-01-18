import React, { useContext } from "react";
import { Avatar, Dropdown, Layout, MenuProps, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";
const { Header } = Layout;
export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
      label: "Logout",
      onClick: () => {
        signOut(auth);
      },
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
          <Avatar
            src={currentUser && currentUser.photoURL}
            icon={<UserOutlined />}
            shape="circle"
            size={40}
          />
        </Dropdown>
      </Space>
    </Header>
  );
};
