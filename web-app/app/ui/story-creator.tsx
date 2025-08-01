'use client';

import React from "react";
import EditableTitle from "./editable-title";

const StoryCreator = () => {
  const [storyName, setStoryName] = React.useState("");
  const initialTitle = 'New Story';

  return (
    <div className="flex flex-row h-screen">

      {/* Left toolbar */}
      <div className="flex-none flex bg-gray-50 p-8 w-64">
        <EditableTitle
          initialTitle={initialTitle}
          title={storyName}
          onTitleUpdated={setStoryName}
        />
      </div>

      <div className="grow flex justify-between items-center justify-cneter bg-gray-100 p-8">
        {/* Main content */}
        <div className="p-8 bg-white rounded-2xl h-full w-full">Main content</div>
      </div>

      {/* Right toolbar */}
      <div className="flex-none flex bg-gray-50 p-8">
        <h1>Right toolbar</h1>
      </div>
    </div>
  )
}

export default StoryCreator;
