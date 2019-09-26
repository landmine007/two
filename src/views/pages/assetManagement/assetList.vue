<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline pannel">
      <el-form-item label="分类名称">
        <el-input v-model="searchForm.name" placeholder="分类名称"/>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-select v-model="searchForm.display" placeholder="是否显示">
          <el-option label="显示" value="1"/>
          <el-option label="不显示" value="0"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">添加分类</el-button>
      </el-form-item>
    </el-form>
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
          label="分类名称"
          width="180"/>
        <el-table-column
          prop="image"
          label="图片">
          <template slot-scope="scope">
            <span v-if="scope.row.image !== null">
              <img v-for="(item, index) in scope.row.image.split(',')" :src="url + item" :key="index" style="width: 20px;height: 20px">
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="分类排序"
          width="180"/>
        <el-table-column
          prop="display"
          label="是否显示"/>
        <el-table-column
          prop="createTime"
          label="添加时间"/>
        <el-table-column
          prop="address"
          label="地址">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click.native.prevent="editRow(scope)"> 修改 </el-button>
            <el-button size="small" type="danger" @click.native.prevent="deleteRow(scope)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        background
        layout="prev, pager, next"
        class="page"
        @current-change="handleCurrentChange"/>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      title="添加分类"
      width="40%">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" placeholder="请输入分类名称" prop="name">
          <el-input v-model="ruleForm.name"/>
        </el-form-item>
        <el-form-item label="图片上传">
          <el-upload
            :on-success="successCallback"
            :file-list="fileList"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            class="upload-demo"
            action="http://120.27.212.170/adminapi/file/upload"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类排序" placeholder="请输入分类排序" prop="sort">
          <el-input v-model="ruleForm.sort" type="number"/>
        </el-form-item>
        <el-form-item label="颜色分类" prop="color">
          <el-color-picker v-model="ruleForm.color"/>
        </el-form-item>
        <el-form-item label="是否显示" prop="display">
          <el-radio-group v-model="ruleForm.display">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { fielDelete } from '@/api/upload'
import { url } from '@/api/domin'
import { selectCustomPage, insert, update, myDelete } from '@/api/serviceClass'
import { selectSidebar } from '@/api/sidebar'
export default {
  components: {

  },
  data() {
    return {
      loading: false,
      url: url.domin,
      title: '',
      searchForm: {
      },
      dialogVisible: false,
      fileList: [],
      ruleForm: {
        name: '',
        image: '',
        sort: '',
        color: '',
        display: ''
      },
      rules: {
        title: [
          { required: true, message: '请填写', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        building: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        floor: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        totalFloor: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        size: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        totalPrice: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        decoration: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        houseAttorneyCode: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        shopCheckCode: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        exclusive: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        recommend: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      // options2: options2, // 省市区
      options: [], // 街道
      tableData: [],
      total: 0,
      pageSize: 2,
      currentPage: 1
    }
  },
  created() {
    // this.selectCustomPage()
    this.sidebar()
  },
  methods: {
    reset() {
      this.fileList = []
      this.ruleForm = {
        name: '',
        image: '',
        sort: '',
        color: '',
        display: ''
      }
    },
    onSubmit() {
      console.log('submit!')
      this.selectCustomPage()
    },
    add() {
      this.dialogVisible = true
      this.title = '添加分类'
    },
    editRow(scope) { // 修改改行
      console.log('scope', scope)
      this.dialogVisible = true
      this.title = '修改分类'
      this.ruleForm = { ...scope.row }
      this.ruleForm.image = ''
      console.log('ruleForm', this.ruleForm)
    },
    deleteRow(scope) { // 删除改行
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('scope', scope)
        myDelete(scope.row.id).then(response => {
          if (response.data.returnCode) {
            this.selectCustomPage()
            this.$message({ message: response.data.returnMsg, type: 'success' })
          } else {
            this.$message.error(response.data.returnMsg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === '修改分类') {
            this.update()
          } else {
            this.insert()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.selectCustomPage()
      console.log('currentPage', this.currentPage)
    },
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList)
      fielDelete(file.response.data).then(response => {
        if (response.data.returnCode) {
          this.$message({ message: response.data.returnMsg, type: 'success' })
        } else {
          this.$message.error(response.data.returnMsg)
        }
      })
    },
    // 图片上传
    handlePreview(file) {
      console.log(file)
    },
    // 图片上传
    successCallback(response, file, fileList) {
      console.log('fileList', fileList) // 相对路径数组
      this.ruleForm.image = ''
      const len = fileList.length
      fileList.map((item, index) => {
        if (len === 0) {
          this.ruleForm.image = ''
        } else if (len === 1) {
          this.ruleForm.image = this.ruleForm.image + item.response.data
        } else if (len > 1) {
          if (len === index + 1) {
            this.ruleForm.image = this.ruleForm.image + item.response.data
          } else {
            this.ruleForm.image = this.ruleForm.image + item.response.data + ','
          }
        }
      })
      console.log('image', this.ruleForm.image)
    },
    selectCustomPage() { // 模糊查询
      this.loading = true
      const param = {
        serviceCategory: {
          name: this.searchForm.name,
          display: this.searchForm.display
        },
        page: {
          current: this.currentPage,
          size: this.pageSize
        }
      }
      selectCustomPage(param).then(response => {
        if (response.data.returnCode) {
          this.tableData = response.data.data.records
          this.total = response.data.data.total
          console.log('total', this.total)
        } else {
          this.$message.error(response.data.returnMsg)
        }
        this.loading = false
      })
    },
    insert() { // 添加
      // this.ruleForm.image = this.ruleForm.image.substr(0, this.ruleForm.image - 1) // 去掉逗号
      insert(this.ruleForm).then(response => {
        if (response.data.returnCode) {
          this.dialogVisible = false
          this.selectCustomPage()
          this.reset()
          this.$message({ message: response.data.returnMsg, type: 'success' })
        } else {
          this.$message.error(response.data.returnMsg)
        }
      })
    },
    update() { // 修改
      update(this.ruleForm).then(response => {
        if (response.data.returnCode) {
          this.dialogVisible = false
          this.selectCustomPage()
          this.reset()
          this.$message({ message: response.data.returnMsg, type: 'success' })
        } else {
          this.$message.error(response.data.returnMsg)
        }
      })
    },
    sidebar() { // 修改
      selectSidebar().then(response => {
        console.log('sidebar', response)
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
