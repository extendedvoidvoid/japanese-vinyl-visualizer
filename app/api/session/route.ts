import { NextResponse } from "next/server";
import { VERIFIED_ALBUM_PACKAGES } from "@/lib/catalog";

export async function GET() {
  // Validate and sanitize packages to guarantee 100% package release integrity
  const validatedPackages = VERIFIED_ALBUM_PACKAGES.map((pkg) => {
    // Filter sleeves so that every inner sleeve strictly belongs to pkg.id & pkg.artist
    const sanitizedSleeves = (pkg.sleeves || []).filter(
      (sleeve) => sleeve.packageId === pkg.id && sleeve.artist === pkg.artist
    );

    return {
      ...pkg,
      sleeves: sanitizedSleeves
    };
  }).filter((pkg) => pkg.sleeves.length > 0);

  return NextResponse.json({
    packages: validatedPackages,
    totalCount: validatedPackages.length,
    duration: 30,
  });
}
