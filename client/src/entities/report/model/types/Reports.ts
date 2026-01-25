import type { Report } from './Report';

export type Reports = {
  list: Report[];
  total: number;
  page: number;
  totalPages: number;
};
