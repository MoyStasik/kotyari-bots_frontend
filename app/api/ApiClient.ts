import type { BodyParams, FetchParams, RequestParams } from './api.types';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/v1/') {
    this.baseUrl = baseUrl;
  }

  private fetch(params: FetchParams) {
    return $fetch(params.url, {
      ...params,
      retry: 2,
      retryStatusCodes: [500, 501, 502, 503],
    });
  }

  private async callAPI<ResponseType>(params: FetchParams, port?: number) {
    const response = await this.fetch({
      ...params,
      url: this.buildAPIUrl(params.url, port),
    });

    const data = <ResponseType>response;

    return data;
  }

  private buildAPIUrl(url: string, port?: number) {
    return `http://localhost:${port || 8001}${this.baseUrl}${url}`;
  }

  protected async get<ResponseType, RequestType extends BodyParams>(
    params: RequestParams<RequestType>,
    port?: number
  ): Promise<ResponseType> {
    return await this.callAPI<ResponseType>(
      {
        ...params,
        method: 'GET',
      },
      port
    );
  }

  protected async post<ResponseType, RequestType extends BodyParams>(
    params: RequestParams<RequestType>,
    port?: number
  ): Promise<ResponseType> {
    return await this.callAPI<ResponseType>(
      {
        ...params,
        method: 'POST',
      },
      port
    );
  }

  protected async put<ResponseType, RequestType extends BodyParams>(
    params: RequestParams<RequestType>,
    port?: number
  ): Promise<ResponseType> {
    return await this.callAPI<ResponseType>(
      {
        ...params,
        method: 'PUT',
      },
      port
    );
  }

  protected async delete<ResponseType, RequestType extends BodyParams>(
    params: RequestParams<RequestType>,
    port?: number
  ): Promise<ResponseType> {
    return await this.callAPI<ResponseType>(
      {
        ...params,
        method: 'DELETE',
      },
      port
    );
  }
}
