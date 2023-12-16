"use client";

import Popup from "@/components/popup/Popup";
import { ModalType } from "@/constants/script.constant";
import { Fragment, useEffect, useState } from "react";
import { socket } from "@/socket";
import {
  IMessage,
  MessageType,
  UserType,
} from "@/constants/automation.constant";

const BuildAutomation = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [automationEvents, setAutomationEvents] = useState<IMessage[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [objectUrl, setObjectUrl] = useState("");
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>("");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onAutomationEvent(value: any) {
      const message: IMessage = {
        type: MessageType.Text,
        userType: UserType.Bot,
        text: value.data,
      };
      setAutomationEvents((previous) => [...previous, message]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onAutomationEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onAutomationEvent);
    };
  }, []);

  useEffect(() => {
    const contentCard = document.getElementById("contentCard");
    if (contentCard) {
      contentCard.scrollTop = contentCard.scrollHeight;
    }
  }, [automationEvents]);

  const onSendHandler = (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    if (uploadedFilename && uploadedFilename !== "") {
      const message: IMessage = {
        type: MessageType.File,
        userType: UserType.User,
        text: uploadedFilename,
        formData,
        objectUrl,
      };
      setAutomationEvents((previous) => [...previous, message]);
      socket.timeout(5000).emit("upload", { data: formData }, () => {
        setIsLoading(false);
      });
      setUploadedFilename("");
      setFormData(null);
    }

    if (inputQuery && inputQuery !== "") {
      const message: IMessage = {
        type: MessageType.Text,
        userType: UserType.User,
        text: inputQuery,
      };
      setAutomationEvents((previous) => [...previous, message]);
      socket.timeout(5000).emit("message", { data: inputQuery }, () => {
        setIsLoading(false);
      });
      setInputQuery("");
    }
  };

  const onUploadFileHandler = (fileList: FileList) => {
    setUploadedFilename(fileList[0].name);
    const data = new FormData();
    data.append("process_doc", fileList[0]);
    setFormData(data);
    setObjectUrl(URL.createObjectURL(fileList[0]));
    // const reader = new FileReader();
    // const url = reader.readAsDataURL(fileList[0]);
    // if(reader?.onloadend) {
    //   reader.onloadend((e: any) => {
    //     setImageSrc(reader.result);
    //   });
    // }
  };

  return (
    <div className="flex flex-col px-10 py-8 gap-3">
      <div className="font-bold text-xl">Build Automation</div>
      <div className=" rounded-lg">
        <div
          id="contentCard"
          className="p-4 bg-white border border-gray-200 rounded-t-lg h-96 flex flex-col overflow-auto gap-3"
        >
          {automationEvents.map((s: IMessage, idx: number) => {
            return (
              <Fragment key={idx}>
                <div
                  className={`flex items-center gap-3 ${
                    s.userType === UserType.User ? "flex-row-reverse" : ""
                  }`}
                >
                  {s.type === MessageType.File ? (
                    <span
                      className={`text-justify max-w-3xl rounded p-2 border ${
                        s.userType === UserType.User
                          ? "bg-slate-100 border-slate-200"
                          : "bg-stone-100 border-stone-200"
                      }`}
                    >
                      <object
                        data={s.objectUrl}
                        type="application/pdf"
                        width="200px"
                        height="100px"
                      />
                      <div className={`flex gap-2 items-center`}>
                        <span className="w-40 break-all">{s.text}</span>
                        <a href={s.objectUrl} target="_blank" download={s.text}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-8 h-8"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>
                    </span>
                  ) : (
                    <span
                      className={`text-justify max-w-3xl rounded p-2 border ${
                        s.userType === UserType.User
                          ? "bg-slate-100 border-slate-200 text-right"
                          : "bg-stone-100 border-stone-200"
                      }`}
                    >
                      {s.text}
                    </span>
                  )}
                </div>
              </Fragment>
            );
          })}
        </div>
        <div className="flex bg-gray-200 rounded-b-lg px-3 py-3 border border-slate-100 gap-5 items-center">
          <input
            type="text"
            className="otto-input border-none p-3 bg-white shadow-none"
            placeholder="Type a message"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSendHandler(event);
              }
            }}
          ></input>
          <a href="">
            <label
              htmlFor="uploadFile"
              className="flex-1 cursor-pointer flex gap-3 items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>
              <span className="otto-primary">{uploadedFilename}</span>
            </label>
            <input
              type="file"
              id="uploadFile"
              name="uploadFile"
              className="hidden"
              onChange={(e) =>
                e.currentTarget.files &&
                onUploadFileHandler(e.currentTarget.files)
              }
            ></input>
          </a>
          <button
            className="otto-button otto-button-primary shadow"
            onClick={onSendHandler}
          >
            Send
          </button>
        </div>
      </div>
      {/* {isPopup ? (
        <Popup
          type={ModalType.SUCCESS}
          title={`Your automation is successfully completed!`}
          content={`You can download your results here.`}
          onClose={onPopupCloseHandler}
        >
          <div className="pb-4 flex justify-center">
            <a
              href="/Processed_Shopify_Data.xlsx"
              className="otto-link"
              download
            >
              {filename}
            </a>
          </div>
        </Popup>
      ) : null} */}
    </div>
  );
};

export default BuildAutomation;
