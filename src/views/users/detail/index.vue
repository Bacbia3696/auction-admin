<template>
  <el-descriptions
    v-loading="isLoading"
    class="user-detail"
    :title="'Thông tin chi tiết ' + userInfo.full_name"
    :column="3"
    border
  >
    <template slot="extra">
      <el-button type="success" v-if="isPersonalAccount">
        Tài khoản cá nhân
      </el-button>
      <el-button type="warning" v-else>Tài khoản tổ chức</el-button>
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        Username
      </template>
      {{ userInfo.user_name }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        Số điện thoại
      </template>
      {{ userInfo.phone }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-message"></i>
        Email
      </template>
      {{ userInfo.email }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        Trạng thái
      </template>
      <el-tag :type="userInfo.status | statusFilter">{{
        convertStatus(userInfo.status)
      }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item span="2">
      <template slot="label">
        <i class="el-icon-office-building"></i>
        Địa chỉ
      </template>
      {{ userInfo.address }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        id card
      </template>
      {{ userInfo.id_card }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        id card name
      </template>
      {{ userInfo.id_card_address }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        bank owner
      </template>
      {{ userInfo.id_card_date }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        bank owner
      </template>
      {{ userInfo.bank_owner }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        bank owner
      </template>
      {{ userInfo.bank_owner }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        bank name
      </template>
      {{ userInfo.bank_name }}
    </el-descriptions-item>
  </el-descriptions>
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
      };

      return statusMap[status];
    },
  },
  data() {
    return {
      currentId: this.$route.params.id,
      userInfo: null,
      isLoading: true,
    };
  },
  methods: {
    fetchData() {
      user.getDetail(this.currentId).then((resp) => {
        this.userInfo = resp.data.data.user;
        this.userInfo.id_card_date = formatDate(this.userInfo.id_card_date)
        console.log(JSON.stringify(this.userInfo));
        this.isLoading = false;
      });
    },
    convertStatus(status) {
      const m = {
        0: "Chưa xác thực",
        1: "Đã xác thực",
      };
      return m[status];
    },
  },
  computed: {
    isPersonalAccount() {
      return this.userInfo?.organization_name?.Valid
    }
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.user-detail {
  padding: 100px;
  text-align: center;
}
</style>