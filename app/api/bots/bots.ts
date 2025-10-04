import { ApiClient } from '../ApiClient';
import type { CreateBotRequestData, CreateBotResponseData, GetBotsRequestData, GetBotsResponse } from './bots.types';

class BotsApiClient extends ApiClient {
  public botsUrl = 'bots';
  public createBotsUrl = 'bots';

  public async getBots(data: GetBotsRequestData) {
    const response = await this.get<GetBotsResponse, GetBotsRequestData>({
      url: this.botsUrl,
      ...data,
    });

    return response;
  }

  public async createBot(data: CreateBotRequestData) {
    const response = await this.post<CreateBotResponseData, CreateBotRequestData>({
      url: this.createBotsUrl,
      ...data,
    });

    return response;
  }
}

export const useBotsApiClient = () => new BotsApiClient();
