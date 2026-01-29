import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export const ParallaxSection = ({ children, className = '', speed = 0.5 }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}

export const ParallaxImage = ({ src, alt, className = '', speed = 0.3 }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2])

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}

export const FloatingElement = ({ children, className = '', amplitude = 20, duration = 3 }) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
        rotate: [-1, 1, -1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}

export const ScaleOnScroll = ({ children, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale, opacity }}
    >
      {children}
    </motion.div>
  )
}

export default ParallaxSection
