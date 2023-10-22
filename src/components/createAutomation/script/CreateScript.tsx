"use client";
import { UploadType } from "@/constants/script.constant";
import { useState } from "react";
import UploadScript from "./UploadScript";

const CreateScript = () => {
  const [uploadType, setUploadType] = useState(UploadType.PASTE_SCRIPT);

  const onScriptHandler = (e: any, uploadType: UploadType) => {
    e.preventDefault();
    setUploadType(uploadType);
  };

  return (
    <div className="flex flex-col flex-1 px-24 py-8 gap-5">
      <div className="otto-card flex flex-col flex-1 p-6">
        <span className="font-bold text-center text-xl">
          Upload or Copy Script
        </span>
        <UploadScript></UploadScript>
      </div>
    </div>
  );
};

export default CreateScript;
