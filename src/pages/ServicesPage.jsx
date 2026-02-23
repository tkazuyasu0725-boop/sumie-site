import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import MetricsFlow from '../components/MetricsFlow'

const services = [
  {
    id: 'ad',
    label: 'AD',
    en: 'Advertisement',
    title: 'クリニック特化 インターネット広告運用',
    subtitle: 'Google・Yahoo・SNS広告で集患を最大化します。',
    color: '#8b7355',
    points: [
      {
        title: 'クリニック広告の本質は「枠を埋める」ではない',
        content: `クリニック広告は、単純なCV（予約）最大化では勝てません。
        
予約枠に上限があること、診療科によって利益率が異なること、来院率が100%ではないこと、電話対応や受付の質で歩留まりが変わること、患者様の質（保険/自費）が混在すること。これらすべてを考慮する必要があります。

つまり広告とは、「医院の経営戦略を実現するための患者ポートフォリオ設計」です。広告だけを最適化しても、医院の利益が増えるとは限りません。`
      },
      {
        title: '重要なのは「診療科別の構造理解」',
        content: `クリニック広告は、診療科によって勝ち筋がまったく異なります。

美容：CVは多いですが競合も強く、単価も高いです。CV後の商談（カウンセリング）が勝負になります。
歯科：矯正・審美・インプラントは高LTVですが、比較検討期間が長くなります。
性病：即日・夜間・匿名など「緊急性」が強く、検索広告が効果的です。
AGA：CPAは高いですがLTVも高く、比較検討が長いためLPの説得が重要です。
心療内科：ガイドラインや炎上リスクが高いため、枠制御が重要になります。

この構造を理解していない代理店は、ほぼ100%「広告の数字だけ良くして終わる」結果になります。`
      },
      {
        title: '予約枠・診療時間と広告配信の連動が命',
        content: `クリニック広告では、「売上が伸びない理由」が広告の外側にあることが多いです。

特に多いのが、夜枠が空いているのに昼に予約が集中する、土日の枠が空いているのに平日ばかり来る、自費診療の枠が空いているのに保険ばかり増える、といった状況です。

ここで重要なのが、時間帯別の入札調整、曜日別の配信設計、診療メニュー別のキャンペーン分割、予約枠が埋まったら抑制する仕組みです。この設計ができる代理店は多くありません。`
      },
      {
        title: '「CV数」ではなく「来院数」と「粗利」で見るべき',
        content: `クリニック広告で本当に見るべき指標は、管理画面上のCVではありません。

理想的な優先順位はこちらです：
表面：CV（予約・電話・LINE）
重要：来院（実来院）
さらに重要：自費率（高単価メニュー比率）
最重要：粗利（利益）

ここまで踏み込めるかどうかで、代理店の価値が決まります。`
      },
      {
        title: 'クリニック広告の難しさは「コンプラ×表現」',
        content: `医療広告は、他業界より圧倒的に制約が強いです。誇大広告ができない、ビフォーアフターが使えないことが多い、「絶対」「確実」「治る」などが使えない、実績・症例の扱いが難しい、口コミの引用も危険です。

つまり「煽れない」のです。煽れないのにCVを取るには、信頼、不安の解消、具体性、来院のハードル低下。この4つを、表現で設計する必要があります。`
      },
      {
        title: '勝つ代理店は「キーワード設計」が異常に細かい',
        content: `クリニックは検索広告が主戦場ですので、キーワード設計がそのまま売上を決めます。

重要なのは、"症状"系（悩み）、"病名"系（確信）、"地域"系（近場）、"今すぐ"系（緊急）、"比較"系（検討）、"口コミ"系（不安）、"費用"系（価格）、"保険適用"系（保険患者）です。これらを分けてキャンペーン構造を作ります。

さらに重要なのが除外キーワード設計です。美容・歯科・性病は特に「関係ない検索が流入してCPAが崩壊する」ことが起きやすいです。`
      },
      {
        title: 'クリニック広告は「攻め」と「守り」がある',
        content: `攻め：一般KW（例：新宿 性病 検査）
守り：指名KW（例：新宿サザンクリニック）

指名KWはCPAが安いですが、規模に限界があります。一般KWはCPAが高いですが、伸びしろがあります。

この2つのバランスを取りながら、まず指名を守り、次に一般で攻め、さらにSNSで認知を作る、という順番が重要です。`
      },
      {
        title: 'SNS広告は「刈り取り」ではなく「教育」',
        content: `クリニックのSNS広告は、検索のように「今すぐ客」を取るのは難しいです。

そのためSNS広告は、不安を言語化する、クリニックの信頼を作る、"この医院なら大丈夫そう"という印象を作る、指名検索を増やす、という役割が強くなります。

つまりSNS広告のKPIは、CVだけで見ると成果が出にくく、指名検索の増加で見ると成果が見えてきます。`
      },
      {
        title: '代理店の価値は「数字」ではなく「意思決定支援」',
        content: `広告運用で一番重要なのは、実は「院長が意思決定しやすい形で情報をまとめる」ことです。

院長はお忙しいです。そしてマーケティングに詳しい方もいれば、そうでない方もいらっしゃいます。

私たちは、数字を見せるだけでなく、次の打ち手を3つ提示し、そのメリット・デメリットも説明し、院長に選んでいただく。ここまでやらせていただきます。`
      }
    ]
  },
  {
    id: 'lp',
    label: 'LP',
    en: 'Landing Page',
    title: '心を動かす LP制作',
    subtitle: '患者様の心に響くランディングページを丁寧に設計。',
    color: '#a08060',
    points: [
      {
        title: 'LPは「広告の続き」ではない。「不安の解消装置」である',
        content: `患者様は、広告をクリックした瞬間に半分は不安になっています。

本当にここでいいのか、怖い、高いのでは、変なところだったら嫌だ、先生が冷たかったら嫌だ。このような不安を抱えています。

LPはこの不安を解消し、「ここなら大丈夫」という安心感を作る装置です。`
      },
      {
        title: 'クリニックLPで最重要なのは"信頼"',
        content: `どんなにデザインが良くても、信頼がなければ患者様は来院されません。

信頼を作る要素は主に、医師の顔と考え方（理念）、院内の写真（清潔感）、料金の明確さ、対応できる症状の具体性、診療時間・アクセス、よくある質問、口コミ（扱い注意）、リスク説明（誠実さ）です。

この「誠実さ」がCVRを決めます。`
      },
      {
        title: '"心を動かす"とは「言葉を美しくする」ではない',
        content: `ここが重要なポイントです。

心を動かすとは、不安が消える、自分のことを分かってくれていると感じる、恥ずかしさが減る、行動する理由ができる。この心理の変化を作ることです。

コピーが綺麗でも、心理が動かなければ意味がありません。`
      },
      {
        title: 'LPの勝敗は「ファーストビュー」で決まる',
        content: `患者様は3秒で判断されます。

何のページか、自分に関係あるか、信頼できるか、予約が簡単か。この4つをファーストビューで伝えられるかが勝負です。`
      },
      {
        title: '予約導線は「選択肢を増やす」ほどCVRが上がる場合が多い',
        content: `クリニックの患者様は状況がさまざまです。電話したい方、LINEがいい方、Web予約したい方、まず質問したい方がいらっしゃいます。

そのため導線は、Web予約、LINE、電話、問い合わせフォームを状況に応じてご用意すると効果的です。`
      },
      {
        title: '"勝つLP"は、実は文章量が多い',
        content: `よくある失敗は「おしゃれにしたくて情報を削りすぎる」ことです。

クリニックは、命、体、恥、痛み、お金が絡みますので、情報が多いほど患者様は安心されます。`
      }
    ]
  },
  {
    id: 'cr',
    label: 'CR',
    en: 'Creative',
    title: '墨絵のような クリエイティブ制作',
    subtitle: '余白と情緒を大切にした上質なデザインを提供。',
    color: '#8b7355',
    points: [
      {
        title: 'クリニックのクリエイティブは「広告のため」ではなく「医院の人格」',
        content: `美容や歯科は特にそうです。患者様は「この医院の雰囲気、合うかな？」で選ばれます。

つまりクリエイティブは、医院の人格（ブランド）を視覚化するものです。`
      },
      {
        title: '"墨絵のような"とは何か',
        content: `墨絵的とは、具体的には、情報を削ぎ落とす、余白で信頼を作る、強い言葉で煽らない、静かな自信、上品な清潔感、感情を丁寧に扱う、という方向性です。

医療広告の世界では、これは実はかなり効果的です。なぜなら競合は「安い！」「当日OK！」のように煽りがちだからです。`
      },
      {
        title: 'クリニックCRの勝敗は「信頼感」と「視認性」',
        content: `特にSNS広告では、一瞬で内容が伝わるか、文字が読めるか、うさんくさくないか。これで決まります。

医療は"うさんくささ"が出た瞬間に終わります。`
      },
      {
        title: 'CRの重要論点：医療広告でできる表現は限られる',
        content: `だからこそ、差が出ます。Before/After禁止、誇張禁止、実績訴求も注意、口コミ引用も注意が必要です。

この縛りの中で「魅力を伝える力」がクリエイティブの価値です。`
      },
      {
        title: '"余白"はブランドのため。CVのためにもなる',
        content: `余白は「高級感」に見えます。高級感は、自費メニュー、美容、審美、インプラント、再生医療、セクレトームで非常に効果的です。

逆に、余白がないと、安売り、雑、信頼できないという印象を与えてしまいます。`
      }
    ]
  },
  {
    id: 'meo',
    label: 'MEO',
    en: 'MEO',
    title: '地域密着型 MEO対策',
    subtitle: 'Googleマップで上位表示を実現し、近隣からの来院を促進。',
    color: '#a08060',
    points: [
      {
        title: 'MEOは「無料の広告枠」である',
        content: `Googleマップの上位表示は、広告費ゼロで予約が入ります。ただし、効果が出るまでに時間がかかります。`
      },
      {
        title: 'MEOは"対策"ではなく"運用"',
        content: `ここがポイントです。MEOは一回設定して終わりではありません。

写真を追加する、投稿を続ける、口コミを増やす、口コミに返信する、情報を最新化する。この積み重ねが順位を決めます。`
      },
      {
        title: 'MEOの本質は「口コミ×距離×関連性」',
        content: `順位はおおよそこの3つで決まります。近い（距離）、信頼されている（口コミ）、その検索意図に合っている（関連性）です。

そのため「口コミを増やす仕組み」まで設計できる代理店が効果を出せます。`
      },
      {
        title: 'MEOの勝敗は写真で決まる',
        content: `マップで選ばれるかどうかは、外観、内観、先生、受付、清潔感の写真で決まります。

写真が弱いと、順位が高くても選ばれません。`
      }
    ]
  },
  {
    id: 'web',
    label: 'WEB',
    en: 'Website',
    title: '信頼を伝える Webサイト制作',
    subtitle: 'クリニックの世界観を表現する洗練されたサイト。',
    color: '#8b7355',
    points: [
      {
        title: 'クリニックのWebサイトは「採用・信頼・紹介」に効く',
        content: `LPは刈り取りのためのもの。Webサイトは資産です。

口コミを見た方が確認に来る、家族に紹介するときに見せる、看護師が応募するときに見る。このような役割が強いです。`
      },
      {
        title: '"信頼"は情報設計で作る',
        content: `デザインよりも重要なのは、情報が整理されていること、メニューが分かりやすいこと、料金が明確なこと、医師紹介が丁寧なこと、よくある質問があることです。

この「読みやすさ」が信頼を作ります。`
      },
      {
        title: 'SEOの土台になる',
        content: `クリニックはSEOでも効果を出しやすいです。症状ページ、診療科ページ、コラムなどが重要になります。

これらが資産となり、広告費を下げることにつながります。`
      }
    ]
  },
  {
    id: 'co',
    label: 'CO',
    en: 'Consulting',
    title: '戦略的 マーケティング支援',
    subtitle: '市場調査から施策提案まで一気通貫でサポート。',
    color: '#a08060',
    points: [
      {
        title: '戦略とは「何をやらないか」を決めること',
        content: `クリニックには施策が無限にあります。Google広告、Meta広告、YouTube、TikTok、SEO、MEO、LINE、口コミ、ポータル、チラシ、地域連携などです。

全部やろうとすると破綻します。だからこそ戦略とは「捨てるものを決める」ことです。`
      },
      {
        title: '重要なのは"患者の検討フロー"の設計',
        content: `患者様はこのように動きます：症状を調べる → 近くの医院を探す → 口コミを見る → HPを見る → 予約する。

この流れのどこで勝つかを決めることが重要です。`
      },
      {
        title: 'クリニックのマーケは「ブランドと刈り取り」の両立',
        content: `刈り取りだけですとCPAが上がり続けます。ブランドだけですと予約が増えません。

この両立が戦略です。`
      },
      {
        title: '代理店が提供すべき最大の価値は「院長の意思決定を前に進めること」',
        content: `今月は何を優先するか、どの診療科を伸ばすか、何に投資するか、どの表現がリスクか。

これらを整理して、院長の意思決定をサポートいたします。`
      }
    ]
  },
]

