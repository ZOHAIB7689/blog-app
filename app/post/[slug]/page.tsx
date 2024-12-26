import groq from "groq";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { Client } from "@/lib/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FiUser, FiCalendar, FiClock } from "react-icons/fi";

// Types remain the same
type SanityImageSource = {
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
};

type Post = {
  title: string;
  name: string;
  categories: string[];
  authorImage: SanityImageSource;
  mainImage: SanityImageSource;
  publishedAt: string;
  body: any;
};

function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(Client).image(source);
}

const ptComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => {
      if (!value?.asset?._ref) return null;

      const imageUrl = urlFor(value)
        .width(1200)
        .height(675)
        .fit("max")
        .auto("format")
        .url();

      return imageUrl ? (
        <figure className="my-12">
          <Image
            alt={value.alt || "Post image"}
            src={imageUrl}
            width={1200}
            height={675}
            className="rounded-2xl w-full object-cover shadow-lg"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="mt-4 text-center text-sm text-gray-500 italic">
              {value.alt}
            </figcaption>
          )}
        </figure>
      ) : null;
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-6 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-5 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 leading-tight">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-gray-600 text-lg leading-relaxed mb-8 font-normal">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 my-8 text-gray-700 text-lg italic bg-blue-50 py-4 pr-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
};

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Post not found.
      </div>
    );
  }

  const query = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    "name": author->name,
    "categories": categories[]->title,
    "authorImage": author->image,
    mainImage,
    publishedAt,
    body
  }`;

  const post: Post = await Client.fetch(query, { slug });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Post not found.
      </div>
    );
  }

  const { title, name, categories, authorImage, mainImage, publishedAt, body } =
    post;
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Author and Date Section */}
      <div className="container mx-auto px-6 lg:px-8 pt-12 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="h-14 w-14 border-2 border-white shadow-md ring-2 ring-gray-100">
            {authorImage ? (
              <AvatarImage
                src={urlFor(authorImage).width(112).url()}
                alt={`${name}'s picture`}
              />
            ) : (
              <AvatarFallback>
                <FiUser className="h-7 w-7" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-gray-900">
              {name || "Unknown Author"}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <FiCalendar className="h-4 w-4 mr-1.5" />
                {date}
              </div>
              <div className="flex items-center">
                <FiClock className="h-4 w-4 mr-1.5" />5 min read
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Image */}
      {mainImage && (
        <div className="w-full h-[70vh] relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
          <Image
            src={urlFor(mainImage).width(1920).height(1080).url()}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        {/* Title and Categories */}
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
            {title || "Untitled"}
          </h1>

          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((category: string) => (
                <Badge
                  key={category}
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200"
                >
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <article
          className="prose prose-lg max-w-none 
          prose-headings:font-bold 
          prose-headings:text-gray-900 
          prose-p:text-gray-600 
          prose-p:leading-relaxed 
          prose-a:text-blue-600 
          prose-a:font-medium
          prose-a:no-underline 
          hover:prose-a:underline 
          prose-img:rounded-2xl 
          prose-img:shadow-lg
          prose-strong:text-gray-900
          prose-strong:font-semibold
          prose-ul:my-8
          prose-li:text-gray-600
          prose-li:leading-relaxed"
        >
          <PortableText value={body} components={ptComponents} />
        </article>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-6 bg-gray-50 p-8 rounded-2xl">
            <Avatar className="h-20 w-20 border-2 border-white shadow-lg ring-2 ring-gray-100">
              {authorImage ? (
                <AvatarImage
                  src={urlFor(authorImage).width(160).url()}
                  alt={`${name}'s picture`}
                />
              ) : (
                <AvatarFallback>
                  <FiUser className="h-10 w-10" />
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="font-bold text-xl text-gray-900 mb-1">
                Written by {name}
              </p>
              <p className="text-gray-600 text-lg">Tech writer and developer</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

export const generateStaticParams = async () => {
  const slugs: string[] = await Client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
};
