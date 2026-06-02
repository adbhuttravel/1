import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Planner",
  description: "The Adbhut Travel AI Planner feature is temporarily unavailable while we make improvements. Please check back later for an enhanced experience.",
};

export default function PlannerPage() {
  return (
    <div className="container py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-headline font-bold">AI Planner Temporarily Unavailable</h1>
      <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
        We are currently working on improving this feature to provide you with an even better experience. Please check back later.
      </p>
    </div>
  );
}
