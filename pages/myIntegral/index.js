const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    integralList: [
      // { name: '消费积分', iconType: 'menu-product', number:'733239'},
      // { name: '冻结消费积分', iconType: 'kanjia', number: '0' },
      // { name: '积分', iconType: 'favorites', number: '56' },
      // { name: '购买积分', iconType: 'pintuan', number: '78999' },
    ],
    payScore:'',
    score:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getMyIntegral()
  },
  /**
   * 获取我的积分
   */
  getMyIntegral: function () {
    let _this = this;
    App._get('user.score/mine', {}, function (result) {
      _this.setData({ 
        payScore: result.data && result.data.integral ? result.data.integral.paysocre :'0',
        score: result.data && result.data.integral ? result.data.integral.score : '0'
      });
    });
  },
});