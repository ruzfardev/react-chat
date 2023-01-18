import { createContext } from "react";
import { UserInfo } from "firebase/auth";
export const AuthContext = createContext<
    { currentUser: UserInfo | null }
>({
    currentUser: null,
});

