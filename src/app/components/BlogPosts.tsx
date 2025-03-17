'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  imageUrl: string;
  url: string;
}

export default function BlogPosts() {
  const posts: BlogPost[] = [
    {
      title: "Building Scalable APIs with NestJS and GraphQL",
      excerpt: "Learn how to create robust and scalable APIs using NestJS and GraphQL, with best practices for authentication, error handling, and performance optimization.",
      date: "May 15, 2023",
      tags: ["NestJS", "GraphQL", "API", "TypeScript"],
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      url: "#"
    },
    {
      title: "Optimizing MongoDB Performance for High-Traffic Applications",
      excerpt: "Discover techniques for optimizing MongoDB performance in high-traffic applications, including indexing strategies, query optimization, and caching mechanisms.",
      date: "March 22, 2023",
      tags: ["MongoDB", "Database", "Performance", "Backend"],
      imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      url: "#"
    },
    {
      title: "Implementing Authentication with JWT in NestJS Applications",
      excerpt: "A comprehensive guide to implementing secure authentication using JSON Web Tokens (JWT) in NestJS applications, with examples and best practices.",
      date: "January 10, 2023",
      tags: ["Authentication", "JWT", "NestJS", "Security"],
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      url: "#"
    }
  ];

  return (
    <div className="py-10">
      <h3 className="text-2xl font-bold mb-8 text-center">Latest Articles</h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">{post.date}</div>
              </div>

              <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{post.title}</h4>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={post.url}
                className="text-green-500 hover:text-green-600 transition-colors font-medium inline-flex items-center"
              >
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="#"
          className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          View All Articles
        </Link>
      </div>
    </div>
  );
}