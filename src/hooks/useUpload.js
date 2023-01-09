import { useEffect, useState } from "react";
import { createImgUrl } from "../functions";

function useUpload(initialImage, callback = () => {}) {
  const [previewImage, setPreviewImage] = useState(initialImage);
  const [file, setFile] = useState(null);
  useEffect(() => {
    setPreviewImage(initialImage);
  }, [initialImage]);
  useEffect(() => {
    return () => {
      if (previewImage !== initialImage) URL.revokeObjectURL(previewImage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewImage]);

  const handleUpLoad = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const url = createImgUrl(file);
    if (url) {
      callback(file);
      setPreviewImage(url);
    }
  };

  return [previewImage, file, handleUpLoad];
}
export default useUpload;
