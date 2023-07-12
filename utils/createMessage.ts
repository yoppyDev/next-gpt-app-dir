import supabase from '#/lib/supabase';

export type CreateMessageInput = {
  roomId: string;
  role: Message['role'];
  content?: string;
};

export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export const createMessage = async ({
  roomId,
  role,
  content,
}: CreateMessageInput): Promise<void> => {
  const { error } = await supabase
    .from('messages')
    .insert({ room_id: roomId, role: role, content: content });

  if (error) {
    console.error(error);
    throw error;
  }
};
