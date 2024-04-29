import { useSanityClient } from "@sanity/astro";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

// Reusable function to fetch data from Sanity
async function fetchData<T>(query: string, params: Record<string, any> = {}): Promise<T> {
  try {
    return await useSanityClient().fetch(query, params);
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    throw new Error('Failed to fetch data');
  }
}

export async function getPosts(): Promise<Post[]> {
  const query = groq`*[_type == "resource" && defined(slug.current)] | order(_createdAt desc)`;
  return fetchData<Post[]>(query);
}

export async function getPost(slug: string): Promise<Post> {
  const query = groq`*[_type == "resource" && slug.current == $slug][0]`;
  return fetchData<Post>(query, { slug });
}

export async function getNavBlocks(): Promise<NavBlock[]> {
  const query = groq`
    *[_type == "navBlock"] {
      title,
      icon,
      "imageUrl": imageUrl.asset->url,
      description,
      viewDetailsButtonText,
      resourceDetailsLink,
      width
    }
  `;
  return fetchData<NavBlock[]>(query);
}

export async function getLearningSteps(): Promise<LearningStep[]> {
  const query = groq`
    *[_type == "step"] | order(order asc) {
      title,
      slug,
      description,
      content,
      order
    }
  `;
  return fetchData<LearningStep[]>(query);
}

export async function getLearningStep(slug: string): Promise<LearningStep> {
  const query = groq`*[_type == "step" && slug.current == $slug]{
    ...,
    nextStep->{
      title,
      "slug": slug.current
    }
  }[0]`;
  const result = await fetchData<LearningStep>(query, { slug });
  // console.log("Fetched learning step:", result);  
  return result;
}



export interface Post {
  _type: "resource";
  _createdAt: string;
  title?: string;
  tags?: string[];
  slug: Slug;
  excerpt?: string;
  description?: string;
  longDescription?: string;
  imageSrc?: ImageAsset;
  body: PortableTextBlock[];
  BMSResourceLink?: string; // Add optional if it might not always be present
  resourceType?: string; // Similarly handle other properties
  author?: string;
}

export interface NavBlock {
  title: string;
  icon: string;
  imageUrl: ImageAsset;
  description: string;
  viewDetailsButtonText: string;
  resourceDetailsLink: string;
  width: string;
}

export interface LearningStep {
  title: string;
  slug: Slug;
  description: string;
  content: PortableTextBlock[];
  videoUrl?: string; // Mark as optional
  order?: number;
  nextStep?: {
    title: string;
    slug: Slug;
  };
  resources?: Array<{ _id: string; title: string; slug: Slug }>; // Define the type for resources
  _createdAt?: string; // Mark as optional
}
