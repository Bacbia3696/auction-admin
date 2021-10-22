<template>
  <div class="app-container">
    <el-table
      :v-loading="listLoading"
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
            convertStatus(scope.row.status)
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
import { formatDate } from '@/utils/utils'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'danger',
        1: 'success',
        '-1': 'warning'
      }

      return statusMap[status]
    }
  },

  data() {
    return {
      listLoading: true,
      list: null,
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
      this.listLoading = true
      user
        .getList(this.currentPage, this.pageSize)
        .then((response) => {
          this.list = response.data.users
          this.list = this.list.map((e) => {
            e.created_at = formatDate(e.created_at)
            return e
          })
          this.total = Math.floor(response.data.total)
          this.listLoading = false
        })
        .catch((err) => console.log(err))
    },
    convertStatus(status) {
      const m = {
        0: 'Chưa xác thực',
        1: 'Đã xác thực',
        '-1': 'Đã bị khoá'
      }
      return m[status]
    },
    handleDetail(idx, row) {
      this.$router.push(`/users/detail/${row.id}`)
    }
  }
}
</script>
