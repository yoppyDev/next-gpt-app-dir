import { Box } from '@mantine/core';
import { AiOutlineSmile, AiFillRobot } from 'react-icons/ai';
import { Message } from '#/lib/chat';

// 共通の色を定数として定義
const COLORS = {
  userBackgroundColor: '#F8FAFC',
  systemBackgroundColor: '#fecaca',
  assistantBackgroundColor: '#BAE6FD',
};

// メッセージコンポーネントを分離
export const MessageComponent = ({message}: {message: Message}) => {
  return (
    <div className={`flex flex-col items-${message.role === 'user' ? 'end' : 'start'} mt-6 `}>
      <Box
        sx={(theme) => ({
          backgroundColor: COLORS.userBackgroundColor,
          padding: theme.spacing.sm,
          borderRadius: theme.radius.md,
        })}
      >
        {message.role === 'user'
          ? <AiOutlineSmile basis-auto="true" size="2rem" style={{ display: 'block', color: '#facc15', margin: '0 0 0 auto' }}  />
          : <AiFillRobot basis-auto="true" size="2rem" style={{ display: 'block', margin: '0 auto 0 0' }} />
        }
      </Box>
      <Box
        sx={(theme) => ({
          overflowWrap: 'break-word',
          alignSelf: message.role === 'user' ? 'end' : 'start',
          maxWidth: '60%',
          backgroundColor: message.role === 'system' ? COLORS.systemBackgroundColor : COLORS.assistantBackgroundColor,
          textAlign: 'left',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: 'pointer',
        })}
      >
        {message.content}
      </Box>
    </div>
  );
};
