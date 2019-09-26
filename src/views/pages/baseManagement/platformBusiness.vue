<template>
  <div class="app-container">
    <div class="pannel">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-tree
              :data="data4"
              :highlight-current="true"
              :expand-on-click-node="false"
              :render-content="renderContent"
              node-key="id"
              default-expand-all
            />
          </div>
        </el-col>
        <el-col :span="17">
          <div class="grid-content bg-purple-light">
            <!-- <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>新增平台</span>
              </div>
              <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-form-item label="分类名称" placeholder="请输入分类名称" prop="name">
                  <el-input v-model="ruleForm.name"/>
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
            </el-card> -->
            <div class="pannel">
              <div class="title">新增平台</div>
              <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-form-item label="平台code" placeholder="请输入分类名称" prop="name">
                  <el-input v-model="ruleForm.name"/>
                </el-form-item>
                <el-form-item label="平台名称" placeholder="请输入分类排序" prop="sort">
                  <el-input v-model="ruleForm.sort" type="number"/>
                </el-form-item>
                <el-form-item label="平台类型" prop="leixing">
                  <el-radio-group v-model="ruleForm.leixing">
                    <el-radio :label="1">物业</el-radio>
                    <el-radio :label="0">租赁</el-radio>
                    <el-radio :label="2">医疗运输</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="平台描述" prop="display">
                  <el-input
                    :rows="2"
                    v-model="ruleForm.display"
                    type="textarea"
                    placeholder="请输入内容"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">确认</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
let id = 1000
export default {
  data() {
    const data = [{
      id: 1,
      label: '平台1',
      children: [{
        id: 4,
        label: 'SaaS物业平台'
      },
      {
        id: 5,
        label: 'SaaS租赁平台'
      },
      {
        id: 6,
        label: '招商物业平台'
      }]
    }, {
      id: 2,
      label: '平台2',
      children: [{
        id: 7,
        label: '美的物业平台'
      }, {
        id: 8,
        label: '印力物业平台'
      }]
    }]
    return {
      data4: JSON.parse(JSON.stringify(data)),
      data5: JSON.parse(JSON.stringify(data)),
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
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      console.log('node data', node, data)
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button size='mini' type='text' on-click={() => this.append(data)}>添加</el-button>
            <el-button size='mini' type='text' on-click={() => this.remove(node, data)}>删除</el-button>
            <el-button size='mini' type='text' on-click={() => this.append(data)}>查看</el-button>
            <el-button size='mini' type='text' on-click={() => this.remove(node, data)}>修改</el-button>
          </span>
        </span>)
    }
  }
}
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
