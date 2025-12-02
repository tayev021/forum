interface Author {
  username: string;
  avatar: string | null;
}

interface Thread {
  id: number;
  title: string;
}

export interface LatestPost {
  id: number;
  author: Author;
  thread: Thread;
  content: string;
  createdAt: string;
}
