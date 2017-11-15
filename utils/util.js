const request = require('./request.js')
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//根据订单状态进行查询
function getstatus(stu, localhost, openid, token, callback) {
    switch (stu) {
        case 0:
            wx.request({
                url: localhost + '/order/clist',
                data: {
                    openId: openid,
                    state: "待付款订单",
                    sellerId: token
                },
                success: function (res) {
                    const content = res.data.data;
                    callback(content);
                }
            })
            break;
        case 1:
            wx.request({
                url: localhost + '/order/clist',
                data: {
                    openId: openid,
                    state: "待发货订单",
                    sellerId: token
                },
                success: function (res) {
                    const content = res.data.data;
                    callback(content);
                }
            })
            break;
        case 2:
            wx.request({
                url: localhost + '/order/clist',
                data: {
                    openId: openid,
                    state: "待收货订单",
                    sellerId: token
                },
                success: function (res) {
                    const content = res.data.data;
                    callback(content);
                }
            })
            break;
        case 3:
            wx.request({
                url: localhost + '/order/clist',
                data: {
                    openId: openid,
                    state: "已完成订单",
                    sellerId: token
                },
                success: function (res) {
                    let content = res.data.data;
                    for (let i = content.length - 1; i >= 0; i--) {
                        if (content[i].active === false) {
                            content.splice(i, 1);
                        }
                    }
                    callback(content)
                }
            })
            break;
    }
}


module.exports = {
    formatTime: formatTime,
    getstatus: getstatus
}
