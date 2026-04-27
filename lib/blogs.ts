import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createServerSupabaseClient } from './supabase-server';

export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  seo_keyword: string;
  image: string;
  content: string;
  source: 'markdown' | 'supabase';
}

const blogsDirectory = path.join(process.cwd(), 'content', 'blogs');

/**
 * Get posts from local markdown files (the original 10 posts).
 */
function getMarkdownPosts(): BlogPost[] {
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(blogsDirectory);
  } catch (error) {
    console.error("Could not find blogs directory:", error);
    return [];
  }

  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      const imageMatch = matterResult.content.match(/!\[.*?\]\((.*?)\)/);
      const image = imageMatch ? imageMatch[1] : '';

      let cleanedContent = matterResult.content;
      if (imageMatch && imageMatch[0]) {
        cleanedContent = cleanedContent.replace(imageMatch[0], '').trim();
      }

      return {
        slug,
        title: matterResult.data.title || slug,
        author: matterResult.data.author || 'Portland Flooring',
        date: matterResult.data.date || new Date().toISOString().split('T')[0],
        seo_keyword: matterResult.data.seo_keyword || '',
        image,
        content: cleanedContent,
        source: 'markdown' as const,
      };
    });
}

/**
 * Get published posts from Supabase (client-added posts).
 */
async function getSupabasePosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map((post: {
      slug: string;
      title: string;
      author: string;
      created_at: string;
      seo_keyword: string;
      cover_image: string | null;
      content: string;
    }) => ({
      slug: post.slug,
      title: post.title,
      author: post.author || 'Portland Flooring',
      date: post.created_at.split('T')[0],
      seo_keyword: post.seo_keyword || '',
      image: post.cover_image || '',
      content: post.content,
      source: 'supabase' as const,
    }));
  } catch (error) {
    console.error("Error fetching Supabase blogs:", error);
    return [];
  }
}

/**
 * Get all posts (markdown + supabase), sorted by date descending.
 */
export async function getSortedPostsData(): Promise<BlogPost[]> {
  const [markdownPosts, supabasePosts] = await Promise.all([
    Promise.resolve(getMarkdownPosts()),
    getSupabasePosts(),
  ]);

  const allPosts = [...markdownPosts, ...supabasePosts];

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Get a single post by slug. Checks markdown first, then Supabase.
 */
export async function getPostData(slug: string): Promise<BlogPost | null> {
  // Check markdown files first
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const imageMatch = matterResult.content.match(/!\[.*?\]\((.*?)\)/);
    const image = imageMatch ? imageMatch[1] : '';

    let cleanedContent = matterResult.content;
    if (imageMatch && imageMatch[0]) {
      cleanedContent = cleanedContent.replace(imageMatch[0], '').trim();
    }

    return {
      slug,
      title: matterResult.data.title || slug,
      author: matterResult.data.author || 'Portland Flooring',
      date: matterResult.data.date || new Date().toISOString().split('T')[0],
      seo_keyword: matterResult.data.seo_keyword || '',
      image,
      content: cleanedContent,
      source: 'markdown',
    };
  } catch {
    // Not found in markdown, check Supabase
  }

  // Check Supabase
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) return null;

    return {
      slug: data.slug,
      title: data.title,
      author: data.author || 'Portland Flooring',
      date: data.created_at.split('T')[0],
      seo_keyword: data.seo_keyword || '',
      image: data.cover_image || '',
      content: data.content,
      source: 'supabase',
    };
  } catch {
    return null;
  }
}
