import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Read the Refund and Cancellation Policy for Adbhut Travel. Understand the terms for cancelling or modifying your booking.",
};

export default function CancellationPolicyPage() {
  return (
    <div className="container py-12 md:py-16">
        <div className="prose lg:prose-lg max-w-4xl mx-auto">
            <h1 className="font-headline">Refund & Cancellation Policy</h1>
            <p className="lead text-center font-semibold">Adbhut Travel & Event Pvt. Ltd.</p>

            <p>At Adbhut Travel & Event Pvt. Ltd., we are committed to providing transparent and fair policies to ensure a smooth experience for our valued clients. Please carefully review our refund and cancellation terms below:</p>

            <h2 className="font-headline">🔁 General Refund Policy</h2>
            <ul className="list-none p-0 space-y-2">
                <li>• Service Charges, Commission, GST, and Miscellaneous Fees are strictly non-refundable under any circumstances.</li>
                <li>• If any Flight, Hotel, Transport, Visa Fee, Tour Package, or Travel Product is marked non-refundable at the time of booking, no refund will be processed in such cases.</li>
                <li>• All refund requests must be submitted in writing (via email) and are subject to approval based on the terms of the service providers (airlines, hotels, visa agencies, etc.).</li>
            </ul>

            <h2 className="font-headline">❌ Cancellation Policy</h2>
            <ul className="list-none p-0 space-y-2">
                <li>• To initiate any cancellation, the client must notify us in writing.</li>
                <li>• Cancellation charges will be applicable as per the terms of airlines, hotels, and third-party vendors.</li>
                <li>• In addition, our standard service charges for cancellation assistance will be levied and are non-refundable, regardless of refund eligibility.</li>
                <li>• Refunds, if applicable, will be processed within 15–30 working days after receiving the cancellation confirmation from all service partners.</li>
            </ul>

            <h2 className="font-headline">📌 Important Notes</h2>
            <ul className="list-none p-0 space-y-2">
                <li>• In case of force majeure (natural disasters, strikes, political unrest, pandemic lockdowns, etc.), refund decisions will depend on the respective vendor and airline policies.</li>
                <li>• Last-minute cancellations (within 48–72 hours of departure or check-in) may result in 100% cancellation charges.</li>
                <li>• If a customer fails to show up for the trip (No Show), no refund will be applicable.</li>
                <li>• Partial refunds are not applicable for unused services like missed sightseeing, early check-outs, or skipped meals.</li>
                <li>• For group tours, any individual cancellation will be treated separately and may affect group pricing.</li>
            </ul>

            <h2 className="font-headline">💸 Refund Processing</h2>
            <ul className="list-none p-0 space-y-2">
                <li>• Refunds will be made only through the original mode of payment.</li>
                <li>• Any bank charges or transfer fees will be deducted from the refundable amount.</li>
                <li>• The refund process may take longer during high-travel seasons or due to third-party delays.</li>
            </ul>
        </div>
    </div>
  );
}
