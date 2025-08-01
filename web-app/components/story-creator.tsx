'use client';

import React from "react";
import { Plus } from "lucide-react"

import EditableTitle from "./editable-title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Page } from "@/lib/models";

const StoryCreator = () => {
  const initialTitle = 'New Story';
  const [storyName, setStoryName] = React.useState("");

  const [pages, setPages] = React.useState<Page[]>([]);

  const handleAddPage = () => {
    // if last page is not empty, add a new page
    if (pages.length > 0 && pages[pages.length - 1].contents !== "") {
      setPages([...pages, { contents: "" }]);
    }
  }

  return (
    <div className="flex flex-row h-screen">

      {/* Left toolbar */}
      <div className="flex-none flex flex-col bg-gray-50 w-64">
        <div className="pt-4 pl-2">
          <EditableTitle
            initialTitle={initialTitle}
            title={storyName}
            onTitleUpdated={setStoryName}
          />
        </div>

        <Separator className="my-4" />

        <div className="px-4 flex flex-row justify-between">
          <h2>Pages</h2>
          <Button
            variant="secondary"
            size="icon"
            className="size-8"
            onClick={handleAddPage}
          >
            <Plus />
          </Button>
        </div>

        <div className="px-4">
          {pages.map((page, index) => (
            <div key={index}>
              <p>Page {index + 1}</p>
            </div>
          ))}
        </div>
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
