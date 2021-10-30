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
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Họ tên">
        <template slot-scope="scope">
          {{ scope.row.full_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Số điện thoại">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
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
import * as user from '@/api/user'
import { formatDate, convertUserStatus } from '@/utils/utils'

export default {
  name: 'UserList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'danger',
        1: 'success',
        '-1': 'warning'
      }

      return statusMap[status]
    },
    convertStatus: convertUserStatus,
  },

  data() {
    return {
      isLoading: true,
      list: [],
      pageSize: 20,
      total: 0,
      currentPage: 1
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    handlePageChange(page) {
      this.currentPage = page
      this.fetchData()
    },
    fetchData() {
      this.isLoading = true
      user
        .getList(this.currentPage, this.pageSize)
        .then((response) => {
          this.list = response.data.users
          this.list = this.list.map((e) => {
            e.created_at = formatDate(e.created_at)
            return e
          })
          this.total = response.data.total
          this.isLoading = false
        })
        .catch((err) => console.log(err))
    },
    handleDetail(idx, row) {
      this.$router.push(`/users/detail/${row.id}`)
    }
  },

}
</script>
