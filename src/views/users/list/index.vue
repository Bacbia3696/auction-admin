<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="Tìm kiếm" prop="keyword">
        <el-input
          v-model="form.keyword"
          style="width: 50%; margin-right: 1%"
          v-on:keyup.enter.native="fetchData"
        ></el-input>
        <el-button icon="el-icon-search" circle @click="fetchData" type="primary"></el-button>
      </el-form-item>
    </el-form>
    <el-table
      :v-loading="isLoading"
      :data="list"
      element-loading-text="Đang tải dữ liệu"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column align="center" label="ID" property="id">
      </el-table-column>
      <el-table-column align="center" label="Họ tên" property="full_name">
      </el-table-column>
      <el-table-column align="center" label="Số điện thoại" property="phone">
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Trạng thái"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status | convertStatus
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Ngày tạo">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column label="Xem chi tiết" align="center" width="120">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleDetail(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      style="margin-top: 30px"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
import * as user from "@/api/user";
import { formatDate, convertUserStatus } from "@/utils/utils";

export default {
  name: "UserList",
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "danger",
        1: "success",
        "-1": "warning",
      };

      return statusMap[status];
    },
    convertStatus: convertUserStatus,
  },

  data() {
    return {
      isLoading: true,
      list: [],
      pageSize: 20,
      total: 0,
      currentPage: 1,
      form: {
        keyword: "",
      },
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
    fetchData() {
      this.isLoading = true;
      user
        .getList(this.currentPage, this.pageSize, this.form.keyword)
        .then((response) => {
          this.list = response.data.users;
          this.list = this.list.map((e) => {
            e.created_at = formatDate(e.created_at);
            return e;
          });
          this.total = response.data.total;
          this.isLoading = false;
        })
        .catch((err) => console.log(err));
    },
    handleDetail(idx, row) {
      this.$router.push(`/users/detail/${row.id}`);
    },
    alert() {
      alert(1);
    },
  },
};
</script>
