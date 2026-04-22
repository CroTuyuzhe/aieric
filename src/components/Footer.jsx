import { motion } from 'framer-motion'
import { FiGithub, FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative py-16 px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-text-primary text-sm font-medium">AI Eric</p>
          <p className="text-text-tertiary text-xs mt-1">
            用心设计，精心构建。
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/CroTuyuzhe"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center
                       text-text-tertiary hover:text-white hover:border-white/20 transition-all duration-300"
          >
            <FiGithub size={16} />
          </a>
          <a
            href="mailto:hello@aieric.com"
            className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center
                       text-text-tertiary hover:text-white hover:border-white/20 transition-all duration-300"
          >
            <FiMail size={16} />
          </a>
        </div>

        <p className="text-text-tertiary text-xs">
          &copy; {new Date().getFullYear()} AI Eric. 保留所有权利。
        </p>
      </div>
    </motion.footer>
  )
}
