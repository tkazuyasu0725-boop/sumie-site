import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <Link to="/" className="footer-logo">
              <div className="footer-logo-text">Sumie</div>
            </Link>
            <p className="footer-company">
              株式会社Sumie<br />
              〒105-0001<br />
              東京都港区虎ノ門4-3-1<br />
              城山トラストタワー27階
            </p>
          </div>

          <div className="footer-links">
            <div>
              <h3 className="footer-links-title">COMPANY</h3>
              <ul className="footer-links-list">
                <li className="footer-links-item"><Link to="/about">会社概要</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="footer-links-title">SERVICE</h3>
              <ul className="footer-links-list">
                <li className="footer-links-item"><Link to="/services">クリニック広告運用</Link></li>
                <li className="footer-links-item"><Link to="/services">ランディングページ制作</Link></li>
                <li className="footer-links-item"><Link to="/services">クリエイティブ制作</Link></li>
                <li className="footer-links-item"><Link to="/services">MEO対策</Link></li>
                <li className="footer-links-item"><Link to="/services">Webサイト制作</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="footer-links-title">SUPPORT</h3>
              <ul className="footer-links-list">
                <li className="footer-links-item"><Link to="/blog">ブログ</Link></li>
                <li className="footer-links-item"><Link to="/works">制作実績</Link></li>
                <li className="footer-links-item"><Link to="/contact">お問い合わせ</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© Sumie, inc.</p>
          <div className="footer-sns">
            <a href="#">X</a>
            <a href="#">FB</a>
            <a href="#">IG</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
