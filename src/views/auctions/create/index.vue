<template>
  <div class="container">
    <h3 class="title">Tạo phiên đấu giá</h3>
    <el-divider />
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="Mã đấu giá">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="Chủ sản phẩm đấu giá">
        <el-input v-model="form.owner"></el-input>
      </el-form-item>
      <el-form-item label="Tổ chức đấu giá">
        <el-input v-model="form.organization"></el-input>
      </el-form-item>
      <el-form-item label="Loại đấu giá">
        <el-select v-model="form.type" placeholder="Chọn loại hình đấu giá">
          <el-option label="Đấu giá công khai" value="1"></el-option>
          <el-option label="Đấu giá kín" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Miêu tả">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="Bắt đầu đăng ký">
        <el-date-picker
          v-model="form.registerStartDate"
          type="datetime"
          placeholder="Chọn thời gian"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="Giá khởi điểm">
        <el-input-number
          v-model="form.startPrice"
          :step="1000"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Bắt đầu đấu giá">
        <el-date-picker
          v-model="form.bidStartDate"
          type="datetime"
          placeholder="Chọn thời gian"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Thông tin thêm">
        <el-input v-model="form.info"></el-input>
      </el-form-item>
      <el-form-item label="Kết thúc đăng ký">
        <el-date-picker
          v-model="form.registerEndDate"
          type="datetime"
          placeholder="Chọn thời gian"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Tiêu đề">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="Kết thúc đấu giá">
        <el-date-picker
          v-model="form.bidEndDate"
          type="datetime"
          placeholder="Chọn thời gian"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="Địa chỉ" style="flex: 100%">
        <el-input v-model="form.address"></el-input>
      </el-form-item>

      <el-form-item label="Hình ảnh">
        <el-upload
          action="#"
          :auto-upload="false"
          list-type="picture"
          ref="upload"
        >
          <el-button size="small" type="primary">Nhấn để upload</el-button>
        </el-upload>
      </el-form-item>
      <el-divider></el-divider>
      <el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Xác nhận tạo</el-button>
          <el-button @click="onRefresh">Huỷ</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import * as auction from "@/api/auction";

const defaultForm = {
  code: "",
  owner: "",
  organization: "",
  registerStartDate: new Date(),
  registerEndDate: new Date(),
  bidStartDate: new Date(),
  bidEndDate: new Date(),
  startPrice: 100000,
  title: "",
  description: "",
  info: "",
  type: "1",
  address: "",
};

export default {
  data() {
    return {
      form: { ...defaultForm },
    };
  },
  methods: {
    onSubmit(e) {
      let files = this.$refs.upload.$children[1].files;
      this.$confirm("Xác nhận?", "Warning", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Quay lại",
        type: "warning",
      }).then(() => {
        auction.createAuction(this.form, files).then((res) => {
          if (res.code === 0) {
            this.$message({
              message: "Tạo đấu giá thành công",
              type: "success",
            });
            this.$router.go();
          } else {
            console.log(res);
            this.$message({
              message: "Có lỗi xảy ra, vui lòng thử lại sau!",
              type: "danger",
            });
          }
        });
      });
    },
    onRefresh() {
      this.$router.go();
    },
  },
};
</script>

<style lang="scss">
.container {
  padding: 20px;
  .el-form {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      flex: 50%;
    }
  }
}
.el-upload-list {
  display: flex;
  gap: 10px;
  li {
    flex: 30%;
    flex-grow: 0;
  }
}
</style>