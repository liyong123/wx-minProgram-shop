'use strict';
const app = getApp()
Component({
  properties:{
    serval: {
      type: 'String',
      value: '推荐列表'
    }
  },
   /**
    * 初始数据
    */
  data: {
    treeList: [],
    // treeData: [
    //   { id: 1, parentId: 0, name: "一级菜单A", rank: 1, code: '1' },// rank:代表第几级树节点；code：代表包含哪些子节点ID；
    //   { id: 2, parentId: 0, name: "一级菜单B", rank: 1, code: '2' },
    //   { id: 3, parentId: 0, name: "一级菜单C", rank: 1, code: '3' },
    //   { id: 4, parentId: 1, name: "二级菜单A-A", rank: 2, code: '1,4' },
    //   { id: 5, parentId: 1, name: "二级菜单A-B", rank: 2, code: '1,5' },
    //   { id: 6, parentId: 2, name: "二级菜单B-A", rank: 2, code: '2,6' },
    //   { id: 7, parentId: 4, name: "三级菜单A-A-A", rank: 3, code: '1,4,7' },
    //   { id: 8, parentId: 7, name: "四级菜单A-A-A-A", rank: 4, code: '1,4,7,8' },
    //   { id: 9, parentId: 8, name: "五级菜单A-A-A-A-A", rank: 5, code: '1,4,7,8,9' },
    //   { id: 10, parentId: 9, name: "六级菜单A-A-A-A-A-A", rank: 6, code: '1,4,7,8,9,10' },
    //   { id: 11, parentId: 10, name: "七级菜单A-A-A-A-A-A-A", rank: 7, code: '1,4,7,8,9,10,11' },
    //   { id: 12, parentId: 11, name: "八级菜单A-A-A-A-A-A-A-A", rank: 8, code: '1,4,7,8,9,10,11,12' },
    //   { id: 13, parentId: 12, name: "九级菜单A-A-A-A-A-A-A-A-A", rank: 9, code: '1,4,7,8,9,10,11,12,13' },
    //   { id: 14, parentId: 13, name: "十级菜单A-A-A-A-A-A-A-A-A-A", rank: 10, code: '1,4,7,8,9,10,11,12,13,14' },
    // ],
    treeData: [
      { id: 1, parentId: 0, name: "我的推荐列表", rank: 1, code: '1' },// rank:代表第几级树节点；code：代表包含哪些子节点ID；
      { id: 4, parentId: 1, name: "二级菜单A-A", rank: 2, code: '1,4' },
      { id: 5, parentId: 1, name: "二级菜单A-B", rank: 2, code: '1,5' },
      { id: 7, parentId: 4, name: "三级菜单A-A-A", rank: 3, code: '1,4,7' },
      { id: 8, parentId: 7, name: "四级菜单A-A-A-A", rank: 4, code: '1,4,7,8' },
      { id: 9, parentId: 8, name: "五级菜单A-A-A-A-A", rank: 5, code: '1,4,7,8,9' },
      { id: 10, parentId: 9, name: "六级菜单A-A-A-A-A-A", rank: 6, code: '1,4,7,8,9,10' },
      { id: 11, parentId: 10, name: "七级菜单A-A-A-A-A-A-A", rank: 7, code: '1,4,7,8,9,10,11' },

    ],
    index: 0,
    left: 40
  },
  // 组件创建函数（如果是后台请求的数据，可以在里面实现）
  created: function () {
    var that = this;
    var array = that.treeData();
    console.log("array:", array)
    if (array.length > 0) {
      for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        var list = that.data.treeList;
        var index_i = that.data.index;
        obj["checked"] = true;
        // 该节点是否打开
        obj["open"] = false;
        list[index_i] = obj;

        that.setData({
          treeList: list,
          index: index_i + 1
        });
        if (obj.children != undefined) {
          that.collectTree(obj.children);
        }
       
        var newList = that.data.treeList;
        if(newList.length>0){
          if (newList[0].children != undefined) {
             newList[0].open = true;
             for(var k = 0; k<newList[0].children.length;k++){
                newList[0].children[k].checked =true;
             }
            that.setData({
              treeList: newList
            })
          }
        }
        
      }

      console.log("list:", that.data.treeList)

     
    }
  },

  ready: function () {
    var that = this;
    that.setData({
      treeList: that.data.treeList
    });
  },

  /**
   * 组件的方法列表
   */
  methods:{
    collectTree: function (list) {
      var that = this;
      if (list.length > 0) {
        for (var j = 0; j < list.length; j++) {
          var list1 = that.data.treeList;
          var index_i = that.data.index;
          var obj1 = list[j];
          obj1["checked"] = false;
          // 该节点是否打开
          obj1["open"] = false;
          list1[index_i] = obj1;
          that.setData({
            treeList: list1,
            index: index_i + 1
          });

          if (obj1.children == undefined) {
            continue;
          } else {
            if (obj1.children.length > 0) {
              that.collectTree(obj1.children);
            }
          }
        }
      }
    },
    selectNode: function (e) {
      var that = this;
      var trees = that.data.treeList;
      console.log("treeList:", trees)
      for (var i = 0; i < trees.length; i++) {
        var obj = trees[i];
        if (e.target.id == obj.id) {
          if (obj.open) {

            obj["open"] = false;
            trees[i] = obj;
            for (var j = i; j < trees.length; j++) {
              var obj1 = trees[j];
              if (obj1.code.indexOf(e.target.id) >= 0 && e.target.id != obj1.id) {
                obj1["checked"] = false;
                obj1["open"] = false;
                trees[j] = obj1;
              }
            }
          } else {
      
            obj["open"] = true;
            trees[i] = obj;
            for (var j = 0; j < trees.length; j++) {
              var obj1 = trees[j];
              if (e.target.id == obj1.parentId) {
                obj1["checked"] = true;
                trees[j] = obj1;
              }
            }
          }
        }
      }

      that.setData({
        treeList: trees
      });
      console.log(that.data.treeList);
    },
    // 重新对tree进行循环
    reloadTreeData: function (id) {
      var that = this;
      var list = that.data.treeList;
      if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          var obj = list[i];
          if (id == obj.parentId) {
            if (obj.checked) {
              obj["checked"] = false;
            } else {
              obj["checked"] = true;
            }
            list[i] = obj;
            that.setData({
              treeList: list
            });
            that.reloadTreeData(obj.id);
          } else {
            list[i] = obj;
            that.setData({
              treeList: list
            });
          }
        }
      }
    },
    treeData: function () {
      var that = this;
      let cloneData = that.data.treeData;    // 对源数据深度克隆
      let tree = cloneData.filter((father) => {              //循环所有项
        let branchArr = cloneData.filter((child) => {
          return father.id == child.parentId      //返回每一项的子级数组
        });
        if (branchArr.length > 0) {
          father.children = branchArr;    //如果存在子级，则给父级添加一个children属性，并赋值
        }
        return father.parentId == 0;      //返回第一层
      });
      return tree     //返回树形数据
    } 
  }
})