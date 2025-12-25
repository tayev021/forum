interface Thread {
  id: number;
  title: string;
  page: number;
}

export interface Post {
  id: number;
  thread: Thread;
  content: string;
  createdAt: string;
}
