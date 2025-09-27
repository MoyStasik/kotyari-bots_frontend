type FetchMethods = "GET" | "POST" | "PUT" | "DELETE";

export type BodyParams = Record<string, unknown>;

export interface FetchParams {
  url: string;
  method?: FetchMethods;
  body?: BodyParams;
}

interface RequestData<T extends BodyParams> extends FetchParams {
  body?: T;
}

export type RequestParams<T extends BodyParams> = RequestData<T>;
