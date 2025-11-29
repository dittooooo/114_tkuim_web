## 啟動指令

docker-compose.yml -> docker compose up -d
server -> npm run dev

##　環境需求

###　 .env 說明
**PORT:** server 啟動後使用的 port

**MONGODB_URI:**
mongodb:// -> 協定
week11-user:week11-pass@ -> 使用者的帳號密碼
localhost -> 主機位置
:27017 -> Port
/week11 -> 連線的資料庫
?authSource=week11 -> 認證用的資料庫

**ALLOWED_ORIGIN:** 設定 CORS 允許的前端來源

## 測試方式

### 1. Mongo Shell 指令範例

mongosh "mongodb://week11-user:week11-pass@localhost:27017/week11?authSource=week11"

db.participants.find().pretty();
db.participants.countDocuments();
db.participants.getIndexes();

### 2. REST Client

/tests/test.http
測試 PATCH & DELETE 時需要自行跟換 @id 內容

## MongoDB compass

![Mongo compass](./Screenshot/mongoDB-compass.png)
