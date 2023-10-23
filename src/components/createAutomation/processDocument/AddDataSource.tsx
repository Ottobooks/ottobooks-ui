"use client";

import UploadDataSource from "@/components/automations/UploadDataSource";

const AddDataSource = () => {
  return (
    <div className="py-8 px-24">
      <div className="font-bold text-lg">Add Data Source</div>
      <UploadDataSource></UploadDataSource>
    </div>
  );
};

export default AddDataSource;
