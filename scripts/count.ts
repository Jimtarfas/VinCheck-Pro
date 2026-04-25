import { ALL_POSTS } from "./posts";
console.log("Total posts:", ALL_POSTS.length);
console.log("First 5 slugs:", ALL_POSTS.slice(0, 5).map(p => p.slug));
console.log("Last 5 slugs:", ALL_POSTS.slice(-5).map(p => p.slug));
console.log("Avg body nodes:", Math.round(ALL_POSTS.reduce((a, p) => a + p.body.length, 0) / ALL_POSTS.length));
