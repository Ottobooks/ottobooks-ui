import { ReactElement } from "react";

export const enum UploadType {
  PASTE_SCRIPT = 1,
  UPLOAD_SCRIPT,
}

export enum BreadcrumbType {
  home = "Home",
  create = "Create New Automation",
  script = "Upload Script",
  document = "Upload Document",
  automations = "My Automations",
  integrations = "Integrations",
  downloads = "Downloads",
  community = "Ottobooks Community",
  settings = "Settings",
  profile = "Profile",
}

export interface Breadcrumb {
  paths: BreadcrumbPath[];
}

export interface BreadcrumbPath {
  id: string;
  pathname: string;
  url: string;
}

export interface Auth {
  token: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  userId: string | null;
}

export interface OttoState {
  auth: Auth;
  breadcrumb: Breadcrumb;
}

export enum ModalType {
  SUCCESS = 1,
  WARNING,
  FAILURE,
}

export interface ModalProps {
  type: ModalType;
  title: string;
  content: string;
  children?: ReactElement;
}
