import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MagneticButton from './MagneticButton'

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
    { number: 500, suffix: '+', label: '制作実績' },
    { number: 98, suffix: '%', label: '顧客満足度' },
    { number: 5, suffix: '倍', label: '平均売上向上' },
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
                textShadow: '0 0 40px rgba(0, 200, 150, 0.3)'
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
                About AD BUZZ
              </motion.p>
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {'戦略思考により改善サイクルを早め、'.split('').map((char, i) => (
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
                {'最短での成果を実現する'.split('').map((char, i) => (
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
                これまでの知見から独自のノウハウを確立。すべてのアウトプットに意味を持たせることが改善サイクルを回すための手段であり、全体設計なしに飛躍を期待することは愚かな行為であると考えます。
                <br /><br />
                私たちは戦略思考を基盤に、「調査」→「設計」→「制作」→「運用」→「改善」に至るまで、一気通貫で施策のご提案が可能です。
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
    </section>
  )
}

export default About
