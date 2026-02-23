import { motion } from 'framer-motion'

const AnimatedLogo = ({ size = 400 }) => {
  return (
    <div className="animated-logo" style={{ width: size, height: size }}>
      {/* Rotating brush circles */}
      <motion.div
        className="logo-circle logo-circle-1"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 15C50 15 15 50 15 100C15 150 50 185 100 185"
            stroke="#c4c0b8"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </motion.div>

      <motion.div
        className="logo-circle logo-circle-2"
        animate={{ rotate: -360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M185 100C185 50 150 15 100 15"
            stroke="#d4d0c8"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </motion.div>

      <motion.div
        className="logo-circle logo-circle-3"
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 185C150 185 185 150 185 100"
            stroke="#b8b4ac"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </motion.div>

      <motion.div
        className="logo-circle logo-circle-4"
        animate={{ rotate: -360 }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse
            cx="100"
            cy="100"
            rx="85"
            ry="80"
            stroke="#a8a4a0"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
            strokeDasharray="50 100"
          />
        </svg>
      </motion.div>

      {/* Sumie text - stays static */}
      <motion.div 
        className="logo-text-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <svg viewBox="0 0 200 80" className="logo-sumie-text">
          <text
            x="100"
            y="55"
            textAnchor="middle"
            fontFamily="'Georgia', serif"
            fontStyle="italic"
            fontSize="48"
            fontWeight="400"
            fill="#2c2c2c"
          >
            Sumie
          </text>
        </svg>
      </motion.div>
    </div>
  )
}

export default AnimatedLogo
