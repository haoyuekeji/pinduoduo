const app = getApp();
const token = app.token.token;
const localhost = app.localhost.localhost;
const appid = app.appid.appid;
var util = require('../../utils/util.js');
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
    choose: function (e) {
        const ind = e.target.dataset.index
        this.setData({
            unindex: ind
        })
    },
    unindex: function () {
        this.setData({
            unindex: 5
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const ind = options.index
        const that = this;
        const cons = [];
        const openid = wx.getStorageSync('openid');
        this.setData({
            unindex: parseInt(ind)
        })
        const getstatus = util.getstatus(0, localhost, openid, token, function (data) {

            for (let i = 0; i < data.length; i++) {
                let imgurl = data[i].products[0].indexImages.split(",")[0];
                let con = data[i].products[0].pname;
                let color = data[i].produtsTypes[0].color;
                let size = data[i].produtsTypes[0].size;
                let priceNew = data[i].totalPrice.toFixed(2);
                let id = data[i].id;
                cons.push({ imgurl: imgurl, con: con, color: color, size: size, priceNew: priceNew, id: id, amount: data[i].amount })
            }
            that.setData({
                cons: cons
            })
        });
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