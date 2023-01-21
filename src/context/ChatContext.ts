// Chat Context
import React from 'react';

export const ChatContext = React.createContext<{
    data: any,
    dispatch: React.Dispatch<any>
}>({
    data: {},
    dispatch: (event: any) => {}

}); // Create Context