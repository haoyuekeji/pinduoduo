//index.js
//获取应用实例
const app = getApp()
const localhost = app.localhost.localhost
const token = app.token.token
Page({
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 2500,
        duration: 1500,

    },

    onLoad: function () {
        wx.showLoading({
            title: '加载中',
        })
        var that = this
        //调用应用实例的方法获取全局数据

        wx.request({
            url: localhost + '/seller/index',
            data: {
                token: token,
                pageSize: 20,
                active: true
            },
            success: function (res) {
                console.log(res)
                if (res.data.message === "当前用户未登录") {
                    wx.showModal({
                        content: res.data.message,
                    })
                    wx.hideLoading();
                    return false
                }
                var monthSale = 0;
                const imgUrls = res.data.data[0].split(',');
                imgUrls.length === 1 && that.setData({
                    indicatorDots: false
                });
                const img = imgUrls[0]
                that.setData({
                    imgUrls: imgUrls,
                    img: img

                })
                wx.hideLoading();
            },
            fail: function () {
                wx.hideLoading();
                wx.showModal({
                    title: '提示',
                    content: '网络信号弱，请稍后再试！',
                })
            }
        })



        // if (app.globalData.userInfo) {
        //   this.setData({
        //     userInfo: app.globalData.userInfo,
        //     hasUserInfo: true
        //   })
        // } else if (this.data.canIUse){
        //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //   // 所以此处加入 callback 以防止这种情况
        //   app.userInfoReadyCallback = res => {
        //     this.setData({
        //       userInfo: res.userInfo,
        //       hasUserInfo: true
        //     })
        //   }
        // } else {
        //   // 在没有 open-type=getUserInfo 版本的兼容处理
        //   wx.getUserInfo({
        //     success: res => {
        //       app.globalData.userInfo = res.userInfo
        //       this.setData({
        //         userInfo: res.userInfo,
        //         hasUserInfo: true
        //       })
        //     }
        //   })
        // }




    },
    onShareAppMessage: function () {
        return {
            title: '商家' + '超值团购',
            path: '/pages/index/index'
        }
    }
})
