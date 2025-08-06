import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { Button } from "./ui/button";
import { uploadAsset } from "@/app/api/assets.api";

const fileTypes = ["JPG", "PNG", "GIF"];

const AssetsToolbar = () => {
  const [assets, setAssets] = useState<string[]>([]);
  const [file, setFile] = useState<File | File[] | null>(null);

  const handleChange = async (arg0: File | Array<File>) => {
    setFile(arg0);

    if (!arg0) {
      return;
    }

    if (Array.isArray(arg0)) {
      return;
    }

    const result = await uploadAsset(arg0 as File);
    console.log('upload result', result);
  };

  const handleUpload = async () => {
    
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="">
        <h1>Assets</h1>

        <div>
          {
            !assets || assets.length === 0
              ? <div className="flex items-center justify-center">
                  <p>No assets found! Add one below</p>
                </div>
              : <div>
                  {
                    assets.map(asset => {
                      return <p key={asset}>{asset}</p>
                    })
                  }
                </div>
          }
        </div>
      </div>

      <div className="">
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
    </div>
  )
}

export default AssetsToolbar;
