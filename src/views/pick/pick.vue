<template>
  <div>
    <el-container>
      <el-header> </el-header>
      <el-main>
        <el-col :span="10">ㅤ</el-col>
        <el-col :span="14">
          <el-form ref="pickMap" :model="pickMap" label-width="80px">
            <el-form-item label="所属标签">
          <el-select v-model="pickMap.labelid" placeholder="所属标签">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="label in labelList"
              :key="label.id"
              :label="label.name"
              :value="label.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否完成">
          <el-select v-model="pickMap.state" placeholder="是否完成">
            <el-option label="全部" value=""></el-option>
            <el-option label="未完成" value="0"></el-option>
            <el-option label="已完成" value="1"></el-option>
          </el-select>
          ㅤ提示：完成后可得到奖励哦
        </el-form-item>
        <br>
        ㅤㅤㅤㅤㅤㅤㅤ<el-button size="large" type="primary" @click="pick" plain round>查询</el-button>
          </el-form>
        </el-col>
      </el-main>
      <el-footer style="text-align:center">
            <b>{{paint.name}}</b>
            <hr>
            <div v-html='paint.detail'></div>
           </el-footer>
    </el-container>
  </div>
</template>

<script>
  import paintApi from '@/api/paint/paint'
  import labelApi from '@/api/label/label'
  export default {
    data() {
      return {
        pickMap: {
          "labelid":"",
          "state":"0"
        },
        paint:{},
        labelList:[],
      }
    },
    created(){
      this.getLabelList();
    },
    methods:{
      getLabelList(){
        labelApi.findAll().then(resp=>{
          this.labelList=resp.data;
        })
      },
      pick(){
        paintApi.pick(this.pickMap).then(resp=>{
          this.paint=resp.data;
        })
      }
    }
  }
</script>