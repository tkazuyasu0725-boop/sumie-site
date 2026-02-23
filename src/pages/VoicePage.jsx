import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

const voices = [
  {
    id: 1,
    quote: '患者様の心に寄り添ったクリエイティブで、来院数が大幅に増加しました。以前は広告を出しても反応が薄かったのですが、Sumieさんに依頼してから予約が途切れません。',
    company: '美容皮膚科クリニック',
    name: '田中様',
    position: '院長',
    tags: ['#美容クリニック', '#広告運用'],
    service: '広告運用',
    rating: 5,
    color: '#8b7355'
  },
  {
    id: 2,
    quote: '医療広告のルールを熟知されていて安心してお任せできました。細かな表現の相談にも丁寧に対応いただき、コンプライアンスを守りながら成果を出せています。',
    company: '歯科医院',
    name: '山田様',
    position: '院長',
    tags: ['#歯科', '#LP制作'],
    service: 'LP制作',
    rating: 5,
    color: '#a08060'
  },
  {
    id: 3,
    quote: '丁寧なヒアリングと上質なデザインで、クリニックの世界観を表現していただけました。患者様から「サイトを見て安心できた」というお声をよくいただきます。',
    company: '心療内科クリニック',
    name: '佐藤様',
    position: '院長',
    tags: ['#心療内科', '#Web制作'],
    service: 'Web制作',
    rating: 5,
    color: '#8b7355'
  },
  {
    id: 4,
    quote: 'MEO対策で地域からの問い合わせが倍増しました。Googleマップでの表示順位が上がり、「近くで探して来ました」という患者様が増えています。',
    company: '整形外科クリニック',
    name: '鈴木様',
    position: '事務長',
    tags: ['#整形外科', '#MEO'],
    service: 'MEO対策',
    rating: 5,
    color: '#a08060'
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
            scale: isHovered ? 1.05 : 1,
            borderColor: isHovered ? voice.color : 'var(--gray-300)'
          }}
          style={{ 
            width: 60, 
            height: 60, 
            borderRadius: '50%', 
            background: 'var(--gray-200)',
            border: '3px solid'
          }}
        />
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
      <div style={{ marginBottom: 20, display: 'flex', gap: 6 }}>
        {[...Array(voice.rating)].map((_, i) => (
          <motion.span 
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1 }}
            style={{ 
              width: 10, 
              height: 10, 
              borderRadius: '50%', 
              background: voice.color
            }}
          />
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
