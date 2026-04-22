import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { posts } from '../data/posts'
import Footer from '../components/Footer'

export default function BlogList() {
  return (
    <>
      <section className="min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary
                         transition-colors duration-300 mb-12"
            >
              <FiArrowLeft size={14} />
              返回首页
            </Link>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              博客
            </h1>
            <p className="text-text-secondary text-lg mb-16">
              关于设计、技术与创造的思考。
            </p>
          </motion.div>

          <div className="space-y-0">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block py-8 border-b border-white/[0.08] hover:border-white/[0.16]
                             transition-colors duration-300"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <time className="text-xs text-text-tertiary font-mono">
                          {post.date}
                        </time>
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
                      <h2 className="text-xl font-medium text-text-primary group-hover:text-accent
                                     transition-colors duration-300 mb-3">
                        {post.title}
                      </h2>
                      <p className="text-text-secondary text-[15px] leading-relaxed">
                        {post.summary}
                      </p>
                    </div>
                    <div className="mt-3 text-text-tertiary group-hover:text-accent
                                    group-hover:translate-x-1 transition-all duration-300 shrink-0">
                      <FiArrowRight size={18} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-text-tertiary text-sm text-center mt-16"
          >
            更多文章即将发布。
          </motion.p>
        </div>
      </section>
      <Footer />
    </>
  )
}
