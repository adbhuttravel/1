import fs from "fs";
import path from "path";

export interface ThemeFlyer {
  src: string;
  alt: string;
}

export interface ThemeCategory {
  slug: string;
  label: string;
  tagline: string;
  flyers: ThemeFlyer[];
}

// Display order + copy for each category. The `dir` matches a folder under
// /public/images/theme-flyers — drop a new PNG into one of those folders and
// it shows up automatically (this reads the directory at request time).
const CATEGORY_META: { dir: string; label: string; tagline: string }[] = [
  {
    dir: "favourite-escapes",
    label: "International Favourite Escapes",
    tagline: "Globe-trotters' most-loved trails.",
  },
  {
    dir: "dream-escapes",
    label: "International Dream Escapes",
    tagline: "Once-in-a-lifetime long-haul journeys.",
  },
  {
    dir: "easy-escapes",
    label: "International Easy Escapes",
    tagline: "Quick, visa-friendly getaways close to home.",
  },
  {
    dir: "visa",
    label: "Visa Services",
    tagline: "Hassle-free visa assistance, handled for you.",
  },
  {
    dir: "domestic",
    label: "Domestic",
    tagline: "Explore Incredible India, end to end.",
  },
];

// File slugs that don't prettify cleanly on their own.
const NAME_OVERRIDES: Record<string, string> = {
  nz: "New Zealand",
  "new-zealand": "New Zealand",
  uk: "United Kingdom",
  "uk-cat": "United Kingdom",
  usa: "USA",
  "dubai-pkg": "Dubai",
  "schengen-visa": "Schengen Visa",
  jaselmer: "Jaisalmer",
  ladhak: "Ladakh",
  nanital: "Nainital",
  "darjelling-and-sikkim": "Darjeeling & Sikkim",
  "haridwar-and-rishikesh": "Haridwar & Rishikesh",
};

function prettify(slug: string): string {
  if (NAME_OVERRIDES[slug]) return NAME_OVERRIDES[slug];
  return slug
    .split("-")
    .map((w) => (w === "and" ? "&" : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

// Display priority within a category — high-demand destinations first, so the
// most appealing flyers are immediately visible (USA before Kenya, Dubai before
// Azerbaijan, Kashmir before Jodhpur). Anything not listed falls to the end,
// alphabetically. Reorder this list to change what shows first; the keys are the
// image file names (without extension).
const PRIORITY: string[] = [
  // International — most popular first
  "usa",
  "uk",
  "uk-cat",
  "dubai-pkg",
  "thailand",
  "bali",
  "maldives",
  "europe",
  "schengen-visa",
  "australia",
  "new-zealand",
  "nz",
  "canada",
  "vietnam",
  "china",
  "azerbaijan",
  "south-africa",
  "kenya",
  // Domestic — most popular first
  "kashmir",
  "goa",
  "ladhak",
  "manali",
  "kerala",
  "jaipur",
  "shimla",
  "andaman",
  "mussoorie",
  "nanital",
  "darjelling-and-sikkim",
  "haridwar-and-rishikesh",
  "jaselmer",
  "jodhpur",
  "gujarat",
];

function priorityRank(slug: string): number {
  const i = PRIORITY.indexOf(slug);
  return i === -1 ? Number.MAX_SAFE_INTEGER : i;
}

export function getThemeCategories(): ThemeCategory[] {
  const base = path.join(process.cwd(), "public", "images", "theme-flyers");

  return CATEGORY_META.map((meta) => {
    const dir = path.join(base, meta.dir);
    let files: string[] = [];
    try {
      files = fs
        .readdirSync(dir)
        .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
        .sort((a, b) => {
          const sa = a.replace(/\.[^.]+$/, "");
          const sb = b.replace(/\.[^.]+$/, "");
          const ra = priorityRank(sa);
          const rb = priorityRank(sb);
          return ra !== rb ? ra - rb : sa.localeCompare(sb);
        });
    } catch {
      files = [];
    }

    return {
      slug: meta.dir,
      label: meta.label,
      tagline: meta.tagline,
      flyers: files.map((f) => {
        const name = prettify(f.replace(/\.[^.]+$/, ""));
        return {
          src: `/images/theme-flyers/${meta.dir}/${f}`,
          alt: `${name} travel package by Adbhut Travel`,
        };
      }),
    };
  }).filter((c) => c.flyers.length > 0);
}
