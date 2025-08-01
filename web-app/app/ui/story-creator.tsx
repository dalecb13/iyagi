import { Input } from "@/components/ui/input"

const StoryCreator = () => {
  return (
    <div className="flex flex-row h-screen">

      {/* Left toolbar */}
      <div className="flex-none flex justify-between bg-gray-100 border-r-gray-400 p-8">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Input id="storyName" placeholder="Story name" type="text" />
        </div>
      </div>

      <div className="grow flex justify-between items-center justify-cneter bg-gray-50">
        {/* Main content */}
        <div className="">Main content</div>
      </div>

      {/* Right toolbar */}
      <div className="flex-none flex justify-between bg-gray-100 p-8">
        <h1>Right toolbar</h1>
      </div>
    </div>
  )
}

export default StoryCreator;
