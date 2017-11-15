//订单页面切换数据
const Text = [
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
]

//订单页面图片切换
const OrderSrc = [
    '../../images/waitpay_ing.png',
    '../../images/merge_ing.png',
    '../../images/waitsend_ing.png',
    '../../images/waittake_ing.png',
    '../../images/wait_ing.png'
]

module.exports = {
    text: Text,
    url: OrderSrc
}