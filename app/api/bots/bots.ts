import { ApiClient } from "../ApiClient";
import type { GetBotsRequestData, GetBotsResponse } from "./bots.types";

class BotsApiClient extends ApiClient {
  public botsUrl = "bots";
  public createBotsUrl = "bots";

  public async getBots(data: GetBotsRequestData) {
    const response = await this.get<GetBotsResponse, GetBotsRequestData>({
      url: this.botsUrl,
      ...data,
    });

    return response;
  }

  public async createBots() {
    const response = await this.post({
      url: this.createBotsUrl,
    });

    return response;
  }
}

export const useBotsApiClient = () => new BotsApiClient();
