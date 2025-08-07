import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { getAllAssets, renameAsset, uploadAsset } from "@/app/api/assets.api";
import { toast } from "sonner"
import { AssetListItem } from "@/lib/models";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const fileTypes = ["JPG", "PNG", "GIF"];

const AssetsToolbar = () => {
  const [assets, setAssets] = useState<AssetListItem[]>([]);
  const [uploadedId, setUploadedId] = useState<number | null>(null);
  const [assetName, setAssetName] = useState<string>("");

  useEffect(() => {
    const fetchAssets = async () => {
      const assets = await getAllAssets();
      setAssets(assets);
    }

    fetchAssets();
  }, [])

  const handleUpload = async (formData: FormData) => {
    try {
      const result = await uploadAsset(formData);
      toast(`${result.assetName} uploaded successfully`);
      setUploadedId(result.id);
    } catch(err) {
      console.warn(err);
      toast("Failed to upload asset");
    }
  };

  const handleSetAssetName = async () => {
    try {
      const result = await renameAsset(uploadedId!, assetName);
      toast(`${result.assetName} renamed successfully`);
      setUploadedId(null);
    } catch(err) {
      console.warn(err);
      toast("Failed to rename asset");
    }
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="">
        <h1>Assets</h1>

        <div>
          {
            !assets || assets.length === 0
              ? <div className="flex flex-col items-center justify-center">
                  <p>No assets found!</p>
                  <p>Add one below?</p>
                </div>
              : <div>
                  {
                    assets.map(asset => {
                      return <p key={asset.id}>{asset.assetName}</p>
                    })
                  }
                </div>
          }
        </div>
      </div>

      <div className="">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="flex items-center gap-2 p-2 rounded-md hover:cursor-pointer hover:bg-gray-500"
            >
            {/* <div className="flex items-center gap-2 p-2 rounded-md hover:cursor-pointer hover:bg-gray-200"> */}
              <Plus />
              <p>Add Asset</p>
            {/* </div> */}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Asset</DialogTitle>
              <DialogDescription>
                Choose a file to upload as an Asset
              </DialogDescription>
            </DialogHeader>

            {
              !uploadedId
                ?
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
                :
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="assetName">Asset Name</Label>
                    <Input
                      id="assetName"
                      name="assetName"
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                    />
                    <Button
                      size="sm"
                      onClick={handleSetAssetName}
                    >
                      Set Asset Name
                    </Button>
                  </div>
            }

            <DialogFooter>
              {/* <DialogClose>Cancel</DialogClose> */}
              {/* <AlertDialogAction>Continue</AlertDialogAction> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default AssetsToolbar;
