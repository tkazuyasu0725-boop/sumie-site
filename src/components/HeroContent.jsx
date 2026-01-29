import { motion } from 'framer-motion'

const HeroContent = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const bigTextVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 0.6,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.5
      }
    }
  }

  return (
    <div className="hero-content-wrapper">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-eyebrow" variants={itemVariants}>
          MARKETING COMPANY
        </motion.p>
        
        <motion.h1 className="hero-title" variants={itemVariants}>
          デジタル領域に特化した
          <br />
          <span className="hero-title-highlight">戦略思考型</span>
          <br />
          ブラックマーケティング
        </motion.h1>
        
        <motion.p className="hero-desc" variants={itemVariants}>
          わたしたちは戦略に重点を置くマーケティング会社です。
          <br />
          アウトプット以前に、徹底的な市況調査、競合分析、内部状況の把握に努めます。
          <br />
          "戦略段階で結果は決まる"というのがわたしたちの考えです。
        </motion.p>
        
        <motion.p className="hero-section-label" variants={itemVariants}>
          About AD BUZZ
        </motion.p>
        
        <motion.a 
          href="#about" 
          className="hero-btn"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 20px rgba(0, 200, 150, 0.3)'
          }}
          whileTap={{ scale: 0.98 }}
        >
          VIEW MORE
          <span className="hero-btn-arrow"></span>
        </motion.a>
      </motion.div>

      <motion.div
        className="hero-visual"
        variants={bigTextVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-big-text">
          BLACK
          <br />
          MARKE
          <br />
          TING
        </div>
      </motion.div>
    </div>
  )
}

export default HeroContent
