import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

const voices = [
  {
    id: 1,
    quote: 'リニューアル後に人材の質も成約率もアップしました。以前のサイトでは応募者の質にバラつきがありましたが、ペルソナを明確にしたLP制作のおかげで、ターゲット層からの応募が増加。成約率も1.5倍になりました。',
    company: '株式会社エージェント',
    name: '永崎様',
    position: '人事部 マネージャー',
    tags: ['#BtoC', '#LP制作'],
    service: 'LP制作',
    rating: 5,
    color: '#00c896'
  },
  {
    id: 2,
    quote: '健康食品という競合の多い市場で、いかに差別化するかが課題でした。私たちの商品の強みを最大限に活かしたLPを制作していただきました。売上は前年比200%を達成しています。',
    company: '健康食品メーカー',
    name: '福本様',
    position: '代表取締役',
    tags: ['#BtoC', '#LP制作'],
    service: 'LP制作',
    rating: 5,
    color: '#00e6ac'
  },
  {
    id: 3,
    quote: '自社で作成したHPがあったのですが、問い合わせがほとんどなく困っていました。ユーザー視点での問題点を丁寧に説明していただき、離脱率が60%から30%に改善しました。',
    company: '株式会社おうちサービス',
    name: '大橋様',
    position: '代表取締役',
    tags: ['#BtoC', '#HP制作'],
    service: 'HP制作',
    rating: 5,
    color: '#00c896'
  },
  {
    id: 4,
    quote: 'LP制作、広告運用、SEO対策をAD BUZZさんに一本化しました。一貫した戦略のもとで施策を進められるため、効率が格段に上がりました。Web経由の問い合わせ数は3倍に。',
    company: '公認会計士・税理士事務所',
    name: '永安様',
    position: '代表',
    tags: ['#BtoB', '#LP制作', '#広告運用'],
    service: 'トータルサポート',
    rating: 5,
    color: '#00e6ac'
  },
]

const VoiceCard = ({ voice, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -30 : 30, 0])

  return (
    <motion.div 
      ref={ref}
      className="voice-detail-card interactive"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        borderColor: voice.color,
        boxShadow: `0 20px 60px ${voice.color}25`
      }}
      style={{ x }}
    >
      {/* Quote decoration */}
      <motion.div 
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          fontSize: 80,
          fontFamily: 'serif',
          color: voice.color,
          lineHeight: 1,
          opacity: 0.2
        }}
        animate={{ 
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.4 : 0.2
        }}
      >
        "
      </motion.div>

      <div className="voice-detail-header">
        <motion.div 
          className="voice-detail-avatar"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            borderColor: isHovered ? voice.color : 'var(--gray-200)'
          }}
          style={{ border: '3px solid' }}
        >
          👤
        </motion.div>
        <div className="voice-detail-info">
          <p className="voice-detail-company">{voice.company}</p>
          <p className="voice-detail-name">{voice.name}</p>
          <p className="voice-detail-position">{voice.position}</p>
        </div>
        <motion.span 
          className="voice-detail-service"
          animate={{ 
            backgroundColor: isHovered ? voice.color : 'var(--accent)'
          }}
        >
          {voice.service}
        </motion.span>
      </div>
      
      {/* Rating */}
      <div style={{ marginBottom: 20 }}>
        {[...Array(voice.rating)].map((_, i) => (
          <motion.span 
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1 }}
            animate={{ 
              rotate: isHovered ? [0, -10, 10, 0] : 0
            }}
            style={{ marginRight: 4 }}
          >
            ⭐
          </motion.span>
        ))}
      </div>
      
      <div className="voice-detail-content">
        <motion.p 
          className="voice-detail-quote"
          animate={{ color: isHovered ? 'var(--gray-900)' : 'var(--gray-700)' }}
        >
          {voice.quote}
        </motion.p>
      </div>

      <motion.div 
        className="voice-detail-tags"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {voice.tags.map((tag, i) => (
          <motion.span 
            key={tag} 
            className="voice-tag"
            whileHover={{ 
              backgroundColor: voice.color,
              color: 'var(--primary)',
              scale: 1.05
            }}
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>
      
      {/* Bottom accent line */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 4,
          background: voice.color,
          borderRadius: 2
        }}
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.div>
  )
}

const VoicePage = () => {
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
            INTERVIEW / VOICE
          </motion.p>
          <motion.h1 
            className="page-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            お客様の声
          </motion.h1>
          <motion.p 
            className="page-hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            実際にサービスをご利用いただいたお客様の声をご紹介します
          </motion.p>
        </motion.div>
        <motion.div 
          className="page-hero-bg-text"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          VOICE
        </motion.div>
      </section>

      {/* Voices */}
      <section className="section">
        <div className="section-inner">
          <div className="voices-list">
            {voices.map((voice, index) => (
              <VoiceCard key={voice.id} voice={voice} index={index} />
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
            次はあなたの番です
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
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

export default VoicePage
