import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">A</div>
              <div className="footer-logo-text">AD BUZZ</div>
            </Link>
            <p className="footer-company">
              株式会社アドバズ<br />
              〒150-0000 東京都渋谷区〇〇 1-2-3<br />
              TEL: 03-XXXX-XXXX
            </p>
          </div>

          <div className="footer-links">
            <div>
              <h3 className="footer-links-title">COMPANY</h3>
              <ul className="footer-links-list">
                <li className="footer-links-item"><Link to="/about">会社概要</Link></li>
                <li className="footer-links-item"><a href="#">採用情報</a></li>
                <li className="footer-links-item"><a href="#">プライバシーポリシー</a></li>
              </ul>
            </div>

            <div>
              <h3 className="footer-links-title">SERVICE</h3>
              <ul className="footer-links-list">
                <li className="footer-links-item"><Link to="/services">リスティング代行</Link></li>
                <li className="footer-links-item"><Link to="/services">ランディングページ制作</Link></li>
                <li className="footer-links-item"><Link to="/services">SEO記事制作</Link></li>
                <li className="footer-links-item"><Link to="/services">Shopify構築</Link></li>
                <li className="footer-links-item"><Link to="/services">オウンドメディア運用代行</Link></li>
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
          <p className="footer-copyright">© AD BUZZ, inc.</p>
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
