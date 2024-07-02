import { StateCreator } from 'zustand';
import { defineStore } from '@contextgpt/utils';

interface ChatStore {
  messages: Message[];
  isStreaming: boolean;
  actions: {
    postUserMessage: (content: string) => void;
    startAssistantResponse: () => void;
    appendToAssistantResponse: (content: string) => void;
    finishAssistantResponse: () => void;
    getChat: () => Message[];
  };
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const createChatStore: StateCreator<ChatStore> = (set, get) => ({
  messages: [],
  isStreaming: false,
  actions: {
    postUserMessage: (content) =>
      set((state) => ({
        messages: [...state.messages, { id: Date.now().toString(), role: 'user', content }],
      })),

    startAssistantResponse: () =>
      set((state) => ({
        messages: [...state.messages, { id: Date.now().toString(), role: 'assistant', content: '' }],
        isStreaming: true,
      })),

    appendToAssistantResponse: (content) =>
      set((state) => {
        const lastMessage = state.messages[state.messages.length - 1];
        if (lastMessage.role !== 'assistant') return state;

        const updatedMessages = [...state.messages];
        updatedMessages[updatedMessages.length - 1] = {
          ...lastMessage,
          content: lastMessage.content + content,
        };

        return { messages: updatedMessages };
      }),

    finishAssistantResponse: () => set({ isStreaming: false }),

    getChat: () => get().messages,
  },
});

export const [ChatStoreProvider, useChatStore] = defineStore(createChatStore);

export const chatSelector = {
  actions: (state: ChatStore) => state.actions,
  messages: (state: ChatStore) => state.messages,
  isStreaming: (state: ChatStore) => state.isStreaming,
};
