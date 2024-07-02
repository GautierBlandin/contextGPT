# Goals

Get a simple chat interface up and running.
There should be:

- An input text box
- Chat bubbles popping up as responses are received and user sends messages

# Anti-Goals

Using an LLM API. The goal of this ticket is purely to make a well-tested presentational component

# Approach

Dumb components:
- User input
- User bubble
- Assistant Bubble
- Chat Body (uses UserBubble and AssistantBubble)

Smart components:
- Chat
- chat.store.tsx (zustand)

```typescript
messages: Message[];
isStreaming: boolean;
postUserMessage: (content: string) => void;
startAssistantResponse: () => void;
appendToAssistantResponse: (content: string) => void;
finishAssistantResponse: () => void;
getChat: () => Message[];
```

# Testing strategy

Component testing with a fake implementation of the chat store

# Questions
