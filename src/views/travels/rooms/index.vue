<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="酒店id" prop="hotelId">
        <el-input
          v-model="queryParams.hotelId"
          placeholder="请输入酒店id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="房间名称" prop="roomName">
        <el-input
          v-model="queryParams.roomName"
          placeholder="请输入房间名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="房间类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择房间类型" clearable>
          <el-option
            v-for="dict in dict.type.room_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="房间人数" prop="number">
        <el-input
          v-model="queryParams.number"
          placeholder="请输入房间人数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="房间价格" prop="price">
        <el-input
          v-model="queryParams.price"
          placeholder="请输入房间价格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['travels:rooms:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['travels:rooms:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['travels:rooms:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['travels:rooms:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="roomsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="酒店id" align="center" prop="hotelId" />
      <el-table-column label="房间名称" align="center" prop="roomName" />
      <el-table-column label="房间类型" align="center" prop="type">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.room_type" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="房间大小" align="center" prop="size" />
      <el-table-column label="房间人数" align="center" prop="number" />
      <el-table-column label="房间价格" align="center" prop="price" />
      <el-table-column label="房间数" align="center" prop="counts" />
      <el-table-column label="房间图片" align="center" prop="img" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.img" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['travels:rooms:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['travels:rooms:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改酒店房间对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="酒店id" prop="hotelId">
          <el-input v-model="form.hotelId" placeholder="请输入酒店id" />
        </el-form-item>
        <el-form-item label="房间名称" prop="roomName">
          <el-input v-model="form.roomName" placeholder="请输入房间名称" />
        </el-form-item>
        <el-form-item label="房间类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择房间类型">
            <el-option
              v-for="dict in dict.type.room_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间大小" prop="size">
          <el-input v-model="form.size" placeholder="请输入房间大小" />
        </el-form-item>
        <el-form-item label="房间人数" prop="number">
          <el-input v-model="form.number" placeholder="请输入房间人数" />
        </el-form-item>
        <el-form-item label="床铺情况" prop="bed">
          <el-input v-model="form.bed" placeholder="请输入床铺情况" />
        </el-form-item>
        <el-form-item label="房间价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入房间价格" />
        </el-form-item>
        <el-form-item label="房间数" prop="counts">
          <el-input v-model="form.counts" placeholder="请输入房间数" />
        </el-form-item>
        <el-form-item label="房间图片" prop="img">
          <image-upload v-model="form.img"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listRooms, getRooms, delRooms, addRooms, updateRooms } from "@/api/travels/rooms";

export default {
  name: "Rooms",
  dicts: ['room_type'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 酒店房间表格数据
      roomsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        hotelId: null,
        roomName: null,
        type: null,
        number: null,
        price: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询酒店房间列表 */
    getList() {
      this.loading = true;
      listRooms(this.queryParams).then(response => {
        this.roomsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        hotelId: null,
        roomName: null,
        type: null,
        size: null,
        number: null,
        bed: null,
        price: null,
        counts: null,
        img: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加酒店房间";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRooms(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改酒店房间";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRooms(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRooms(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除酒店房间编号为"' + ids + '"的数据项？').then(function() {
        return delRooms(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('travels/rooms/export', {
        ...this.queryParams
      }, `rooms_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
