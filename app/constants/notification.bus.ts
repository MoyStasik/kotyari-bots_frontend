import { Bus } from '~/utils/Bus';

export type events = 'task:created';

export const useNotificationBus = new Bus<events>();
