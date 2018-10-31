## 接口文档
### 注册接口
+ 接口名称
  注册接口
+ 请求地址
  `/register`
+ 请求方式
  POST
+ 参数说明
| 参数名称    |是否必须 | 说明    |
| --------| ----| ----- |
| username|是   |用户名 |
| password|是   |用户密码|
+ 实例
```javascript
{
    username: 'abc',
    password: 123
}

```
+ 返回参数
| 参数      | 说明  |
| --------| ----- |
| code:0    | 注册成功 |
| code:1    | 注册失败 |
+ 示例
```javascript
//成功返回
{
    "code": 0,
    "data": {
        "_id": "5bd99dee8c5ebf1ee0db3832",
        "username": "abc3"
    }
}
//失败返回
{
    "code": 1,
    "msg": "用户名已存在"
}
```

### 登录接口
+ 接口名称
  登录接口
+ 接口地址
`/login`
+ 请求方式
    POST
+ 参数说明
| 参数      | 说明  |
| --------| ----- |
| code:0    | 注册成功 |
| code:1    | 注册失败 |
+ 示例
```javasript
// 成功返回
{
    "code": 0,
    "data": {
        "_id": "5bcd6a720d0fe51e48483527",
        "username": "abc"
    }
}
// 失败返回
{
    "code": 1,
    "msg": "用户名或密码错误"
}
```
### 自动登录接口
+ 接口名称
  获取登录信息(需要cookie)
+ 接口地址
`/getuserinfo`
+ 请求方式
    GET
+ 参数说明
无
+ 示例
```javascript
{
  "code": 0,
  "data": {
        "_id": "5bcd6a720d0fe51e48483527",
         "username": "abc"
        }
}

```
### 秒杀接口
+ 接口名称
  秒杀接口(需要登录)
+ 接口地址
`/skProducts`
+ 请求方式
    GET
+ 参数说明
无
+ 示例
```javascript
 {
      "id":131501,
      "img_Url":"https://img14.360buyimg.com/n1.jpg",
      "price": 88,
      "old_price": 118
 }
```
### 商品接口
+ 接口名称
  商品接口(需要登录)
+ 接口地址
`/products`
+ 请求方式
    GET
+ 参数说明
无
+ 示例
```javascript
 {
     "id":131401,
     "title":"荣耀10 GT游戏加速 AIS手持夜景 8GB+128GB 幻夜黑 全网通 移动联通电信4G 双卡双待 游戏手机",
     "img_Url":"https://img12.360buyimg.com/5b514641Nf93f5c79.jpg!q70.dpg",
     "price": 3299,
     "stock": 66,
     "info_Img":[
       "https://img12.360buyimg.com//5b514641Nf93f5c79.jpg!q70.dpg",
       "https://m.360buyimg.com//4072cad5/5b5146ebN9922945f.jpg!q70.dpg.webp"
     ],
     "express":"免运费"
 }
```
### 分类列表
+ 接口名称
  分类列表接口(需要登录)
+ 接口地址
`/categorys`
+ 请求方式
    GET
+ 参数说明
无
+ 示例
```javascript
 {
  "title":"女装",
  "producks":[
    {
      "pro_title":"连衣裙",
      "pro_img":"https://img.alicdn.com/2053469401.png_310x310.jpg"
    }
  ]
 }
```
### 购物车接口
+ 购物车接口
  获取购物车列表接口(需要登录)
+ 接口地址
`/getshopcart`
+ 请求方式
    GET
+ 参数说明
无
+ 示例
```javascript
 {
   "code": 0,
   "carts": [
       {
         "id": 131401,
         "title": "荣耀10 GT游戏加速 AIS手持夜景 8GB+128GB 幻夜黑 全网通 移动联通电信4G 双卡双待 游戏手机",
         "img_Url": "https://img12.360buyimg.com/n7/jfs.jpg!q70.dpg",
         "count": 1,
         "price": 3299,
         "select": 1
     },
     {
         "id": 131403,
         "title": "联想 Lenovo S5全面屏双摄 4G+64G 全网通4G手机 双卡双待 烈焰红",
         "img_Url": "https://m.360buyimg.com/mobilecms/s750x750_jfs.jpg!q80.dpg.webp",
         "count": 1,
         "price": 3299,
         "select": 1
       }
   ]
 }
```
+ 加入购物车接口
  加入购物车接口(需要登录)
+ 接口地址
`/addshopcart`
+ 请求方式
   POST
+ 参数说明
| 参数名称    |是否必须 | 说明    |
| --------| ----| ----- |
| id   |是   |商品id |
| title|是   |商品标题|
| price|是   |商品单价|
| img_Url|是   |商品图片|
| count|是   |商品数量|
+ 示例
```javascript
 // 成功返回
 {
   "code": 0,
   "msg":"添加购物车成功"
 }
 // 失败返回
 {
   "code": 1,
   "msg":"加入购物车失败"
 }
```
+ 删除购物车商品接口
  删除购物车商品接口(需要登录)
+ 接口地址
`/deleteshops`
+ 请求方式
   GET
+ 参数说明
| 参数名称    |是否必须 | 说明    |
| --------| ----| ----- |
| id   |是   |商品id |
+ 示例
```javascript
 // 成功返回
 {
   "code": 0,
   "msg":"删除成功"
 }
 // 失败返回
 {
   "code": 1,
   "msg":"删除失败"
 }
```
|-- login