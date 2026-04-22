import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { posts } from '../data/posts'
import Footer from '../components/Footer'

export default function BlogPost() {
  const { slug } = useParams()
  const index = posts.findIndex((p) => p.slug === slug)

  if (index === -1) return <Navigate to="/blog" replace />

  const post = posts[index]
  const prev = index > 0 ? posts[index - 1] : null
  const next = index < posts.length - 1 ? posts[index + 1] : null

  return (
    <>
      <article className="min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary
                         transition-colors duration-300 mb-12"
            >
              <FiArrowLeft size={14} />
              返回博客
            </Link>

            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <time className="text-sm text-text-tertiary font-mono">{post.date}</time>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-text-tertiary px-2.5 py-0.5 rounded-full
                             border border-white/[0.08]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug mb-12">
              {post.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            {post.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-text-secondary text-[16px] leading-[1.8]"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-20 pt-10 border-t border-white/[0.08]"
          >
            <div className="flex justify-between items-start gap-4">
              {prev ? (
                <Link
                  to={`/blog/${prev.slug}`}
                  className="group flex-1 min-w-0"
                >
                  <p className="text-xs text-text-tertiary mb-2 flex items-center gap-1">
                    <FiArrowLeft size={12} />
                    上一篇
                  </p>
                  <p className="text-sm text-text-secondary group-hover:text-text-primary
                               transition-colors duration-300 truncate">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {next ? (
                <Link
                  to={`/blog/${next.slug}`}
                  className="group flex-1 min-w-0 text-right"
                >
                  <p className="text-xs text-text-tertiary mb-2 flex items-center justify-end gap-1">
                    下一篇
                    <FiArrowRight size={12} />
                  </p>
                  <p className="text-sm text-text-secondary group-hover:text-text-primary
                               transition-colors duration-300 truncate">
                    {next.title}
                  </p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </motion.div>
        </div>
      </article>
      <Footer />
    </>
  )
}
