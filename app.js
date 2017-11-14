//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        var that = this
        //店铺浏览量
        wx.request({
            url: that.localhost.localhost + '/dictionary/addViews',
            data: {
                sellerId: that.token.token
            },
            fail: function (res) {
                wx.showModal({
                    title: '提示',
                    content: '网络信号弱，请稍后再试！',
                })
            }
        });
        // 登录
        wx.login({
            success: function (res) {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                    url: that.localhost.localhost + '/customer/getSessionKey',
                    data: {
                        appId: that.appid.appid,
                        code: res.code,
                        secret: "8bcdb74a9915b5685fa0ec37f6f25b24"
                    },
                    success: function (res) {
                        const openid = JSON.parse(res.data.data).openid;
                        //客户首次访问店铺
                        wx.request({
                            url: that.localhost.localhost + '/customer/loginOrReg',
                            data: {
                                openId: openid,
                                sellerId: that.token.token
                            }
                        })
                        //店铺访客数
                        wx.request({
                            url: that.localhost.localhost + '/dictionary/addVisitors',
                            data: {
                                openId: openid,
                                sellerId: that.token.token
                            }
                        })
                        wx.setStorageSync("openid", openid)
                    }
                })
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: function (res) {
                console.log(res)
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res)
                            // 可以将 res 发送给后台解码出 unionId
                            that.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null
    },
    localhost: {
        localhost: 'https://www.cslapp.com'
    },
    token: {
        token: 3
    },
    appid: {
        appid: 'wxe46b9aa1b768e5fe'
    }
})