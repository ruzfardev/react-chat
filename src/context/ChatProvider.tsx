import { FC, PropsWithChildren, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./ChatContext";

const ChatProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatID: "",
    user: {},
  };

  // @ts-ignore
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          chatID:
            // @ts-ignore
            currentUser.uid > action.payload.id
              ? // @ts-ignore
                currentUser.uid + action.payload.id
              : // @ts-ignore
                action.payload.id + currentUser.uid,
          user: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
