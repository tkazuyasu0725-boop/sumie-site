import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const Counter = ({ end, duration = 2, suffix = '' }) => {
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
      if (progress < 1) requestAnimationFrame(updateCount)
    }
    requestAnimationFrame(updateCount)
  }, [hasStarted, end, duration])

  return (
    <motion.span ref={ref} onViewportEnter={() => setHasStarted(true)} viewport={{ once: true }}>
      {count.toLocaleString()}{suffix}
    </motion.span>
  )
}

const team = [
  { name: '代表取締役', role: 'CEO', desc: 'クリニックマーケティングのプロフェッショナル' },
  { name: 'クリエイティブ', role: 'Creative Director', desc: '心を動かすデザインを追求' },
  { name: 'マーケティング', role: 'Marketing Manager', desc: '医療広告の専門家' },
  { name: 'ディレクター', role: 'Account Director', desc: 'お客様と共に成果を追求' },
]

const values = [
  { title: '心を感じる', desc: '目には見えない感情や気配に耳を澄まし、本質を捉えます。' },
  { title: '丁寧に描く', desc: '墨絵のように、一筆一筆丁寧にストーリーを描きます。' },
  { title: '大胆に形に', desc: '心を動かす瞬間を、大胆に表現へと落とし込みます。' },
  { title: '共に歩む', desc: 'お客様と共に成長し、長期的なパートナーとして寄り添います。' },
]

const stats = [
  { number: 300, suffix: '+', label: 'クリニック支援' },
  { number: 95, suffix: '%', label: '継続率' },
  { number: 15, suffix: '名', label: 'メンバー' },
  { number: 3, suffix: '年', label: '創業' },
]

const AboutPage = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="page" ref={ref}>
      {/* Hero */}
      <section className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <motion.div className="page-hero-inner" style={{ y, opacity }}>
          <motion.p 
            className="page-hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ABOUT US
          </motion.p>
          <motion.h1 
            className="page-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {'会社概要'.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            className="page-hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            心が動く瞬間を設計するクリエイティブカンパニー
          </motion.p>
        </motion.div>
        <motion.div 
          className="page-hero-bg-text"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          ABOUT
        </motion.div>
      </section>

      {/* Stats */}
      <section className="section section-dark">
        <div className="section-inner">
          <motion.div 
            className="stats-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                style={{
                  textAlign: 'center',
                  padding: 40,
                  background: 'rgba(139, 115, 85, 0.05)',
                  border: '1px solid rgba(139, 115, 85, 0.2)',
                  borderRadius: 8
                }}
              >
                <motion.span 
                  style={{ 
                    fontSize: 48, 
                    fontWeight: 900, 
                    color: 'var(--accent)',
                    fontFamily: 'Inter, sans-serif',
                    display: 'block'
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Counter end={stat.number} suffix={stat.suffix} />
                </motion.span>
                <span style={{ fontSize: 14, color: 'var(--gray-400)', marginTop: 8, display: 'block' }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Info */}
      <section className="section">
        <div className="section-inner">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-eyebrow">COMPANY</p>
            <h2 className="section-title">企業情報</h2>
          </motion.div>
          
          <motion.div 
            className="company-info"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <table className="info-table">
              <tbody>
                {[
                  ['会社名', '株式会社Sumie'],
                  ['事業内容', 'クリニックに特化したインターネット広告運用'],
                  ['所在地', '〒105-0001 東京都港区虎ノ門4-3-1 城山トラストタワー27階'],
                ].map(([label, value], i) => (
                  <motion.tr 
                    key={label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <th>{label}</th>
                    <td>{value}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="section section-dark">
        <div className="section-inner">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-eyebrow">VISION</p>
            <h2 className="section-title">私たちが目指すもの</h2>
          </motion.div>
          
          <motion.div 
            className="vision-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              className="vision-text"
              style={{ fontSize: 24, lineHeight: 2 }}
            >
              {'「心が動く瞬間を設計する」'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, color: 'var(--gray-600)' }}
                  whileInView={{ opacity: 1, color: 'var(--accent)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
            <motion.p 
              style={{ marginTop: 32, color: 'var(--gray-400)', lineHeight: 2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              心。それは目には見えません。しかし、確かに存在しています。
              墨絵に描かれた松から、風の音や香りを感じ取るように。
              私たちは、人の見えない感情や気配に耳を澄まし、それを表現へと落とし込みます。
              丁寧にストーリーを描き、大胆に形にします。
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="section-inner">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-eyebrow">VALUES</p>
            <h2 className="section-title">大切にしている価値観</h2>
          </motion.div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div 
                key={value.title}
                className="value-card interactive"
                initial={{ opacity: 0, y: 50, rotateY: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: '0 20px 40px rgba(139, 115, 85, 0.15)'
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="value-number">0{index + 1}</span>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section section-gray">
        <div className="section-inner">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-eyebrow">TEAM</p>
            <h2 className="section-title">チームメンバー</h2>
          </motion.div>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div 
                key={member.name}
                className="team-card interactive"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -15,
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
                }}
              >
                <motion.div 
                  className="team-card-avatar"
                  whileHover={{ scale: 1.05 }}
                  style={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    background: 'var(--gray-300)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16
                  }}
                >
                </motion.div>
                <h3 className="team-card-name">{member.name}</h3>
                <p className="team-card-role">{member.role}</p>
                <p className="team-card-desc">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
