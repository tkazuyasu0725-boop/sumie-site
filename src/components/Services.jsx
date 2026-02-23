import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const services = [
  {
    label: 'AD',
    en: 'Advertisement',
    title: 'クリニック特化\nインターネット広告運用',
    desc: 'Google・Yahoo・SNS広告で集患を最大化します。',
    features: ['診療科別の構造理解', '予約枠と広告の連動', 'CV数ではなく粗利で見る']
  },
  {
    label: 'LP',
    en: 'Landing Page',
    title: '心を動かす\nLP制作',
    desc: '患者様の心に響くランディングページを丁寧に設計。',
    features: ['不安の解消装置として設計', '信頼を作る情報設計', 'ファーストビューで勝負']
  },
  {
    label: 'CR',
    en: 'Creative',
    title: '墨絵のような\nクリエイティブ制作',
    desc: '余白と情緒を大切にした上質なデザインを提供。',
    features: ['医院の人格を視覚化', '余白で信頼を作る', '煽らない静かな自信']
  },
  {
    label: 'MEO',
    en: 'MEO',
    title: '地域密着型\nMEO対策',
    desc: 'Googleマップで上位表示を実現し、近隣からの来院を促進。',
    features: ['口コミを増やす仕組み', '写真で選ばれる設計', '継続的な運用代行']
  },
  {
    label: 'WEB',
    en: 'Website',
    title: '信頼を伝える\nWebサイト制作',
    desc: 'クリニックの世界観を表現する洗練されたサイト。',
    features: ['採用・信頼・紹介に効く', '情報設計で信頼を作る', 'SEOの土台になる']
  },
  {
    label: 'CO',
    en: 'Consulting',
    title: '戦略的\nマーケティング支援',
    desc: '市場調査から施策提案まで一気通貫でサポート。',
    features: ['何をやらないか決める', '患者の検討フロー設計', '院長の意思決定を支援']
  }
]

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg'])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div 
      ref={ref}
      className="service-card interactive"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ 
        rotateX: isHovered ? rotateX : 0, 
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        z: 50,
        boxShadow: '0 50px 100px rgba(139, 115, 85, 0.2)'
      }}
    >
      <motion.div
        className="service-card-bg"
        style={{
          background: isHovered 
            ? 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(139, 115, 85, 0.1), transparent 40%)'
            : 'transparent'
        }}
      />
      
      <motion.span 
        className="service-card-label"
        animate={{ 
          boxShadow: isHovered 
            ? '0 0 30px rgba(139, 115, 85, 0.6)' 
            : '0 0 20px rgba(139, 115, 85, 0.3)'
        }}
      >
        {service.label}
      </motion.span>
      
      <p className="service-card-en">{service.en}</p>
      <h3 className="service-card-title">{service.title}</h3>
      <p className="service-card-desc">{service.desc}</p>
      
      {service.features && (
        <ul className="service-card-features">
          {service.features.map((feature, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ delay: i * 0.05 }}
            >
              {feature}
            </motion.li>
          ))}
        </ul>
      )}
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isHovered ? 1 : 0.7, x: isHovered ? 0 : -10 }}
      >
        <Link to="/services" className="view-more">
          VIEW MORE
          <motion.span 
            className="view-more-arrow"
            animate={{ width: isHovered ? 50 : 40 }}
          />
        </Link>
      </motion.div>
    </motion.div>
  )
}

const Services = () => {
  const ref = useRef(null)

  return (
    <section className="section section-dark" id="services" ref={ref}>
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
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            SERVICES
          </motion.p>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            クリニック特化のマーケティング
          </motion.h2>
          <motion.p 
            className="section-desc"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            医療広告のルールを熟知したプロフェッショナルが、
            患者様の心を動かすマーケティングをご提案します。
          </motion.p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.label} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
