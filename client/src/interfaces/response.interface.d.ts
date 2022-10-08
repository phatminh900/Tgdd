interface ResponseStatus {
  status: "success" | "fail" | "error";
}
export interface ResponseStatusMessage extends ResponseStatus {
  message: string;
}

export interface ResponseStatusData<T> extends ResponseStatus {
  data: T;
}
