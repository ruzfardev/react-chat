import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, UploadFile } from "antd";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { BsImage } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { ISendMessage } from "../../models/sendMessage.model";
import { db, storage } from "../../services/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useForm } from "antd/es/form/Form";
export const SendInput = () => {
  const [form] = useForm();
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const sendMessage = async (values: ISendMessage) => {
    console.log(values);
    if (values.image) {
      const storageRef = ref(storage, `images/${uuid()}`);
      const uploadTask = uploadBytesResumable(storageRef, values.image.file);
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
            await updateDoc(doc(db, "chats", data.chatID), {
              messages: arrayUnion({
                id: uuid(),
                text: values.text,
                sender: currentUser?.uid,
                createdAt: Timestamp.now(),
                image: downloadURL,
              }),
            });
            form.resetFields();
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatID), {
        messages: arrayUnion({
          id: uuid(),
          text: values.text,
          sender: currentUser?.uid,
          createdAt: Timestamp.now(),
        }),
      });
      form.setFieldValue("text", "");
    }
    if (currentUser) {
      await updateDoc(doc(db, "usersChats", currentUser.uid), {
        [data.chatID + ".lastMessage"]: {
          text: values.text,
        },
        [data.chatID + ".lastMessageAt"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "usersChats", data.user.id), {
        [data.chatID + ".lastMessage"]: {
          text: values.text,
        },
        [data.chatID + ".lastMessageAt"]: serverTimestamp(),
      });
    }
  };
  return (
    <Form
      form={form}
      className="send_message"
      onFinish={sendMessage}
      layout="inline"
    >
      {/* <Upload capture={true}>
        <Button type="primary" icon={<ImAttachment />} />
    </Upload> */}
      <Form.Item name="image">
        <Upload
          capture={true}
          accept="image/*"
          showUploadList={false}
          beforeUpload={() => false}
        >
          <Button type="primary" icon={<BsImage />} />
        </Upload>
      </Form.Item>
      <Form.Item style={{ flex: "1 1 70%" }} name="text">
        <Input className="glass" placeholder="Send Message..." />
      </Form.Item>
      <Button
        htmlType="submit"
        style={{ width: "100px" }}
        color="#84c0f8bf"
        type="primary"
        icon={<SendOutlined />}
      />
    </Form>
  );
};

export default SendInput;
