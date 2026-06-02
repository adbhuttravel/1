
"use server";

import { z } from 'zod';
import { Resend } from 'resend';
import { contactFormSchema, miceFormSchema, tailoredTripFormSchema, termsOfServiceSchema, newsletterFormSchema } from "./schemas";
import { verifyTurnstileToken } from './turnstile';

const RESEND_FROM_EMAIL = 'info@adbhuttravel.com';
const ADMIN_BCC_EMAIL = 'ankitsundriyal0@gmail.com';
const ADMIN_CC_EMAIL = 'info@adbhuttravel.in';
const RESEND_AUDIENCE_ID = 'd8a19341-0c10-4079-a611-823eb5d289d0';

type ContactFormState = {
  message: string;
  success: boolean;
};

export async function subscribeToNewsletter(
  data: z.infer<typeof newsletterFormSchema>,
  turnstileToken: string
): Promise<ContactFormState> {

  const isVerified = await verifyTurnstileToken(turnstileToken);
  if (!isVerified) {
    return {
      message: "Security check failed. Please refresh and try again.",
      success: false,
    };
  }

  if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key is not configured.");
      return {
          message: "The form is not configured. Please contact support.",
          success: false,
      }
  }

  const { email } = data;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.contacts.create({
      email: email,
      audienceId: RESEND_AUDIENCE_ID,
      unsubscribed: false,
    });

    return {
      message: "Thank you for subscribing!",
      success: true,
    };

  } catch (error: any) {
    console.error("Failed to subscribe email:", error);
    // Handle cases where the email already exists
    if (error.name === 'validation_error' && error.message.includes('already exists')) {
       return {
            message: "This email is already subscribed.",
            success: false,
       };
    }
    return {
      message: "Something went wrong. Please try again later.",
      success: false,
    };
  }
}

export async function submitContactForm(
  data: z.infer<typeof contactFormSchema>,
  turnstileToken: string
): Promise<ContactFormState> {
  
  const isVerified = await verifyTurnstileToken(turnstileToken);
  if (!isVerified) {
    return {
      message: "Security check failed. Please refresh and try again.",
      success: false,
    };
  }

  if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key is not configured.");
      return {
          message: "The form is not configured to send emails. Please contact support.",
          success: false,
      }
  }

  const { name, email, subject, message } = data;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: email, // Send to the customer
      cc: ADMIN_CC_EMAIL,
      bcc: ADMIN_BCC_EMAIL,
      reply_to: email,
      subject: `Re: ${subject} - Thank You for Contacting Adbhut Travel`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <h1>Thank You For Your Message!</h1>
          <p>Hello ${name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p>Here is a copy of your message for your records:</p>
          <hr>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr>
          <p>Best regards,</p>
          <p>The Adbhut Travel Team</p>
        </body>
        </html>
      `,
    });


    return {
      message: "Your message has been sent successfully!",
      success: true,
    };

  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      message: "Something went wrong. Please try again later.",
      success: false,
    };
  }
}

type MiceFormState = {
    message: string;
    success: boolean;
};

export async function submitMiceForm(
  data: z.infer<typeof miceFormSchema>,
  turnstileToken: string
): Promise<MiceFormState> {

  const isVerified = await verifyTurnstileToken(turnstileToken);
  if (!isVerified) {
    return {
      message: "Security check failed. Please refresh and try again.",
      success: false,
    };
  }

  if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key is not configured.");
      return {
          message: "The form is not configured to send emails. Please contact support.",
          success: false,
      }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const formDetailsHtml = `
      <h2>MICE Inquiry Details</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.countryCode} ${data.phone}</p>
      <p><strong>Month of Travel:</strong> ${data.monthOfTravel}</p>
      <p><strong>Number of Guests:</strong> ${data.guests}</p>
      <p><strong>Destinations:</strong> ${data.destinations || 'N/A'}</p>
      <p><strong>Hotel Category:</strong> ${data.hotelCategory}</p>
      <p><strong>Hotel Type:</strong> ${data.hotelType}</p>
      <p><strong>Service Required:</strong> ${data.serviceRequired || 'N/A'}</p>
      <p><strong>Additional Info:</strong> ${data.additionalInfo || 'N/A'}</p>
    `;

    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: data.email, // Send to the customer
      cc: ADMIN_CC_EMAIL,
      bcc: ADMIN_BCC_EMAIL,
      reply_to: data.email,
      subject: 'Your MICE Corporate Travel Inquiry with Adbhut Travel',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <h1>Thank You for Your MICE Inquiry!</h1>
          <p>Hello ${data.firstName},</p>
          <p>We have received your MICE inquiry and our event specialists will be in touch with you shortly. We look forward to helping you plan a successful event.</p>
          <p>Here is a summary of your request:</p>
          <hr>
          ${formDetailsHtml}
          <hr>
          <p>Best regards,</p>
          <p>The Adbhut Travel Team</p>
        </body>
        </html>
      `,
    });


    return {
      message: "Your message has been sent successfully! We will get back to you shortly.",
      success: true,
    };

  } catch (error) {
    console.error("Failed to send MICE email:", error);
    return {
      message: "Something went wrong. Please try again later.",
      success: false,
    };
  }
}


