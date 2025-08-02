'use client';

import React from "react";
import { Input } from "./ui/input";

type PageMenuItemProps = {
  pageName: string
  onPageNameChange: (pageName: string) => void
}

export default function PageMenuItem({ pageName, onPageNameChange }: PageMenuItemProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  if (isEditing) {
    return <Input
              className="w-full"
              value={pageName}
              onChange={(e) => onPageNameChange(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyUp={(e) => (e.key === "Enter" || e.key === "Escape") && setIsEditing(false)}
            />
  } else {
    return <div
      className={`cursor-pointer hover:bg-gray-200 py-2 px-2 rounded-md mb-2 ${isEditing ? "bg-gray-200" : ""}`}
      onDoubleClick={() => setIsEditing(true)}
    >
      <p>{pageName}</p>
    </div>
  }
}
