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

  private async callAPI<ResponseType>(params: FetchParams) {
    const response = await this.fetch({
      ...params,
      url: this.buildAPIUrl(params.url),
    });

    const data = <ResponseType>response;

    return data;
  }

  private buildAPIUrl(url: string) {
    return `https://writehub.space${this.baseUrl}${url}`;
  }

  protected async get<ResponseType, RequestType extends BodyParams>(
    params: RequestParams<RequestType>,
  ): Promise<ResponseType> {
    return await this.callAPI<ResponseType>(
      {
        ...params,
        method: 'GET',
      },
    );
  }

  protected async post<ResponseType, RequestType extends BodyParams>(
    params: RequestParams<RequestType>,
  ): Promise<ResponseType> {
    return await this.callAPI<ResponseType>(
      {
        ...params,
        method: 'POST',
      },
    );
  }

  protected async put<ResponseType, RequestType extends BodyParams>(
    params: RequestParams<RequestType>,
  ): Promise<ResponseType> {
    return await this.callAPI<ResponseType>(
      {
        ...params,
        method: 'PUT',
      },
    );
  }

  protected async delete<ResponseType, RequestType extends BodyParams>(
    params: RequestParams<RequestType>,
  ): Promise<ResponseType> {
    return await this.callAPI<ResponseType>(
      {
        ...params,
        method: 'DELETE',
      },
    );
  }
}
