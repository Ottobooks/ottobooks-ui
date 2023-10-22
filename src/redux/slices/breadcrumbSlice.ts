import {
  Breadcrumb,
  BreadcrumbPath,
  BreadcrumbType,
} from "@/constants/script.constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Breadcrumb = {
  paths: [],
};

const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    setBreadcrumb(state, action) {
      const updatedPaths: BreadcrumbPath[] = [];
      const paths: string[] = action.payload.split("/");
      let url = "";
      paths.forEach((path: string) => {
        if (
          path !== "" &&
          BreadcrumbType[path as keyof typeof BreadcrumbType]
        ) {
          url += `/${path}`;
          const currentPath: BreadcrumbPath = {
            id: path,
            pathname: BreadcrumbType[path as keyof typeof BreadcrumbType],
            url: url,
          };
          updatedPaths.push(currentPath);
        }
      });

      return { paths: updatedPaths };
    },
  },
});

export const { setBreadcrumb } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
