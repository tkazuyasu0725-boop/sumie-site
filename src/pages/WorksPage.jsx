import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

const Counter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) return
    const startTime = Date.now()
    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))
      if (progress < 1) requestAnimationFrame(updateCount)
    }
    requestAnimationFrame(updateCount)
  }, [hasStarted, end, duration])

  return (
    <motion.span onViewportEnter={() => setHasStarted(true)} viewport={{ once: true }}>
      {count.toLocaleString()}
    </motion.span>
  )
}

const works = [
  {
    id: 1,
    category: 'LP制作 & 広告運用',
    client: '美容クリニック様',
    title: '新規患者数3倍達成！',
    metric: 300,
    suffix: '%',
    color: '#8b7355',
    challenge: 'Web経由の新規患者獲得が伸び悩み。',
    solution: '患者様の心に響くLP制作と広告運用の最適化。',
    result: '新規患者数が月30名から90名に増加。',
    tags: ['LP制作', '広告運用']
  },
  {
    id: 2,
    category: 'MEO対策 & Web制作',
    client: '歯科医院様',
    title: '予約数2倍に！',
    metric: 200,
    suffix: '%',
    color: '#a08060',
    challenge: '地域での認知度が低かった。',
    solution: 'MEO対策とクリニックの魅力を伝えるWebサイト制作。',
    result: 'Googleマップで上位表示、予約数2倍。',
    tags: ['MEO', 'Web制作']
  },
  {
    id: 3,
    category: '広告運用',
    client: '内科クリニック様',
    title: '月間問合せ150件！',
    metric: 150,
    suffix: '件',
    color: '#8b7355',
    challenge: '広告効果が見えず、費用対効果に疑問。',
    solution: '医療広告ガイドライン対応の戦略的広告運用。',
    result: '問い合わせ数が3倍に増加、CPA50%削減。',
    tags: ['広告運用', 'LP改善']
  },
  {
    id: 4,
    category: 'Webサイト制作',
    client: '心療内科クリニック様',
    title: '安心感で来院促進！',
    metric: 180,
    suffix: '%',
    color: '#a08060',
    challenge: 'クリニックの雰囲気が伝わらず、来院のハードルが高かった。',
    solution: '温かみのあるデザインと丁寧なコンテンツ制作。',
    result: '新規患者数1.8倍、継続率向上。',
    tags: ['Web制作', 'コンテンツ']
  },
]

const WorkCard = ({ work, index }) => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.div 
      ref={ref}
      className="work-detail-card interactive"
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 30px 60px ${work.color}30`
      }}
      style={{ y }}
    >
      <motion.div 
        className="work-detail-image"
        animate={{
          background: isHovered 
            ? `linear-gradient(135deg, ${work.color}30, ${work.color}60)`
            : 'linear-gradient(135deg, var(--gray-100), var(--gray-200))'
        }}
      >
        <motion.span 
          className="work-detail-number"
          animate={{ 
            scale: isHovered ? 1.1 : 1
          }}
          style={{ 
            fontSize: 14, 
            fontWeight: 700, 
            letterSpacing: '0.1em',
            color: work.color,
            fontFamily: 'Inter, sans-serif'
          }}
        >
          CASE 0{work.id}
        </motion.span>
      </motion.div>
      
      <div className="work-detail-content">
        <motion.p 
          className="work-detail-category"
          animate={{ color: isHovered ? work.color : 'var(--accent)' }}
        >
          {work.category}
        </motion.p>
        <p className="work-detail-client">{work.client}</p>
        
        <motion.h3 
          className="work-detail-title"
          style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}
        >
          <motion.span
            style={{ 
              fontSize: 48, 
              fontWeight: 900, 
              color: work.color,
              fontFamily: 'Inter, sans-serif'
            }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
          >
            <Counter end={work.metric} />
            {work.suffix}
          </motion.span>
        </motion.h3>
        
        <div className="work-detail-info">
          {[
            { label: '課題', text: work.challenge },
            { label: '施策', text: work.solution },
            { label: '成果', text: work.result }
          ].map((item, i) => (
            <motion.div 
              key={item.label}
              className="work-detail-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <h4>{item.label}</h4>
              <p style={{ color: item.label === '成果' ? work.color : 'inherit' }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="work-detail-tags">
          {work.tags.map((tag, i) => (
            <motion.span 
              key={tag} 
              className="work-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.05 }}
              whileHover={{ 
                backgroundColor: work.color,
                color: 'var(--primary)',
                scale: 1.05
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        {/* Progress bar */}
        <motion.div
          style={{
            height: 4,
            background: 'var(--gray-200)',
            borderRadius: 2,
            marginTop: 20,
            overflow: 'hidden'
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: work.color,
              borderRadius: 2
            }}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

const WorksPage = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="page" ref={ref}>
      {/* Hero */}
      <section className="page-hero">
        <motion.div className="page-hero-inner" style={{ y, opacity }}>
          <motion.p 
            className="page-hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            WORKS
          </motion.p>
          <motion.h1 
            className="page-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            制作実績
          </motion.h1>
          <motion.p 
            className="page-hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            戦略思考で成果を出した事例をご紹介します
          </motion.p>
        </motion.div>
        <motion.div 
          className="page-hero-bg-text"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          WORKS
        </motion.div>
      </section>

      {/* Works List */}
      <section className="section">
        <div className="section-inner">
          <div className="works-list">
            {works.map((work, index) => (
              <WorkCard key={work.id} work={work} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {'あなたのビジネスも成功事例に'.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: 40 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" className="btn-primary interactive">
                無料相談する
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default WorksPage
