import React from 'react';

interface UserBubbleProps {
  content: string;
}

export const UserBubble: React.FC<UserBubbleProps> = ({ content }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-[70%]">
        <p className="break-words">{content}</p>
      </div>
    </div>
  );
};
