import { motion } from 'framer-motion'

// 文字を1文字ずつアニメーション
export const AnimatedTitle = ({ children, className = '', delay = 0 }) => {
  const text = typeof children === 'string' ? children : ''
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay
      }
    }
  }

  const child = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ display: 'inline-block', perspective: '1000px' }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ 
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal'
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// 行ごとにアニメーション
export const AnimatedLines = ({ children, className = '', delay = 0 }) => {
  const lines = typeof children === 'string' ? children.split('\n') : [children]

  return (
    <div className={className}>
      {lines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }}
          whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8, 
            delay: delay + index * 0.15,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          style={{ overflow: 'hidden' }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  )
}

// カウントアップアニメーション
export const CountUp = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {prefix}
        <motion.span
          initial={{ textContent: 0 }}
          whileInView={{ textContent: end }}
          viewport={{ once: true }}
          transition={{ duration, ease: 'easeOut' }}
          onUpdate={(latest) => {
            // This is handled by CSS counter
          }}
        >
          <Counter end={end} duration={duration} />
        </motion.span>
        {suffix}
      </motion.span>
    </motion.span>
  )
}

const Counter = ({ end, duration }) => {
  const [count, setCount] = React.useState(0)
  const [hasStarted, setHasStarted] = React.useState(false)
  
  React.useEffect(() => {
    if (!hasStarted) return
    
    const startTime = Date.now()
    const endTime = startTime + duration * 1000
    
    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))
      
      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }
    
    requestAnimationFrame(updateCount)
  }, [hasStarted, end, duration])

  return (
    <motion.span
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true }}
    >
      {count.toLocaleString()}
    </motion.span>
  )
}

import React from 'react'

export default { AnimatedTitle, AnimatedLines, CountUp }
