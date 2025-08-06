
type CreateAssetResponse = {
  id: number
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
