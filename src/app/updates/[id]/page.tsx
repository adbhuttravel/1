
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Metadata } from 'next';

interface UpdatePost {
    id: string;
    title: string;
    content: string;
    created_at: string;
}

// This tells Next.js to pre-render all update pages at build time
export async function generateStaticParams() {
  const { data: updates, error } = await supabase
    .from('updates')
    .select('id');

  if (error || !updates) {
    return [];
  }

  return updates.map((update) => ({
    id: update.id.toString(),
  }));
}

// Revalidate this page every 60 seconds
export const revalidate = 60;

async function getUpdateData(id: string): Promise<UpdatePost | null> {
  const { data, error } = await supabase
    .from('updates')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching document with id ${id}:`, error);
    return null;
  }
  return data as UpdatePost;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const update = await getUpdateData(params.id);

  if (!update) {
    return {
      title: 'Update Not Found',
    }
  }

  return {
    title: update.title,
    description: update.content.substring(0, 150),
  }
}

export default async function UpdateDetailPage({ params }: { params: { id: string } }) {
    const update = await getUpdateData(params.id);

    if (!update) {
        notFound();
    }

    return (
        <article className="container py-12 md:py-16">
           <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4">{update.title}</h1>
                <p className="text-sm text-muted-foreground mb-8">
                     {update.created_at && `Published on ${new Date(update.created_at).toLocaleDateString('en-IN')}`}
                </p>
                <div 
                    className="prose lg:prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: update.content }} 
                />
           </div>
        </article>
    );
}
