import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("thoughts");

  return rss({
    site: "https://marketeclipse.com",
    title: "Market Eclipse",
    description: "One structural market insight per day. No noise.",
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.title,
        link: `/thoughts/${post.slug}/`,
      })),
  });
}
