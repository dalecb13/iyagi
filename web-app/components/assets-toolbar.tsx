import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { Button } from "./ui/button";

const fileTypes = ["JPG", "PNG", "GIF"];

const AssetsToolbar = () => {
  const [file, setFile] = useState<File | File[] | null>(null);

  const handleChange = (arg0: File | Array<File>) => {
    setFile(arg0);
  };

  const handleUpload = () => {
    console.log(file);
  };

  return (
    <div className="flex flex-col justify-end">
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <Button
        className="mt-2"
        onClick={handleUpload}
        disabled={!file}
        size="sm"
      >
        Upload
      </Button>
    </div>
  )
}

export default AssetsToolbar;
