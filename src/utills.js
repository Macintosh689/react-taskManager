export const statusClassName = {
  Block: "block",
  "To Do": "to_do",
  "On Progress": "on_progress",
  Done: "done",
};

export const statusNames = {
  BLOCK: "Block",
  TODO: "To Do",
  ONPROGRESS: "On Progress",
  DONE: "Done",
};

export const priorityClassName = {
  Low: "labelLow",
  Completed: "labelCompleted",
  "In Progress": "labelInProgress",
  High: "labelHigh",
};

export function getSaveTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
