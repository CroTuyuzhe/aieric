import { motion } from 'framer-motion'

const techStack = [
  { name: 'React', category: '前端框架', span: 'col-span-1' },
  { name: 'TypeScript', category: '编程语言', span: 'col-span-1' },
  { name: 'Python', category: '编程语言', span: 'col-span-1 md:col-span-2' },
  { name: 'Node.js', category: '运行时', span: 'col-span-1' },
  { name: 'Tailwind CSS', category: '样式框架', span: 'col-span-1' },
  { name: 'Figma', category: '设计工具', span: 'col-span-1 md:col-span-2' },
  { name: 'AI / LLM', category: '人工智能', span: 'col-span-1' },
  { name: '量化分析', category: '金融科技', span: 'col-span-1' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-text-tertiary text-sm tracking-[0.2em] uppercase mb-4">
            了解更多
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            关于我
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold tracking-tight mb-6 text-text-primary">
              你好，我是 Eric。
            </h3>
            <div className="space-y-5 text-text-secondary text-[15px] leading-relaxed">
              <p>
                一名产品设计师与开发者，热衷于在技术与创意的交汇处构建产品。我相信好的产品源于深思熟虑的设计与扎实工程的融合。
              </p>
              <p>
                我的工作横跨互动设计、AI 驱动工具与量化系统。我享受打造那些既直觉又充满惊喜的体验 —— 让复杂化为简洁。
              </p>
              <p>
                当下正在探索大语言模型如何变革我们与软件和信息交互的方式。
              </p>
            </div>

            <div className="mt-10 pt-10 border-t border-white/[0.06]">
              <h4 className="text-sm text-text-tertiary tracking-[0.15em] uppercase mb-4">
                理念
              </h4>
              <blockquote className="text-lg md:text-xl font-medium text-text-primary italic leading-relaxed">
                "至繁归于至简。"
              </blockquote>
              <p className="text-text-tertiary text-sm mt-2">— 列奥纳多·达·芬奇</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h4 className="text-sm text-text-tertiary tracking-[0.15em] uppercase mb-6">
              技术栈
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.15)' }}
                  className={`${tech.span} rounded-xl border border-white/[0.08] bg-surface p-5
                             hover:bg-surface-hover transition-all duration-300 cursor-default`}
                >
                  <p className="text-text-primary text-sm font-medium">{tech.name}</p>
                  <p className="text-text-tertiary text-xs mt-1">{tech.category}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
