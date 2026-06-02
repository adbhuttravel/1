
import type { Metadata } from "next";
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const metadata: Metadata = {
  title: "Latest Updates",
  description: "Stay informed with the latest news, travel alerts, and updates from Adbhut Travel.",
};

interface UpdatePost {
    id: string;
    title: string;
    content: string;
    created_at: string;
}

// Revalidate this page every 60 seconds
export const revalidate = 60;

async function getUpdates(): Promise<UpdatePost[]> {
    const { data, error } = await supabase
      .from('updates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching updates from Supabase:", error);
        return [];
    }
    
    return data as UpdatePost[];
}

export default async function UpdatesPage() {
  const updates = await getUpdates();

  return (
    <>
      <section className="bg-secondary py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Latest Updates</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Stay informed with the latest news, travel alerts, and updates from Adbhut Travel.
          </p>
        </div>
      </section>
      <section className="py-16">
         <div className="container max-w-4xl">
            {updates.length > 0 ? (
                 <div className="space-y-8">
                    {updates.map((update) => (
                        <div key={update.id} className="p-6 rounded-lg shadow-md border bg-card">
                            <h2 className="text-2xl font-headline font-bold mb-2">
                                <Link href={`/updates/${update.id}`} className="hover:text-accent transition-colors">
                                    {update.title}
                                </Link>
                            </h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                {update.created_at ? new Date(update.created_at).toLocaleDateString('en-IN') : "Date not available"}
                            </p>
                            <div 
                                className="prose prose-sm max-w-none text-muted-foreground line-clamp-3"
                                dangerouslySetInnerHTML={{ __html: update.content }} 
                            />
                            <Link href={`/updates/${update.id}`} className="text-accent font-semibold hover:underline mt-4 inline-block">
                                Read More
                            </Link>
                        </div>
                    ))}
                 </div>
            ) : (
                <div className="text-center">
                     <p className="text-muted-foreground">No updates have been posted yet. Check back soon!</p>
                </div>
            )}
         </div>
      </section>
    </>
  );
}
