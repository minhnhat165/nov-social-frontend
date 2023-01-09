import { useEffect, useState } from "react";
import imageCompression from "../functions/imageCompression";

const useDragAndDrop = (dragLayer, dropLayer, handleResult = () => {}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dropResult, setDropResult] = useState(null);
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      const compressedFile = await imageCompression(file);
      handleResult(compressedFile);
      setDropResult(compressedFile);
    } catch (error) {}
  };

  useEffect(() => {
    if (dragLayer) {
      dragLayer.addEventListener("dragover", handleDrag);
      dragLayer.addEventListener("dragenter", handleDrag);
      dragLayer.addEventListener("drop", handleDrop);
    }
    return () => {
      if (dragLayer) {
        dragLayer.removeEventListener("dragover", handleDrag);
        dragLayer.removeEventListener("dragenter", handleDrag);
        dragLayer.removeEventListener("drop", handleDrop);
      }
    };
  }, [dragLayer]);
  useEffect(() => {
    if (dropLayer) {
      dropLayer.addEventListener("dragenter", handleDrag);
      dropLayer.addEventListener("dragleave", handleDragLeave);
    }
    return () => {
      if (dropLayer) {
        dropLayer.removeEventListener("dragenter", handleDrag);
        dropLayer.removeEventListener("dragleave", handleDragLeave);
      }
    };
  }, [dropLayer]);
  return { dropResult, isDragging };
};
export default useDragAndDrop;
