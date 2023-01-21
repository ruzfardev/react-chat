import { Content } from "antd/es/layout/layout";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../services/firebase";
import { Message } from "./Message";

export const Messages = () => {
  const [messages, setMessages] = useState<DocumentData>();
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      if (!data?.chatID) return;
      const unsub = onSnapshot(doc(db, "chats", data?.chatID), (doc) => {
        if (doc.exists()) {
          setMessages(doc.data());
        }
      });
      return () => {
        unsub();
      };
    };
    data?.chatID && getChats();
  }, [data.chatID]);
  console.log(messages);
  return (
    <Content className="hide_scrollbar">
      {messages?.length > 0 ? (
        messages?.map((message: any) => (
          <Message key={message.id} message={message} />
        ))
      ) : (
        <div className="no_messages">No messages</div>
      )}
    </Content>
  );
};
