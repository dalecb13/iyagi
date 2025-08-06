
type CreateAssetResponse = {
  id: number
  assetName: string
}

type GetAllAssetsResponse = {
  id: number
  location: string
  assetName: string
}

export const uploadAsset = async (formData: FormData): Promise<CreateAssetResponse> => {
  try {
    const response = await fetch('http://localhost:8000/assets', {
      method: 'POST',
      body: formData,
    });
    const data: CreateAssetResponse = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
    throw err; // throws 500
  }
}

export const getAllAssets = async () => {
  try {
    const response = await fetch('http://localhost:8000/assets', {
      method: 'GET',
    });
    const data: GetAllAssetsResponse[] = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
    throw err; // throws 500
  }
}

export const renameAsset = async (assetId: number, assetName: string) => {
  try {
    const response = await fetch(`http://localhost:8000/assets/${assetId}`, {
      method: 'PUT',
      body: JSON.stringify({ assetName }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
    throw err;
  }
}
