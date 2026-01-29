import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const blogs = [
  {
    category: 'コンテンツマーケティング',
    title: '中小企業にこそオウンドメディアがおすすめ！',
    date: '2026.01.26',
    readTime: '8分',
    color: '#00c896'
  },
  {
    category: 'LP制作',
    title: '実績豊富なLP制作会社おすすめ17選！',
    date: '2026.01.14',
    readTime: '12分',
    color: '#00e6ac'
  },
  {
    category: 'リスティング広告',
    title: '【弊社事例】リスティング広告の成功事例6選！',
    date: '2026.01.09',
    readTime: '10分',
    color: '#00c896'
  },
  {
    category: 'LP制作',
    title: 'AD BUZZの「なんかすごいLP」ってどんなLP？',
    date: '2025.12.26',
    readTime: '6分',
    color: '#00e6ac'
  }
]

const BlogCard = ({ blog, index }) => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      <Link to="/blog" className="blog-card interactive">
        <motion.div 
          className="blog-card-image"
          animate={{
            background: isHovered 
              ? `linear-gradient(135deg, ${blog.color}30, ${blog.color}60)`
              : 'linear-gradient(135deg, var(--gray-100), var(--gray-200))'
          }}
        >
          <motion.div
            className="blog-card-category-badge"
            animate={{
              y: isHovered ? 0 : 10,
              opacity: isHovered ? 1 : 0
            }}
            style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              background: blog.color,
              color: 'var(--primary)',
              padding: '6px 12px',
              fontSize: 11,
              fontWeight: 700,
              borderRadius: 2
            }}
          >
            {blog.readTime}で読める
          </motion.div>
        </motion.div>
        
        <div className="blog-card-content">
          <motion.p 
            className="blog-card-category"
            animate={{ 
              color: isHovered ? blog.color : 'var(--accent)',
              letterSpacing: isHovered ? '0.1em' : '0'
            }}
          >
            {blog.category}
          </motion.p>
          
          <motion.h3 
            className="blog-card-title"
            animate={{ 
              color: isHovered ? 'var(--primary)' : 'var(--gray-900)'
            }}
          >
            {blog.title}
          </motion.h3>
          
          <motion.p 
            className="blog-card-date"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            {blog.date}
          </motion.p>
          
          {/* Read more indicator */}
          <motion.div
            className="blog-card-read-more"
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              x: isHovered ? 0 : -10 
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 12,
              color: blog.color,
              fontSize: 12,
              fontWeight: 700
            }}
          >
            READ MORE
            <motion.span
              animate={{ x: isHovered ? [0, 5, 0] : 0 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
        
        {/* Bottom border animation */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 3,
            background: blog.color,
            borderRadius: 2
          }}
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  )
}

const Blog = () => {
  const ref = useRef(null)

  return (
    <section className="section" id="blog" ref={ref}>
      <div className="section-inner">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="section-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            BLOG
          </motion.p>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            AD BUZZ 中の人ブログ
          </motion.h2>
          <motion.p 
            className="section-desc"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            業界ニュースやマーケティングノウハウに関するtechブログ
          </motion.p>
        </motion.div>

        <div className="blog-grid">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.title} blog={blog} index={index} />
          ))}
        </div>

        <motion.div 
          style={{ textAlign: 'center', marginTop: 48 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/blog" className="view-more interactive">
            VIEW MORE
            <span className="view-more-arrow" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Blog
