const app = getApp();
const token = app.token.token;
const localhost = app.localhost.localhost;
const appid = app.appid.appid;
const util = require('../../utils/util.js');//获取数据
const myData = require('../../utils/data.js');//获取静态数据
let myformId = ''
let title = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        unindex: 0,
        text: myData.text,
        url: myData.url,
        cover_stu: true
    },
    kong: function () {

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
    cover: function () {
        const cover_stu = this.data.cover_stu
        this.setData({
            cover_stu: !cover_stu
        })

    },
    copy: function (e) {
        const data = e.target.dataset.con
        wx.setClipboardData({
            data: data,
        })
    },
    formId: function (e) {
        myformId = e.detail.formId
    },
    //取消订单
    cancle: function () {
        setTimeout(function () {
            console.log('我是：' + myformId)
        }, 5)

    },
    //付款
    pay: function () {

    },
    //邀请好友
    invite: function () {

    },
    //再次购买
    payagain: function () {

    },
    //确认收货
    sure: function () {

    },
    //查看物流
    check: function () {

    },
    //评论
    judge: function () {

    },
    //删除已完成订单
    del: function () {

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
        //数据获取
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
        wx.hideShareMenu({})
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
        return {
            title:'',
            path:'pages/details/details'
        }
    }
})