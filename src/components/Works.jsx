import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiX } from 'react-icons/fi'

const projects = [
  {
    id: 'quant',
    name: 'Quant Skills',
    description: '用 AI 重新定义量化投资的工具生态。',
    tags: ['量化金融', 'Python', 'AI'],
    github: 'https://github.com/CroTuyuzhe',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    detail: {
      type: 'quant-ecosystem',
      intro: '这不是一个项目，而是一整套量化投资的武器库。从看懂大盘到选出个股，从策略回测到盘中实战 —— 六个工具各司其职，又彼此配合。它们都跑在 Claude Code 上，用自然语言就能驱动专业级的量化分析。',
      tools: [
        {
          name: '大盘 Beta 跟随',
          repo: 'https://github.com/CroTuyuzhe/cn-quant-beta-follow-skill',
          desc: '先搞清楚大势。它会看大盘估值分位、追踪汇金动向、分析沪深 300 ETF 动量，告诉你现在该进攻还是防守。',
        },
        {
          name: '多因子智能选股',
          repo: 'https://github.com/CroTuyuzhe/quant-stock-screener',
          desc: '大盘方向定了，接下来选谁？六大策略组合（低估值、成长、质量、动量、低波、情绪），ICIR 加权打分，从 A 股和港股里筛出最值得关注的标的。',
        },
        {
          name: '个股深度量化',
          repo: 'https://github.com/CroTuyuzhe/cn-stock-quant-skill',
          desc: '选出来的股票，逐个做体检。历史估值分位、自由现金流模型、因子信号、同行对比 —— 一份完整的量化报告，帮你决定要不要下手。',
        },
        {
          name: '策略构建与回测',
          repo: 'https://github.com/CroTuyuzhe/quant-strategy-skill',
          desc: '有了想法就回测验证。支持沪深 300 股票池，覆盖 30 个因子、8 大策略组，月度/双周/周度调仓，用历史数据说话。',
        },
        {
          name: '宏观趋势研判',
          repo: 'https://github.com/CroTuyuzhe/quant-trading-normal',
          desc: '串联其他工具的分析结果，做分钟级的宏观决策判断 —— 拐点是不是要来了？该不该动手了？',
        },
        {
          name: '实时买卖信号',
          repo: 'https://github.com/CroTuyuzhe/quant-trading-real-time',
          desc: '决定今天要交易了？它会实时盯盘，自动识别最佳买卖点位。这是整个工作流的最后一公里。',
        },
      ],
      flow: '完整的使用路径：Beta 跟随看大盘方向 → 选股器筛出候选 → 个股量化做深度分析 → 策略回测验证想法 → 宏观研判确认时机 → 实时信号精准执行。',
    },
  },
  {
    id: 'nookpet',
    name: 'NookPet',
    description: '一只住在你桌面上的小精灵，安安静静地陪你工作。',
    tags: ['桌面应用', 'Electron', 'macOS'],
    github: 'https://github.com/CroTuyuzhe/NookPet',
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
    detail: {
      type: 'showcase',
      images: [
        'https://github.com/user-attachments/assets/a5a2a25e-b06a-499f-92c8-6ba843a8ea08',
        'https://github.com/user-attachments/assets/5d821bb4-cae7-4712-b826-13e534bbb1f6',
        'https://github.com/user-attachments/assets/685d3bf4-f799-44be-9c19-fbd895d217f3',
      ],
      story: '写代码的时候，屏幕角落有个小家伙在那安静待着，偶尔动一动 —— 这种感觉很治愈。NookPet 就是这样一只桌面小精灵：不打扰你，不弹通知，只是默默地陪着。它会随着你的工作节奏轻轻变化，累的时候看它一眼，好像也没那么累了。这个项目的初衷很简单：给冰冷的屏幕加一点温度。',
    },
  },
  {
    id: 'minipet',
    name: 'Claude Minipet',
    description: '终端里的虚拟宠物，写代码也能养崽。',
    tags: ['CLI 工具', 'Node.js', '开发者体验'],
    github: 'https://github.com/CroTuyuzhe/claude-minipet',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    detail: {
      type: 'showcase',
      images: [
        'https://raw.githubusercontent.com/CroTuyuzhe/claude-minipet/main/show.png',
      ],
      story: '每次打开终端，底部状态栏里住着一只小宠物。你敲代码，它涨经验；你提交 commit，它开心得直蹦。喂喂它、摸摸它，看着它从一只小崽子慢慢升级长大 —— 谁说程序员的世界只有 0 和 1？Claude Minipet 让你在最硬核的工作环境里，也能有一点柔软的陪伴。',
    },
  },
]

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

function DetailModal({ project, onClose }) {
  const { detail } = project

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl
                    border border-white/[0.12] bg-[#111] backdrop-blur-xl`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30 rounded-2xl pointer-events-none`} />

        <div className="relative p-8 md:p-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text-primary mb-2">
                {project.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs text-text-tertiary px-2.5 py-0.5 rounded-full border border-white/[0.08]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-white/[0.12] flex items-center justify-center
                         text-text-tertiary hover:text-white hover:border-white/30
                         transition-all duration-300 shrink-0"
            >
              <FiX size={16} />
            </button>
          </div>

          {detail.type === 'showcase' && (
            <>
              <p className="text-text-secondary text-[15px] leading-[1.8] mb-8">{detail.story}</p>
              <div className="space-y-4 mb-8">
                {detail.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${project.name} 截图`}
                    className="w-full rounded-xl border border-white/[0.06]"
                    loading="lazy"
                  />
                ))}
              </div>
            </>
          )}

          {detail.type === 'quant-ecosystem' && (
            <>
              <p className="text-text-secondary text-[15px] leading-[1.8] mb-10">{detail.intro}</p>

              <div className="space-y-6 mb-10">
                {detail.tools.map((tool, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-accent/20 text-accent text-xs font-mono
                                    flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h4 className="text-[15px] font-medium text-text-primary">{tool.name}</h4>
                        <a
                          href={tool.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-tertiary hover:text-accent transition-colors"
                        >
                          <FiGithub size={13} />
                        </a>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">{tool.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-accent/20 bg-accent/[0.05] p-5">
                <p className="text-sm text-text-secondary leading-relaxed">
                  <span className="text-accent font-medium">工作流 → </span>
                  {detail.flow}
                </p>
              </div>
            </>
          )}

          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors duration-300"
            >
              <FiGithub size={15} />
              在 GitHub 上查看
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Works() {
  const [active, setActive] = useState(null)

  return (
    <section id="works" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-text-tertiary text-sm tracking-[0.2em] uppercase mb-4">
            精选项目
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            作品
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={() => setActive(project)}
              className="group relative rounded-2xl border border-white/[0.12] bg-white/[0.06]
                         overflow-hidden cursor-pointer backdrop-blur-sm"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative p-8 flex flex-col h-full min-h-[280px]">
                <h3 className="text-xl font-semibold tracking-tight text-text-primary mb-4">
                  {project.name}
                </h3>
                <p className="text-text-secondary text-[15px] leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs text-text-tertiary border border-white/[0.08] bg-white/[0.04]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <DetailModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
