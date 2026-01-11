import type { UserSubscription } from './UserSubscription';

export interface UserSubscriptions {
  subscriptions: UserSubscription[];
  totalSubscriptions: number;
  page: number;
  totalPages: number;
}
