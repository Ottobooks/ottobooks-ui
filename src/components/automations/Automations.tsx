"use client";
import { Automation, OttoState } from "@/constants/script.constant";
import { useAppSelector } from "@/redux/hooks";
import { Fragment, useState } from "react";
import UploadDataSource from "./UploadDataSource";

const Automations = () => {
  const automationList = useAppSelector(
    (state: OttoState) => state.automations.automationsList
  );
  const [runAutomation, setRunAutomation] = useState<Automation | null>(null);

  const onRunHandler = (automation: Automation) => {
    setRunAutomation(automation);
  };

  return (
    <div className="flex flex-col min-w-full">
      {automationList.length ? (
        <Fragment>
          <table className="table-auto">
            <thead>
              <tr className="border-t border-t-gray-300">
                <th className="py-4 pr-4 text-left">Name</th>
                <th className="py-4 pr-4 text-left">Last Ran</th>
                <th className="py-4 pr-4 text-left">Data Source</th>
                <th className="py-4 text-right">Run</th>
              </tr>
            </thead>
            <tbody>
              {automationList.map((automation) => {
                return (
                  <tr
                    key={automation.id}
                    className="border-t border-t-gray-300"
                  >
                    <td className="py-4 pr-4 text-left">
                      {automation.filename}
                    </td>
                    <td className="py-4 pr-4 text-left">
                      {new Date(automation.lastRan).toLocaleString()}
                    </td>
                    <td className="py-4 pr-4 text-left">
                      {automation.dataSource ?? "Unknown"}
                    </td>
                    <td className="py-4 text-right">
                      <input
                        type="checkbox"
                        className="otto-checkbox"
                        onClick={() => onRunHandler(automation)}
                      ></input>
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
