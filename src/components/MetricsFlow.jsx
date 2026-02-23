import { motion } from 'framer-motion'

const MetricsFlow = () => {
  const steps = [
    { 
      label: '広告の数値', 
      sublabel: 'クリック・CV',
      isTypical: true 
    },
    { 
      label: '予約', 
      sublabel: '来院予約',
      isTypical: false 
    },
    { 
      label: '売上', 
      sublabel: '診療収益',
      isTypical: false 
    },
    { 
      label: '利益', 
      sublabel: '事業利益',
      isTypical: false 
    },
    { 
      label: '継続', 
      sublabel: 'リピート',
      isTypical: false 
    },
  ]

  return (
    <div className="metrics-flow">
      <div className="metrics-flow-steps">
        {steps.map((step, index) => (
          <div key={step.label} className="metrics-flow-step-wrapper">
            <motion.div
              className={`metrics-flow-step ${step.isTypical ? 'metrics-flow-step--typical' : 'metrics-flow-step--sumie'}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="metrics-flow-step-label">{step.label}</span>
              <span className="metrics-flow-step-sublabel">{step.sublabel}</span>
            </motion.div>
            
            {index < steps.length - 1 && (
              <motion.div 
                className="metrics-flow-arrow"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
              >
                →
              </motion.div>
            )}
          </div>
        ))}
      </div>
      
      <div className="metrics-flow-labels">
        <motion.div 
          className="metrics-flow-label metrics-flow-label--typical"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <span className="metrics-flow-label-line" />
          <span>一般的な広告代理店が見る指標</span>
        </motion.div>
        
        <motion.div 
          className="metrics-flow-label metrics-flow-label--sumie"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <span>Sumieが追う指標</span>
        </motion.div>
      </div>
    </div>
  )
}

export default MetricsFlow
