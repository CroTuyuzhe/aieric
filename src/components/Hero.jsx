import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiSend } from 'react-icons/fi'

const phrases = [
  '你好 我是EricTu',
  '这是AI Version问候',
  '以AI 定义自我',
  'Native AI. Native Self',
  'AI 即是Eric底色',
  'AI is My Core',
  'Intelligence Within 我为底色',
]

const FORMULA = 'softmax(q @ k.T / sqrt(d)) @ v'
const TYPE_SPEED = 100
const DELETE_SPEED = 40
const PAUSE_AFTER_TYPE = 2000
const PAUSE_AFTER_DELETE = 500

function useTypewriter(paused) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    if (paused) return
    const current = phrases[index]
    let timer

    if (phase === 'typing') {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_SPEED)
      } else {
        timer = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE)
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), DELETE_SPEED)
      } else {
        timer = setTimeout(() => {
          setIndex((index + 1) % phrases.length)
          setPhase('typing')
        }, PAUSE_AFTER_DELETE)
      }
    }

    return () => clearTimeout(timer)
  }, [text, index, phase, paused])

  return text
}

export default function Hero({ heroMode, onActivate }) {
  const [input, setInput] = useState('')
  const [formulaText, setFormulaText] = useState('')
  const inputRef = useRef(null)
  const isAnimating = heroMode === 'animating'
  const typed = useTypewriter(isAnimating)

  useEffect(() => {
    if (!isAnimating) { setFormulaText(''); return }
    if (formulaText.length >= FORMULA.length) return
    const timer = setTimeout(() => setFormulaText(FORMULA.slice(0, formulaText.length + 1)), 50)
    return () => clearTimeout(timer)
  }, [isAnimating, formulaText])

  const handleSend = () => {
    if (!input.trim() || isAnimating) return
    setInput('')
    onActivate()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleSend()
  }

  const displayText = isAnimating ? formulaText : typed

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center max-w-3xl w-full"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-text-tertiary text-sm tracking-[0.2em] uppercase mb-6"
        >
          设计师 / 开发者 / 创造者
        </motion.p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[1.2] mb-8">
          <span
            className="block bg-clip-text text-transparent min-h-[1.2em]"
            style={{
              backgroundImage: isAnimating
                ? 'linear-gradient(90deg, #6CC5F1, #8B7FE8, #C162D4, #E3704F, #F0A14D)'
                : 'linear-gradient(90deg, #6CC5F1, #8B7FE8, #C162D4, #E3704F, #F0A14D)',
            }}
          >
            {isAnimating ? (
              <span className="font-mono text-2xl md:text-4xl lg:text-[2.8rem] tracking-tight whitespace-nowrap">
                {displayText}
                <span className="inline-block w-[2px] h-[0.85em] bg-white/70 ml-px align-middle animate-[blink_1s_steps(2)_infinite]" />
              </span>
            ) : (
              <>
                {displayText}
                <span className="inline-block w-[3px] h-[0.85em] bg-white/70 ml-1 align-middle animate-[blink_1s_steps(2)_infinite]" />
              </>
            )}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10"
        >
          在设计、技术与人工智能的交汇处，构建真正有价值的产品。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-lg mx-auto"
        >
          <div
            className={`flex items-center gap-2 rounded-full border px-5 py-3 transition-all duration-500 ${
              isAnimating
                ? 'border-white/[0.05] bg-white/[0.02] opacity-40 cursor-not-allowed'
                : 'border-white/[0.12] bg-white/[0.06] backdrop-blur-xl focus-within:border-white/[0.25] focus-within:bg-white/[0.08]'
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isAnimating}
              placeholder="说点什么..."
              className="flex-1 bg-transparent text-[15px] text-text-primary placeholder-text-tertiary
                         outline-none disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSend}
              disabled={isAnimating || !input.trim()}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0
                         text-text-tertiary transition-all duration-300
                         enabled:hover:text-white enabled:hover:bg-white/[0.1]
                         disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FiSend size={15} />
            </button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isAnimating ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  )
}
