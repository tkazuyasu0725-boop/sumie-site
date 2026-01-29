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
  { name: '山田 太郎', role: '代表取締役 / CEO', desc: '大手広告代理店で10年間マーケティング戦略を担当。' },
  { name: '鈴木 花子', role: 'クリエイティブディレクター', desc: 'LP制作のスペシャリストとして数々の成功事例を持つ。' },
  { name: '佐藤 健一', role: 'テクニカルディレクター', desc: 'Shopify認定パートナーとしてEC構築を牽引。' },
  { name: '田中 美咲', role: 'マーケティングマネージャー', desc: 'ROI最大化のための戦略立案を得意とする。' },
]

const values = [
  { title: '戦略思考', desc: 'すべての施策に意味を持たせ、論理的なアプローチで成果を追求。', icon: '🎯' },
  { title: '結果にコミット', desc: '投げっぱなしにせず、お客様と共に成果が出るまで伴走。', icon: '🤝' },
  { title: '一気通貫', desc: '調査から改善まで、すべてのプロセスを一貫してサポート。', icon: '🔄' },
  { title: 'スピード感', desc: '市場の変化に素早く対応し、最短での成果実現を目指す。', icon: '⚡' },
]

const stats = [
  { number: 500, suffix: '+', label: '制作実績' },
  { number: 98, suffix: '%', label: '顧客満足度' },
  { number: 25, suffix: '名', label: 'チームメンバー' },
  { number: 5, suffix: '年', label: '創業' },
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
            戦略思考を武器に、お客様のビジネス成長をサポートします
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
                  background: 'rgba(0, 200, 150, 0.05)',
                  border: '1px solid rgba(0, 200, 150, 0.2)',
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
                  ['会社名', '株式会社アドバズ（AD BUZZ, inc.）'],
                  ['設立', '2020年4月1日'],
                  ['資本金', '1,000万円'],
                  ['代表取締役', '山田 太郎'],
                  ['従業員数', '25名（2026年1月現在）'],
                  ['所在地', '〒150-0000 東京都渋谷区〇〇 1-2-3 〇〇ビル5F'],
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
              {'「戦略なくして成果なし」'.split('').map((char, i) => (
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
              私たちは、すべてのマーケティング施策において戦略思考を基盤としています。
              表面的な施策ではなく、市場調査・競合分析・内部状況の把握を徹底し、
              本質的な課題解決と持続的な成長をお客様と共に実現します。
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
                  boxShadow: '0 20px 40px rgba(0, 200, 150, 0.2)'
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.span 
                  style={{ fontSize: 48, display: 'block', marginBottom: 16 }}
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                >
                  {value.icon}
                </motion.span>
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
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  👤
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
