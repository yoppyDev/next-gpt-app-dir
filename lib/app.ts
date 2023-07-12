import { type ChatCompletionResponseMessage } from 'openai';

export type Message = ChatCompletionResponseMessage & {
  date: string;
  streaming?: boolean;
  isError?: boolean;
  id?: number;
};

export function createMessage(override: Partial<Message>): Message {
  return {
    id: Date.now(),
    date: new Date().toLocaleString(),
    role: 'user',
    content: '',
    ...override,
  };
}

export interface ChatConfig {
  historyMessageCount: number; // -1 means all
  compressMessageLengthThreshold: number;
  sendBotMessages: boolean; // send bot's message or not
  avatar: string;
  fontSize: number;
  tightBorder: boolean;
  sendPreviewBubble: boolean;
  sidebarWidth: number;

  disablePromptHint: boolean;

  modelConfig: {
    model: string;
    temperature: number;
    max_tokens: number;
    presence_penalty: number;
  };
}

export type ModelConfig = ChatConfig['modelConfig'];

export const ROLES: Message['role'][] = ['system', 'user', 'assistant'];

const ENABLE_GPT4 = true;

export const ALL_MODELS = [
  {
    name: 'gpt-4',
    available: ENABLE_GPT4,
  },
  {
    name: 'gpt-4-0314',
    available: ENABLE_GPT4,
  },
  {
    name: 'gpt-4-32k',
    available: ENABLE_GPT4,
  },
  {
    name: 'gpt-4-32k-0314',
    available: ENABLE_GPT4,
  },
  {
    name: 'gpt-3.5-turbo',
    available: true,
  },
  {
    name: 'gpt-3.5-turbo-0301',
    available: true,
  },
];

export interface ChatStat {
  tokenCount: number;
  wordCount: number;
  charCount: number;
}

export interface ChatSession {
  id: number;
  topic: string;
  sendMemory: boolean;
  memoryPrompt: string;
  context: Message[];
  messages: Message[];
  stat: ChatStat;
  lastUpdate: string;
  lastSummarizeIndex: number;
}
