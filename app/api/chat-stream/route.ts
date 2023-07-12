import { openai } from '#/lib/openai';
import { createMessage } from '#/utils/createMessage';

export const runtime = 'edge';

export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export async function POST(request: Request) {
  const { roomId, message, historyMessage } = (await request.json()) as {
    roomId: string;
    message: string;
    historyMessage: Message[];
  };

  try {
    await createMessage({ roomId, role: 'user', content: message });

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [...historyMessage, { role: 'user', content: message }],
    });

    const answer = response.data.choices[0].message?.content;

    await createMessage({ roomId, role: 'assistant', content: answer });
    return new Response();
  } catch (error) {
    console.log(error);
    // await createMessage({ roomId, role: 'system', content: error.message });
    return new Response();
  }
}
