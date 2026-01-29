import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import MagneticButton from './MagneticButton'

const CTA = () => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section className="cta" id="contact" ref={ref}>
      {/* Animated background particles */}
      <div className="cta-particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="cta-particle"
            initial={{ 
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
                Math.random() * 100 + '%'
              ],
              x: [
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
                Math.random() * 100 + '%'
              ],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              borderRadius: '50%',
              background: 'var(--accent)',
              opacity: 0.3
            }}
          />
        ))}
      </div>

      <motion.div 
        className="cta-glow"
        style={{ scale }}
        animate={{
          boxShadow: isHovered 
            ? '0 0 200px 100px rgba(0, 200, 150, 0.3)'
            : '0 0 100px 50px rgba(0, 200, 150, 0.15)'
        }}
      />

      <div className="cta-inner">
        <motion.h2 
          className="cta-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {'戦略思考を活用した売上アップ、'.split('').map((char, i) => (
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
          <br />
          {'わたしたちがサポートします'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.02 }}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>
        
        <motion.p 
          className="cta-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          まずは、お電話・メールにてご相談ください
        </motion.p>

        <motion.div 
          className="cta-contact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div 
            className="cta-phone"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="cta-phone-icon"
              animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              📞
            </motion.div>
            <div>
              <motion.p 
                className="cta-phone-number"
                whileHover={{ color: 'var(--accent)' }}
              >
                03-XXXX-XXXX
              </motion.p>
              <p className="cta-phone-time">受付時間 平日 10:00 〜 19:00</p>
            </div>
          </motion.div>

          <MagneticButton>
            <motion.div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link to="/contact" className="cta-btn interactive">
                <motion.span
                  animate={{
                    backgroundPosition: isHovered ? '200% 0' : '0% 0'
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: 'linear-gradient(90deg, var(--primary), var(--primary), var(--white), var(--primary), var(--primary))',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  CONTACT メールでのお問い合わせ
                </motion.span>
              </Link>
            </motion.div>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
