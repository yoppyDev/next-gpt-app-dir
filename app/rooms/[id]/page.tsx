'use client';
import { Chat } from '#/ui/chat/index';
import { useState } from 'react';

export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const Room = () => {
  const [historyMessage, setHistoryMessage] = useState<Message[]>([]);

  return (
    <div className='h-screen flex justify-center items-center'>
        <Chat
          historyMessage={historyMessage}
          setHistoryMessage={setHistoryMessage}
        ></Chat>
    </div>
  );
};

export default Room;
