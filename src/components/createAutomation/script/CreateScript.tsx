"use client";
import { UploadType } from "@/constants/script.constant";
import { useState } from "react";
import PasteScript from "./PasteScript";
import UploadScript from "./UploadScript";

const CreateScript = () => {
  const [uploadType, setUploadType] = useState(UploadType.PASTE_SCRIPT);

  const onScriptHandler = (e: any, uploadType: UploadType) => {
    e.preventDefault();
    setUploadType(uploadType);
  };

  return (
    <div className="flex flex-col flex-1 px-24 py-8">
      <div className="otto-card flex flex-col flex-1">
        <div className="flex">
          <a
            href="#javascript"
            onClick={(e) => onScriptHandler(e, UploadType.PASTE_SCRIPT)}
            className={`otto-internal-link flex-1 text-center px-6 py-4 border-r border-stone-200 rounded-tl-lg ${
              uploadType == UploadType.PASTE_SCRIPT
                ? null
                : "bg-stone-100 border-b"
            }`}
          >
            Paste Script
          </a>
          <a
            href="#javascript"
            onClick={(e) => onScriptHandler(e, UploadType.UPLOAD_SCRIPT)}
            className={`otto-internal-link flex-1 text-center px-6 py-4 rounded-tr-lg ${
              uploadType == UploadType.UPLOAD_SCRIPT
                ? null
                : "bg-stone-100 border-b"
            }`}
          >
            Upload Script
          </a>
        </div>
        <div className="px-6 py-4 h-4/5 flex flex-col flex-1 gap-5">
          {uploadType === UploadType.PASTE_SCRIPT ? (
            <PasteScript></PasteScript>
          ) : (
            <UploadScript></UploadScript>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateScript;
