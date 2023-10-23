"use client";

import { DataSourceProps, ModalType } from "@/constants/script.constant";
import { useState } from "react";
import Popup from "../popup/Popup";
import { useDispatch } from "react-redux";
import { updateAutomation } from "@/redux/slices/automationsSlice";
import { useRouter } from "next/navigation";

const UploadDataSource = (props: DataSourceProps) => {
  const router = useRouter();
  const [filename, setFilename] = useState("");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onUploadHandler = (fileList: FileList) => {
    let filenames = Array.from(fileList)
      .map((file) => file.name)
      .join(", ");
    setFilename(filenames);
    const data = new FormData();
    data.append("script", fileList[0]);
    setFormData(data);
  };

  const onRunHandler = () => {
    if (!props.automation) return;
    const updatedAutomation = { ...props.automation };
    updatedAutomation.dataSource = filename;
    dispatch(updateAutomation(updatedAutomation));
    setIsPopup(true);
  };

  const onPopupCloseHandler = () => setIsPopup(false);

  return (
    <div className="mt-8 flex flex-col gap-5">
      <div className="flex items-center gap-5">
        <label htmlFor="uploadFile" className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <span>Upload Files</span>
        <span className="otto-primary">{filename}</span>
        <input
          type="file"
          id="uploadFile"
          name="uploadFile"
          className="hidden"
          onChange={(e) =>
            e.currentTarget.files && onUploadHandler(e.currentTarget.files)
          }
          multiple
        ></input>
      </div>
      <div className="flex items-center gap-5">
        <label
          htmlFor="setUpIntegration"
          className="cursor-pointer"
          onClick={() => router.push("/integrations")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </label>
        <span>Set Up Integration</span>
      </div>
      <div className="flex items-center justify-end">
        <button
          className="otto-button otto-button-primary"
          onClick={onRunHandler}
        >
          Run
        </button>
      </div>
      {isPopup ? (
        <Popup
          type={ModalType.SUCCESS}
          title={`Your automation successfully ran!`}
          content={`You can download your results here.`}
          onClose={onPopupCloseHandler}
        >
          <div className="pb-4 flex justify-center">
            <a
              href="#javascript"
              className="otto-link"
              onClick={(e) => e.preventDefault()}
            >
              {filename}
            </a>
          </div>
        </Popup>
      ) : null}
    </div>
  );
};

export default UploadDataSource;
