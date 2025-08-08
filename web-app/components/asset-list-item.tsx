import Image from 'next/image';

type AssetListItemProps = {
  assetName: string;
  location: string;
};

const AssetListItem: React.FC<AssetListItemProps> = ({ assetName, location }) => {
  return (
    <div className="flex gap-2">
      <Image
        src={`http://localhost:8000/asset_image/${location}/`}
        alt="Description of the image"
        width={64} // Required for remote images to prevent layout shift
        height={64} // Required for remote images to prevent layout shift
      />
      <p>{assetName}</p>
    </div>
  )
}

export default AssetListItem;
