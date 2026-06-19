import fs from "fs";
import path from "path";

// IMPORTANT — deploy fix:
// Firebase App Hosting ships a traced server bundle and only includes public/
// files that Next's file tracer (nft) sees referenced from server code. The
// theme-flyers folder serves correctly because src/lib/theme-flyers.ts reads it
// via fs.readdirSync, which makes the tracer bundle those files. Every other
// image is referenced only as a plain <Image src="..."> URL, so the tracer
// drops it and it 404s in production (works locally because the files are on
// disk). Reading each media folder here forces all of them to be traced into
// the deployed bundle. This module is imported by the root layout so it is
// always part of the server build graph.
const base = path.join(process.cwd(), "public", "images", "media");

const FOLDERS = [
  "",
  "Home",
  "About Us",
  "CSR",
  "MICE",
  "Offers",
  "Services",
  "Trademarks",
];

export const siteMediaFiles: string[] = FOLDERS.flatMap((folder) => {
  try {
    return fs
      .readdirSync(path.join(base, folder))
      .filter((f) => /\.(webp|png|jpe?g|ico|svg)$/i.test(f))
      .map((f) => (folder ? `${folder}/${f}` : f));
  } catch {
    return [];
  }
});
