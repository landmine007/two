<template>
  <div class="app-container">
    <div class="pannel">
      <el-button type="primary" @click="add">添加中间件脚本配置</el-button>
      <div class="pannel">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50"/>
          <el-table-column
            prop="name"
            label="中间件名称"
            width="180"/>
          <!-- <el-table-column
            prop="image"
            label="图片">
            <template slot-scope="scope">
              <span v-if="scope.row.image !== null">
                <img v-for="(item, index) in scope.row.image.split(',')" :src="url + item" :key="index" style="width: 20px;height: 20px">
              </span>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="sort"
            label="是否静态部署"
            width="180"/>
          <el-table-column
            prop="display"
            label="中间件启动命令"/>
          <el-table-column
            prop="createTime"
            label="中间件停止命令"/>
          <el-table-column
            prop="createTime"
            label="中间件重启命令"/>
          <el-table-column
            prop="createTime"
            label="中间件描述"/>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click.native.prevent="editRow(scope)"> 修改 </el-button>
              <el-button size="small" type="danger" @click.native.prevent="deleteRow(scope)"> 删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        :visible.sync="dialogVisible"
        title="添加中间件脚本配置"
        width="40%">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item label="中间件名称" placeholder="请输入分类名称" prop="name">
            <el-input v-model="ruleForm.name"/>
          </el-form-item>
          <el-form-item label="是否静态部署" prop="leixing">
            <el-radio-group v-model="ruleForm.leixing">
              <el-radio :label="1">物业</el-radio>
              <el-radio :label="0">租赁</el-radio>
              <el-radio :label="2">医疗运输</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="中间件启动命令" placeholder="请输入分类排序" prop="sort">
            <el-input v-model="ruleForm.sort" type="number"/>
          </el-form-item>
          <el-form-item label="中间件停止命令" placeholder="请输入分类排序" prop="sort">
            <el-input v-model="ruleForm.sort" type="number"/>
          </el-form-item>
          <el-form-item label="中间件重启命令" placeholder="请输入分类排序" prop="sort">
            <el-input v-model="ruleForm.sort" type="number"/>
          </el-form-item>
          <el-form-item label="中间件描述" prop="display">
            <el-input :rows="2" v-model="ruleForm.display" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary">确认</el-button>
            <el-button>取消</el-button>
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <!-- <div class="title">中间件脚本配置</div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      tableData: [],
      ruleForm: {
        name: '',
        sort: '',
        leixing: '',
        display: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        leixing: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        display: [
          { required: false, message: '请填写', trigger: 'blur' }
        ],
        size: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        totalPrice: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        decoration: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    add() {
      this.dialogVisible = true
      // this.title = '添加分类'
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // if (this.title === '修改分类') {
          //   this.update()
          // } else {
          //   this.insert()
          // }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
