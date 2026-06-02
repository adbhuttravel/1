
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Metadata } from 'next';
import type { BlogPost } from '@/lib/types';
import Image from 'next/image';

// This tells Next.js to pre-render all blog pages at build time
export async function generateStaticParams() {
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('slug')
    .eq('status', 'published');

  if (error || !blogs) {
    return [];
  }

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Revalidate this page every 60 seconds
export const revalidate = 60;

async function getBlogData(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return null;
  }
  return data as BlogPost;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await getBlogData(params.slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  return {
    title: blog.title,
    description: blog.content.substring(0, 150),
    openGraph: {
        title: blog.title,
        description: blog.content.substring(0, 150),
        images: blog.cover_image_url ? [blog.cover_image_url] : [],
    }
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
    const blog = await getBlogData(params.slug);

    if (!blog) {
        notFound();
    }

    return (
        <article className="container py-12 md:py-16">
           <div className="max-w-3xl mx-auto">
                {blog.cover_image_url && (
                    <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden shadow-lg">
                         <Image 
                            src={blog.cover_image_url}
                            alt={blog.title}
                            fill
                            className="object-cover"
                         />
                    </div>
                )}
                <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4">{blog.title}</h1>
                <p className="text-sm text-muted-foreground mb-8">
                     {`Published on ${new Date(blog.created_at).toLocaleDateString('en-IN')}`}
                </p>
                <div 
                    className="prose lg:prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.content }} 
                />
           </div>
        </article>
    );
}
