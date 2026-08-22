import test from "node:test";
import assert from "node:assert/strict";
import { VERIFIED_ALBUM_PACKAGES } from "../lib/catalog.ts";

test("Catalog Package Integrity Test", async (t) => {
  await t.test("All packages have unique IDs, artist, and albumTitle", () => {
    const ids = new Set();
    for (const pkg of VERIFIED_ALBUM_PACKAGES) {
      assert.ok(pkg.id, "Package missing ID");
      assert.ok(!ids.has(pkg.id), `Duplicate package ID: ${pkg.id}`);
      ids.add(pkg.id);

      assert.ok(pkg.artist, `Package ${pkg.id} missing artist`);
      assert.ok(pkg.albumTitle, `Package ${pkg.id} missing albumTitle`);
      assert.ok(Array.isArray(pkg.sleeves) && pkg.sleeves.length > 0, `Package ${pkg.id} has no sleeves`);
    }
  });

  await t.test("Every sleeve strictly belongs to its parent package ID and artist", () => {
    for (const pkg of VERIFIED_ALBUM_PACKAGES) {
      for (const sleeve of pkg.sleeves) {
        assert.equal(
          sleeve.packageId,
          pkg.id,
          `Sleeve ${sleeve.id} packageId '${sleeve.packageId}' does not match parent pkg.id '${pkg.id}'`
        );
        assert.equal(
          sleeve.artist,
          pkg.artist,
          `Sleeve ${sleeve.id} artist '${sleeve.artist}' does not match parent pkg.artist '${pkg.artist}'`
        );
        assert.notEqual(
          sleeve.type,
          "vinyl_label",
          `Sleeve ${sleeve.id} uses forbidden 'vinyl_label' type`
        );
        assert.ok(
          sleeve.artwork.startsWith("https://"),
          `Sleeve ${sleeve.id} artwork is not a secure HTTPS URL: ${sleeve.artwork}`
        );
      }
    }
  });

  await t.test("Zero cross-album sleeve leaks under same artist", () => {
    for (const pkg of VERIFIED_ALBUM_PACKAGES) {
      for (const sleeve of pkg.sleeves) {
        assert.ok(
          sleeve.album.toLowerCase().includes(pkg.albumTitle.toLowerCase()),
          `Sleeve ${sleeve.id} album '${sleeve.album}' does not match parent albumTitle '${pkg.albumTitle}'`
        );
      }
    }
  });

  await t.test("No synthetic Japanese Edition string injections in catalog titles", () => {
    for (const pkg of VERIFIED_ALBUM_PACKAGES) {
      assert.equal(
        pkg.albumTitle.includes("Japanese Edition"),
        false,
        `Package ${pkg.id} has synthetic 'Japanese Edition' in albumTitle`
      );
      for (const sleeve of pkg.sleeves) {
        assert.equal(
          sleeve.album.includes("Japanese Edition"),
          false,
          `Sleeve ${sleeve.id} has synthetic 'Japanese Edition' in album`
        );
      }
    }
  });
});
