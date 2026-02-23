import { motion } from 'framer-motion'
import AnimatedLogo from './AnimatedLogo'

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

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }
    }
  }

  return (
    <div className="hero-content-wrapper hero-content-wrapper--centered">
      {/* Animated Logo - Center */}
      <motion.div
        className="hero-logo-container"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatedLogo size={450} />
      </motion.div>

      {/* Text Content - Bottom */}
      <motion.div
        className="hero-content hero-content--bottom"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-eyebrow" variants={itemVariants}>
          CREATIVE COMPANY
        </motion.p>
        
        <motion.h1 className="hero-title hero-title--centered" variants={itemVariants}>
          心が動く瞬間を
          <span className="hero-title-highlight">設計する</span>
        </motion.h1>
        
        <motion.p className="hero-desc hero-desc--centered" variants={itemVariants}>
          クリニックに特化したインターネット広告運用
        </motion.p>
        
        <motion.a 
          href="#about" 
          className="hero-btn"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 20px rgba(139, 115, 85, 0.3)'
          }}
          whileTap={{ scale: 0.98 }}
        >
          VIEW MORE
          <span className="hero-btn-arrow"></span>
        </motion.a>
      </motion.div>
    </div>
  )
}

export default HeroContent