const ServiceSection = ({ service, index }) => {
  const ref = useRef(null)
  const [expandedPoint, setExpandedPoint] = useState(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <motion.section 
      ref={ref}
      id={service.id}
      className={`section ${index % 2 === 1 ? 'section-gray' : ''}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background decoration */}
      <motion.div
        style={{
          position: 'absolute',
          right: index % 2 === 0 ? '-10%' : 'auto',
          left: index % 2 === 1 ? '-10%' : 'auto',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 300,
          opacity: 0.03,
          fontWeight: 900,
          fontFamily: 'Inter, sans-serif',
          y,
          pointerEvents: 'none'
        }}
      >
        {service.label}
      </motion.div>

      <div className="section-inner">
        <motion.div 
          className="service-detail"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="service-detail-header">
            <motion.span 
              className="service-detail-label"
              style={{ backgroundColor: service.color }}
            >
              {service.label}
            </motion.span>
            
            <p className="service-detail-en" style={{ marginTop: 24 }}>{service.en}</p>
            
            <motion.h2 className="service-detail-title">
              {service.title.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  style={{ display: 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h2>
            <p className="service-detail-desc">{service.subtitle}</p>
          </motion.div>

          <div className="service-points">
            {service.points.map((point, i) => (
              <motion.div 
                key={i}
                className={`service-point ${expandedPoint === i ? 'service-point--expanded' : ''}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setExpandedPoint(expandedPoint === i ? null : i)}
              >
                <div className="service-point-header">
                  <span className="service-point-number" style={{ backgroundColor: service.color }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="service-point-title">{point.title}</h4>
                  <span className="service-point-toggle">
                    {expandedPoint === i ? '−' : '+'}
                  </span>
                </div>
                <motion.div 
                  className="service-point-content"
                  initial={false}
                  animate={{ 
                    height: expandedPoint === i ? 'auto' : 0,
                    opacity: expandedPoint === i ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{point.content}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="service-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact" className="btn-primary interactive">
                このサービスについて相談する
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

const ServicesPage = () => {
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
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ duration: 1 }}
          >
            SERVICES
          </motion.p>
          <motion.h1 
            className="page-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            サービス一覧
          </motion.h1>
          <motion.p 
            className="page-hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            クリニックに特化したマーケティングサービス
          </motion.p>
        </motion.div>
        <motion.div 
          className="page-hero-bg-text"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          SERVICE
        </motion.div>
      </section>

      {/* Metrics Section */}
      <section className="metrics-section">
        <div className="metrics-section-inner">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <p className="section-eyebrow">Our Approach</p>
            <h2 className="section-title">数字の先にある、本当の成果</h2>
          </motion.div>
          
          <div className="metrics-content">
            <motion.div 
              className="metrics-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3>私たちは、広告の数字だけを追う会社ではありません。</h3>
              <p>
                クリックやコンバージョンは、あくまで途中の指標です。<br />
                本当に見るべきものは、その先にある<br />
                <span className="highlight">売上、利益、クリニックとしての継続的な発展。</span>
              </p>
              <p>
                広告が良く見えても、事業が動いていなければ意味がない。<br />
                Sumieは、広告を「成果の入口」ではなく、<br />
                ビジネスを前に進めるための設計として捉え、<br />
                <span className="highlight">売上・利益につながる運用</span>を行います。
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <MetricsFlow />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}
    </div>
  )
}

export default ServicesPage
