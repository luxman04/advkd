export const allPostsQuery = `*[_type == "post"] | order(publishedAt desc){
  "slug": slug.current,
  title,
  category,
  publishedAt,
  excerpt
}`;

export const postSlugsQuery = `*[_type == "post" && defined(slug.current)][].slug.current`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  category,
  publishedAt,
  excerpt,
  coverImage,
  body
}`;
