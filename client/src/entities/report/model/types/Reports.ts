import type { Report } from './Report';

export type Reports = {
  list: Report[];
  totalReports: number;
  page: number;
  totalPages: number;
};
