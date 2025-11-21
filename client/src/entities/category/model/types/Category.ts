interface Forum {
  id: number;
  title: string;
}

export interface Category {
  id: number;
  title: string;
  forums: Forum[];
}
