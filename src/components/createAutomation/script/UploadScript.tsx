"use client";
import Popup from "@/components/popup/Popup";
import { baseHeaders, baseUrl } from "@/constants/app.constant";
import { Automation, ModalType, OttoState } from "@/constants/script.constant";
import { useAppSelector } from "@/redux/hooks";
import { addAutomation } from "@/redux/slices/automationsSlice";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UploadScript = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useAppSelector((state: OttoState) => state.auth.token);
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [filename, setFilename] = useState("");
  const [description, setDescription] = useState("");
  const [script, setScript] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isTooltip, setIsTooltip] = useState<boolean>(false);
  const [isPopup, setIsPopup] = useState<boolean>(false);

  useEffect(() => {
    if (
      filename != "" &&
      description != "" &&
      (script != "" || uploadedFilename != "")
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [filename, description, script, uploadedFilename]);

  const onUploadScriptHandler = (fileList: FileList) => {
    setUploadedFilename(fileList[0].name);
    const data = new FormData();
    data.append("script_file", fileList[0]);
    setFormData(data);
  };

  const onUploadHandler = async () => {
    const createData = await createAutomation();

    if (formData) {
      const scriptUpload = await uploadScript(createData.automation_id);
      if (scriptUpload) setIsPopup(true);
    } else {
      const scriptText = await addScript(createData.automation_id);
      if (scriptText) setIsPopup(true);
    }
  };

  const createAutomation = async () => {
    const request = {
      name: filename,
      description,
    };
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("x-api-token", token ?? "");
    const response: Response = await fetch(`${baseUrl}/automation`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(request),
    });

    const data = await response.json();

    return data;
  };

  const uploadScript = async (automation_id: string) => {
    if (!formData) return;
    const requestHeaders: HeadersInit = new Headers();
    // requestHeaders.set(
    //   "Content-Type",
    //   "multipart/form-data; boundary=<calculated when request is sent>"
    // );
    requestHeaders.set("x-api-token", token ?? "");
    const response = await fetch(
      `${baseUrl}/automation/script_file?automation_id=${automation_id}`,
      {
        method: "POST",
        headers: requestHeaders,
        body: formData,
      }
    );
    const data = await response.json();

    return data;
  };

  const addScript = async (automation_id: string) => {
    const request = {
      script_text: script,
    };
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("x-api-token", token ?? "");
    const response: Response = await fetch(
      `${baseUrl}/automation/script_text?automation_id=${automation_id}`,
      {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(request),
      }
    );

    const data = await response.json();

    return data;
  };

  const onAddProcessDocHandler = () => {
    setIsPopup(false);
    router.push("/create/document");
  };

  const onDoneHandler = () => {
    setIsPopup(false);
    router.push("/automations");
  };

  return (
    <Fragment>
      <div className="flex flex-col flex-1 justify-center gap-3 py-8 px-28">
        <div className="flex items-center gap-5">
          <label htmlFor="filename" className="otto-label w-32">
            Automation Name
          </label>
          <div className="flex-1">
            <input
              type="text"
              name="filename"
              id="filename"
              className="otto-input"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <label htmlFor="description" className="otto-label w-32">
            Description
          </label>
          <div className="flex-1">
            <textarea
              name="description"
              id="description"
              className="otto-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span className="otto-label w-32">Upload File</span>
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
                d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="otto-primary">{uploadedFilename}</span>
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
            value={script}
            onChange={(e) => setScript(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end pr-28">
        <button
          className="otto-button otto-button-primary"
          onClick={onUploadHandler}
          disabled={isValid ? false : true}
        >
          Save As
        </button>
      </div>
      {isPopup ? (
        <Popup type={ModalType.SUCCESS} title={`${filename} saved`} content="">
          <div className="p-4 flex justify-center gap-2">
            <button
              type="button"
              className="otto-button otto-button-original"
              onClick={onDoneHandler}
            >
              Done
            </button>
            <div className=" flex">
              <button
                type="button"
                className="otto-button otto-button-primary"
                onClick={onAddProcessDocHandler}
              >
                Add Process Doc
              </button>
              <div
                className="relative"
                onMouseEnter={() => setIsTooltip(true)}
                onMouseLeave={() => setIsTooltip(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 hover:cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                <p
                  className={`${
                    !isTooltip ? "hidden" : null
                  } absolute z-50 w-64 bg-stone-700 text-white p-2 rounded -right-24 bottom-12 text-justify`}
                >
                  A process doc will help me understand in plain language what
                  your script is doing, and will make it easier to edit it in
                  the future.
                </p>
              </div>
            </div>
          </div>
        </Popup>
      ) : null}
    </Fragment>
  );
};

export default UploadScript;
