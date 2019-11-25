Page({
    data: {
        // 九宫格数据
        card: [
            {
                id: 1,
                prizeName: '10金币',
                img: '/dist/grid-card/image/001.jpg',
                status: 0 //   :0 反面 , 1 正面
            },
            {
                id: 2,
                prizeName: '10金币',
                img: '/dist/grid-card/image/002.jpg',
                status: 0
            },
            {
                id: 3,
                prizeName: '100金币',
                img: '/dist/grid-card/image/003.jpg',
                status: 0
            },
            {
                id: 4,
                prizeName: '10金币',
                img: '/dist/grid-card/image/004.jpg',
                status: 0
            },
            {
                id: 5,
                prizeName: '40金币',
                img: '/dist/grid-card/image/005.jpg',
                status: 0
            },
            {
                id: 6,
                prizeName: '20金币',
                img: '/dist/grid-card/image/006.jpg',
                status: 0
            },
            {
                id: 7,
                prizeName: '50金币',
                img: '/dist/grid-card/image/007.jpg',
                status: 0
            },
            {
                id: 8,
                prizeName: '60金币',
                img: '/dist/grid-card/image/008.jpg',
                status: 0
            },
            {
                id: 9,
                prizeName: '10金币',
                img: '/dist/grid-card/image/009.jpg',
                status: 0
            }
        ],
        ready: false ,// 是否点击开始抽奖
        gameover: false 
    },
    onLoad: function(options) {},
    /**
     * 点击开始抽奖
     */
    start() {
        if (this.data.ready) {
            wx.showToast({
                title: `已经开启抽奖`,
                icon: 'none'
            })
            return
        }
        // 触发组件开始方法
        this.selectComponent('#sol-grid-card').start(() => {
            // 动画结束后可以点击
            this.setData({
                ready: true 
            })
        })
    },

  replay() {

    this.selectComponent('#sol-grid-card').start(() => {
      // 动画结束后可以点击
      this.setData({
        ready: true
      })
    })
    
  
   this.setData({
     gameover:false
   })
   for(var id=0;id<9;id++){
    var tmp ="card["+id+"].status"
     this.setData({
       [tmp]: 0
     })
   }
  
    
  },
    // 子组件触发，点击打开单个卡片奖品
    openCard(e) {
      if (this.data.gameover) {
        wx.showToast({
          title: `一辈子只能爱一次哦`,
          icon: 'none'
        })
        return
      }
        const { item, index } = e.detail
        // 动画没有结束，或已经点开
        if (!this.data.ready || item.status == 1) {
            return
        }
        // 改变卡片翻转状态 status :0 反面 , 1 正面
        this.setData({

            [`card[${index}].status`]: 1
        })
          
          this.setData({
           gameover:true
          })
        wx.showToast({
            title: '爱我你后悔了吗',
            icon: 'none'
        })
        // 为了防止作弊，洗牌动画并不能打乱奖品数据顺序，抽出什么奖项通过再次访问接口获得
    },
    /* 转发*/
    onShareAppMessage: function(ops) {
        return {
            title: '咸鱼翻了还是咸鱼',
            path: '/pages/grid-card/index'
        }
    }
})
