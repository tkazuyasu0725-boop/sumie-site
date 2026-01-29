# React 3D Hero

Vite + React + React Three Fiber を使用した3Dエフェクト付きファーストビュー

## 技術スタック

- **Vite** - 高速ビルドツール
- **React 18** - UIライブラリ
- **React Three Fiber** - Three.jsのReactラッパー
- **@react-three/drei** - Three.jsヘルパー
- **Framer Motion** - UIアニメーション

## セットアップ

### 1. Node.jsのインストール

Node.js がインストールされていない場合は、以下からダウンロード・インストールしてください：

https://nodejs.org/

### 2. 依存関係のインストール

```bash
cd hero-react
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開きます。

### 4. 本番ビルド

```bash
npm run build
```

`dist` フォルダにビルド成果物が出力されます。

## 3Dエフェクトの内容

- **FloatingShapes** - 浮遊する3Dジオメトリ（球体、トーラス、八面体など）
- **マウス追従** - マウス位置に応じてオブジェクトが動く
- **パーティクル** - 背景に浮遊する粒子
- **グローリング** - アクセントカラーの光る輪

## ファイル構成

```
hero-react/
├── package.json
├── vite.config.js
├── index.html
├── public/
│   └── vite.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── components/
        ├── Hero.jsx          # メインコンテナ
        ├── Scene3D.jsx       # 3Dシーン設定
        ├── FloatingShapes.jsx # 3Dオブジェクト
        └── HeroContent.jsx   # テキストコンテンツ
```

## カスタマイズ

### 色の変更

`src/App.css` の CSS変数を変更：

```css
:root {
  --accent: #00c896;      /* アクセントカラー */
  --accent-light: #00e6ac;
}
```

### 3Dオブジェクトの追加

`src/components/FloatingShapes.jsx` で `FloatingShape` コンポーネントを追加：

```jsx
<FloatingShape
  position={[x, y, z]}
  geometry="sphere"  // sphere, torus, octahedron, icosahedron, torusKnot
  color="#00c896"
  speed={1}
  distort={true}
  scale={1}
/>
```
