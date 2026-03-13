# CLAUDE.md - Progrit0003 プロジェクト

## プロジェクト概要

- **プロジェクト名**: progrit0003
- **技術スタック**: Next.js (App Router) + TypeScript + Tailwind CSS v4
- **アプリ内容**: 未定（今後決定）
- **デプロイ先**: Vercel

---

## 開発ワークフロー

### ステップ1: ローカル開発
```bash
npm install        # 初回のみ
npm run dev        # 開発サーバー起動 (http://localhost:3000)
npm run build      # ビルド確認
npm run lint       # Lint実行
```

### ステップ2: GitHubにプッシュ
```bash
git add .
git commit -m "feat: ..."
git push origin main
```

### ステップ3: Vercelにデプロイ
- GitHub連携で自動デプロイ（推奨）
- または `vercel` コマンドで手動デプロイ

---

## 初期セットアップ手順（Claude Codeで最初に実行）

### 1. GitHub認証
```bash
gh auth login
# → GitHub.com → HTTPS → ブラウザで認証
gh auth status  # 確認
```

### 2. GitHubリポジトリ作成 & プッシュ
```bash
gh repo create progrit0003 --private --source=. --remote=origin --push
```

### 3. Vercel認証 & プロジェクト連携
```bash
npm i -g vercel
vercel login
vercel link       # プロジェクトをVercelに連携
vercel            # プレビューデプロイ
vercel --prod     # 本番デプロイ
```

### 4. Vercel × GitHub自動デプロイ設定
- Vercelダッシュボード → Import Git Repository → progrit0003を選択
- main ブランチへのプッシュで自動デプロイされる

---

## ディレクトリ構造

```
progrit0003/
├── CLAUDE.md              # このファイル（プロジェクトメモリ）
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── .eslintrc.json
├── .gitignore
├── public/                # 静的アセット
└── src/
    ├── app/               # Next.js App Router
    │   ├── layout.tsx     # ルートレイアウト
    │   ├── page.tsx       # トップページ
    │   ├── globals.css    # グローバルCSS
    │   └── api/           # APIルート
    ├── components/
    │   ├── ui/            # 再利用可能なUIコンポーネント
    │   └── layout/        # レイアウトコンポーネント
    ├── lib/               # ユーティリティ・外部ライブラリ
    ├── hooks/             # カスタムReact Hooks
    ├── types/             # TypeScript型定義
    ├── utils/             # ヘルパー関数
    └── styles/            # 追加スタイル
```

---

## エージェントチーム運用ルール

### モデル割り当て（コスト最適化）

| 役割 | モデル | 担当内容 |
|------|--------|----------|
| **アーキテクト** | **Opus** | 設計判断、技術選定、全体方針策定 |
| **レビュアー** | **Opus** | コードレビュー、品質チェック、セキュリティレビュー |
| 実装者 | Sonnet | 機能実装、コンポーネント作成、API実装 |
| テスター | Sonnet | テスト作成・実行、バグ修正 |
| ドキュメント | Sonnet | ドキュメント作成・更新 |

### ルール
- **最重要な判断（設計・レビュー）にはOpusを使用**
- **実行タスク（実装・テスト・ドキュメント）にはSonnetを使用**
- エージェントチーム（並列実行）は積極的に活用してOK
- Opusはアーキテクトとレビュアーの2役に限定し、コスト効率を維持

### Claude Codeでの実行例
```bash
# アーキテクト（Opus）に設計を依頼
claude --model opus "この機能の設計方針を決めてください"

# 実装者（Sonnet）に実装を依頼
claude --model sonnet "この設計に基づいて実装してください"

# レビュアー（Opus）にレビューを依頼
claude --model opus "このPRをレビューしてください"
```

---

## コーディング規約

- **言語**: TypeScript（strict mode）
- **スタイル**: Tailwind CSS v4 のユーティリティクラス優先
- **コンポーネント**: 関数コンポーネント + React Hooks
- **命名規則**:
  - コンポーネント: PascalCase（例: `UserProfile.tsx`）
  - ユーティリティ: camelCase（例: `formatDate.ts`）
  - 型定義: PascalCase（例: `User.ts`）
  - API: kebab-case（例: `api/user-profile/route.ts`）
- **インポート**: `@/*` エイリアスを使用（例: `@/components/ui/Button`）
- **コミットメッセージ**: Conventional Commits形式
  - `feat:` 新機能
  - `fix:` バグ修正
  - `refactor:` リファクタリング
  - `docs:` ドキュメント
  - `style:` スタイル変更
  - `test:` テスト

---

## 環境変数（.env.local）

```bash
# 必要に応じて追加
# NEXT_PUBLIC_API_URL=
# DATABASE_URL=
```

---

## メモ・決定事項

- 2026/03/12: プロジェクト初期化。アプリ内容は今後決定。
- デプロイフロー: ローカル開発 → GitHub Push → Vercel自動デプロイ
