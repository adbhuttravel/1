
'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { BlogPost } from '@/lib/types';

type ActionResult<T> = { success: true; data: T } | { success: false; error: string };

// Helper function to create the admin client. This ensures env vars are read at runtime.
const getSupabaseAdmin = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error('Supabase credentials are not set in the environment.');
    }
    
    return createClient(supabaseUrl, serviceRoleKey);
};

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required.'),
  content: z.string().min(1, 'Content is required.'),
  slug: z.string().min(1, 'Slug is required.'),
  status: z.enum(['draft', 'published', 'archived']),
  cover_image_url: z.string().url().optional().or(z.literal('')),
});

// This function now runs on the server and uses the Supabase admin client
export async function getBlogs(): Promise<ActionResult<BlogPost[]>> {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase Admin - Error fetching blogs:", error);
      return { success: false, error: "Could not fetch blogs from Supabase. Check table name, RLS policies or connection details." };
    }

    return { success: true, data: data as BlogPost[] };
  } catch (e: any) {
    console.error("Supabase Admin - Unexpected error fetching blogs:", e);
    return { success: false, error: `An unexpected error occurred: ${e.message}` };
  }
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove special characters
    .trim()
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
}

export async function createBlog(formData: FormData): Promise<ActionResult<{ id: string }>> {
    const title = formData.get('title') as string;
    const validatedFields = formSchema.safeParse({
        title: title,
        content: formData.get('content'),
        slug: createSlug(title),
        status: formData.get('status') || 'draft',
        cover_image_url: formData.get('cover_image_url')
    });

    if (!validatedFields.success) {
        return { success: false, error: validatedFields.error.flatten().fieldErrors.toString() };
    }
    
    const { content, slug, status, cover_image_url } = validatedFields.data;

    try {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('blogs')
            .insert([{ title, content, slug, status, cover_image_url }])
            .select('id')
            .single();

        if (error) {
            console.error("Supabase Admin - Error creating blog:", error);
            return { success: false, error: `Failed to create blog: ${error.message}` };
        }
        
        revalidatePath('/blogs');
        revalidatePath(`/blogs/${slug}`);
        revalidatePath('/admin/blogs');
        return { success: true, data: { id: data.id } };
    } catch (e: any) {
        console.error("Supabase Admin - Unexpected error creating blog:", e);
        return { success: false, error: `An unexpected error occurred: ${e.message}` };
    }
}

export async function updateBlog(formData: FormData): Promise<ActionResult<null>> {
    const title = formData.get('title') as string;
    const id = formData.get('id') as string;

    const validatedFields = formSchema.safeParse({
        id: id,
        title: title,
        content: formData.get('content'),
        slug: createSlug(title),
        status: formData.get('status') || 'draft',
        cover_image_url: formData.get('cover_image_url')
    });

    if (!validatedFields.success) {
        return { success: false, error: validatedFields.error.flatten().fieldErrors.toString() };
    }

    const { content, slug, status, cover_image_url } = validatedFields.data;
    
    if (!id) {
        return { success: false, error: 'ID is required for update.' };
    }

    try {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
            .from('blogs')
            .update({ title, content, slug, status, cover_image_url, updated_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            console.error("Supabase Admin - Error updating blog:", error);
            return { success: false, error: `Failed to update post: ${error.message}` };
        }

        revalidatePath('/blogs');
        revalidatePath(`/blogs/${slug}`);
        revalidatePath('/admin/blogs');
        return { success: true, data: null };
    } catch (e: any) {
        console.error("Supabase Admin - Unexpected error updating blog:", e);
        return { success: false, error: `An unexpected error occurred: ${e.message}` };
    }
}

export async function deleteBlog(id: string): Promise<ActionResult<null>> {
    if (!id) {
        return { success: false, error: 'Document ID is required for deletion.' };
    }
    
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
            .from('blogs')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Supabase Admin - Error deleting blog:", error);
            return { success: false, error: `Failed to delete blog: ${error.message}` };
        }

        revalidatePath('/blogs');
        revalidatePath('/admin/blogs');
        return { success: true, data: null };
    } catch (e: any) {
        console.error("Supabase Admin - Unexpected error deleting blog:", e);
        return { success: false, error: `An unexpected error occurred: ${e.message}` };
    }
}
