import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const services = [
  'クリニック広告運用',
  'LP（ランディングページ）制作',
  'MEO対策',
  'Webサイト制作',
  'クリエイティブ制作',
  'マーケティングコンサルティング',
  'その他'
]

const ContactPage = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  })
  const [focusedField, setFocusedField] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="page" ref={ref}>
        <section className="page-hero page-hero-small" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <motion.div 
            className="page-hero-inner" 
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              style={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 32,
                color: 'var(--cream)',
                fontSize: 32,
                fontWeight: 700
              }}
            >
              ✓
            </motion.div>
            <motion.h1 
              className="page-hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              お問い合わせありがとうございます
            </motion.h1>
            <motion.p 
              className="page-hero-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ marginTop: 24 }}
            >
              担当者より2営業日以内にご連絡いたします
            </motion.p>
            <motion.a
              href="/"
              className="btn-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              style={{ marginTop: 48, display: 'inline-block' }}
              whileHover={{ scale: 1.05 }}
            >
              トップページへ戻る
            </motion.a>
          </motion.div>
        </section>
      </div>
    )
  }

  return (
    <div className="page" ref={ref}>
      {/* Hero */}
      <section className="page-hero page-hero-small">
        <motion.div className="page-hero-inner" style={{ y, opacity }}>
          <motion.p 
            className="page-hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            CONTACT
          </motion.p>
          <motion.h1 
            className="page-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {'お問い合わせ'.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
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
            まずはお気軽にご相談ください
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section className="section">
        <div className="section-inner">
          <div className="contact-wrapper">
            {/* Info */}
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="contact-info-title">お気軽にお問い合わせください</h2>
              <p className="contact-info-desc">
                サービスに関するご質問、お見積り依頼など、
                お気軽にお問い合わせください。
              </p>

              {[
                { label: 'MAIL', sublabel: 'メール', value: 'info@sumie.net' },
                { label: 'ADDRESS', sublabel: '所在地', value: '〒105-0001\n東京都港区虎ノ門4-3-1\n城山トラストタワー27階' },
              ].map((item, index) => (
                <motion.div 
                  key={item.label}
                  className="contact-info-item"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div 
                    className="contact-info-icon"
                    whileHover={{ scale: 1.05 }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      color: 'var(--cream)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.05em'
                    }}
                  >
                    {item.label.slice(0, 2)}
                  </motion.div>
                  <div>
                    <p className="contact-info-label">{item.sublabel}</p>
                    <p className="contact-info-value" style={{ whiteSpace: 'pre-line' }}>{item.value}</p>
                    {item.note && <p className="contact-info-note">{item.note}</p>}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.form 
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {[
                { name: 'company', label: '会社名', type: 'text', required: true, placeholder: '株式会社〇〇' },
                { name: 'name', label: 'お名前', type: 'text', required: true, placeholder: '山田 太郎' },
              ].map((field, index) => (
                <motion.div 
                  key={field.name}
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <label className="form-label">
                    {field.label}
                    {field.required && <span className="form-required">必須</span>}
                  </label>
                  <motion.input 
                    type={field.type}
                    name={field.name}
                    className="form-input"
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    required={field.required}
                    animate={{
                      borderColor: focusedField === field.name ? 'var(--accent)' : 'var(--gray-300)',
                      boxShadow: focusedField === field.name ? '0 0 0 4px rgba(0, 200, 150, 0.1)' : 'none'
                    }}
                  />
                </motion.div>
              ))}

              <div className="form-row">
                <motion.div 
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="form-label">
                    メールアドレス <span className="form-required">必須</span>
                  </label>
                  <motion.input 
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="example@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    animate={{
                      borderColor: focusedField === 'email' ? 'var(--accent)' : 'var(--gray-300)',
                      boxShadow: focusedField === 'email' ? '0 0 0 4px rgba(0, 200, 150, 0.1)' : 'none'
                    }}
                  />
                </motion.div>

                <motion.div 
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="form-label">電話番号</label>
                  <motion.input 
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="03-XXXX-XXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    animate={{
                      borderColor: focusedField === 'phone' ? 'var(--accent)' : 'var(--gray-300)',
                      boxShadow: focusedField === 'phone' ? '0 0 0 4px rgba(0, 200, 150, 0.1)' : 'none'
                    }}
                  />
                </motion.div>
              </div>

              <motion.div 
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <label className="form-label">
                  ご相談内容 <span className="form-required">必須</span>
                </label>
                <select 
                  name="service"
                  className="form-select"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">選択してください</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </motion.div>

              <motion.div 
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <label className="form-label">
                  お問い合わせ内容 <span className="form-required">必須</span>
                </label>
                <motion.textarea 
                  name="message"
                  className="form-textarea"
                  placeholder="お問い合わせ内容をご記入ください"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  animate={{
                    borderColor: focusedField === 'message' ? 'var(--accent)' : 'var(--gray-300)',
                    boxShadow: focusedField === 'message' ? '0 0 0 4px rgba(0, 200, 150, 0.1)' : 'none'
                  }}
                />
              </motion.div>

              <motion.div 
                className="form-privacy"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <label className="form-checkbox">
                  <input type="checkbox" required />
                  <span><a href="#">プライバシーポリシー</a>に同意する</span>
                </label>
              </motion.div>

              <motion.button 
                type="submit"
                className="form-submit interactive"
                disabled={isSubmitting}
                whileHover={{ y: -2, boxShadow: '0 10px 40px rgba(0, 200, 150, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                {isSubmitting ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    style={{ display: 'inline-block' }}
                  >
                    ⏳
                  </motion.span>
                ) : (
                  '送信する'
                )}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
