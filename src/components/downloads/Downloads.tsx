"use client";
import { baseUrl } from "@/constants/app.constant";
import { Status, TriggerType } from "@/constants/automation.constant";
import { OttoState } from "@/constants/script.constant";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const token = useAppSelector((state: OttoState) => state.auth.token);

  useEffect(() => {
    getDownloads();
  }, []);

  const getDownloads = async () => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("x-api-token", token ?? "");
    const response: Response = await fetch(`${baseUrl}/automation_run`, {
      method: "GET",
      headers: requestHeaders,
    });

    const data = await response.json();

    setDownloads(data);
  };

  const downloadSourceFile = async (
    event: { preventDefault: () => void },
    filename: string,
    fileId: string,
    isResult: boolean
  ) => {
    event.preventDefault();
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("x-api-token", token ?? "");
    let requestUrl = `${baseUrl}/automation_run/input?automation_run_id=${fileId}`;
    if (isResult) {
      requestUrl = `${baseUrl}/automation_run/results?automation_run_id=${fileId}`;
    }
    const response: Response = await fetch(requestUrl, {
      method: "GET",
      headers: requestHeaders,
    });

    const blob = await response.blob();

    const element = document.createElement("a");
    element.href = window.URL.createObjectURL(blob);
    element.download = filename;
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col min-w-full">
      {downloads.length ? (
        <table className="table-auto">
          <thead>
            <tr className="border-t border-t-gray-300">
              <th className="py-4 pr-4 text-left">Description</th>
              {/* <th className="py-4 pr-4 text-left">Description</th> */}
              <th className="py-4 pr-4 text-left">Data Source</th>
              <th className="py-4 pr-4 text-left">Trigger Type</th>
              <th className="py-4 pr-4 text-left">Status</th>
              <th className="py-4 text-right">Result</th>
            </tr>
          </thead>
          <tbody>
            {downloads.map((download: any) => {
              return (
                <tr key={download.id} className="border-t border-t-gray-300">
                  {/* <td className="py-4 pr-4 text-left">
                    {download.description}
                  </td> */}
                  <td className="py-4 pr-4 text-left">
                    {download.description}
                  </td>
                  <td className="py-4 pr-4 text-left">
                    <a
                      href=""
                      className="otto-link"
                      onClick={(e) =>
                        downloadSourceFile(
                          e,
                          download.automation_id,
                          download.id,
                          false
                        )
                      }
                    >
                      {download.data_source}
                    </a>
                  </td>
                  <td className="py-4 pr-4 text-left">
                    {TriggerType[download.trigger_type]}
                  </td>
                  <td className="py-4 pr-4 text-left">
                    {Status[download.status]}
                  </td>
                  <td className="py-4 text-right">
                    {download.result_file === "None" ? (
                      "--"
                    ) : (
                      <a
                        href=""
                        className="otto-link"
                        onClick={(e) =>
                          downloadSourceFile(
                            e,
                            download.result_file,
                            download.id,
                            true
                          )
                        }
                      >
                        Download
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>No Downloads!</div>
      )}
    </div>
  );
};

export default Downloads;
