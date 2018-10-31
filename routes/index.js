const express = require('express')
const router = express.Router()
const {UserModel} = require('../db')
const md5 = require('blueimp-md5')
const filter = {password: 0}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'})
});
// 注册用户路由
router.post('/register', (req, res) => { //注册路由
  // 接收用户的请求参数数据
  const {username, password} = req.body
//  查询数据库中是否存在用户
  UserModel.findOne({username}).then(user => {
    if (user) {
      //已存在返回提示信息
      res.json({code: 1, msg: '用户名已存在'})
    } else {
      //不存在则将用户信息保存在数据库中
      new UserModel({username, password: md5(password)}).save().then(user => {
        // 生成一个cookie {userid: user._id } 给浏览器保存
        res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24 * 7}) //保存7天
        //  返回成功的数据
        res.json({code: 0, data: {_id: user._id, username}})
      })
    }
  })
//
})
// 用户登录路由
router.post('/login', (req, res) => { //登录路由
  const {username, password} = req.body
  UserModel.findOne({username, password: md5(password)}).then(user => {
    if (user) {
      //登录成功
      res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24 * 7}) //保存7天
      res.json({code: 0, data: {_id: user._id, username}})

    } else {
      //  登录失败
      res.json({code: 1, msg: '用户名或密码错误'})
    }
  })
})
//获取用户信息路由
router.get('/getuserinfo', (req, res) => {
  const {userid} = req.cookies
  UserModel.findOne({_id: userid}, filter).then(user => {
    if (user) { //成功
      res.json({code: 0, data: {_id: user._id, username: user.username}})
    } else {
      res.json({code: 1, msg: '获取用户信息失败'})
    }
  })
})
// 获取购物车信息
router.get('/getshopcart',(req, res) => {
  const {userid} = req.cookies
  console.log(userid);
  UserModel.findOne({_id: userid}, filter).then(user => {
    if (user) { //成功
      shopCarts = user.shopCarts //得到购物车数据
      res.json({code: 0, carts:shopCarts})
    } else {
      res.json({code: 1, msg:'获取购物车信息失败'})
    }
  })
})
// 加入购物车路由
router.post('/addshopcart', (req, res) => {
  const {userid} = req.cookies
  const {id, title, img_Url, count, price, select}  = req.body
  let shopCarts = [] //购物车
  UserModel.findOne({_id: userid}, filter).then(user => {
    if (user) { //成功
      shopCarts = user.shopCarts //得到之前的购物车数据
      let flag = false
      shopCarts.forEach(item => { //购物车中有这个商品累计数量
        if (item.id === id){
          item.count += count
          flag = true
        }
      })
      if (!flag) { //如果没有直接加入购物车数组中
        shopCarts.unshift({id, title, img_Url, count , price, select})
      }
      UserModel.findByIdAndUpdate({_id: userid},{shopCarts}).then( char => {
        console.log(char);
        if (char){// 成功
          res.json({code: 0, msg: '添加购物车成功'})
        } else { //失败
          res.json({code: 1, msg: '添加购物车失败'})
        }
      })
    }
  })

})
// 删除购物车中的数据
router.get('/deleteshop',(req, res) => {
  shopId = Object.keys(req.query)
  shopId = shopId.map(item => item.substring(2,item.length)*1) //获取到要删除的id
  const {userid} = req.cookies
  let shopCarts = [] //购物车
  UserModel.findOne({_id: userid}, filter).then(user => {
    if (user) { //成功
      shopCarts = user.shopCarts //得到之前的购物车数据

      shopId.forEach(item => { //根据下标过滤数组中的数据
        shopCarts = shopCarts.filter(shop => shop.id !== item)
      })
      UserModel.findByIdAndUpdate({_id: userid},{shopCarts}).then( char => {
        if (char){// 成功
          res.json({code: 0, msg: '删除购物车数据成功'})
        } else { //失败
          res.json({code: 1, msg: '删除购物车数据成功'})
        }
      })
    }
  })

  
})

module.exports = router;
