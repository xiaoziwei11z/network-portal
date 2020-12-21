<template>
  <el-container style="height: 100vh;">
    <!-- 页眉 -->
    <el-header class="header-container">
      <h1 class="title">单臂路由-25组</h1>
    </el-header>
    <el-container style="text-align:center">
      <!-- 拓扑画板 -->
      <el-main class="board-container">
        <!-- 画板 -->
        <svg 
        class="board" 
        ondragover="return false" 
        oncontextmenu="return false">
          <!-- 已连接的线 -->
          <line
          v-for="(item, index) in lineings"
          :key="index"
          :x1="item.x1" :y1="item.y1"
          :x2="item.x2" :y2="item.y2"
          style="stroke:rgb(255,0,0);stroke-width:2"/>
          <!-- topo图上的节点 -->
          <g v-for="(item) in topoNodes" :key="item.id">
            <image :xlink:href="item.pic" width="50px" height="50px" :x="item.x" :y="item.y"></image>
            <text :x="item.x + 25" :y="item.y + 66" style="text-anchor: middle; user-select: none;">{{item.name}}</text>
          </g>
        </svg>
      </el-main>
    </el-container>

    <el-container style="text-align:center">
      <el-main class="board-container">
        <el-steps :active="active" align-center>
          <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
         <el-button style="margin-top: 12px;" @click="next" :disabled="isdis">下一步</el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Topo',
  data () {
    return {
      topoNodes: [], // topo图中的节点
      topoLinks: [], // topo图中的连线
      lineings:{},
      active: 0,
      isdis:false
    }
  },
  methods: {
    next() {
      if (this.active++ > 3) isdis=true;
    },
    // 新建节点
    dropToBoard (src,name,x,y,i) {
      const content = JSON.parse(JSON.stringify({pic: src, name: name})) // 接收来自拖出的内容,并还原为对象
      let node = {
        id: i, // 用时间戳生成唯一id，Symbol类型的id不能存储到本地
        pic: content.pic, // 图片
        name: content.name, // 默认显示名称，可修改
        x: x, // 横坐标
        y: y, // 纵坐标
      }
      this.topoNodes.push(node)
    },
    // 连接节点
    moveAndLink (startIndex,index) {
      // 连线模式
      this.topoLinks.push({
        startNodeId: this.topoNodes[startIndex].id,
        endNodeId: this.topoNodes[index].id,
        startInterface: 'fa0/1',
        endInterface: 'fa0/1'
      })
    },
    lines () {
      let hash = {}
      const OFFSET = 20
      this.topoNodes.forEach((node, index) => {
        hash[node.id] = index
      })
      return this.topoLinks.map(item => {
        const startNode = this.topoNodes[hash[item.startNodeId]]
        const endNode = this.topoNodes[hash[item.endNodeId]]
        return {
          x1: startNode.x + OFFSET,
          y1: startNode.y + OFFSET,
          x2: endNode.x + OFFSET,
          y2: endNode.y + OFFSET,
          startInterface: item.startInterface,
          endInterface: item.endInterface
        }
      })
    },
  },
  created () {
    this.dropToBoard(require('../data/img/router.png'),'Router',600,50,1)
    this.dropToBoard(require('../data/img/switch.png'),'Switch',900,50,2)
    this.dropToBoard(require('../data/img/server.png'),'PC1',750,200,3)
    this.dropToBoard(require('../data/img/server.png'),'PC2',1050,200,4)
    this.dropToBoard(require('../data/img/server.png'),'PC3',1200,50,5)
    this.moveAndLink(0,1)
    this.moveAndLink(1,2)
    this.moveAndLink(1,3)
    this.moveAndLink(1,4)
    this.lineings=this.lines();
  },
}
</script>

<style scoped>

.aside {
  background-color: #F2F6FC;
  border-right: 2px solid #F2F6FC;
  height: 100%;
}
.library-item {
  color: #606266;
}
.library-item img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.board-container {
  padding: 0;
  position: relative;
}
.button-container {
  position: absolute;
  right: 16px;
  top: 10px;
}
.board {
  background-color: #FFF;
  height: 99%;
  width: 100%;
}
.header-container {
  background-color: #409EFF;
}
.title {
  margin: 0;
  line-height: 60px;
  color: #FFF;
}
.address {
  color: #409EFF;
  line-height: 60px;
}
</style>
