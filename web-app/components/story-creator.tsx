'use client';

import React from "react";
import { Plus } from "lucide-react"

import EditableTitle from "./editable-title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Page } from "@/lib/models";
import PageMenuItem from "./page-menu-item";

const StoryCreator = () => {
  const initialTitle = 'New Story';
  const [storyName, setStoryName] = React.useState("");

  const [pages, setPages] = React.useState<Page[]>([]);

  const handleAddPage = () => {
    // if last page is not empty, add a new page
    if (pages.length > 0 && pages[pages.length - 1].contents !== "") {
      setPages([...pages, { contents: "", pageName: `Page ${pages.length + 1}` }]);
      return;
    }

    if (!pages || pages.length === 0) {
      setPages([{ contents: "", pageName: "Page 1" }]);
      return;
    }
  }

  const handlePageNameChange = (pageName: string, index: number) => {
    const newPages = [...pages];
    newPages[index].pageName = pageName;
    setPages(newPages);
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

        <div className="px-4 mb-4 flex flex-row justify-between">
          <p className="font-semibold">Pages</p>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 bg-transparent hover:bg-gray-100"
            onClick={handleAddPage}
          >
            <Plus />
          </Button>
        </div>

        <div className="px-2">
          {pages.map((page, index) => (
            <PageMenuItem
              key={index}
              pageName={page.pageName}
              onPageNameChange={(pageName) => handlePageNameChange(pageName, index)}
            />
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
