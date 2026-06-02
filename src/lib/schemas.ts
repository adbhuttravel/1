
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export const newsletterFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export const miceFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  countryCode: z.string(),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  monthOfTravel: z.string().optional(),
  guests: z.string().min(1, { message: "Number of guests is required." }),
  destinations: z.string().optional(),
  hotelCategory: z.string().optional(),
  hotelType: z.string().optional(),
  serviceRequired: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export const tailoredTripFormSchema = z.object({
  destination: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  adults: z.string().optional(),
  kids: z.string().optional(),
  inclusions: z.array(z.string()).optional(),
  otherInclusion: z.string().optional(),
  comments: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email." }).optional().or(z.literal('')),
  mobile: z.string().trim().min(10, { message: "Mobile number must be at least 10 digits." })
    .refine(val => /^\d{10,15}$/.test(val), { message: "Please enter a valid mobile number." }),
});

export const termsOfServiceSchema = z.object({
  serviceFor: z.enum(['self', 'other'], { required_error: "You must select an option." }),
  relationship: z.string().optional(),
  legalCase: z.enum(['yes', 'no'], { required_error: "You must select an option." }),
  legalCaseDetails: z.string().optional(),
  docsGenuine: z.enum(['yes', 'no'], { required_error: "You must confirm." }).refine(val => val === 'yes', { message: "You must confirm that documents are genuine." }),
  originalDocsGiven: z.enum(['yes', 'no'], { required_error: "You must select an option." }),
  passengerDetails: z.string().min(1, "This field is required."),
  travelServiceDescription: z.string().min(1, "This field is required."),
  totalFee: z.string().min(1, "This field is required."),
  certify: z.boolean().refine(val => val === true, { message: "You must certify that you have read and accept the terms." }),
  name: z.string().min(2, "Name is required."),
  email: z.string().email("A valid email is required to receive a copy."),
  mobile: z.string().min(10, "A valid mobile number is required."),
  idNumber: z.string().min(5, "A valid ID number is required."),
  address: z.string().min(10, "A valid address is required."),
  signature: z.string().min(2, "Signature (full name) is required."),
  place: z.string().min(2, "Place is required."),
  date: z.date({ required_error: "Date is required." }),
}).superRefine((data, ctx) => {
    if (data.serviceFor === 'other' && !data.relationship) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['relationship'],
            message: 'Relationship is required if service is for someone else.',
        });
    }
    if (data.legalCase === 'yes' && !data.legalCaseDetails) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['legalCaseDetails'],
            message: 'Please provide details about the legal case.',
        });
    }
});
