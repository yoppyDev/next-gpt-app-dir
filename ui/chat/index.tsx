import { useRouter, useParams } from 'next/navigation';
import React, { useEffect } from "react";
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { MessageComponent } from './messageComponent';
import { InputComponent } from './inputComponent';
import supabase from '#/lib/supabase';
import { Message } from '#/lib/chat';

interface ChatProps {
  historyMessage    : Message[],
  setHistoryMessage : React.Dispatch<React.SetStateAction<Message[]>>,
};


export function Chat(props:ChatProps) {
  const [createMessage, setCreateMessage] = useState('');
  // const [roomName, setRoomName] = useState('');
  const [visible, { toggle , close }] = useDisclosure(false);
  const roomId = useParams()?.id;
  const router = useRouter()

// チャットルームとメッセージの取得・設定
useEffect(() => {
  (async() => {
    if (!roomId) {
      return
    }

    let { data: room } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', roomId);

    if (!room?.length) {
      router.replace('/');
      return;
    }

    // setRoomName(room[0].name);

    let { data: messages } = await supabase
      .from('messages')
      .select('role,content')
      .eq('room_id', roomId)
      .order('updated_at');

    if (!messages?.length) {
      return [];
    }

    messages = messages.filter(message => message.role !== 'system');

    props.setHistoryMessage(messages);

  })()
}, [roomId]);

// メッセージのリアルタイム更新（購読）
useEffect(() => {
  let subscription = supabase
    .channel('custom-filter-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'messages', filter: `room_id=eq.${roomId}`},
      (payload: any) => {

        if (payload.new.role === 'system') {
          return;
        }

        const newAnswerMessage: Message = {
          role    : payload.new.role,
          content : payload.new.content,
        };

        props.setHistoryMessage((prevArray) => {
          const newArray = [...prevArray, newAnswerMessage];
          return newArray;
        });

      }
    )
    .subscribe();

  return () => {
    if (subscription) {
      supabase.removeChannel(subscription);
    }
  };

}, [roomId]);


  useEffect(() => {
    document.getElementById('bottom-of-list')?.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'end'});
  }, [props.historyMessage]);

  const handleSubmit = async () => {

    if (!createMessage.trim()) {
      // メッセージが空の場合、何もしないか、エラーメッセージを表示
      return;
    }

    toggle()
    setCreateMessage('');

    await fetch(`/api/chat-stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: roomId,
        message: createMessage,
        historyMessage: props.historyMessage
      }),
    });

    close()
  };

  return (
    <div className="flex h-[90%] w-[90%] flex-col bg-slate-50">

      <div className="px-6 py-6 overflow-scroll h-full whitespace-pre-line">
        { props.historyMessage.map((message, index) => <MessageComponent  key={index} message={message} />) }
        <div id="bottom-of-list" />
      </div>

      <InputComponent
        createMessage={createMessage}
        setCreateMessage={setCreateMessage}
        handleSubmit={handleSubmit}
        visible={visible}
      />
    </div>
  );
}
