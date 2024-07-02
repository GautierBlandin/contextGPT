import type { MetaFunction } from '@remix-run/node';
import { Chat } from '~/libs/chat-feature/components/Chat';

export const meta: MetaFunction = () => {
  return [
    { title: 'Chat Application' },
    { name: 'description', content: 'A simple chat interface' }
  ];
};

export default function Index() {
  return (
    <div className="h-screen">
      <Chat />
    </div>
  );
}
