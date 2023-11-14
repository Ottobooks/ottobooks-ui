"use client";
import { baseUrl } from "@/constants/app.constant";
import { Automation, OttoState } from "@/constants/script.constant";
import { useAppSelector } from "@/redux/hooks";
import { addAutomation } from "@/redux/slices/automationsSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CreateProcessDocument = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useAppSelector((state: OttoState) => state.auth.token);
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [filename, setFilename] = useState("");
  const [description, setDescription] = useState("");
  const [script, setScript] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

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
    data.append("process_doc", fileList[0]);
    setFormData(data);
  };

  const onUploadHandler = async () => {
    const createData = await createAutomation();

    if (formData) {
      await uploadProcessDoc(createData.automation_id);
    } else {
      await addProcesstext(createData.automation_id);
    }

    router.push("/create/document/addDataSource");
    // const automation: Automation = {
    //   id: Math.random().toString(),
    //   filename,
    //   description,
    //   lastRan: Date.now(),
    //   dataSource: null,
    // };
    // dispatch(addAutomation(automation));
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

  const uploadProcessDoc = async (automation_id: string) => {
    if (!formData) return;
    const requestHeaders: HeadersInit = new Headers();
    // requestHeaders.set(
    //   "Content-Type",
    //   "multipart/form-data; boundary=<calculated when request is sent>"
    // );
    requestHeaders.set("x-api-token", token ?? "");
    const response = await fetch(
      `${baseUrl}/automation/process_doc?automation_id=${automation_id}`,
      {
        method: "POST",
        headers: requestHeaders,
        body: formData,
      }
    );
    const data = await response.json();

    return data;
  };

  const addProcesstext = async (automation_id: string) => {
    const request = {
      process_text: script,
    };
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("x-api-token", token ?? "");
    const response: Response = await fetch(
      `${baseUrl}/automation/process_text?automation_id=${automation_id}`,
      {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(request),
      }
    );

    const data = await response.json();

    return data;
  };

  return (
    <div className="flex flex-col flex-1 px-24 py-8 gap-5">
      <div className="otto-card flex flex-col flex-1 p-6">
        <span className="font-bold text-center text-xl">
          Upload or Paste Process Document
        </span>
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
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProcessDocument;
