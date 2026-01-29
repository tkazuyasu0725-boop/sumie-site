import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'

const categories = ['すべて', 'LP制作', 'リスティング広告', 'SEO', 'Shopify', 'マーケティング戦略']

const blogs = [
  {
    id: 1,
    category: 'コンテンツマーケティング',
    title: '中小企業にこそオウンドメディアがおすすめ！',
    excerpt: 'オウンドメディアは大企業だけのものではありません。',
    date: '2026.01.26',
    readTime: '8分',
    color: '#00c896'
  },
  {
    id: 2,
    category: 'LP制作',
    title: '実績豊富なLP制作会社おすすめ17選！',
    excerpt: 'LP制作会社は数多くありますが、どの会社に依頼すれば良いか。',
    date: '2026.01.14',
    readTime: '12分',
    color: '#00e6ac'
  },
  {
    id: 3,
    category: 'リスティング広告',
    title: '【弊社事例】リスティング広告の成功事例6選！',
    excerpt: 'リスティング広告で成果を出すための重要なポイント。',
    date: '2026.01.09',
    readTime: '10分',
    color: '#00c896'
  },
  {
    id: 4,
    category: 'LP制作',
    title: 'AD BUZZの「なんかすごいLP」ってどんなLP？',
    excerpt: '多くの企業様からLP制作のご依頼をいただいています。',
    date: '2025.12.26',
    readTime: '6分',
    color: '#00e6ac'
  },
  {
    id: 5,
    category: 'SEO',
    title: '【2026年最新】SEO対策の基本と実践テクニック',
    excerpt: 'SEO対策は日々進化しています。',
    date: '2025.12.20',
    readTime: '15分',
    color: '#00c896'
  },
  {
    id: 6,
    category: 'Shopify',
    title: 'Shopifyで売れるECサイトを作るための7つのポイント',
    excerpt: 'Shopifyでサイトを作っただけでは売上は伸びません。',
    date: '2025.12.15',
    readTime: '9分',
    color: '#00e6ac'
  },
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
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.a 
      ref={ref}
      href="#"
      className="blog-page-card interactive"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
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
      whileHover={{ 
        boxShadow: `0 30px 60px ${blog.color}20`
      }}
    >
      <motion.div 
        className="blog-page-card-image"
        animate={{
          background: isHovered 
            ? `linear-gradient(135deg, ${blog.color}30, ${blog.color}60)`
            : 'linear-gradient(135deg, var(--gray-100), var(--gray-200))'
        }}
      >
        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 20 
          }}
          style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            background: blog.color,
            color: 'var(--primary)',
            padding: '8px 16px',
            fontSize: 12,
            fontWeight: 700,
            borderRadius: 4
          }}
        >
          {blog.readTime}で読める
        </motion.div>
      </motion.div>
      
      <div className="blog-page-card-content">
        <motion.p 
          className="blog-page-card-category"
          animate={{ 
            color: isHovered ? blog.color : 'var(--accent)',
            letterSpacing: isHovered ? '0.1em' : '0'
          }}
        >
          {blog.category}
        </motion.p>
        
        <motion.h3 
          className="blog-page-card-title"
          animate={{ color: isHovered ? 'var(--primary)' : 'var(--gray-900)' }}
        >
          {blog.title}
        </motion.h3>
        
        <p className="blog-page-card-excerpt">{blog.excerpt}</p>
        
        <div className="blog-page-card-meta">
          <span>{blog.date}</span>
          <span>読了時間：{blog.readTime}</span>
        </div>
        
        {/* Read more */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            x: isHovered ? 0 : -10 
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 16,
            color: blog.color,
            fontSize: 13,
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
      
      {/* Bottom border */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 4,
          background: blog.color,
          borderRadius: 2
        }}
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  )
}

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('すべて')
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="page" ref={ref}>
      {/* Hero */}
      <section className="page-hero">
        <motion.div className="page-hero-inner" style={{ y, opacity }}>
          <motion.p 
            className="page-hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            BLOG
          </motion.p>
          <motion.h1 
            className="page-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            AD BUZZ 中の人ブログ
          </motion.h1>
          <motion.p 
            className="page-hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            業界ニュースやマーケティングノウハウに関するtechブログ
          </motion.p>
        </motion.div>
        <motion.div 
          className="page-hero-bg-text"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          BLOG
        </motion.div>
      </section>

      {/* Blog List */}
      <section className="section">
        <div className="section-inner">
          {/* Categories */}
          <motion.div 
            className="blog-categories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {categories.map((category, index) => (
              <motion.button 
                key={category} 
                className={`blog-category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Blog Grid */}
          <div className="blog-page-grid">
            {blogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>

          {/* Pagination */}
          <motion.div 
            className="pagination"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[1, 2, 3].map((num) => (
              <motion.button 
                key={num}
                className={`pagination-btn ${num === 1 ? 'active' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {num}
              </motion.button>
            ))}
            <span className="pagination-dots">...</span>
            <motion.button 
              className="pagination-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              10
            </motion.button>
            <motion.button 
              className="pagination-btn pagination-next"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              NEXT →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage
