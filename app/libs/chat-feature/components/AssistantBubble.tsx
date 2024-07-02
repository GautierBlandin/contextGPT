import React from 'react';

interface AssistantBubbleProps {
  content: string;
}

export const AssistantBubble: React.FC<AssistantBubbleProps> = ({ content }) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-200 text-gray-800 rounded-lg py-2 px-4 max-w-[70%]">
        <p className="break-words">{content}</p>
      </div>
    </div>
  );
};
