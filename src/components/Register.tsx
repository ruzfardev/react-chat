import React from "react";
import { Button, Card, Form, Input, Typography, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export const Register = () => {
  return (
    <Card
      title="Register"
      style={{
        width: "25%",
        textAlign: "center",
      }}
    >
      <Form layout="vertical">
        <Form.Item label="Username">
          <Input />
        </Form.Item>
        <Form.Item label="Password">
          <Input />
        </Form.Item>
        <Form.Item label="Confirm Password">
          <Input />
        </Form.Item>
        <Form.Item label="Avatar">
          <Upload
            listType="picture-card"
            accept="image/*"
            // showUploadList={false}
            beforeUpload={() => false}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Button type="primary" block>
          Register
        </Button>
        <Typography.Text type="secondary">
          Already have an account? Login
        </Typography.Text>
      </Form>
    </Card>
  );
};
