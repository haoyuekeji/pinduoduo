const app = getApp()
const localhost = app.localhost.localhost
const token = app.token.token
Page({

    /**
     * 页面的初始数据
     */
    data: {
        unindex: 0,
        text: [
            {
                text: '待付款',
                url: '../../images/waitpay.png'
            },
            {
                text: '待拼单',
                url: '../../images/merge.png'
            },
            {
                text: '待发货',
                url: '../../images/waitsend.png'
            },
            {
                text: '待收货',
                url: '../../images/waittake.png'
            },
            {
                text: '待评价',
                url: '../../images/wait.png'
            }
        ],
        url: [
            '../../images/waitpay_ing.png',
            '../../images/merge_ing.png',
            '../../images/waitsend_ing.png',
            '../../images/waittake_ing.png',
            '../../images/wait_ing.png'
        ]

    },
    setting: function () {
        wx.openSetting({

        })
    },
    choose: function (e) {
        const ind = e.target.dataset.index
        const state = e.target.dataset.text
        this.setData({
            unindex: ind
        })
        wx, wx.navigateTo({
            url: '../../pages/order/order?index=' + ind + '&&state=' + state,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this
        if (app.globalData.userInfo) {
            that.setData({
                avatarUrl: app.globalData.userInfo.avatarUrl,
                nickname: app.globalData.userInfo.nickName,
                hasUserInfo: true
            })
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: function (res) {
                    app.globalData.userInfo = res.userInfo
                    that.setData({
                        avatarUrl: res.userInfo.avatarUrl,
                        nickname: res.userInfo.nickName,
                        hasUserInfo: true
                    })
                }
            })
        }

        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: localhost + "/customer/proSearch",
            data: {
                token: token
            },
            success: function (res) {
                const content = res.data.data;
                const cons = [];
                var monthSale = 0;
                for (let i = 0; i < content.length; i++) {
                    let ptypeName = content[i].ptypeName;
                    let img = content[i].indexImages.split(',')[0];
                    content[i].monthSale === null ? monthSale = 0 : monthSale = content[i].monthSale
                    cons.push({ con: content[i].pname, imgurl: img, price: content[i].produtsTypes[0].discountPrice, id: content[i].id, monthSale: monthSale });
                }
                cons.sort(that.sortmonthSale).reverse()
                that.setData({
                    cons: cons
                })
                wx.hideLoading()
            }
        })





    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})