import { getThemeCategories } from "@/lib/theme-flyers";
import ThemeCategoryRow from "@/components/home/ThemeCategoryRow";

export default function ThemeCategories({ id }: { id?: string }) {
  const categories = getThemeCategories();
  if (categories.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-background py-12 md:py-24">
      <div className="container">
        <h2 className="mb-2 text-center font-headline text-3xl font-bold md:text-4xl">
          Explore Our Travel Themes
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          From quick getaways to once-in-a-lifetime journeys — browse every
          category, with our most popular destinations first.
        </p>

        <div className="space-y-14 md:space-y-20">
          {categories.map((category, i) => (
            <ThemeCategoryRow
              key={category.slug}
              category={category}
              delay={3500 + i * 600}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
