'use client';

import React from "react";
import { Input } from "@/components/ui/input"

type EditableTitleProps = {
  initialTitle: string
  title: string
  onTitleUpdated: React.Dispatch<React.SetStateAction<string>>
};

const EditableTitle: React.FC<EditableTitleProps> = ({
  initialTitle,
  title,
  onTitleUpdated
}) => {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div>
      {!isEditing ? (
        <h1 className="text-md p-2" onClick={() => setIsEditing(true)}>{
          title || initialTitle
        }</h1>
      ) : (
        <Input
          placeholder={initialTitle}
          value={title}
          onChange={(e) => onTitleUpdated(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyUp={(e) => e.key === "Enter" && setIsEditing(false)}
        />
      )}
    </div>
  );
}

export default EditableTitle;
