import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const services = [
  {
    label: 'AD',
    en: 'Advertisement',
    title: '定額保証型\nインターネット広告運用',
    desc: '月額5万円（税別）〜アカウントのサポートが可能です。',
    icon: '📊'
  },
  {
    label: 'LP',
    en: 'Landing Page',
    title: '戦略思考型\nLP制作',
    desc: '実績とロジックに基づく戦略思考型LPは高い実績を残しています。',
    icon: '🎨'
  },
  {
    label: 'EC',
    en: 'E-Commerce',
    title: '最短5日公開\nShopify構築',
    desc: '最短5日でD2Cショップをオープンできます。',
    icon: '🛒'
  },
  {
    label: 'CM',
    en: 'Content Marketing',
    title: '成果報酬型\nSEO記事制作',
    desc: '上位表示されなければ記事制作費もかかりません。',
    icon: '📝'
  },
  {
    label: 'CO',
    en: 'Consulting',
    title: '戦略的\nコンサルティング',
    desc: '徹底的な市場調査から一気通貫したコンサルティング。',
    icon: '💡'
  },
  {
    label: 'OM',
    en: 'Owned Media',
    title: 'オウンドメディア\n運用代行',
    desc: 'メディア設計から記事制作、運用改善まで一括サポート。',
    icon: '📱'
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
        boxShadow: '0 50px 100px rgba(0, 200, 150, 0.3)'
      }}
    >
      <motion.div
        className="service-card-bg"
        style={{
          background: isHovered 
            ? 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(0, 200, 150, 0.15), transparent 40%)'
            : 'transparent'
        }}
      />
      
      <motion.span 
        className="service-card-label"
        animate={{ 
          boxShadow: isHovered 
            ? '0 0 30px rgba(0, 200, 150, 0.8)' 
            : '0 0 20px rgba(0, 200, 150, 0.4)'
        }}
      >
        {service.label}
      </motion.span>
      
      <motion.div 
        className="service-card-icon"
        animate={{ 
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? [0, -10, 10, 0] : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {service.icon}
      </motion.div>
      
      <p className="service-card-en">{service.en}</p>
      <h3 className="service-card-title">{service.title}</h3>
      <p className="service-card-desc">{service.desc}</p>
      
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
            戦略的マーケティング施策
          </motion.h2>
          <motion.p 
            className="section-desc"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            私たちは戦略思考を基盤に、「調査」→「設計」→「制作」→「運用」→「改善」に至るまで、
            一気通貫で施策のご提案が可能です。
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
