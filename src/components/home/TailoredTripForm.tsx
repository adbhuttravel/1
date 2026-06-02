
"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, CheckCircle } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { submitTailoredTripForm } from "@/lib/actions";
import { tailoredTripFormSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const inclusionsOptions: { id: string; label: string }[] = [
  { id: 'flight', label: 'Flights' },
  { id: 'hotel', label: 'Accommodation' },
  { id: 'transport', label: 'Transport' },
  { id: 'meals', label: 'Meals' },
  { id: 'sightseeing', label: 'Sightseeing' },
  { id: 'visa', label: 'Visa Assistance' },
  { id: 'other', label: 'Other' },
];

type TailoredTripFormData = z.infer<typeof tailoredTripFormSchema>;

export function TailoredTripForm() {
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<{ success: boolean; message: string }>({ success: false, message: "" });
  const turnstileRef = useRef<any>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  
  const form = useForm<TailoredTripFormData>({
    resolver: zodResolver(tailoredTripFormSchema),
    defaultValues: {
      destination: "",
      adults: "",
      kids: "",
      inclusions: [],
      otherInclusion: "",
      comments: "",
      email: "",
      mobile: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: TailoredTripFormData) => {
    if (!turnstileToken) {
      setFormStatus({ success: false, message: "Please complete the security check." });
      return;
    }
    setFormStatus({ success: false, message: "" });
    const result = await submitTailoredTripForm(data, turnstileToken);
    setFormStatus({ success: result.success, message: result.message });
    if (result.success) {
      form.reset();
      turnstileRef.current?.reset();
      setTurnstileToken(null);
      setTimeout(() => setOpen(false), 2000);
    }
  };
  
  const watchInclusions = form.watch("inclusions", []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="transition-transform duration-300 hover:-translate-y-1">
          Start Planning
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl p-0 flex flex-col max-h-[90vh]">
        <DialogHeader className="p-6 pb-4 border-b shrink-0">
          <DialogTitle className="font-headline">Create Your Custom Trip</DialogTitle>
          <DialogDescription>
            Fill in the details below and our experts will craft a personalized itinerary just for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-grow min-h-0 flex flex-col">
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Paris, France" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start" side="bottom">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start" side="bottom">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                                const startDate = form.getValues("startDate");
                                return startDate ? date <= startDate : date < new Date(new Date().setHours(0,0,0,0));
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="adults"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Adults</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="2" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="kids"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kids (Below 12)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="0" min="0" {...field} />
                            </FormControl>
                             <FormMessage />
                        </FormItem>
                    )}
                    />
              </div>

              <FormField
                control={form.control}
                name="inclusions"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Desired Inclusions</FormLabel>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 rounded-md border p-4">
                        {inclusionsOptions.map((item) => (
                        <FormField
                            key={item.id}
                            control={form.control}
                            name="inclusions"
                            render={({ field }) => {
                            return (
                                <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                            return checked
                                            ? field.onChange([...(field.value || []), item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                    (value) => value !== item.id
                                                )
                                                );
                                        }}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer text-sm">
                                    {item.label}
                                </FormLabel>
                                </FormItem>
                            );
                            }}
                        />
                        ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {watchInclusions?.includes('other') && (
                 <FormField
                    control={form.control}
                    name="otherInclusion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="otherInclusion" className="sr-only">Other inclusion details</FormLabel>
                             <FormControl>
                                <Input placeholder="Please specify other inclusion" {...field} />
                            </FormControl>
                             <FormMessage />
                        </FormItem>
                    )}
                />
              )}
              
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments / Special Requests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information or requests..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Mobile Number <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <DialogFooter className="p-6 pt-4 shrink-0 border-t !mt-0 flex-col gap-2">
                {formStatus.message && (
                    formStatus.success ? (
                        <div className="flex items-center gap-2 text-green-600 font-medium p-3 bg-green-100 rounded-md">
                        <CheckCircle className="h-5 w-5" />
                        <p>{formStatus.message}</p>
                        </div>
                    ) : (
                        <p className="text-sm font-medium text-destructive text-center">{formStatus.message}</p>
                    )
                )}
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
                        Submitting...
                        </>
                    ) : (
                        "Submit Request"
                    )}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
