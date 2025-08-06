
export const uploadAsset = async (file: File) => {
  const formData = new FormData();

  formData.append('asset', file);

  // use fetch to send the form data to the server
  const response = await fetch('http://localhost:8000/assets', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  // const err = null;

  return {
    data,
  };
}
