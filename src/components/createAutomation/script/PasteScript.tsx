"use client";
import { Fragment } from "react";

const PasteScript = () => {
  return (
    <Fragment>
      <textarea
        className="flex-1 border border-gray-200 p-4"
        placeholder="Paste your script here"
      ></textarea>
      <div className="flex justify-end">
        <button className="otto-button">Save As</button>
      </div>
    </Fragment>
  );
};

export default PasteScript;
