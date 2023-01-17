import React from "react";
import { Button, Card, Form, Input } from "antd";
export const Login = () => {
  return (
    <Card
      title="Login"
      style={{
        width: "25%",
        textAlign: "center",
        margin: "auto",
        marginTop: "15%",
      }}
    >
      <Form layout="vertical">
        <Form.Item label="Username">
          <Input />
        </Form.Item>
        <Form.Item label="Password">
          <Input />
        </Form.Item>
        <Button type="primary" block>
          Login
        </Button>
      </Form>
    </Card>
  );
};
