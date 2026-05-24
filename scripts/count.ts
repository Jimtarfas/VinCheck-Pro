import { ALL_POSTS } from "./posts";

async function main() {
  const posts = await ALL_POSTS;
  console.log("Total posts:", posts.length);
  console.log("First 5 slugs:", posts.slice(0, 5).map((p) => p.slug));
  console.log("Last 5 slugs:", posts.slice(-5).map((p) => p.slug));
  console.log(
    "Avg body nodes:",
    Math.round(posts.reduce((a, p) => a + p.body.length, 0) / posts.length)
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
