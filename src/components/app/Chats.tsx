import { Avatar, List } from "antd";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../services/firebase";

export const Chats = () => {
  const [chats, setChats] = useState<DocumentData>();
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      if (!currentUser?.uid) return;
      const unsub = onSnapshot(
        doc(db, "usersChats", currentUser?.uid),
        (doc) => {
          if (doc.exists()) {
            setChats(doc.data());
          }
        }
      );
      return () => {
        unsub();
      };
    };
    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelectChat = (chat: any) => {
    dispatch({
      type: "CHANGE_USER",
      payload: chat,
    });
  };

  return (
    <List
      loading={!chats}
      className="hide_scrollbar"
      style={{
        overflowY: "scroll",
        height: "calc(100vh - 64px)",
        maxHeight: "calc(80vh - 64px)",
      }}
    >
      {chats &&
        Object.entries(chats)?.map((chat) => (
          <List.Item
            onClick={() => handleSelectChat(chat[1].userInfo)}
            key={chat[0]}
            style={{
              padding: "0.5rem",
              cursor: "pointer",
            }}
          >
            <Avatar
              src={chat[1].userInfo.avatar}
              size={55}
              style={{ marginRight: "1rem", border: "2px solid #1890ff" }}
            />

            <List.Item.Meta
              title={chat[1].userInfo.name}
              description={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#202020" }}>
                    {chat[1].lastMessage
                      ? chat[1].lastMessage.text
                      : "No messages"}
                  </span>
                  <span style={{ color: "#202020", fontSize: "0.8rem" }}>
                    {" "}
                    12:00 AM
                  </span>
                </div>
              }
            />
          </List.Item>
        ))}
    </List>
  );
};
