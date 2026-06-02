
import type { Metadata } from "next";
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { BlogPost } from "@/lib/types";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Read the latest articles, stories, and travel guides from the team at Adbhut Travel.",
};

// Revalidate this page every 60 seconds
export const revalidate = 60;

async function getBlogs(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching blogs from Supabase:", error);
        return [];
    }
    
    return data as BlogPost[];
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <>
      <section className="bg-secondary py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Blog</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Travel stories, tips, and inspiration from our team of passionate explorers.
          </p>
        </div>
      </section>
      <section className="py-16">
         <div className="container max-w-5xl">
            {blogs.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((post) => (
                        <Link href={`/blogs/${post.slug}`} key={post.id} className="group block">
                            <div className="h-full rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 bg-card flex flex-col">
                                {post.cover_image_url && (
                                    <div className="relative h-56 w-full overflow-hidden">
                                        <Image 
                                            src={post.cover_image_url}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex-grow flex flex-col">
                                    <h2 className="text-xl font-headline font-bold mb-2 group-hover:text-accent transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {new Date(post.created_at).toLocaleDateString('en-IN')}
                                    </p>
                                    <div 
                                        className="prose prose-sm max-w-none text-muted-foreground line-clamp-3 flex-grow"
                                        dangerouslySetInnerHTML={{ __html: post.content }} 
                                    />
                                    <span className="text-accent font-semibold group-hover:underline mt-4 inline-block">
                                        Read More
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                 </div>
            ) : (
                <div className="text-center py-16">
                     <p className="text-muted-foreground text-lg">No blog posts have been published yet. Check back soon!</p>
                </div>
            )}
         </div>
      </section>
    </>
  );
}
