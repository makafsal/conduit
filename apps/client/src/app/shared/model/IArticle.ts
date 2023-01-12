export interface IArticle {
  id?: string;
  title: string;
  description: string;
  body: string;
  tags: string;
  slug: string;
  author: {
    bio: string;
    email: string;
    image: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}