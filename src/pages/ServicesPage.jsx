import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

const services = [
  {
    id: 'ad',
    label: 'AD',
    en: 'Advertisement',
    title: '定額保証型インターネット広告運用',
    desc: '月額5万円（税別）〜アカウントのサポートが可能です。',
    icon: '📊',
    color: '#00c896',
    features: ['初期費用0円、月額5万円〜', 'Google・Yahoo!・Meta対応', '週次レポート', 'A/Bテスト最適化'],
    flow: ['ヒアリング', 'アカウント診断', '戦略立案', '運用開始']
  },
  {
    id: 'lp',
    label: 'LP',
    en: 'Landing Page',
    title: '戦略思考型LP制作',
    desc: '実績とロジックに基づく戦略思考型LPは高い実績を残しています。',
    icon: '🎨',
    color: '#00e6ac',
    features: ['徹底した市場調査', 'ペルソナ設計', 'コンバージョン最適化', 'レスポンシブ対応'],
    flow: ['市場調査', 'ペルソナ設計', 'デザイン', '公開']
  },
  {
    id: 'ec',
    label: 'EC',
    en: 'E-Commerce',
    title: '最短5日公開Shopify構築',
    desc: '最短5日でD2Cショップをオープンできます。',
    icon: '🛒',
    color: '#00c896',
    features: ['Shopify認定パートナー', '決済・配送設定', 'テーマカスタマイズ', '運用マニュアル'],
    flow: ['要件ヒアリング', 'デザイン確定', '設定', '公開']
  },
  {
    id: 'seo',
    label: 'CM',
    en: 'Content Marketing',
    title: '成果報酬型SEO記事制作',
    desc: '上位表示されなければ記事制作費もかかりません。',
    icon: '📝',
    color: '#00e6ac',
    features: ['初期費用0円の成果報酬型', 'SEO専門ライター', 'WordPress入稿対応', '効果測定'],
    flow: ['キーワード選定', '記事企画', '執筆', '公開']
  },
]

const ServiceSection = ({ service, index }) => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])

  return (
    <motion.section 
      ref={ref}
      id={service.id}
      className={`section ${index % 2 === 1 ? 'section-gray' : ''}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background decoration */}
      <motion.div
        style={{
          position: 'absolute',
          right: index % 2 === 0 ? '-10%' : 'auto',
          left: index % 2 === 1 ? '-10%' : 'auto',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 300,
          opacity: 0.03,
          fontWeight: 900,
          fontFamily: 'Inter, sans-serif',
          y,
          pointerEvents: 'none'
        }}
      >
        {service.label}
      </motion.div>

      <div className="section-inner">
        <motion.div 
          className="service-detail"
          style={{ scale }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="service-detail-header"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.span 
              className="service-detail-label"
              animate={{ 
                boxShadow: isHovered 
                  ? `0 0 40px ${service.color}80` 
                  : `0 0 20px ${service.color}40`
              }}
            >
              {service.label}
            </motion.span>
            
            <motion.span 
              style={{ fontSize: 64, display: 'block', margin: '24px 0' }}
              animate={{ 
                rotate: isHovered ? [0, -10, 10, 0] : 0,
                scale: isHovered ? 1.2 : 1
              }}
              transition={{ duration: 0.4 }}
            >
              {service.icon}
            </motion.span>
            
            <p className="service-detail-en">{service.en}</p>
            
            <motion.h2 
              className="service-detail-title"
              style={{ color: isHovered ? service.color : 'inherit' }}
            >
              {service.title.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
            <p className="service-detail-desc">{service.desc}</p>
          </motion.div>

          <div className="service-detail-content">
            <div className="service-features">
              <h3 className="service-features-title">サービスの特徴</h3>
              <ul className="service-features-list">
                {service.features.map((feature, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 10, color: service.color }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="service-flow">
              <h3 className="service-flow-title">制作フロー</h3>
              <div className="service-flow-steps">
                {service.flow.map((step, i) => (
                  <motion.div 
                    key={i}
                    className="service-flow-step"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: service.color,
                      color: 'var(--primary)'
                    }}
                  >
                    <motion.span 
                      className="step-number"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {i + 1}
                    </motion.span>
                    <span className="step-name">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            className="service-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact" className="btn-primary interactive">
                このサービスについて相談する
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

const ServicesPage = () => {
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
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ duration: 1 }}
          >
            SERVICES
          </motion.p>
          <motion.h1 
            className="page-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            サービス一覧
          </motion.h1>
          <motion.p 
            className="page-hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            戦略思考を基盤とした一気通貫のマーケティングサービス
          </motion.p>
        </motion.div>
        <motion.div 
          className="page-hero-bg-text"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          SERVICE
        </motion.div>
      </section>

      {/* Services List */}
      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}
    </div>
  )
}

export default ServicesPage
