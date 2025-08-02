'use client';

import React from "react";
import { Input } from "./ui/input";

type PageMenuItemProps = {
  pageName: string
  onPageNameChange: (pageName: string) => void
}

export default function PageMenuItem({ pageName, onPageNameChange }: PageMenuItemProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div
      className="cursor-pointer hover:bg-gray-200 py-2 px-2 rounded-md mb-2"
      onDoubleClick={() => setIsEditing(true)}
    >
      {
        isEditing
          ?
            <Input
              className="w-full"
              value={pageName}
              onChange={(e) => onPageNameChange(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyUp={(e) => e.key === "Enter" && setIsEditing(false)}
            />
          :
            <p>{pageName}</p>
      }
    </div>
  );
}