type TailoredTripFormState = {
  message: string;
  success: boolean;
};

export async function submitTailoredTripForm(
  data: z.infer<typeof tailoredTripFormSchema>,
  turnstileToken: string
): Promise<TailoredTripFormState> {

  const isVerified = await verifyTurnstileToken(turnstileToken);
  if (!isVerified) {
    return {
      message: "Security check failed. Please refresh and try again.",
      success: false,
    };
  }

  if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key is not configured.");
      return {
          message: "The form is not configured to send emails. Please contact support.",
          success: false,
      }
  }

  const { destination, startDate, endDate, adults, kids, email, mobile, otherInclusion, comments, inclusions } = data;
  
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const formDetailsHtml = `
      <p><strong>Destination:</strong> ${destination || 'Not provided'}</p>
      <p><strong>Start Date:</strong> ${startDate ? startDate.toDateString() : 'Not provided'}</p>
      <p><strong>End Date:</strong> ${endDate ? endDate.toDateString() : 'Not provided'}</p>
      <p><strong>Adults:</strong> ${adults || 'Not provided'}</p>
      <p><strong>Kids:</strong> ${kids || '0'}</p>
      <p><strong>Inclusions:</strong></p>
      <ul>
        ${inclusions?.map(i => `<li>${i}</li>`).join('') || '<li>None selected</li>'}
        ${otherInclusion ? `<li><strong>Other:</strong> ${otherInclusion}</li>` : ''}
      </ul>
      <p><strong>Comments:</strong> ${comments || 'None'}</p>
      <hr>
      <p><strong>Contact Email:</strong> ${email || 'Not provided'}</p>
      <p><strong>Contact Mobile:</strong> ${mobile || 'Not provided'}</p>
    `;

    // Send confirmation to customer if email is provided
    if (email) {
        await resend.emails.send({
            from: RESEND_FROM_EMAIL,
            to: email,
            cc: ADMIN_CC_EMAIL,
            bcc: ADMIN_BCC_EMAIL,
            subject: 'Your Adbhut Travel Custom Trip Request',
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8">
              </head>
              <body>
                <h1>Thank You for Your Custom Trip Request!</h1>
                <p>Hello,</p>
                <p>We've received your request and our travel experts are already looking into it. We will get back to you shortly with a personalized plan.</p>
                <p>Here's a summary of the details you provided:</p>
                <hr>
                ${formDetailsHtml}
                <br>
                <p>Best regards,</p>
                <p>The Adbhut Travel Team</p>
              </body>
              </html>
            `,
        });
    } else {
         // Send notification to the admins if no customer email is provided
        await resend.emails.send({
          from: RESEND_FROM_EMAIL,
          to: ADMIN_CC_EMAIL, // Send directly to the main business inbox
          bcc: ADMIN_BCC_EMAIL,
          subject: 'New Custom Trip Request (No Customer Email)',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
            </head>
            <body>
              <h1>New Custom Trip Request</h1>
              <p>A new custom trip request has been submitted via the website. No customer email was provided.</p>
              <hr>
              ${formDetailsHtml}
            </body>
            </html>
          `
        });
    }

    return {
      message: "Your request has been sent! We will contact you shortly.",
      success: true,
    };

  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return {
      message: "Something went wrong and we couldn't send your request. Please try again later.",
      success: false,
    };
  }
}

