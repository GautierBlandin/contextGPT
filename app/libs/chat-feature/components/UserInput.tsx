import React, { useState } from 'react';
import { useChatStore, chatSelector } from '../chat.store';

export const UserInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { postUserMessage } = useChatStore(chatSelector.actions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      postUserMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2
focus:ring-blue-500"
      >
        Send
      </button>
    </form>
  );
};
