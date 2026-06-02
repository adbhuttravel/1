
"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Turnstile } from "@marsidev/react-turnstile";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { submitContactForm } from "@/lib/actions";
import { contactFormSchema } from "@/lib/schemas";
import { Loader2, CheckCircle } from "lucide-react";

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<{ success: boolean; message: string }>({ success: false, message: "" });
  const turnstileRef = useRef<any>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: ContactFormData) => {
    if (!turnstileToken) {
      setFormStatus({ success: false, message: "Please complete the security check." });
      return;
    }
    setFormStatus({ success: false, message: "" });
    const result = await submitContactForm(data, turnstileToken);
    setFormStatus({ success: result.success, message: result.message });
    if (result.success) {
      form.reset();
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };


  return (
    <Card className="p-4 sm:p-6 lg:p-8 shadow-2xl bg-secondary/30">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Booking Inquiry" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us more about your travel plans..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-center py-2">
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken(null)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>

            {formStatus.message && (
              formStatus.success ? (
                <div className="flex items-center gap-2 text-green-600 font-medium p-3 bg-green-100 rounded-md">
                   <CheckCircle className="h-5 w-5" />
                   <p>{formStatus.message}</p>
                </div>
              ) : (
                <p className="text-sm font-medium text-destructive">{formStatus.message}</p>
              )
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
