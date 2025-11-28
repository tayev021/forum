interface Thread {
  id: number;
  title: string;
  postsCount: number;
  createdAt: string;
}

export interface Forum {
  id: number;
  title: string;
  createdAt: string;
  threads: Thread[];
  totalThreads: number;
  page: number;
  totalPages: number;
}
