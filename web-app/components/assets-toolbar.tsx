import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { getAllAssets, uploadAsset } from "@/app/api/assets.api";
import { toast } from "sonner"
import { AssetListItem } from "@/lib/models";

const fileTypes = ["JPG", "PNG", "GIF"];

const AssetsToolbar = () => {
  const [assets, setAssets] = useState<AssetListItem[]>([]);
  const [file, setFile] = useState<File | File[] | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      const assets = await getAllAssets();
      setAssets(assets);
    }

    fetchAssets();
  }, [])

  const handleChange = async (arg0: File | Array<File>) => {
    setFile(arg0);

    if (!arg0) {
      return;
    }

    if (Array.isArray(arg0)) {
      return;
    }

    setFile(arg0);
  };

  const handleUpload = async (formData: FormData) => {
    try {
      const result = await uploadAsset(formData);
      toast(`${result.assetName} uploaded successfully`);
    } catch(err) {
      console.warn(err);
      toast("Failed to upload asset");
    }
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
                      return <p key={asset.id}>{asset.location}</p>
                    })
                  }
                </div>
          }
        </div>
      </div>

      <div className="">
        {/* <FileUploader handleChange={handleChange} name="file" types={fileTypes} /> */}
        {/* FormHTMLAttributes<HTMLFormElement>.action?: string | ((formData: FormData) => void | Promise<void>) | undefined */}
        <form action={handleUpload} className="flex flex-col">
          <label htmlFor="file">Upload a file:</label>
          <input type="file" id="file" name="file" />
          <Button
            className="mt-2"
            type="submit"
            id="file"
            size="sm"
          >
            Upload
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AssetsToolbar;
