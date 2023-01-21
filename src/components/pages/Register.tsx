import React from "react";
import { Button, Card, Form, Input, Spin, Typography, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { auth, storage, db } from "../../services/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { RegisterModel } from "../../models/register.model";
export const Register = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const onSubmit = async (values: RegisterModel) => {
    console.log(values);
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const storageRef = ref(storage, `avatars/${res.user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, values.avatar.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          setError(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: values.userName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              id: res.user.uid,
              name: values.userName,
              email: values.email,
              avatar: downloadURL,
            });
            await setDoc(doc(db, "usersChats", res.user.uid), {});
            setLoading(false);
            navigate("/");
          });
        }
      );
    } catch (error: any) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <Card
      title="Register"
      style={{
        width: "35%",
        textAlign: "center",
        margin: "auto",
        marginTop: "10%",
      }}
    >
      <Form onFinish={onSubmit} layout="vertical">
        <Form.Item name="userName" label="Name">
          <Input type="string" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input type="email" />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        <Form.Item name="avatar" label="Avatar">
          <Upload
            multiple={false}
            listType="picture-card"
            accept="image/*"
            beforeUpload={() => false}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
        <Button htmlType="submit" type="primary" block disabled={loading}>
          {loading ? <Spin /> : "Register"}
        </Button>
        <Typography.Text type="secondary">
          Already have an account? <Link to="/login">Login</Link>
        </Typography.Text>
      </Form>
    </Card>
  );
};
