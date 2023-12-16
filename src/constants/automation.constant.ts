export enum Status {
  Scheduled = 1,
  Provisioning,
  Running,
  Completed,
  "Results Available",
}

export enum TriggerType {
  Manual = 0,
  Scheduled,
}

export enum MessageType {
  Text = 1,
  File,
}

export enum UserType {
  User,
  Bot,
}

export interface IMessage {
  type: MessageType;
  userType: UserType;
  text?: string;
  formData?: FormData | null;
  objectUrl?: string;
  imageSrc?: string | ArrayBuffer | null;
}
