
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Opportunities",
  description: "Explore investment opportunities with Adbhut Travel. Information will be available here soon.",
};

export default function InvestmentPage() {
  return (
    <>
      <section className="bg-secondary py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Investment Opportunities</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Information about investment opportunities with Adbhut Travel And Event Pvt. Ltd. will be available here soon. Please check back later for updates.
          </p>
        </div>
      </section>
      <section className="py-16">
         <div className="container text-center">
            <p className="text-muted-foreground">For any immediate inquiries, please contact us at <a href="mailto:invest@adbhuttravel.in" className="text-accent underline">invest@adbhuttravel.in</a>.</p>
         </div>
      </section>
    </>
  );
}
