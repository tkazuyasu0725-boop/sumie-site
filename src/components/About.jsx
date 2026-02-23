import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MagneticButton from './MagneticButton'
import MetricsFlow from './MetricsFlow'

const Counter = ({ end, duration = 2 }) => {
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
      
      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }
    
    requestAnimationFrame(updateCount)
  }, [hasStarted, end, duration])

  return (
    <motion.span
      ref={ref}
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true }}
    >
      {count.toLocaleString()}
    </motion.span>
  )
}

const About = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const stats = [
    { number: 300, suffix: '+', label: 'クリニック支援実績' },
    { number: 95, suffix: '%', label: '顧客継続率' },
    { number: 3, suffix: '倍', label: '平均集患向上' },
  ]

  return (
    <section className="section" id="about" ref={ref}>
      {/* Stats - 上部に配置 */}
      <motion.div 
        className="about-stats-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-inner">
          <div className="about-stats">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="about-stat"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <span className="about-stat-number">
                  <Counter end={stat.number} />
                  {stat.suffix}
                </span>
                <span className="about-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="section-inner">
        <div className="about">
          <motion.div 
            className="about-visual"
            style={{ y }}
          >
            <motion.div 
              className="about-big-text"
              whileHover={{ 
                scale: 1.05,
                textShadow: '0 0 40px rgba(139, 115, 85, 0.3)'
              }}
            >
              ABOUT<br />US
            </motion.div>
          </motion.div>
          
          <div className="about-content">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.p 
                className="section-eyebrow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                About Sumie
              </motion.p>
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {'丁寧にストーリーを描き、'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.02 }}
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </motion.span>
                ))}
                <br />
                {'大胆に形にする'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.02 }}
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h2>
              <motion.p 
                className="section-desc"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                株式会社Sumieは、クリニックに特化したインターネット広告運用を行うクリエイティブカンパニーです。
                <br /><br />
                私たちは、人の見えない感情や気配に耳を澄まし、それを表現へと落とし込みます。墨絵に描かれた松から風の音や香りを感じ取るように、心が動く瞬間を設計していきます。
              </motion.p>
            </motion.div>
            
            <MagneticButton>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link to="/about" className="view-more interactive">
                  VIEW MORE
                  <motion.span 
                    className="view-more-arrow"
                    whileHover={{ width: 60 }}
                  />
                </Link>
              </motion.div>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="metrics-section">
        <div className="metrics-section-inner">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <p className="section-eyebrow">Our Approach</p>
            <h2 className="section-title">数字の先にある、本当の成果</h2>
          </motion.div>
          
          <div className="metrics-content">
            <motion.div 
              className="metrics-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3>私たちは、広告の数字だけを追う会社ではありません。</h3>
              <p>
                クリックやコンバージョンは、あくまで途中の指標です。<br />
                本当に見るべきものは、その先にある<br />
                <span className="highlight">売上、利益、クリニックとしての継続的な発展。</span>
              </p>
              <p>
                広告が良く見えても、事業が動いていなければ意味がない。<br />
                Sumieは、広告を「成果の入口」ではなく、<br />
                ビジネスを前に進めるための設計として捉え、<br />
                <span className="highlight">売上・利益につながる運用</span>を行います。
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <MetricsFlow />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
