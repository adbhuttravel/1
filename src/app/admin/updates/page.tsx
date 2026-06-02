
'use client';

import { useState, useEffect, useTransition, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, PlusCircle, Edit, Trash2, Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3, Pilcrow, Quote, Link2, Underline, Strikethrough, Undo2, Redo2, AlignLeft, AlignCenter, AlignRight, Palette } from 'lucide-react';
import { getUpdates, createUpdate, updateUpdate, deleteUpdate } from './actions';

// Define the shape of a post, ensuring serializable types for the client
export interface UpdatePost {
  id: string;
  title: string;
  content: string;
  created_at: string; // Supabase returns ISO string
  updated_at?: string;
}

const useHistory = (initialState: string) => {
    const [index, setIndex] = useState(0);
    const [history, setHistory] = useState([initialState]);

    const setState = (action: string | ((prevState: string) => string), overwrite = false) => {
        const newState = typeof action === 'function' ? action(history[index]) : action;
        if (overwrite) {
            const historyCopy = [...history];
            historyCopy[index] = newState;
            setHistory(historyCopy);
        } else {
            const updatedHistory = history.slice(0, index + 1);
            setHistory([...updatedHistory, newState]);
            setIndex(updatedHistory.length);
        }
    };
    
    const undo = () => index > 0 && setIndex(prev => prev - 1);
    const redo = () => index < history.length - 1 && setIndex(prev => prev - 1);

    return [history[index], setState, undo, redo, history.length, index] as const;
};


const EditorToolbar = ({ onCommand }: { onCommand: (command: string, value?: string) => void }) => {
    
    const commands: {cmd: string; icon: React.ElementType, title: string, value?:string}[] = [
        { cmd: 'bold', icon: Bold, title: 'Bold' },
        { cmd: 'italic', icon: Italic, title: 'Italic' },
        { cmd: 'underline', icon: Underline, title: 'Underline' },
        { cmd: 'strikeThrough', icon: Strikethrough, title: 'Strikethrough' },
        { cmd: 'createLink', icon: Link2, title: 'Link' },
        { cmd: 'insertUnorderedList', icon: List, title: 'Bulleted List' },
        { cmd: 'insertOrderedList', icon: ListOrdered, title: 'Numbered List' },
        { cmd: 'formatBlock', value:'h1', icon: Heading1, title: 'Heading 1' },
        { cmd: 'formatBlock', value:'h2', icon: Heading2, title: 'Heading 2' },
        { cmd: 'formatBlock', value:'h3', icon: Heading3, title: 'Heading 3' },
        { cmd: 'formatBlock', value:'p', icon: Pilcrow, title: 'Paragraph' },
        { cmd: 'formatBlock', value:'blockquote', icon: Quote, title: 'Blockquote' },
        { cmd: 'align', value: 'left', icon: AlignLeft, title: 'Align Left' },
        { cmd: 'align', value: 'center', icon: AlignCenter, title: 'Align Center' },
        { cmd: 'align', value: 'right', icon: AlignRight, title: 'Align Right' },
        { cmd: 'foreColor', icon: Palette, title: 'Text Color' },
    ];

    return (
        <div className="flex items-center flex-wrap gap-2 rounded-t-md border border-b-0 border-input bg-muted p-1.5">
            <Button type="button" variant="outline" size="icon" onClick={() => onCommand('undo')} title="Undo (Ctrl+Z)">
                <Undo2 className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={() => onCommand('redo')} title="Redo (Ctrl+Y)">
                <Redo2 className="h-4 w-4" />
            </Button>
            <div className="h-6 w-px bg-border mx-1"></div>
            {commands.map(({cmd, icon: Icon, title, value}) => (
                <Button key={title} type="button" variant="outline" size="icon" onClick={() => onCommand(cmd, value)} title={title}>
                    <Icon className="h-4 w-4" />
                </Button>
            ))}
        </div>
    );
};


