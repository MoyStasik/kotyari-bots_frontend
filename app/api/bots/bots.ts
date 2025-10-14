import { ApiClient } from '../ApiClient';
import type {
  CreateBotRequestData,
  CreateBotResponseData,
  DeleteBotRequestData,
  DeleteBotResponseData,
  GetBotsRequestData,
  GetBotsResponse,
  UpdateBotRequestData,
  UpdateBotResponseData,
} from './bots.types';

class BotsApiClient extends ApiClient {
  public botsUrl = 'bots';
  public createBotsUrl = 'bots';
  public deleteBotUrl = 'bots/';
  public updateBotUrl = 'bots/';

  public async getBots(data: GetBotsRequestData) {
    const response = await this.get<GetBotsResponse, GetBotsRequestData>({
      url: this.botsUrl,
      ...data,
    });

    return response;
  }

  public async createBot(data: CreateBotRequestData) {
    const response = await this.post<
      CreateBotResponseData,
      CreateBotRequestData
    >({
      url: this.createBotsUrl,
      body: {
        ...data,
      },
    });

    return response;
  }

  public async deleteBot(data: DeleteBotRequestData) {
    const response = await this.delete<DeleteBotResponseData, DeleteBotRequestData>({
      url: `${this.deleteBotUrl}${data.botId}`,
    });

    return response;
  }

  public async updateBot(botId: string, data: UpdateBotRequestData) {
    const response = await this.put<UpdateBotResponseData, UpdateBotRequestData>({
      url: `${this.updateBotUrl}${botId}`,
      body: {
        ...data,
      },
    });

    return response;
  }
}

export const useBotsApiClient = () => new BotsApiClient();
