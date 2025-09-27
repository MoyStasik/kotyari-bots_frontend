export interface Profiles {
  id: string,
  name: string,
  email: string,
  systemPrompt: string,
}

export interface BotsState {
  id: string,
  name: string,
  profiles: Profiles[],
  systemPrompt: string,
  moderationRequired: boolean,
  createdAt: string,
  updatedAt: string,
}
