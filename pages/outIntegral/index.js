const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
  
  },
  // 表单提交
  formSubmit: function(e) {
    const message = e.detail.value;
    let _this = this;
    App._post_form('user.score/rollout', message, function (result) {
      App.showSuccess(result.msg);
      
    });
  }
});