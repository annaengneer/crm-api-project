# CRM App

FastAPI・PostgreSQL・Next.js を使って作成したCRMアプリです。  
顧客情報の管理と、顧客ごとの商談管理ができます。



## 使用技術

### フロントエンド
- Next.js
- TypeScript
- Tailwind CSS

### バックエンド
- FastAPI
- SQLAlchemy

### データベース
- PostgreSQL（Docker）



## 主な機能

### 顧客管理
- 顧客一覧表示
- 顧客詳細表示
- 顧客登録
- 顧客更新
- 顧客削除

### 商談管理
- 商談登録
- 顧客ごとの商談一覧表示



## 画面構成

- `/customers`  
  顧客一覧ページ

- `/customers/new`  
  顧客登録ページ

- `/customers/[id]`  
  顧客詳細ページ

- `/customers/[id]/new-deal`  
  商談登録ページ



## 起動方法

## 起動方法

### 1. リポジトリをクローン

```bash
git clone リポジトリURL
cd crm-api-project
```



### 2. DockerでDBを起動

```bash
docker compose up -d
```

コンテナ確認

```bash
docker ps
```



### 3. バックエンド起動（FastAPI）

```bash
cd backend
```

仮想環境作成（初回のみ）

```bash
python3 -m venv venv
```

仮想環境有効化

```bash
source venv/bin/activate
```

依存関係インストール（初回のみ）

```bash
pip install -r requirements.txt
```

FastAPI起動

```bash
uvicorn main:app --reload
```

起動確認

- API: http://127.0.0.1:8000  
- Swagger: http://127.0.0.1:8000/docs  



### 4. フロントエンド起動（Next.js）

別ターミナルで実行

```bash
cd frontend
npm install
npm run dev
```

起動確認

- http://localhost:3000



### 5. 停止方法

Docker停止

```bash
docker compose down
```

FastAPI / Next.js 停止

```bash
Ctrl + C
```
