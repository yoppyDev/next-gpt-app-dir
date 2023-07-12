import React from "react";

interface HeaderComponentProps {
  roomName: string,
}


export const HeaderComponent: React.FC<HeaderComponentProps> = ({
  roomName
}) => {
  return (
    <div className="h-[10%] bg-slate-300">
      {roomName}
    </div>
  );
}
