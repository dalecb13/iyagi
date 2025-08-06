'use client';

import React from "react";
import { Plus } from "lucide-react"

import EditableTitle from "./editable-title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Page } from "@/lib/models";
import PageMenuItem from "./page-menu-item";
import StoryCreatorContent from "./story-creator-content";
import { newPage } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import AssetsToolbar from "./assets-toolbar";

const StoryCreator = () => {
  const initialTitle = 'New Story';
  const [storyName, setStoryName] = React.useState("");

  const [pages, setPages] = React.useState<Page[]>([]);

  const [renderedPage, setRenderedPage] = React.useState<Page>(pages[0]);

  const [aspectRatio, setAspectRatio] = React.useState<'4x3' | '16x9' | '16x10'>('4x3');

  const handleAddPage = () => {
    // if last page is not empty, add a new page
    if (pages.length > 0 && pages[pages.length - 1].contents !== "") {
      const newlyAddedPage = newPage(pages.length + 1);
      setPages([...pages, newlyAddedPage]);
      return;
    }

    if (!pages || pages.length === 0) {
      const newlyAddedPage = newPage(1);
      setPages([newlyAddedPage]);
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

      <div className="grow flex flex-col items-center justify-center bg-gray-100 gap-2 p-4">
        {/* Main content */}
        <div className={`p-8 bg-white rounded-2xl h-full w-full ${
          aspectRatio === '4x3'
            ? 'w-[1024] h-[768]'
            : aspectRatio === '16x9'
              ? 'aspect-[16/9]'
              : 'aspect-[16/10]'
        }`}>
          <StoryCreatorContent page={renderedPage} aspectRatio={aspectRatio} />
        </div>

        {/* Aspect Ratio Controls */}
        {/* <div className="rounded-md bg-white p-4"> */}
          <Tabs defaultValue="4x3" className="">
            <TabsList>
              <TabsTrigger value="4x3" onClick={() => setAspectRatio('4x3')}>4:3</TabsTrigger>
              <TabsTrigger value="16x9" onClick={() => setAspectRatio('16x9')}>16:9</TabsTrigger>
              <TabsTrigger value="16x10" onClick={() => setAspectRatio('16x10')}>16:10</TabsTrigger>
            </TabsList>
          </Tabs>
        {/* </div> */}
      </div>

      {/* Right toolbar */}
      <div className="flex-none flex bg-gray-50 p-8">
        <AssetsToolbar />
      </div>
    </div>
  )
}

export default StoryCreator;
