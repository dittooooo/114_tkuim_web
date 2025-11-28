###　 MONGODB_URI
mongodb:// -> 協定
week11-user:week11-pass@ -> 使用者的帳號密碼
localhost -> 主機位置
:27017 -> Port
/week11 -> 連線的資料庫
?authSource=week11 -> 認證用的資料庫

### Mongo Shell 指令範例

mongosh "mongodb://week11-user:week11-pass@localhost:27017/week11?authSource=week11"

db.participants.find().pretty();
db.participants.countDocuments();
db.participants.getIndexes();
