<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="Tìm kiếm" prop="keyword">
        <el-input
          v-model="form.keyword"
          style="width: 50%; margin-right: 1%"
          v-on:keyup.enter.native="fetchData"
        ></el-input>
        <el-button
          icon="el-icon-search"
          circle
          @click="fetchData"
          type="primary"
        ></el-button>
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
      <el-table-column align="center" label="Mã đấu giá" property="code">
      </el-table-column>
      <el-table-column align="center" label="Tiêu đề" property="title">
      </el-table-column>
      <el-table-column align="center" label="Chủ sp đấu giá" property="owner">
      </el-table-column>
      <el-table-column align="center" label="Loại đấu giá">
        <template slot-scope="scope">
          {{ scope.row.type | typeFilter }}
        </template>
      </el-table-column>
      <el-table-column label="Danh sách người đk" align="center" width="120">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-notebook-1"
            @click="handleRegistrationList(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="Danh sách lượt đấu giá"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-notebook-2"
            @click="handleBidList(scope.$index, scope.row)"
          />
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
import * as auction from "@/api/auction";

export default {
  name: "AuctionList",
  filters: {
    typeFilter(type) {
      const typeMap = {
        1: "Đấu giá công khai",
        2: "Đấu giá kín",
      };
      return typeMap[type];
    },
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
      auction
        .getList(this.currentPage, this.pageSize, this.form.keyword)
        .then((response) => {
          this.list = response.data.auctions.map((e) => e.auction);
          this.total = response.data.total;
          this.isLoading = false;
        })
        .catch((err) => console.log(err));
    },
    handleDetail(idx, row) {
      this.$router.push(`/auctions/detail/${row.id}`);
    },
    handleBidList(idx, row) {
      this.$router.push(`/auctions/bid-list/${row.id}`);
    },
    handleRegistrationList(idx, row) {
      this.$router.push(`/auctions/registration-list/${row.id}`);
    },
  },
};
</script>

<style>
</style>