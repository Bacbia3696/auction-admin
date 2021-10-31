<template>
  <div class="container">
    <el-descriptions
      v-loading="isLoading"
      class="aution-detail"
      :title="'Thông tin chi tiết ' + auctionInfo.title"
      :column="3"
      border
    >
      <el-descriptions-item span="3">
        <template slot="label">
          <i class="el-icon-user" />
          Miêu tả
        </template>
        {{ auctionInfo.description }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user" />
          Mã đấu giá
        </template>
        {{ auctionInfo.code }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user" />
          Chủ sp đấu giá
        </template>
        {{ auctionInfo.owner }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user" />
          Địa chỉ
        </template>
        {{ auctionInfo.address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user" />
          Giá khởi điểm
        </template>
        {{ auctionInfo.start_price | moneyFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user" />
          Bước giá
        </template>
        {{ auctionInfo.step_price | moneyFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user" />
          Thông tin thêm
        </template>
        {{ auctionInfo.info }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user" />
          Loại đấu giá
        </template>
        {{ auctionInfo.type | typeFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user" />
          Tổ chức
        </template>
        {{ auctionInfo.organization }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user" />
          Trạng thái
        </template>
        {{ auctionInfo.status }}
      </el-descriptions-item>
      <el-descriptions-item span="2">
        <template slot="label">
          <i class="el-icon-date" />
          Thời điểm bắt đầu đăng ký
        </template>
        {{ auctionInfo.register_start_date | dateFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date" />
          Thời điểm kết thúc đăng ký
        </template>
        {{ auctionInfo.register_end_date | dateFilter }}
      </el-descriptions-item>
      <el-descriptions-item span="2">
        <template slot="label">
          <i class="el-icon-date" />
          Thời điểm bắt đầu đấu giá
        </template>
        {{ auctionInfo.bid_start_date | dateFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date" />
          Thời điểm kết thúc đấu giá
        </template>
        {{ auctionInfo.bid_end_date | dateFilter }}
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
            <span>Hình ảnh</span>
          </div>
          <el-image
            style="width: auto; height: 400px"
            :src="baseUrl + item"
            fit="contain"
          ></el-image>
        </el-card>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import * as auction from "@/api/auction";
import { formatDateTime, moneyFilter } from "@/utils/utils";

export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      auctionInfo: {},
      currentId: this.$route.params.id,
      isLoading: true,
      images: {},
    };
  },
  filters: {
    typeFilter(type) {
      const typeMap = {
        1: "Đấu giá công khai",
        2: "Đấu giá kín",
      };
      return typeMap[type];
    },
    dateFilter: formatDateTime,
    moneyFilter,
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      auction
        .getDetail(this.currentId)
        .then((resp) => {
          this.auctionInfo = resp.data.auction;
          this.images = resp.data.images;
          this.isLoading = false;
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style>
.container {
  padding: 50px;
  text-align: center;
}
</style>