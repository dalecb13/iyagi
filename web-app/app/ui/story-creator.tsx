import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const StoryCreator = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Story Creator</h1>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="storyName">Story Name</Label>
        <Input id="storyName" type="text" />
      </div>
    </div>
  )
}

export default StoryCreator;
