import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { getAllAssets, renameAsset, uploadAsset } from "@/app/api/assets.api";
import { toast } from "sonner"
import { AssetListItem } from "@/lib/models";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
              ? <div className="flex items-center justify-center">
                  <p>No assets found! Add one below</p>
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
        <AlertDialog>
          <AlertDialogTrigger>
            <Button size="lg">
              <Plus />
              Add Asset
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add Asset</AlertDialogTitle>
              <AlertDialogDescription>
                Choose a file to upload as an Asset
              </AlertDialogDescription>
            </AlertDialogHeader>

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

            {
              uploadedId
                ? <div className="flex flex-col gap-4">
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
                : null
            }

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* <AlertDialogAction>Continue</AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default AssetsToolbar;
