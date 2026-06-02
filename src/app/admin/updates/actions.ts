
'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { UpdatePost } from './page';

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
});

// This function now runs on the server and uses the Supabase admin client
export async function getUpdates(): Promise<ActionResult<UpdatePost[]>> {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from('updates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase Admin - Error fetching updates:", error);
      return { success: false, error: "Could not fetch updates from Supabase. Check RLS policies or connection details." };
    }

    return { success: true, data: data as UpdatePost[] };
  } catch (e: any) {
    console.error("Supabase Admin - Unexpected error fetching updates:", e);
    return { success: false, error: `An unexpected error occurred: ${e.message}` };
  }
}

export async function createUpdate(formData: FormData): Promise<ActionResult<{ id: string }>> {
    const validatedFields = formSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });

    if (!validatedFields.success) {
        return { success: false, error: validatedFields.error.flatten().fieldErrors.toString() };
    }
    
    const { title, content } = validatedFields.data;

    try {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('updates')
            .insert([{ title, content }])
            .select('id')
            .single();

        if (error) {
            console.error("Supabase Admin - Error creating update:", error);
            return { success: false, error: `Failed to create update: ${error.message}` };
        }
        
        revalidatePath('/updates');
        revalidatePath('/admin/updates');
        return { success: true, data: { id: data.id } };
    } catch (e: any) {
        console.error("Supabase Admin - Unexpected error creating update:", e);
        return { success: false, error: `An unexpected error occurred: ${e.message}` };
    }
}

export async function updateUpdate(formData: FormData): Promise<ActionResult<null>> {
    const validatedFields = formSchema.safeParse({
        id: formData.get('id'),
        title: formData.get('title'),
        content: formData.get('content'),
    });

    if (!validatedFields.success) {
        return { success: false, error: validatedFields.error.flatten().fieldErrors.toString() };
    }

    const { id, title, content } = validatedFields.data;
    
    if (!id) {
        return { success: false, error: 'ID is required for update.' };
    }

    try {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
            .from('updates')
            .update({ title, content, updated_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            console.error("Supabase Admin - Error updating update:", error);
            return { success: false, error: `Failed to update post: ${error.message}` };
        }

        revalidatePath('/updates');
        revalidatePath(`/updates/${id}`);
        revalidatePath('/admin/updates');
        return { success: true, data: null };
    } catch (e: any) {
        console.error("Supabase Admin - Unexpected error updating update:", e);
        return { success: false, error: `An unexpected error occurred: ${e.message}` };
    }
}

export async function deleteUpdate(id: string): Promise<ActionResult<null>> {
    if (!id) {
        return { success: false, error: 'Document ID is required for deletion.' };
    }
    
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
            .from('updates')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Supabase Admin - Error deleting update:", error);
            return { success: false, error: `Failed to delete update: ${error.message}` };
        }

        revalidatePath('/updates');
        revalidatePath('/admin/updates');
        return { success: true, data: null };
    } catch (e: any) {
        console.error("Supabase Admin - Unexpected error deleting update:", e);
        return { success: false, error: `An unexpected error occurred: ${e.message}` };
    }
}
