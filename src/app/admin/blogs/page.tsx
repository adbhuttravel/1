
'use client';

// NOTE: This is a placeholder for the blog admin page.
// The full rich text editor will be implemented in the next step.

import { useState, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { getBlogs, createBlog, updateBlog, deleteBlog } from './actions';
import { BlogPost } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminBlogsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');
  const [coverImageUrl, setCoverImageUrl] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "adbhutadmin";

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError('');
    const result = await getBlogs();
    if (result.success && result.data) {
      setBlogs(result.data);
    } else {
      setError(result.error || "Failed to fetch blogs.");
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    if(isAuthenticated) {
        fetchBlogs();
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password.');
    }
  };
  
  const resetForm = () => {
    setTitle('');
    setContent('');
    setStatus('draft');
    setCoverImageUrl('');
    setEditingId(null);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }
    setError('');

    startTransition(async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('status', status);
        formData.append('cover_image_url', coverImageUrl);

        let result;
        if (editingId) {
            formData.append('id', editingId);
            result = await updateBlog(formData);
        } else {
            result = await createBlog(formData);
        }

        if (result.success) {
            resetForm();
            await fetchBlogs();
        } else {
            setError(result.error || "An unknown error occurred.");
        }
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setStatus(post.status);
    setCoverImageUrl(post.cover_image_url || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
       setError('');
       startTransition(async () => {
            const result = await deleteBlog(id);
            if (result.success) {
                await fetchBlogs();
            } else {
                setError(result.error || "Failed to delete blog post.");
            }
       });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-24 flex justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">Admin Access - Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full"
                />
                {error && <p className="text-destructive text-sm mt-2">{error}</p>}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Admin - Manage Blogs</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Post Title"
                required
              />
            </div>
             <div>
              <label htmlFor="coverImageUrl" className="block text-sm font-medium mb-1">
                Cover Image URL
              </label>
              <Input
                id="coverImageUrl"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Content (Placeholder - will be replaced with rich text editor)
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your blog post here..."
                rows={15}
                required
              />
            </div>
             <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">
                Status
              </label>
               <Select value={status} onValueChange={(value) => setStatus(value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm} disabled={isPending}>
                Cancel Edit
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {editingId ? 'Updating...' : 'Saving...'}
                </>
              ) : (
                <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {editingId ? 'Update Post' : 'Save Post'}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      {error && <p className="text-destructive p-4 bg-destructive/10 rounded-md mb-4">{error}</p>}

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Existing Blog Posts</h2>
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
             <Loader2 className="h-5 w-5 animate-spin" />
             <span>Loading posts...</span>
          </div>
        ) : blogs.length === 0 ? (
          <p>No blog posts found. Start by creating one above.</p>
        ) : (
          blogs.map((post) => (
            <Card key={post.id} className="flex flex-col sm:flex-row justify-between items-start p-4">
                <div className="flex-grow mb-4 sm:mb-0 sm:mr-4">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                        Status: <span className="font-medium capitalize">{post.status}</span> | Created: {post.created_at ? new Date(post.created_at).toLocaleDateString('en-IN') : 'N/A'}
                    </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(post)} disabled={isPending}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)} disabled={isPending}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
