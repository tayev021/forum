interface Author {
  username: string;
  avatar: string | null;
}

interface Thread {
  id: number;
  title: string;
}

export interface Post {
  id: number;
  author: Author;
  thread: Thread;
  content: string;
  createdAt: string;
}
