"use client";
import { OttoState } from "@/constants/script.constant";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { Fragment, useState } from "react";
import BuildAutomation from "./BuildAutomation";

const SetupIntegration = () => {
  const integrationType = useAppSelector(
    (state: OttoState) => state.integration.type
  );
  const [isSetup, setIsSetup] = useState(true);
  const filename = `${integrationType}_order_report.csv`;
  const onContinueHandler = () => {
    setIsSetup(false);
  };

  return (
    <Fragment>
      {isSetup ? (
        <div className="flex flex-col px-10 py-8">
          <div className="font-bold text-xl">Set Up Integration</div>
          <div className="h-32 overflow-hidden flex items-center">
            <Image
              src={`/${integrationType}.png`}
              width={150}
              height={150}
              alt={integrationType ?? ""}
            />
          </div>
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
                  d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z"
                  clipRule="evenodd"
                />
                <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
              </svg>
            </label>
            <span>Use common reports</span>
            <span className="otto-primary">{filename}</span>
            <input
              type="file"
              id="uploadFile"
              name="uploadFile"
              className="hidden"
              multiple
            ></input>
          </div>
          <div className="flex items-center gap-5 mt-4">
            <label htmlFor="setUpIntegration" className="cursor-pointer">
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
            <span>Add custom fields</span>
          </div>
          <div className="flex items-center justify-end">
            <button
              className="otto-button otto-button-primary"
              onClick={onContinueHandler}
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <BuildAutomation></BuildAutomation>
      )}
    </Fragment>
  );
};

export default SetupIntegration;
