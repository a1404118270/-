const mongoose  = require('mongoose')

mongoose.connect('mongodb://localhost:27017/xyysc_db',{ useNewUrlParser: true })

const conn = mongoose.connection

conn.on('connected', () => {
  console.log('数据库连接成功')
})

const userSchema = mongoose.Schema({
  username: {
    type: String, required: true
  }, // 用户名
  password: {
    type: String, required: true
  }, // 密码
  address: { //地址数组
    type: Array
  },
  shopCarts: { //购物车数组
    type: Array
  }
})
const UserModel = mongoose.model('user',userSchema)

//向外暴露模型对象
exports.UserModel = UserModel