
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, CheckCircle } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { termsOfServiceSchema } from "@/lib/schemas";
import { submitTermsOfServiceForm } from "@/lib/actions";

const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`py-4 ${className}`}>{children}</div>
);

const Question = ({ number, text, hindiText, children }: { number?: string, text: string, hindiText: string, children?: React.ReactNode }) => (
    <div className="mt-4">
        <p className="font-semibold text-sm md:text-base">{number ? `Q ${number}. ` : ''}{text} ({hindiText})?</p>
        <div className="mt-2 space-y-2 text-sm md:text-base">{children}</div>
    </div>
);

type FormData = z.infer<typeof termsOfServiceSchema>;

export default function TermsOfServicePage() {
    const [formStatus, setFormStatus] = useState<{ success: boolean; message: string }>({ success: false, message: "" });
    const turnstileRef = useRef<any>(null);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(termsOfServiceSchema),
        defaultValues: {
            serviceFor: "self",
            relationship: "",
            legalCase: "no",
            legalCaseDetails: "",
            docsGenuine: "yes",
            originalDocsGiven: "no",
            passengerDetails: "",
            travelServiceDescription: "",
            totalFee: "",
            certify: false,
            name: "",
            email: "",
            mobile: "",
            idNumber: "",
            address: "",
            signature: "",
            place: "",
            date: undefined,
        },
    });

    useEffect(() => {
        // Set date only on the client to avoid hydration mismatch
        form.setValue('date', new Date());
    }, [form]);

    const { isSubmitting } = form.formState;

    async function onSubmit(data: FormData) {
        if (!turnstileToken) {
            setFormStatus({ success: false, message: "Please complete the security check." });
            return;
        }
        setFormStatus({ success: false, message: "" });
        const result = await submitTermsOfServiceForm(data, turnstileToken);
        setFormStatus(result);
        if (result.success) {
            form.reset();
            turnstileRef.current?.reset();
            setTurnstileToken(null);
        }
    }

    const watchServiceFor = form.watch('serviceFor');
    const watchLegalCase = form.watch('legalCase');

    return (
        <div className="container py-12 md:py-16 select-none">
            <div className="max-w-4xl mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="border p-4 sm:p-6 md:p-8 space-y-6 bg-card text-card-foreground shadow-lg rounded-lg">
                        <div className="flex justify-end mb-8">
                            <Logo />
                        </div>
                        <Section>
                            <p className="text-center text-muted-foreground text-sm md:text-base">
                                By "Adbhut Travel And Event Pvt Ltd" before giving you our service, we have some terms and conditions, you are requested to read them carefully and if you accept these terms and conditions, only then we will be able to serve you.
                                <br />
                                "अद्भुत ट्रैवल एंड इवेंट प्राइवेट लिमिटेड" के द्वारा, आपको अपनी सर्विस देने के लिए हमारी कुछ नियम और शर्तें हैं, आपसे अनुरोध है की इन्हे धयानपूर्व पढ़े और यदि आप इन नियमों और शर्तों को स्वीकार करते हैं, तो ही हम आपको अपनी सेवा दे पाएंगे।
                            </p>
                        </Section>

                        <div className="text-center bg-[#468585] text-white py-3 rounded-md flex justify-between items-center px-6">
                            <h1 className="font-headline text-xl md:text-2xl font-bold">Terms & Conditions</h1>
                             <h1 className="font-headline text-xl md:text-2xl font-bold">नियम एवं शर्तें</h1>
                        </div>

                        <ol className="list-decimal list-outside space-y-4 pl-6 text-muted-foreground text-sm md:text-base">
                            <li>The visa will be decided by the embassy, if your visa is refused, we will not be responsible. (वीज़ा का निर्णय दूतावास द्वारा दिया जाएगा, यदि आपका वीज़ा रद्द होता है, तो ज़िम्मेदारी हमारी नहीं होगी।)</li>
                            <li>Visa fee and our service fee will not be refunded in case of visa rejection. (वीज़ा अस्वीकृति के मामले में वीज़ा शुल्क और हमारी सेवा शुल्क वापस नहीं किया जाएगा।)</li>
                            <li>The documents provided by you are genuine, no fraud or forgery has been done by any party, If any fraud is found in them then it will be your responsibility and legal action will be taken against you. (आपके द्वारा उपलब्ध कराए गए दस्तावेज वास्तविक हैं, किसी भी पक्ष द्वारा कोई धोखाधड़ी या जालसाजी नहीं की गई है, यदि उनमें कोई धोखाधड़ी पाई जाती है तो इसकी जिम्मेदारी आपकी होगी और आपके खिलाफ कानूनी कार्रवाई की जाएगी।)</li>
                            <li><span className="font-bold text-foreground">Very important:</span> When applying for a visa, please keep in mind that if you have booked a travel services such Tour Package/Flight/Hotel etc before the visa decision, and if your visa gets refused, the risk of trail expenses will be your own. (<span className="font-bold text-foreground">बहुत महत्वपूर्ण:</span> वीजा के लिए आवेदन करते समय, कृपया ध्यान रखें कि यदि आपने वीजा निर्णय से पहले यात्रा पैकेज जैसे टूर पैकेज / फ्लाइट / होटल आदि की बुकिंग की है, और यदि आपका वीसा रद्द हो जाता है, तो खर्च का जोखिम आपका खुद का होगा।)</li>
                            <li>If a person going to international or domestic destination has any problem like illness or any problem, then we will not have any responsibility. (अगर अंतरराष्ट्रीय या घरेलू गंतव्य पर जाने वाले व्यक्ति को कोई समस्या जैसे बीमारी या कोई समस्या होती है, तो किसी भी तरह की जिम्मेदारी हमारी नहीं होगी।)</li>
                            <li>We have provided you with a travel service and if you have the remaining amount, we have the right to cancel your existing booking. (हमने आपको एक यात्रा सेवा प्रदान की है और यदि आपके द्वारा राशि शेष है, तो हमें आपकी मौजूदा बुकिंग रद्द करने का अधिकार है।)</li>
                            <li>If you are booking travel services for any other person, then it will be your duty to tell him about this term and condition. (अगर आप किसी अन्य व्यक्ति के लिए हमसे ट्रैवल सर्विसेज बुक करवा रहे हैं तो उसको इस टर्म एंड कंडीशन के बारे में बताना आपका फर्ज होगा।)</li>
                        </ol>

                        <Question number="1" text="You are taking this service for yourself or for someone else" hindiText="आप यह सर्विस खुद के लिए ले रहे हैं या किसी और के लिए">
                           <FormField
                                control={form.control}
                                name="serviceFor"
                                render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex flex-col space-y-2"
                                    >
                                        <Label className="flex items-center space-x-3 space-y-0 p-2 border rounded-md hover:bg-muted/50 cursor-pointer w-full">
                                            <FormControl>
                                                <RadioGroupItem value="self" />
                                            </FormControl>
                                            <span className="font-normal">For Myself (मेरे लिए)</span>
                                        </Label>
                                         <Label className="flex items-center space-x-3 space-y-0 p-2 border rounded-md hover:bg-muted/50 cursor-pointer w-full">
                                            <FormControl>
                                                <RadioGroupItem value="other" />
                                            </FormControl>
                                            <span className="font-normal">For Someone else (किसी और के लिए)</span>
                                        </Label>
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            {watchServiceFor === 'other' && (
                                <FormField
                                    control={form.control}
                                    name="relationship"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>If for Someone else, What is your relationship with traveler?</FormLabel>
                                            <FormControl><Input placeholder="e.g., Spouse, Friend" {...field} className="border-input" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </Question>

                        <Question number="2" text="Is there any legal case or lawsuit pending against the applicant or his/her accompaniment" hindiText="क्या आवेदक या उसके साथी के विरुद्ध कोई कानूनी मामला या वाद लंबित है">
                             <FormField
                                control={form.control}
                                name="legalCase"
                                render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex flex-col space-y-2"
                                    >
                                        <Label className="flex items-center space-x-3 space-y-0 p-2 border rounded-md hover:bg-muted/50 cursor-pointer w-full">
                                            <FormControl>
                                                <RadioGroupItem value="no" />
                                            </FormControl>
                                            <span className="font-normal">No (नहीं)</span>
                                        </Label>
                                        <Label className="flex items-center space-x-3 space-y-0 p-2 border rounded-md hover:bg-muted/50 cursor-pointer w-full">
                                            <FormControl>
                                                <RadioGroupItem value="yes" />
                                            </FormControl>
                                            <span className="font-normal">Yes (हाँ)</span>
                                        </Label>
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            {watchLegalCase === 'yes' && (
                                <FormField
                                    control={form.control}
                                    name="legalCaseDetails"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>If Yes, Please explain</FormLabel>
                                            <FormControl><Textarea placeholder="Please provide details of the legal case." {...field} className="border-input" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </Question>
                        
                        <hr className="my-12 border-dashed" />

                        <Question number="3" text="Do you confirm that the documents you have submitted to us are genuine" hindiText="क्या आप इस बात की पुष्टि करते हैं कि आपके द्वारा हमें प्रस्तुत किए गए दस्तावेज वास्तविक हैं">
                            <FormField
                                control={form.control}
                                name="docsGenuine"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                    <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex flex-col space-y-2"
                                    >
                                        <Label className="flex items-center space-x-3 space-y-0 p-2 border rounded-md hover:bg-muted/50 cursor-pointer w-full">
                                            <FormControl>
                                                <RadioGroupItem value="yes" />
                                            </FormControl>
                                            <span className="font-normal">Yes (हाँ)</span>
                                        </Label>
                                         <Label className="flex items-center space-x-3 space-y-0 p-2 border rounded-md hover:bg-muted/50 cursor-pointer w-full">
                                            <FormControl>
                                                <RadioGroupItem value="no" />
                                            </FormControl>
                                            <span className="font-normal">No (नहीं)</span>
                                        </Label>
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </Question>
                        
                        <Section className="border-t border-b py-4">
                            <h2 className="font-bold text-base md:text-lg mb-2">Must Read: (अवश्य पढ़ेंः)</h2>
                            <p className="text-muted-foreground text-sm md:text-base">Please pay attention that <span className="font-bold text-foreground">Adbhut Travel And Event Pvt Ltd</span> or its staff never demands any original passport. (कृपया ध्यान दें कि "<span className="font-bold text-foreground">अद्भुत ट्रैवल एंड इवेंट प्राइवेट लिमिटेड</span>" या इसके कर्मचारी कभी भी किसी से मूल पासपोर्ट की मांग नहीं करते हैं।)</p>
                            <p className="mt-2 text-muted-foreground text-sm md:text-base">Nor do we keep anyone's passport with us. Please do not ask <span className="font-bold text-foreground">Adbhut Travel And Event Pvt Ltd</span> or any of its staff to submit your old or new passport. Your passport is not our responsibility. (न ही हम किसी का पासपोर्ट अपने पास रखते हैं। कृपया '<span className="font-bold text-foreground">अद्भुत ट्रैवल एंड इवेंट प्राइवेट लिमिटेड</span>" या इसके किसी भी कर्मचारी से अपना पुराना या नया पासपोर्ट जमा करने के लिए न कहें। आपका पासपोर्ट हमारी जिम्मेदारी नहीं है।)</p>
                        </Section>

                        <Question number="4" text="Have you given your original passport or any other original documents to Adbhut Travel And Event Pvt Ltd or its staff?" hindiText="क्या आपने अपना मूल पासपोर्ट या कोई अन्य मूल दस्तावेज अद्भुत ट्रैवल एंड इवेंट प्राइवेट लिमिटेड या उसके कर्मचारियों को दिया है">
                            <FormField
                                control={form.control}
                                name="originalDocsGiven"
                                render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex flex-col space-y-2"
                                    >
                                        <Label className="flex items-center space-x-3 space-y-0 p-2 border rounded-md hover:bg-muted/50 cursor-pointer w-full">
                                            <FormControl>
                                                <RadioGroupItem value="no" />
                                            </FormControl>
                                            <span className="font-normal">No (नहीं)</span>
                                        </Label>
                                        <Label className="flex items-center space-x-3 space-y-0 p-2 border rounded-md hover:bg-muted/50 cursor-pointer w-full">
                                            <FormControl>
                                                <RadioGroupItem value="yes" />
                                            </FormControl>
                                            <span className="font-normal">Yes (हाँ)</span>
                                        </Label>
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </Question>
                        
                        <div className="border rounded-lg text-sm md:text-base">
                            <h2 className="text-base md:text-lg font-bold p-3 bg-gray-100 text-center">Details of the traveler who will travel (यात्रा करने वाले यात्री का विवरण)</h2>
                            <div className="p-4 space-y-4">
                                <FormField control={form.control} name="passengerDetails" render={({ field }) => (<FormItem><FormLabel>Passenger and passport details</FormLabel><FormControl><Textarea {...field} className="border-input" /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="travelServiceDescription" render={({ field }) => (<FormItem><FormLabel>Description of travel service</FormLabel><FormControl><Textarea {...field} className="border-input" /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="totalFee" render={({ field }) => (<FormItem><FormLabel>Total fee per person including service charge (in Indian Rupees)</FormLabel><FormControl><Input {...field} className="border-input" /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                        </div>

                        <Section className="border-t pt-6">
                           <FormField
                                control={form.control}
                                name="certify"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 cursor-pointer">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <span className="font-medium">
                                                    I hereby certify that I have read the complete terms and conditions and we accept these terms and conditions and if any of my statements is false then legal action should be taken against me.
                                                    <br /> (मैं प्रमाणित करता/करती हु कि मैंने पूरे नियम और शर्तें पढ़ ली हैं और में इन नियम और शर्तें को स्वीकार करता /करती हु और अगर मेरा कोई भी बयान झूठा साबित होता है तो मेरे खिलाफ कानूनी कार्रवाई की जानी चाहिए।)
                                                </span>
                                            </div>
                                        </Label>
                                        <FormMessage className="pl-4 pt-1" />
                                    </FormItem>
                                )}
                            />
                        </Section>

                        <div className="border rounded-lg p-4 space-y-4">
                             <div className="grid md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Full Name" {...field} className="border-input" /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email for Confirmation</FormLabel><FormControl><Input type="email" placeholder="email@example.com" {...field} className="border-input" /></FormControl><FormMessage /></FormItem>)} />
                             </div>
                             <div className="grid md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="mobile" render={({ field }) => (<FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input placeholder="Mobile Number" {...field} className="border-input" /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="idNumber" render={({ field }) => (<FormItem><FormLabel>Aadhar Card Number / Any other Govt Id</FormLabel><FormControl><Input placeholder="ID Number" {...field} className="border-input" /></FormControl><FormMessage /></FormItem>)} />
                             </div>
                            <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormLabel>Current Address</FormLabel><FormControl><Textarea placeholder="Full Address" {...field} className="border-input" /></FormControl><FormMessage /></FormItem>)} />
                            <div className="grid md:grid-cols-3 gap-4 pt-4">
                               <FormField control={form.control} name="signature" render={({ field }) => (<FormItem><FormLabel>Signature (Please type your full name)</FormLabel><FormControl><Input placeholder="Signature" {...field} className="border-input" /></FormControl><FormMessage /></FormItem>)} />
                               <FormField control={form.control} name="place" render={({ field }) => (<FormItem><FormLabel>Place</FormLabel><FormControl><Input placeholder="Place" {...field} className="border-input" /></FormControl><FormMessage /></FormItem>)} />
                               <FormField
                                  control={form.control}
                                  name="date"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                      <FormLabel>Date</FormLabel>
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <FormControl>
                                            <Button variant={"outline"} className={cn("pl-3 text-left font-normal border-input", !field.value && "text-muted-foreground")}>
                                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                          </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent>
                                      </Popover>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            {formStatus.message && (
                                <div className={cn("p-3 rounded-md text-center mb-4", formStatus.success ? "bg-green-100 text-green-700" : "bg-destructive/20 text-destructive")}>
                                    {formStatus.message}
                                </div>
                            )}
                            <div className="flex justify-center py-4">
                                <Turnstile
                                    ref={turnstileRef}
                                    siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
                                    onSuccess={(token) => setTurnstileToken(token)}
                                    onExpire={() => setTurnstileToken(null)}
                                />
                            </div>

                            <Button type="submit" className="w-full text-lg" size="lg" disabled={isSubmitting}>
                                {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</> : "Agree & Submit"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

    
