<template>
  <div>
    <a-input-search style="margin-bottom: 8px" placeholder="搜索分类" @change="onChange" />
    <a href="#" @click="onAdd(0,'')" style="font-size:10px;color:blue;margin-right:5px">&nbsp;&nbsp;<a-icon type="plus" /><span style="color:gray">添加根分类</span></a>
    <a-tree
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="treeData"
      @expand="onExpand"
      @select="onSelect"
    >
      <template slot="title" slot-scope="{ key,title }">
        <span>
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span style="color: #f50">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }} </span>
          <span>
            <a href="#" @click="onEdit(key)" style="font-size:14px;color:green;margin-right:5px"><a-icon type="edit" /></a>
            <a href="#" @click="onDelete(key)" style="font-size:10px;color:red;margin-right:5px"><a-icon type="delete" /></a>
            <a href="#" @click="onAdd(key,title)" style="font-size:10px;color:blue;margin-right:5px"><a-icon type="plus" /></a>
          </span>
        </span>
      </template>
    </a-tree>
    <a-modal
      :title="isEdit ? '编辑分类' : '添加分类'"
      v-model="visible"
      @cancel="onClose"
      @ok="handleSubmit"
    >
      <a-form-model
        id="category-form"
        :model="currentCategory"
      >
        <a-form-model-item label="父分类">
          <a-input
            read-only
            v-model="currentCategory.parentName"
          >
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="分类名称">
          <a-input
            v-model="currentCategory.name"
            placeholder="name"
          >
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="排序">
          <a-input
            v-model="currentCategory.sort"
            placeholder="sort"
          >
          </a-input>
        </a-form-model-item>
      </a-form-model>
      <a-form-model-item>
        <a-button type="primary" class="edit-form-button" @click="handleSubmit">
          提交
        </a-button>
      </a-form-model-item>
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

function conver2TreeData (nodes) {
  const newNodes = []
  nodes.forEach(node => {
    let children = []
    if (node.children && node.children.length) {
      children = conver2TreeData(node.children)
    }
    newNodes.push({
      key: node.id,
      title: node.name,
      children: children
    })
  })
  return newNodes
}

function conver2ListData (nodes, targetList) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    const key = node.key
    targetList.push({ key, title: node.title })
    if (node.children) {
      conver2ListData(node.children, targetList)
    }
  }
}

const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

export default {
  data () {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      treeData: [],
      listData: [],
      currentCategory: {
        'name': '',
        'sort': 0,
        'pid': 0
      },
      visible: false,
      isEdit: false
    }
  },
  methods: {
    ...mapActions(['addCategory', 'getCategory', 'updateCategory', 'deleteCategory', 'getCategoryTree']),
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onChange (e) {
      const value = e.target.value
      const expandedKeys = this.listData
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, this.treeData)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
    },
    onSelect (selectedKeys, e) {
      this.$emit('change', {
        'id': selectedKeys[0]
      })
    },
    onEdit (id) {
      this.getCategory({ id }).then(res => {
        this.currentCategory = res.result
      })
      this.visible = true
      this.isEdit = true
    },
    onAdd (id, title) {
      this.currentCategory = {
        pid: id,
        parentName: title
      }
      this.visible = true
      this.isEdit = false
    },
    handleSubmit () {
      if (this.isEdit) {
        this.updateCategory(this.currentCategory).then(res => {
          this.visible = true
          this.refresh()
        })
      } else {
        this.addCategory(this.currentCategory).then(res => {
          this.visible = true
          this.refresh()
        })
      }
    },
    onDelete (id) {
      const that = this
      this.$confirm({
        title: '确定要删除该分类吗？',
        content: '该分类下没有任何书籍方可删除',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
           that.deleteCategory({
            'id': id
          }).then(res => {
            that.init()
          })
        },
        onCancel () {
        }
      })
    },
    onClose () {
      this.visible = false
    },
    refresh () {
      this.getCategoryTree({}).then(res => {
        // console.log(res.result)
        this.treeData = conver2TreeData(res.result)
        const arr = []
        conver2ListData(this.treeData, arr)
        this.listData = arr
      })
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
