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
