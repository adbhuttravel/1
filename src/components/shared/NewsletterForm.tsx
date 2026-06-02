
"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Turnstile } from "@marsidev/react-turnstile";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { subscribeToNewsletter } from "@/lib/actions";
import { newsletterFormSchema } from "@/lib/schemas";
import { Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

export function NewsletterForm() {
  const [formStatus, setFormStatus] = useState<{ success: boolean; message: string }>({ success: false, message: "" });
  const turnstileRef = useRef<any>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  
  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: NewsletterFormData) => {
    if (!turnstileToken) {
      setFormStatus({ success: false, message: "Security verification pending. Please try again." });
      return;
    }
    setFormStatus({ success: false, message: "" });
    const result = await subscribeToNewsletter(data, turnstileToken);
    setFormStatus(result);
    if (result.success) {
      form.reset();
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
          onSuccess={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken(null)}
          options={{ size: "invisible" }}
        />
        <div className="flex w-full max-w-sm items-center space-x-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} className="bg-background"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
            </Button>
        </div>
        {formStatus.message && (
          <p className={cn(
            "text-sm font-medium",
            formStatus.success ? "text-green-600 flex items-center gap-2" : "text-destructive"
          )}>
            {formStatus.success && <CheckCircle className="h-4 w-4" />}
            {formStatus.message}
          </p>
        )}
      </form>
    </Form>
  );
}
