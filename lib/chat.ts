export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type Room = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};
