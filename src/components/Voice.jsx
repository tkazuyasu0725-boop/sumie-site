import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const voices = [
  {
    quote: '「リニューアル後に人材の質も成約率もアップ！柔軟・迅速かつ的確な意見に信頼を寄せています。」',
    company: '株式会社エージェント',
    name: '永崎様',
    tags: ['#BtoC', '#LP制作'],
    rating: 5
  },
  {
    quote: '「商品の良さを正確にわかりやすく伝えるLPで、消費者の信頼を獲得できました。」',
    company: '健康食品メーカー',
    name: '福本様',
    tags: ['#BtoC', '#LP制作'],
    rating: 5
  },
  {
    quote: '「HPの問題点を洗い出し、全面リニューアル！離脱率の低下と集客アップに成功しました。」',
    company: '株式会社おうちサービス',
    name: '代表 大橋様',
    tags: ['#BtoC', '#HP制作'],
    rating: 5
  },
  {
    quote: '「LP、広告、SEOのすべてが期待以上の成果で満足しています。パートナーとして信頼できます。」',
    company: '公認会計士・税理士事務所',
    name: '永安様',
    tags: ['#BtoB', '#広告運用'],
    rating: 5
  }
]

const VoiceCard = ({ voice, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div 
      className="voice-card interactive"
      initial={{ opacity: 0, x: 100, rotateY: -20 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.03,
        rotateY: 5,
        boxShadow: '0 20px 60px rgba(0, 200, 150, 0.25)'
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Quote Icon */}
      <motion.div 
        className="voice-card-quote-icon"
        animate={{ 
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? -10 : 0,
          opacity: isHovered ? 1 : 0.3
        }}
      >
        "
      </motion.div>
      
      {/* Rating Stars */}
      <div className="voice-card-rating">
        {[...Array(voice.rating)].map((_, i) => (
          <motion.span 
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1 }}
            animate={{ 
              rotate: isHovered ? [0, -20, 20, 0] : 0,
              scale: isHovered ? 1.2 : 1
            }}
          >
            ⭐
          </motion.span>
        ))}
      </div>
      
      <motion.p 
        className="voice-card-quote"
        animate={{ color: isHovered ? 'var(--white)' : 'var(--gray-300)' }}
      >
        {voice.quote}
      </motion.p>
      
      <div className="voice-card-meta">
        <motion.div 
          className="voice-card-avatar"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            borderColor: isHovered ? 'var(--accent)' : 'transparent'
          }}
          style={{ border: '2px solid' }}
        >
          👤
        </motion.div>
        <div className="voice-card-info">
          <p className="voice-card-company">{voice.company}</p>
          <p className="voice-card-name">{voice.name}</p>
        </div>
      </div>
      
      <motion.div 
        className="voice-card-tags"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {voice.tags.map((tag, i) => (
          <motion.span 
            key={tag} 
            className="voice-card-tag"
            whileHover={{ 
              backgroundColor: 'var(--accent)',
              color: 'var(--primary)',
              scale: 1.05
            }}
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>
      
      {/* Decorative line */}
      <motion.div
        className="voice-card-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'var(--accent)',
          transformOrigin: 'left'
        }}
      />
    </motion.div>
  )
}

const Voice = () => {
  const ref = useRef(null)
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section className="section section-dark" id="voice" ref={ref}>
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            INTERVIEW / VOICE
          </motion.p>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            お客さまの声
          </motion.h2>
        </motion.div>

        <motion.div 
          className="voice-slider"
          ref={containerRef}
          style={{ x }}
        >
          {voices.map((voice, index) => (
            <VoiceCard key={voice.name} voice={voice} index={index} />
          ))}
        </motion.div>

        <motion.div 
          style={{ textAlign: 'center', marginTop: 40 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/voice" className="view-more interactive" style={{ color: 'var(--white)' }}>
            VIEW MORE
            <span className="view-more-arrow" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Voice
