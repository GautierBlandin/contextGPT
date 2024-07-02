import React, { useRef, useEffect } from 'react';
import { useChatStore, chatSelector } from '../chat.store';
import { UserBubble } from './UserBubble';
import { AssistantBubble } from './AssistantBubble';

export const ChatBody: React.FC = () => {
  const messages = useChatStore(chatSelector.messages);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === 'user' ? (
            <UserBubble content={message.content} />
          ) : (
            <AssistantBubble content={message.content} />
          )}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};
