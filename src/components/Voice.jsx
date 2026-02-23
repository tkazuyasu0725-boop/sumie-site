import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const voices = [
  {
    quote: '「患者様の心に寄り添ったクリエイティブで、来院数が大幅に増加しました。」',
    company: '美容皮膚科クリニック',
    name: '院長 田中様',
    tags: ['#美容クリニック', '#広告運用'],
    rating: 5
  },
  {
    quote: '「医療広告のルールを熟知されていて安心してお任せできました。」',
    company: '歯科医院',
    name: '院長 山田様',
    tags: ['#歯科', '#LP制作'],
    rating: 5
  },
  {
    quote: '「丁寧なヒアリングと上質なデザインで、クリニックの世界観を表現していただけました。」',
    company: '心療内科クリニック',
    name: '院長 佐藤様',
    tags: ['#心療内科', '#Web制作'],
    rating: 5
  },
  {
    quote: '「MEO対策で地域からの問い合わせが倍増。Sumieさんの対応も素晴らしいです。」',
    company: '整形外科クリニック',
    name: '事務長 鈴木様',
    tags: ['#整形外科', '#MEO'],
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
        boxShadow: '0 20px 60px rgba(139, 115, 85, 0.2)'
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
      
      {/* Rating indicator */}
      <div className="voice-card-rating" style={{ display: 'flex', gap: 4 }}>
        {[...Array(voice.rating)].map((_, i) => (
          <motion.span 
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1 }}
            style={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              background: 'var(--accent)'
            }}
          />
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
            scale: isHovered ? 1.05 : 1,
            borderColor: isHovered ? 'var(--accent)' : 'var(--gray-500)'
          }}
          style={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            background: 'var(--gray-600)',
            border: '2px solid'
          }}
        />
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
