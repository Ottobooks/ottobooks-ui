"use client";
import { Automation, OttoState } from "@/constants/script.constant";
import { useAppSelector } from "@/redux/hooks";
import { Fragment, useEffect, useState } from "react";
import UploadDataSource from "./UploadDataSource";
import { baseUrl } from "@/constants/app.constant";

const Automations = () => {
  const token = useAppSelector((state: OttoState) => state.auth.token);
  const [automations, setAutomations] = useState([]);
  const [runAutomation, setRunAutomation] = useState<Automation | null>(null);

  useEffect(() => {
    getAutomations();
  }, []);

  const getAutomations = async () => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("x-api-token", token ?? "");
    const response: Response = await fetch(`${baseUrl}/automation`, {
      method: "GET",
      headers: requestHeaders,
    });

    const data = await response.json();

    setAutomations(data);
  };

  const onRunHandler = (automation: Automation) => {
    setRunAutomation(automation);
  };

  const downloadFile = async (
    event: { preventDefault: () => void },
    filename: string,
    automation_id: string,
    isScript: boolean
  ) => {
    event.preventDefault();
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("x-api-token", token ?? "");
    const response: Response = await fetch(
      `${baseUrl}/automation/${
        isScript ? "script_file" : "process_doc"
      }?automation_id=${automation_id}`,
      {
        method: "GET",
        headers: requestHeaders,
      }
    );

    const blob = await response.blob();

    const element = document.createElement("a");
    element.href = window.URL.createObjectURL(blob);
    element.download = filename;
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const deleteAutomation = async (
    event: { preventDefault: () => void },
    automation_id: string
  ) => {
    event.preventDefault();
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("x-api-token", token ?? "");
    const response: Response = await fetch(
      `${baseUrl}/automation?automation_id=${automation_id}`,
      {
        method: "DELETE",
        headers: requestHeaders,
      }
    );

    const data = await response.json();

    getAutomations();
  };

  return (
    <div className="flex flex-col min-w-full">
      {automations.length ? (
        <Fragment>
          <table className="table-auto">
            <thead>
              <tr className="border-t border-t-gray-300">
                <th className="py-4 pr-4 text-left">Name</th>
                <th className="py-4 pr-4 text-left">Description</th>
                <th className="py-4 pr-4 text-left">Process</th>
                <th className="py-4 pr-4 text-left">Script</th>
                <th className="py-4 text-center">Run</th>
                <th className="py-4 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {automations.map((automation: any) => {
                return (
                  <tr
                    key={automation.id}
                    className="border-t border-t-gray-300"
                  >
                    <td className="py-4 pr-4 text-left">{automation.name}</td>
                    <td className="py-4 pr-4 text-left">
                      {automation.description}
                    </td>
                    <td className="py-4 pr-4 text-left">
                      {automation.process === "None" ? (
                        "Unknown"
                      ) : (
                        <a
                          href=""
                          className="otto-link"
                          onClick={(e) =>
                            downloadFile(
                              e,
                              automation.name,
                              automation.id,
                              false
                            )
                          }
                        >
                          Download
                        </a>
                      )}
                    </td>
                    <td className="py-4 pr-4 text-left">
                      {automation.script === "None" ? (
                        "Unknown"
                      ) : (
                        <a
                          href=""
                          className="otto-link"
                          onClick={(e) =>
                            downloadFile(
                              e,
                              automation.name,
                              automation.id,
                              true
                            )
                          }
                        >
                          Download
                        </a>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      <input
                        type="checkbox"
                        className="otto-checkbox"
                        onClick={(e) =>
                          e.currentTarget.checked
                            ? onRunHandler(automation)
                            : setRunAutomation(null)
                        }
                      ></input>
                    </td>
                    <td className="py-4 text-right">
                      <a
                        href=""
                        className="text-red-700 font-bold hover:cursor-pointer hover:text-red-600"
                        onClick={(e) => deleteAutomation(e, automation.id)}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {runAutomation ? (
            <UploadDataSource automation={runAutomation}></UploadDataSource>
          ) : null}
        </Fragment>
      ) : (
        <div>No Automations!</div>
      )}
    </div>
  );
};
export default Automations;
