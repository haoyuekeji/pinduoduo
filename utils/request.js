//请求函数
function request(url, data, fun) {
    wx.request({
        url: 'https://www.cslapp.com' + url,
        data: data,
        success: function (res) {
            typeof fun === "function" && fun(res)
        }
    })
}

module.exports = {
    request: request
}
