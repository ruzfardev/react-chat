import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithCustomToken,
  UserInfo,
} from "firebase/auth";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { AuthContext } from "./AuthContext";

const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      user?.getIdToken().then((token) => {
        localStorage.setItem("token", token);
      });
    });

    return () => {
      unsub();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
