import React from "react";
import { Button, Card, Form, Input, Spin, Typography } from "antd";
import { ILogin } from "../../models/login.model";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { Link, useNavigate } from "react-router-dom";
export const Login = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const onLogin = async (values: ILogin) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };
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
      <Form onFinish={onLogin} layout="vertical">
        <Form.Item name="email" label="Email">
          <Input type="email" />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
        <Button disabled={loading} htmlType="submit" type="primary" block>
          {loading ? <Spin /> : "Login"}
        </Button>
        <Typography.Text type="secondary">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography.Text>
      </Form>
    </Card>
  );
};
