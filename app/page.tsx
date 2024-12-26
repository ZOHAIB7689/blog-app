import Link from "next/link";
import groq from "groq";
import { Client } from "@/lib/client";
import { FiArrowRight } from "react-icons/fi";
import Head from "next/head";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  preview?: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  return Client.fetch(groq`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      preview
    }
  `);
};

const Index = async () => {
  const posts: Post[] = await fetchPosts();

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Head */}
      <Head>
        <title>Blog - Latest Posts</title>
        <meta
          name="description"
          content="Read the latest posts from our blog."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Header */}
      <header className="w-full py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
            Latest Posts
          </h1>
        </div>
      </header>

      {/* Posts Section */}
      <main className="container mx-auto px-6 lg:px-12 max-w-5xl py-12">
        {posts.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {posts.map(({ _id, title, slug, publishedAt, preview }) => (
              <article key={_id} className="py-8 first:pt-0">
                <Link
                  href={`/post/${encodeURIComponent(slug.current)}`}
                  className="group block"
                >
                  {/* Date */}
                  <time
                    dateTime={publishedAt}
                    className="text-sm text-gray-500"
                  >
                    {new Date(publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>

                  {/* Title */}
                  <h2 className="mt-2 text-2xl font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                    {title}
                  </h2>

                  {/* Preview */}
                  <p className="mt-3 text-gray-600 line-clamp-2">
                    {preview || "No preview available for this post."}
                  </p>

                  {/* Read More */}
                  <div className="mt-4 flex items-center text-sm text-gray-500 group-hover:text-gray-800">
                    Read post
                    <FiArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-600">No posts available yet.</p>
          </div>
        )}
      </main>

      {/* Newsletter Section */}
      <footer className="container mx-auto px-6 lg:px-12 max-w-5xl pb-20">
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            Join our newsletter
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Subscribe to get the latest updates directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default Index;
