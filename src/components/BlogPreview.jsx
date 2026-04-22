import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { posts } from '../data/posts'

export default function BlogPreview() {
  return (
    <section id="blog" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-text-tertiary text-sm tracking-[0.2em] uppercase mb-4">
            思考与洞察
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            最新文章
          </h2>
        </motion.div>

        <div className="space-y-0">
          {posts.slice(0, 2).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block py-8 border-b border-white/[0.08] hover:border-white/[0.16]
                           transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <time className="text-xs text-text-tertiary font-mono">
                        {post.date}
                      </time>
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-text-tertiary px-2 py-0.5 rounded-full
                                     border border-white/[0.08]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-medium text-text-primary group-hover:text-accent
                                   transition-colors duration-300 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div className="mt-2 text-text-tertiary group-hover:text-accent
                                  group-hover:translate-x-1 transition-all duration-300 shrink-0">
                    <FiArrowRight size={18} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-secondary
                       hover:text-accent transition-colors duration-300"
          >
            查看全部文章
            <FiArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
