<template>
  <div class="app-container">
    <el-table
      :v-loading="isLoading"
      :data="list"
      element-loading-text="Đang tải dữ liệu"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column align="center" label="STT" type="index">
      </el-table-column>
      <el-table-column
        align="center"
        label="Tên người đấu giá"
        property="full_name"
      >
      </el-table-column>
      <el-table-column align="center" label="Username" property="user_name">
      </el-table-column>
      <el-table-column align="center" label="Số điện thoại" property="phone">
      </el-table-column>
      <el-table-column align="center" label="Email" property="email">
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
import * as auction from "@/api/auction";
import { formatDateTime, moneyFilter } from "@/utils/utils";

export default {
  data() {
    return {
      currentId: this.$route.params.id,
      list: [],
      isLoading: true,
      pageSize: 20,
      total: 0,
      currentPage: 1,
    };
  },
  filters: {
    dateTimeFilter: formatDateTime,
    moneyFilter,
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      auction
        .getRegistrationList(this.currentId, this.currentPage, this.pageSize)
        .then((response) => {
          this.list = response.data.users;
          this.total = response.data.total;
          this.isLoading = false;
        })
        .catch((err) => console.log(err));
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style>
</style>