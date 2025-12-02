interface Author {
  id: number;
  username: string;
  avatar: string | null;
  lastSignIn: string;
}

interface Post {
  id: number;
  threadId: number;
  content: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

export interface Thread {
  id: number;
  title: string;
  authorId: number;
  forumId: number;
  createdAt: string;
  posts: Post[];
  totalPosts: number;
  page: number;
  totalPages: number;
}
