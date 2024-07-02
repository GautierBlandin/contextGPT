import React from 'react';
import { ChatStoreProvider } from '../chat.store';
import { ChatBody } from './ChatBody';
import { UserInput } from './UserInput';

export const Chat: React.FC = () => {
  return (
    <ChatStoreProvider>
      <div className="flex flex-col h-screen">
        <ChatBody />
        <UserInput />
      </div>
    </ChatStoreProvider>
  );
};