type TermsFormState = {
  message: string;
  success: boolean;
};

export async function submitTermsOfServiceForm(
  data: z.infer<typeof termsOfServiceSchema>,
  turnstileToken: string
): Promise<TermsFormState> {

  const isVerified = await verifyTurnstileToken(turnstileToken);
  if (!isVerified) {
    return {
      message: "Security check failed. Please refresh and try again.",
      success: false,
    };
  }

  if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key is not configured.");
      return {
          message: "The form is not configured to send emails. Please contact support.",
          success: false,
      }
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const documentHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Terms and Conditions Agreement</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #ffffff; }
        .wrapper { max-width: 800px; margin: 0 auto; background-color: #ffffff; }
        .container { padding: 20px; border: 1px solid #eee; }
        .logo { max-width: 188px; margin-bottom: 20px; }
        h1, h2, h3 { color: #222; }
        hr { border: 0; border-top: 1px solid #eee; margin: 20px 0; }
        .question-block { margin-top: 20px; }
        .question { font-weight: bold; }
        .answer { color: #555; white-space: pre-wrap; word-break: break-word; }
        .terms-header {
          background-color: #468585;
          color: white;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 8px;
          font-family: serif;
        }
        .terms-header h2 { color: white; margin: 0; }
        .details-header {
          background-color: #f2f2f2;
          padding: 10px;
          text-align: center;
          font-weight: bold;
          margin-top: 20px;
        }
        .details-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        .details-table td {
          padding: 8px;
          border: 1px solid #ddd;
        }
        .details-table td:first-child {
          font-weight: bold;
          width: 40%;
        }
        .terms-list { list-style-position: outside; padding-left: 20px; color: #555; }
        .important { font-weight: bold; color: #000; }
        .footer-table { width: 100%; background-color: #f3ece7; color: #343a40; padding: 32px 16px; border-top: 1px solid #dee2e6; margin-top: 32px; }
        .footer-content { max-width: 1200px; margin: 0 auto; }
        .footer-logo { width: 150px; height: auto; margin-bottom: 1rem; }
        .footer-links-table { width: 100%; }
        .footer-links-table td { vertical-align: top; padding-right: 16px; width: 25%; }
        .footer-links-table h3 { font-weight: 600; margin: 0 0 1rem 0; font-family: serif; }
        .footer-links-table ul { list-style: none; padding: 0; margin: 0; font-size: 0.875rem; }
        .footer-links-table ul li { margin-bottom: 8px; }
        .footer-links-table a { color: #6c757d; text-decoration: none; }
        .copyright { text-align: center; padding-top: 32px; border-top: 1px solid #dee2e6; margin-top: 32px; font-size: 0.875rem; color: #6c757d; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <img src="https://adbhuttravel.in/images/services/adbhut-logo.png" alt="Adbhut Travel Logo" class="logo">
          <p>By "Adbhut Travel And Event Pvt Ltd" before giving you our service, we have some terms and conditions, you are requested to read them carefully and if you accept these terms and conditions, only then we will be able to serve you.
          <br>
          "अद्भुत ट्रैवल एंड इवेंट प्राइवेट लिमिटेड" के द्वारा, आपको अपनी सर्विस देने के लिए हमारी कुछ नियम और शर्तें हैं, आपसे अनुरोध है की इन्हे धयानपूर्व पढ़े और यदि आप इन नियमों और शर्तों को स्वीकार करते हैं, तो ही हम आपको अपनी सेवा दे पाएंगे।
          </p>
          <div class="terms-header">
            <h2>Terms & Conditions</h2>
            <h2>नियम एवं शर्तें</h2>
          </div>
          <ol class="terms-list">
            <li>The visa will be decided by the embassy, if your visa is refused, we will not be responsible. (वीज़ा का निर्णय दूतावास द्वारा दिया जाएगा, यदि आपका वीज़ा रद्द होता है, तो ज़िम्मेदारी हमारी नहीं होगी।)</li>
            <li>Visa fee and our service fee will not be refunded in case of visa rejection. (वीज़ा अस्वीकृति के मामले में वीज़ा शुल्क और हमारी सेवा शुल्क वापस नहीं किया जाएगा।)</li>
            <li>The documents provided by you are genuine, no fraud or forgery has been done by any party, If any fraud is found in them then it will be your responsibility and legal action will be taken against you. (आपके द्वारा उपलब्ध कराए गए दस्तावेज वास्तविक हैं, किसी भी पक्ष द्वारा कोई धोखाधड़ी या जालसाजी नहीं की गई है, यदि उनमें कोई धोखाधड़ी पाई जाती है तो इसकी जिम्मेदारी आपकी होगी और आपके खिलाफ कानूनी कार्रवाई की जाएगी।)</li>
            <li><span class="important">Very important:</span> When applying for a visa, please keep in mind that if you have booked a travel services such Tour Package/Flight/Hotel etc before the visa decision, and if your visa gets refused, the risk of trail expenses will be your own. (<span class="important">बहुत महत्वपूर्ण:</span> वीजा के लिए आवेदन करते समय, कृपया ध्यान रखें कि यदि आपने वीजा निर्णय से पहले यात्रा पैकेज जैसे टूर पैकेज / फ्लाइट / होटल आदि की बुकिंग की है, और यदि आपका वीसा रद्द हो जाता है, तो खर्च का जोखिम आपका खुद का होगा।)</li>
            <li>If a person going to international or domestic destination has any problem like illness or any problem, then we will not have any responsibility. (अगर अंतरराष्ट्रीय या घरेलू गंतव्य पर जाने वाले व्यक्ति को कोई समस्या जैसे बीमारी या कोई समस्या होती है, तो किसी भी तरह की जिम्मेदारी हमारी नहीं होगी।)</li>
            <li>We have provided you with a travel service and if you have the remaining amount, we have the right to cancel your existing booking. (हमने आपको एक यात्रा सेवा प्रदान की है और यदि आपके द्वारा राशि शेष है, तो हमें आपकी मौजूदा बुकिंग रद्द करने का अधिकार है।)</li>
            <li>If you are booking travel services for any other person, then it will be your duty to tell him about this term and condition. (अगर आप किसी अन्य व्यक्ति के लिए हमसे ट्रैवल सर्विसेज बुक करवा रहे हैं तो उसको इस टर्म एंड कंडीशन के बारे में बताना आपका फर्ज होगा।)</li>
          </ol>
          <hr/>
          <div class="question-block">
            <p class="question">Q 1. You are taking this service for yourself or for for someone else (आप यह सर्विस खुद के लिए ले रहे हैं या किसी और के लिए)?</p>
            <p class="answer">${data.serviceFor === 'self' ? 'For Myself (मेरे लिए)' : `For Someone else (${data.relationship})`}</p>
          </div>
          <div class="question-block">
            <p class="question">Q 2. Is there any legal case or lawsuit pending against the applicant or his/her accompaniment? (क्या आवेदक या उसके साथी के विरुद्ध कोई कानूनी मामला या वाद लंबित है)?</p>
            <p class="answer">${data.legalCase === 'no' ? 'No (नहीं)' : `Yes (${data.legalCaseDetails})`}</p>
          </div>
          <div class="question-block">
            <p class="question">Q 3. Do you confirm that the documents you have submitted to us are genuine (क्या आप इस बात की पुष्टि करते हैं कि आपके द्वारा हमें प्रस्तुत किए गए दस्तावेज वास्तविक हैं)?</p>
            <p class="answer">${data.docsGenuine}</p>
          </div>
          <div class="question-block">
            <p class="question">Q 4. Have you given your original passport or any other original documents to Adbhut Travel And Event Pvt Ltd or its staff? (क्या आपने अपना मूल पासपोर्ट या कोई अन्य मूल दस्तावेज अद्भुत ट्रैवल एंड इवेंट प्राइवेट लिमिटेड या उसके कर्मचारियों को दिया है)?</p>
            <p class="answer">${data.originalDocsGiven}</p>
          </div>
          <div class="details-header">Details of the traveler who will travel (यात्रा करने वाले यात्री का विवरण)</div>
          <table class="details-table">
            <tr><td>Passenger and passport details</td><td class="answer">${data.passengerDetails}</td></tr>
            <tr><td>Description of travel service</td><td class="answer">${data.travelServiceDescription}</td></tr>
            <tr><td>Total fee per person including service charge (in Indian Rupees)</td><td class="answer">${data.totalFee}</td></tr>
          </table>
          <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
              <h3>Certification:</h3>
              <p class="answer">☑️ I hereby certify that I have read the complete terms and conditions and we accept these terms and conditions and if any of my statements is false then legal action should be taken against me.
              <br>(मैं प्रमाणित करता/करती हु कि मैंने पूरे नियम और शर्तें पढ़ ली हैं और में इन नियम और शर्तें को स्वीकार करता /करती हु और अगर मेरा कोई भी बयान झूठा साबित होता है तो मेरे खिलाफ कानूनी कार्रवाई की जानी चाहिए।)</p>
          </div>
          <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; text-align: right;">
              <p><strong>Signature (हस्ताक्षर):</strong> ${data.signature}</p>
              <p><strong>Place:</strong> ${data.place}</p>
              <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
        <table class="footer-table" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center">
              <div class="footer-content">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr><td align="center" style="padding-bottom: 32px;"><img src="https://adbhuttravel.in/images/services/Home/Adbhut-Affilications-Cetifications.png" alt="Certifications" style="max-width: 100%; height: auto;" /></td></tr>
                  <tr>
                    <td>
                      <table class="footer-links-table" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <img src="https://adbhuttravel.in/images/services/adbhut-logo.png" alt="Adbhut Logo" class="footer-logo" />
                            <p style="font-weight: 600; margin: 0;">Adbhut Travel And Event Pvt. Ltd.</p>
                            <p style="font-size: 0.875rem; color: #6c757d; margin: 0;">Our Effort Your Comfort<br>CIN: U63090HR2020PTC086874</p>
                          </td>
                          <td>
                            <h3>Quick Links</h3>
                            <ul>
                              <li><a href="https://adbhuttravel.com/about">About Us</a></li>
                              <li><a href="https://adbhuttravel.com/services">Services</a></li>
                              <li><a href="https://adbhuttravel.com/mice">MICE</a></li>
                              <li><a href="https://adbhuttravel.com/contact">Contact Us</a></li>
                            </ul>
                          </td>
                          <td>
                            <h3>Legal</h3>
                            <ul>
                              <li><a href="https://adbhuttravel.com/terms-of-service">Policy & Terms of Service</a></li>
                              <li><a href="https://adbhuttravel.com/cancellation-policy">Refund Policy</a></li>
                              <li><a href="https://adbhuttravel.com/legal">Legal Information</a></li>
                              <li><a href="https://adbhuttravel.com/career">Careers</a></li>
                            </ul>
                          </td>
                          <td>
                            <h3>Contact</h3>
                            <ul style="color: #6c757d;">
                              <li style="margin-bottom: 12px;">📍 SCF 61, 1st Floor, Near Anaj Mandi Gate, Pehowa, Kurukshetra, Haryana-136128</li>
                              <li style="margin-bottom: 12px;">📞 <a href="tel:18008905147">Toll Free: 1800 890 5147</a><br>&nbsp;&nbsp;&nbsp;&nbsp; <a href="tel:+919671825147">Mobile: +91-9671825147</a></li>
                              <li>✉️ <a href="mailto:info@adbhuttravel.in">info@adbhuttravel.in</a></li>
                            </ul>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr><td class="copyright">&copy; ${new Date().getFullYear()} Adbhut Travel And Event Pvt. Ltd. All Rights Reserved.</td></tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
  `;
  
  try {
    // Send confirmation email to customer, CC admin
    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: data.email,
      cc: ADMIN_CC_EMAIL,
      bcc: ADMIN_BCC_EMAIL,
      subject: `Your Signed Terms & Conditions with Adbhut Travel - ${data.name}`,
      html: documentHtml,
    });

    return {
      message: "Agreement submitted successfully! A copy has been sent to your email.",
      success: true,
    };
  } catch (error) {
    console.error("Failed to send terms of service email:", error);
    return {
      message: "An error occurred while submitting the agreement. Please try again.",
      success: false,
    };
  }
}
