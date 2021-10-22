<template>
  <div class="container">
    <el-descriptions
      v-loading="isLoading"
      class="user-detail"
      :title="'Thông tin chi tiết ' + userInfo.full_name"
      column="3"
      border
    >
      <template slot="extra">
        <el-button v-if="userInfo.status === 0" type="success" @click="test">
          Đồng ý xác thực
        </el-button>
        <el-button v-else-if="userInfo.status === 1" type="danger" @click="test"
          >Khoá tài khoản</el-button
        >
        <el-button v-else type="primary" @click="test"
          >Mở khoá tài khoản</el-button
        >
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user" />
          Username
        </template>
        {{ userInfo.user_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone" />
          Số điện thoại
        </template>
        {{ userInfo.phone }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-message" />
          Email
        </template>
        {{ userInfo.email }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets" />
          Trạng thái
        </template>
        <el-tag :type="userInfo.status | statusFilter">{{
          convertStatus(userInfo.status)
        }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item span="2">
        <template slot="label">
          <i class="el-icon-office-building" />
          Địa chỉ
        </template>
        {{ userInfo.address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building" />
          CMND
        </template>
        {{ userInfo.id_card }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location" />
          Nơi cấp CMND
        </template>
        {{ userInfo.id_card_address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date" />
          Ngày cấp CMND
        </template>
        {{ userInfo.id_card_date }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building" />
          STK ngân hàng
        </template>
        {{ userInfo.bank_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building" />
          Tên chủ tài khoản
        </template>
        {{ userInfo.bank_owner }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building" />
          Tên ngân hàng
        </template>
        {{ userInfo.bank_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-datek" />
          Ngày sinh
        </template>
        {{ userInfo.birthdate }}
      </el-descriptions-item>
    </el-descriptions>
    <el-carousel
      :interval="20000"
      type="card"
      height="500px"
      style="margin-top: 30px"
    >
      <el-carousel-item v-for="(item, idx) in images" :key="idx">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px">
            <span v-if="item.type === 1">Mặt trước CMND</span>
            <span v-else-if="item.type === 2">Mặt sau CMND</span>
            <span v-else>Hình ảnh</span>
          </div>
          <el-image
            style="width: auto; height: 400px"
            :src="'http://188.166.185.44:9000/' + item.url"
            fit="contain"
          ></el-image>
        </el-card>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import * as user from "@/api/user";
import { formatDate } from "@/utils/utils";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "danger",
        1: "success",
        "-1": "warning",
      };

      return statusMap[status];
    },
  },
  data() {
    return {
      currentId: this.$route.params.id,
      userInfo: null,
      isLoading: true,
      images: {},
    };
  },
  computed: {
    isPersonalAccount() {
      return !this.userInfo?.organization_name?.Valid;
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      user.getDetail(this.currentId).then((resp) => {
        this.userInfo = resp.data.user;
        this.images = resp.data.images;
        this.userInfo.id_card_date = formatDate(this.userInfo.id_card_date);
        this.userInfo.birthdate = formatDate(this.userInfo.birthdate.Time);
        this.isLoading = false;
      });
    },
    convertStatus(status) {
      const m = {
        0: "Chưa xác thực",
        1: "Đã kích hoạt",
        "-1": "Đã bị khoá",
      };
      return m[status];
    },
    test() {
      this.$confirm("Xác nhận?", "Warning", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Quay lại",
        type: "warning",
      }).then(() => {
        if (this.userInfo.status === 0) {
          user.verify(this.currentId).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: "Kích hoạt thành công",
                type: "success",
              });
              this.fetchData();
            } else {
              this.$message({
                message: "Có lỗi xảy ra, vui lòng thử lại sau!",
                type: "danger",
              });
            }
          });
        } else if (this.userInfo.status === 1) {
          user.lock(this.currentId).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: "Khoá người dùng thành công",
                type: "success",
              });
              this.fetchData();
            } else {
              this.$message({
                message: "Có lỗi xảy ra, vui lòng thử lại sau!",
                type: "danger",
              });
            }
          });
        } else {
          user.verify(this.currentId).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: "Mở khoá người dùng thành công",
                type: "success",
              });
              this.fetchData();
            } else {
              this.$message({
                message: "Có lỗi xảy ra, vui lòng thử lại sau!",
                type: "danger",
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  padding: 50px;
  text-align: center;
}
</style>
