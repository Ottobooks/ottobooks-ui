"use client";
import { Fragment, useState } from "react";

const UploadScript = () => {
  const [filename, setFilename] = useState("");
  const [formData, setFormData] = useState<FormData | null>(null);

  const onUploadScriptHandler = async (fileList: FileList) => {
    setFilename(fileList[0].name);
    const data = new FormData();
    data.append("script", fileList[0]);
    setFormData(data);
  };

  const onUploadHandler = async () => {
    if (!formData) return;
    const response = await fetch("/upload/file", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <Fragment>
      <div className="flex flex-col flex-1 justify-center gap-3 py-8 px-28">
        <div className="flex items-center gap-5">
          <label htmlFor="filename" className="otto-label w-24">
            File Name
          </label>
          <div className="flex-1">
            <input
              type="text"
              name="filename"
              id="filename"
              className="otto-input"
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <label htmlFor="description" className="otto-label w-24">
            Description
          </label>
          <div className="flex-1">
            <textarea
              name="description"
              id="description"
              className="otto-input"
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span className="otto-label w-24">Upload File</span>
          <label
            htmlFor="uploadScript"
            className="flex-1 cursor-pointer flex gap-3 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12"
            >
              <path
                fillRule="evenodd"
                d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            <span>{filename}</span>
          </label>
          <input
            type="file"
            id="uploadScript"
            name="uploadScript"
            className="hidden"
            onChange={(e) =>
              e.currentTarget.files &&
              onUploadScriptHandler(e.currentTarget.files)
            }
          ></input>
        </div>
        <div className="flex justify-center gap-5 font-semibold">OR</div>
        <div className="flex-1 flex flex-col items-center gap-3">
          <textarea
            className="otto-input flex-1"
            placeholder="Paste your script here"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end pr-28">
        <button className="otto-button" onClick={onUploadHandler}>
          Save As
        </button>
      </div>
    </Fragment>
  );
};

export default UploadScript;
