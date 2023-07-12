import React, {  } from "react";
import { LoadingOverlay, Button } from '@mantine/core';
import { Textarea, Box } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { AiOutlineSend } from 'react-icons/ai';

interface InputComponentProps {
  createMessage: string;
  setCreateMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => Promise<void>;
  visible: boolean;
}

export const InputComponent: React.FC<InputComponentProps> = ({
  createMessage,
  setCreateMessage,
  handleSubmit,
  visible,
}) => {
  return (
    <div className='border-t-[1px] px-6 py-3 max-h-1/6'>
      <Box>
        <form className="flex items-center">
          <Textarea
            className="w-full"
            autosize
            minRows={2}
            maxRows={5}
            placeholder="send a message"
            onChange={(event) => setCreateMessage(event.currentTarget.value)}
            value={createMessage}
            required
            onKeyDown={getHotkeyHandler([
              ['mod+Enter', handleSubmit],
            ])}
          />
          <Button leftIcon={<AiOutlineSend />} variant="white" onClick={handleSubmit}>
            <LoadingOverlay visible={visible} overlayBlur={2} />
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};
