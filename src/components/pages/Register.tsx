import React from "react";
import { Button, Card, Form, Input, Typography, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { auth, storage, db } from "../../services/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { RegisterModel } from "../../models/register.model";
export const Register = () => {
  const [error, setError] = React.useState<string | null>(null);
  const onSubmit = async (values: RegisterModel) => {
    console.log(values);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const storageRef = ref(storage, `avatars/${res.user.uid}`);
      let avatarURL = "";
      const uploadTask = uploadBytesResumable(storageRef, values.avatar.file);
      uploadTask.on(
        "state_changed",
        (error: any) => {
          setError(error.message);
        },
        () => {
          console.log("Upload complete");
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            avatarURL = downloadURL;
            console.log(downloadURL);
          });
        }
      );
      await updateProfile(res.user, {
        displayName: values.userName,
        photoURL: avatarURL,
      });
      await setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        name: values.userName,
        email: values.email,
        // avatar: avatarURL,
      });
    } catch (error: any) {
      console.log(error);
      setError(error.message);
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
        <Form.Item name="name" label="Name">
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
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
        <Button htmlType="submit" type="primary" block>
          Register
        </Button>
        <Typography.Text type="secondary">
          Already have an account? Login
        </Typography.Text>
      </Form>
    </Card>
  );
};
