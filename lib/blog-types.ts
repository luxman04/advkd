export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO, from Sanity's publishedAt
  displayDate: string;
  excerpt: string;
};

export function getAllCategories(posts: BlogPost[]): string[] {
  return ['All', ...Array.from(new Set(posts.map((p) => p.category)))];
}
