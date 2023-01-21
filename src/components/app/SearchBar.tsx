import React, { useContext, useState } from "react";
import { Avatar, Input, List, Typography } from "antd";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";
export const SearchBar = () => {
  const { currentUser } = useContext(AuthContext);
  const [foundUsers, setFoundUsers] = useState<DocumentData[]>([]);
  const [search, setSearch] = useState("");
  const handleSearchTerm = (e: any) => {
    setSearch(e.target.value);
  };
  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("name", "==", search));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().id === currentUser?.uid) {
        setFoundUsers([]);
      } else {
        setFoundUsers([doc.data()]);
      }
    });
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelectUser = async (userInfo: DocumentData) => {
    console.log(userInfo);
    try {
      if (!currentUser) return;
      const combinedUID =
        currentUser?.uid > userInfo.id
          ? currentUser.uid + userInfo.id
          : userInfo.id + currentUser.uid;
      const chat = await getDoc(doc(db, "chats", combinedUID));
      if (!chat.exists()) {
        await setDoc(doc(db, "chats", combinedUID), {
          messages: [],
        });
        console.log(currentUser.uid, userInfo.id);
        await updateDoc(doc(db, "usersChats", currentUser.uid), {
          [combinedUID + ".userInfo"]: {
            id: userInfo.id,
            name: userInfo.name,
            avatar: userInfo.avatar,
          },
          [combinedUID + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "usersChats", userInfo.id), {
          [combinedUID + ".userInfo"]: {
            id: currentUser.uid,
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
          },
          [combinedUID + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    setFoundUsers([]);
    setSearch("");
  };

  return (
    <List
      style={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <div
        style={{
          padding: "0.5rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Input
          onChange={handleSearchTerm}
          onKeyDown={handleKeyDown}
          placeholder="Search users..."
          className="glass no_border"
          value={search}
        />
      </div>
      {foundUsers.length > 0
        ? foundUsers.map((user) => {
            return (
              <List.Item
                onClick={() => handleSelectUser(user)}
                key={user.id}
                style={{
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  src={user.avatar}
                  size={55}
                  style={{ marginRight: "1rem", border: "2px solid #1890ff" }}
                />

                <List.Item.Meta title={user.name} />
              </List.Item>
            );
          })
        : ""}
    </List>
  );
};
