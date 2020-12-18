<template>
  <div>
    <br>
    <el-row>
      <el-col :span="20">
  ㅤ<el-form :inline="true">
    <!--空白字符ㅤ-->
      <el-form-item label="ㅤ作品标题">
        <el-input v-model="searchMap.name" placeholder="作品标题"></el-input>
        </el-form-item>
        <el-form-item label="所属标签">
          <el-select v-model="searchMap.labelid" placeholder="所属标签">
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
          <el-select v-model="searchMap.state" placeholder="是否完成">
            <el-option label="全部" value=""></el-option>
            <el-option label="未完成" value="0"></el-option>
            <el-option label="已完成" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="fetchData()" plain round>查询</el-button>
      </el-form>
      </el-col>
      <el-col :span="4">
        <br>
    ㅤ  <el-button type="primary" plain @click="handleAdd()">添加作品</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        :show-overflow-tooltip="true"
        prop="name"
        label="作品标题"
        width="700">
      </el-table-column>
      <el-table-column
         :formatter="createtimeFormat"
        :show-overflow-tooltip="true"
        prop="createtime"
        label="创建时间"
        width="300">
      </el-table-column>
      <el-table-column
         :formatter="updatetimeFormat"
        :show-overflow-tooltip="true"
        prop="updatetime"
        label="更新时间"
        width="300">
      </el-table-column>
      <el-table-column
        :formatter="stateFormat"
        :show-overflow-tooltip="true"
        prop="state"
        label="状态"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作"
        width="115">
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
      @size-change="sizeChange"
      @current-change="pageChange"
      :current-page="currentPage"
      :page-sizes="[5,10,20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination> 
    <el-dialog 
      :title="paint.name"
      :visible.sync="dialogFormVisible"
      center
      width="70%" >
      <el-scrollbar style="height:100%">
        <b>详细描述</b>
        <hr>
        <div v-html='paint.detail'></div>
        <!-- <div v-if="paint.state == '0'">  
          <el-button type="primary" @click="handleExamine('1')">完成</el-button>
        </div> -->
      </el-scrollbar>
    </el-dialog>
    <el-dialog 
      title="添加作品"
      :visible.sync="dialogAddVisible"
      center
      fullscreen
      width="70%" >
      <el-scrollbar style="height:100%">
        <el-form :model="paint" ref="paint" :rules="rules" label-width="80px">
            <el-form-item label="作品名称" prop="name">
                <el-input v-model="paint.name" placeholder="作品名称"></el-input>
            </el-form-item>
            <el-form-item label="作品分类" prop="labelid">
              <el-select v-model="paint.labelid" placeholder="所属标签">
                <el-option
                  v-for="label in labelList"
                  :key="label.id"
                  :label="label.name"
                  :value="label.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作品描述">
                <el-input type="textarea" v-model="paint.detail" placeholder="作品描述"></el-input>
            </el-form-item>
            <el-form-item label="上传图片">
                <!-- <el-upload
                    class="avatar-uploader"
                    action="http://127.0.0.1:9080/api/upload/image"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="paint.image" :src="paint.image" class="avatar">
                    <i v-if="!paint.image" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload> -->
                功能尚未发布
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit('paint')">提交</el-button>
                <el-button @click="dialogAddVisible = false">关闭</el-button>
            </el-form-item>
        </el-form>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
  import paintApi from '@/api/paint/paint'
  import labelApi from '@/api/label/label'
  export default {
    data() {
      return {
        tableData: [],
        total:0,
        currentPage:1,
        pageSize:10,
        searchMap:{},
        labelList:[],
        dialogFormVisible:false,
        dialogAddVisible:false,
        paint:{},
        rules: {
          name: [
            { required: true, message: '请输入作品名称', trigger: 'blur' },
          ],
          labelid: [
            { required: true, message: '请选择作品标签', trigger: 'change' }
          ],
        },
      }
    },
    created(){
      this.getLabelList();
      this.fetchData();
    },
    methods:{
      // handleAvatarSuccess(res, file) {
      //   console.log(res)
      //   if(res.flag){
      //     this.paint.image=res.data
      //   }
      // },
      // beforeAvatarUpload(file) {
      //   const isJPG = file.type === 'image/jpeg';

      //   if (!isJPG) {
      //     this.$message.error('上传图片只能是 JPG 格式!');
      //   }
      //   return isJPG;
      // }, 
      sizeChange(val){
        this.pageSize=val;
        this.currentPage=1;
        this.fetchData();
      },
      pageChange(val){
        this.currentPage=val;
        this.fetchData();
      },
      getLabelList(){
        labelApi.findAll().then(resp=>{
          this.labelList=resp.data;
        })
      },
      createtimeFormat(row,column){
        var t=new Date(row.createtime);//row 表示一行数据, createTime 表示要格式化的字段名称
        return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds();
      },
      updatetimeFormat(row,column){
        var t=new Date(row.updatetime);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds();
      },
      stateFormat(row,column){
        if(row.state==='1'){
          return '已完成';
        }else{
          return '未完成';
        }
      },
      fetchData(){
        paintApi.search(this.currentPage,this.pageSize,this.searchMap).then(resp=>{
          this.tableData=resp.data.rows;
          this.total=resp.data.total;
        })
      },
      handleDetail(id){
        paintApi.findById(id).then(resp=>{
          if(resp.flag){
            this.paint=resp.data;
            this.dialogFormVisible=true;
          }
        })
      },
      handleExamine(state){
        paintApi.examine(this.paint.id,state).then(resp=>{
          this.$message({
            message:resp.message,
            type:(resp.flag? 'success' : 'error')
          })
          if(resp.flag){
            this.fetchData();
            this.dialogFormVisible=false;
          }
        })
      },
      handleDelete(id){
        this.$confirm('确定删除吗？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          paintApi.deleteById(id).then(resp=>{
            this.$message({
              message:resp.message,
              type:(resp.flag? 'success' : 'error')
            })
            if(resp.flag){
              this.fetchData();
            }
          })
        })
      },
      handleSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //新增
            paintApi.save(this.paint).then(resp=>{
            this.$message({
                  message:resp.message,
                  type:(resp.flag? 'success' : 'error')
              })
              if(resp.flag){
                  this.paint={};
                  this.fetchData();
                  this.dialogAddVisible=false;
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      },
      handleAdd(){
          this.paint={};
          this.dialogAddVisible=true;
      },
    }
  }
</script>