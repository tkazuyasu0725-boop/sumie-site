import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const works = [
  {
    icon: '🏪',
    label: 'ECショップリニューアル',
    title: 'アパレルEC様',
    result: '売上5倍',
    number: 500,
    suffix: '%',
    color: '#00c896'
  },
  {
    icon: '📚',
    label: '漫画LP & 公式HPリニューアル',
    title: '学習塾様',
    result: '3ヵ月で目標達成',
    number: 3,
    suffix: 'ヵ月',
    color: '#00e6ac'
  },
  {
    icon: '💼',
    label: 'サービスサイトリニューアル',
    title: 'BtoBサービス様',
    result: '会員数1,300人',
    number: 1300,
    suffix: '人',
    color: '#00c896'
  }
]

const Counter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!hasStarted) return
    
    const startTime = Date.now()
    
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
      ref={ref}
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true }}
    >
      {count.toLocaleString()}
    </motion.span>
  )
}

const WorkCard = ({ work, index }) => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      ref={ref}
      className="work-card interactive"
      initial={{ opacity: 0, y: 80, rotateY: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: 'spring',
        stiffness: 100
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -20,
        rotateY: 5,
        rotateX: -5,
        scale: 1.02,
        boxShadow: `0 30px 60px ${work.color}40`
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div 
        className="work-card-image"
        animate={{
          background: isHovered 
            ? `linear-gradient(135deg, ${work.color}20, ${work.color}40)`
            : 'linear-gradient(135deg, var(--gray-200), var(--gray-300))'
        }}
      >
        <motion.span
          animate={{ 
            scale: isHovered ? 1.3 : 1,
            rotate: isHovered ? [0, -15, 15, 0] : 0
          }}
          transition={{ duration: 0.4 }}
          style={{ fontSize: 48 }}
        >
          {work.icon}
        </motion.span>
      </motion.div>
      
      <div className="work-card-content">
        <motion.p 
          className="work-card-label"
          animate={{ color: isHovered ? work.color : 'var(--gray-500)' }}
        >
          {work.label}
        </motion.p>
        <h3 className="work-card-title">{work.title}</h3>
        <motion.p 
          className="work-card-result"
          style={{ color: work.color }}
        >
          <motion.span
            className="work-card-number"
            animate={{ scale: isHovered ? 1.1 : 1 }}
          >
            <Counter end={work.number} />
            {work.suffix}
          </motion.span>
        </motion.p>
        
        <motion.div
          className="work-card-progress"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
          style={{ 
            height: 3, 
            background: work.color,
            marginTop: 16,
            borderRadius: 2
          }}
        />
      </div>
    </motion.div>
  )
}

const Works = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section className="section section-gray" id="works" ref={ref}>
      <motion.div 
        className="works-bg-pattern"
        style={{ y: bgY }}
      />
      
      <div className="section-inner">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="section-eyebrow"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            WORKS
          </motion.p>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            戦略思考による<br />
            マーケティングノウハウを体系化
          </motion.h2>
        </motion.div>

        <div className="works-grid">
          {works.map((work, index) => (
            <WorkCard key={work.title} work={work} index={index} />
          ))}
        </div>

        <motion.div 
          style={{ textAlign: 'center', marginTop: 48 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/works" className="view-more interactive">
            VIEW MORE
            <span className="view-more-arrow" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Works
