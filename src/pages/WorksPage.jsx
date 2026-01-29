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
    category: 'ECショップリニューアル',
    client: 'アパレルEC様',
    title: '売上5倍達成！',
    metric: 500,
    suffix: '%',
    icon: '🏪',
    color: '#00c896',
    challenge: '既存ECサイトの売上が伸び悩み。',
    solution: 'Shopifyでのサイト再構築、商品ページの最適化。',
    result: 'リニューアル翌月に過去最高売上を達成。',
    tags: ['Shopify', 'EC構築']
  },
  {
    id: 2,
    category: '漫画LP & 公式HP',
    client: '学習塾様',
    title: '3ヵ月で年間目標達成！',
    metric: 300,
    suffix: '%',
    icon: '📚',
    color: '#00e6ac',
    challenge: 'Web経由の問い合わせが少なかった。',
    solution: '漫画形式のLPで親しみやすさを演出。',
    result: '問い合わせ数が5倍に増加。',
    tags: ['LP制作', 'HP制作']
  },
  {
    id: 3,
    category: 'サービスサイト',
    client: 'BtoBサービス様',
    title: '会員数13倍に！',
    metric: 1300,
    suffix: '人',
    icon: '💼',
    color: '#00c896',
    challenge: 'サービスサイトからの会員登録が伸び悩み。',
    solution: 'UI/UXの改善、導線設計の見直し。',
    result: '会員数が100人から1,300人に増加。',
    tags: ['サイト制作', 'UI/UX']
  },
  {
    id: 4,
    category: 'リスティング広告',
    client: '不動産会社様',
    title: 'CPA50%削減！',
    metric: 50,
    suffix: '%',
    icon: '🏠',
    color: '#00e6ac',
    challenge: '広告費用対効果が悪かった。',
    solution: 'アカウント構造の見直し、LP改善。',
    result: 'CPA50%削減、問い合わせ3倍。',
    tags: ['リスティング広告', 'LP改善']
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
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? [0, -5, 5, 0] : 0
          }}
          style={{ fontSize: 64 }}
        >
          {work.icon}
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