export default function AdminUpdatesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [updates, setUpdates] = useState<UpdatePost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent, undoContent, redoContent, historyLength, historyIndex] = useHistory('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "adbhutadmin";

  const fetchUpdates = async () => {
    setIsLoading(true);
    setError('');
    const result = await getUpdates();
    if (result.success && result.data) {
      setUpdates(result.data);
    } else {
      setError(result.error || "Failed to fetch updates.");
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    if(isAuthenticated) {
        fetchUpdates();
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
    setContent('', true);
    setEditingId(null);
    setError('');
  };

  const applyTag = (tag: string, value?: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        let newText = "";

        switch(tag) {
            case 'ul':
            case 'ol':
                const listTag = tag === 'ul' ? 'ul' : 'ol';
                const listItems = selectedText.split('\n').map(item => `  <li>${item}</li>`).join('\n');
                newText = `<${listTag}>\n${listItems}\n</${listTag}>`;
                break;
            case 'a':
                const url = prompt("Enter the URL for the link:");
                if (url) {
                    newText = `<a href="${url}" target="_blank" rel="noopener noreferrer">${selectedText || 'Link Text'}</a>`;
                } else {
                    return; // User cancelled prompt
                }
                break;
            case 'align':
                newText = `<p style="text-align: ${value};">${selectedText}</p>`;
                break;
            case 'foreColor':
                const color = prompt("Enter a color name or hex code (e.g., red, #FF0000):");
                if(color) {
                    newText = `<span style="color: ${color};">${selectedText}</span>`;
                } else {
                    return;
                }
                break;
            default:
                newText = `<${tag}>${selectedText}</${tag}>`;
        }

        const updatedContent = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
        setContent(updatedContent);

        setTimeout(() => {
            textarea.focus();
            const newCursorPosition = start + newText.length;
            textarea.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
  };

  const handleEditorCommand = (command: string, value?: string) => {
      if (command === 'undo') return undoContent();
      if (command === 'redo') return redoContent();

      const tagMap: { [key: string]: any } = {
          'bold': 'b', 'italic': 'i', 'underline': 'u', 'strikeThrough': 's',
          'createLink': 'a', 'insertUnorderedList': 'ul', 'insertOrderedList': 'ol',
          'formatBlock': value, 'align': 'align', 'foreColor': 'foreColor',
      };

      const tag = tagMap[command];
      if (tag) {
          if(command === 'align' || command === 'foreColor') {
              applyTag(tag, value);
          } else {
              applyTag(tag);
          }
      }
  };
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey) {
        let handled = true;
        switch (e.key.toLowerCase()) {
            case 'b': handleEditorCommand('bold'); break;
            case 'i': handleEditorCommand('italic'); break;
            case 'u': handleEditorCommand('underline'); break;
            case 'z':
                if (e.shiftKey) { redoContent(); } else { undoContent(); }
                break;
            case 'y': redoContent(); break;
            default: handled = false;
        }
        if (handled) e.preventDefault();
    }
  }, [undoContent, redoContent]);

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

        let result;
        if (editingId) {
            formData.append('id', editingId);
            result = await updateUpdate(formData);
        } else {
            result = await createUpdate(formData);
        }

        if (result.success) {
            resetForm();
            await fetchUpdates();
        } else {
            setError(result.error || "An unknown error occurred.");
        }
    });
  };

  const handleEdit = (post: UpdatePost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content, true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
       setError('');
       startTransition(async () => {
            const result = await deleteUpdate(id);
            if (result.success) {
                await fetchUpdates();
            } else {
                setError(result.error || "Failed to delete update.");
            }
       });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-24 flex justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">Admin Access</CardTitle>
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
      <h1 className="text-3xl font-bold mb-8">Admin - Manage Updates</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Update' : 'Create New Update'}</CardTitle>
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
                placeholder="Update Title"
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Content
              </label>
              <EditorToolbar onCommand={handleEditorCommand} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-input rounded-b-md overflow-hidden">
                <Textarea
                    ref={textareaRef}
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Start writing here..."
                    rows={15}
                    required
                    className="rounded-none border-0 border-r focus-visible:ring-0"
                />
                 <div className="bg-background p-4 prose lg:prose-lg max-w-none w-full h-full overflow-y-auto">
                    <h3 className="text-xs uppercase text-muted-foreground font-semibold tracking-wider border-b pb-2 mb-4">Live Preview</h3>
                     {content ? (
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    ) : (
                        <p className="text-muted-foreground italic">Your content will appear here...</p>
                    )}
                </div>
              </div>
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
                    {editingId ? 'Updating...' : 'Publishing...'}
                </>
              ) : (
                <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {editingId ? 'Update Post' : 'Publish Post'}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      {error && <p className="text-destructive p-4 bg-destructive/10 rounded-md mb-4">{error}</p>}

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Existing Updates</h2>
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
             <Loader2 className="h-5 w-5 animate-spin" />
             <span>Loading updates...</span>
          </div>
        ) : updates.length === 0 ? (
          <p>No updates found. Start by creating one above.</p>
        ) : (
          updates.map((post) => (
            <Card key={post.id} className="flex flex-col sm:flex-row justify-between items-start p-4">
                <div className="flex-grow mb-4 sm:mb-0 sm:mr-4">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                        Published on: {post.created_at ? new Date(post.created_at).toLocaleDateString('en-IN') : 'Date not available'}
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
