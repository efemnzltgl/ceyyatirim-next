export const PROJECTS_QUERY = `*[_type == "project"]{
  _id,
  title,
  description,
  "imageUrl": mainImage.asset->url
}`;